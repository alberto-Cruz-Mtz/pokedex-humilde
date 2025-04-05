import axios from "axios";
import { Router } from "express";
import FavoritePokemon from "../models/FavoritePokemon.js";

export const pokeApiRoute = Router();

pokeApiRoute.get("/pokemon/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${identifier.toLowerCase()}`
    );
    const pokemonData = response.data;

    const isFavorite = await FavoritePokemon.exists({
      $or: [
        { pokemonId: pokemonData.id },
        { name: pokemonData.name.toLowerCase() },
      ],
    });

    const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);

    const abilities = {
      normal: pokemonData.abilities
        .filter((ability) => !ability.is_hidden)
        .map((ability) => ability.ability.name),
      hidden: pokemonData.abilities
        .filter((ability) => ability.is_hidden)
        .map((ability) => ability.ability.name),
    };

    // Procesar las estadísticas
    const stats = {};
    pokemonData.stats.forEach((statInfo) => {
      const statName = statInfo.stat.name;
      stats[statName] = statInfo.base_stat;
    });

    const signatureMove =
      pokemonData.moves.length > 0 ? pokemonData.moves[0].move.name : "unknown";

    const formattedResponse = {
      name: pokemonData.name,
      id: pokemonData.id,
      height: pokemonData.height / 10,
      weight: pokemonData.weight / 10,
      types: types,
      abilities: abilities,
      stats: {
        hp: stats.hp,
        attack: stats.attack,
        defense: stats.defense,
        "special-attack": stats["special-attack"],
        "special-defense": stats["special-defense"],
        speed: stats.speed,
      },
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
      official_artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
      signature_move: signatureMove,
      isFavorite: !!isFavorite,
      sound: pokemonData.cries.latest,
    };

    res.json(formattedResponse);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: "Pokémon no encontrado" });
    } else {
      console.error("Error al obtener datos del Pokémon:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
});

pokeApiRoute.get("/pokemons", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;

    const listResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonList = listResponse.data.results;

    const pokemonDetails = await Promise.all(
      pokemonList.map((pokemon) =>
        axios.get(pokemon.url).then((res) => res.data)
      )
    );

    const favoritePokemons = await FavoritePokemon.find({});
    const favoriteIds = favoritePokemons.map((p) => p.pokemonId);

    const formattedPokemons = pokemonDetails.map((pokemonData) => {
      const types = pokemonData.types.map((typeInfo) => typeInfo.type.name);

      const abilities = {
        normal: pokemonData.abilities
          .filter((ability) => !ability.is_hidden)
          .map((ability) => ability.ability.name),
        hidden: pokemonData.abilities
          .filter((ability) => ability.is_hidden)
          .map((ability) => ability.ability.name),
      };

      const stats = {};
      pokemonData.stats.forEach((statInfo) => {
        const statName = statInfo.stat.name;
        stats[statName] = statInfo.base_stat;
      });

      const signatureMove =
        pokemonData.moves.length > 0
          ? pokemonData.moves[0].move.name
          : "unknown";

      return {
        name: pokemonData.name,
        id: pokemonData.id,
        height: pokemonData.height / 10,
        weight: pokemonData.weight / 10,
        types: types,
        abilities: abilities,
        stats: {
          hp: stats.hp,
          attack: stats.attack,
          defense: stats.defense,
          "special-attack": stats["special-attack"],
          "special-defense": stats["special-defense"],
          speed: stats.speed,
        },
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
        official_artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
        signature_move: signatureMove,
        sound: pokemonData.cries.latest,
        isFavorite: favoriteIds.includes(pokemonData.id),
      };
    });

    const response = {
      count: listResponse.data.count,
      next: listResponse.data.next
        ? `${req.protocol}://${req.get("host")}${
            req.baseUrl
          }/pokemons?${new URL(listResponse.data.next).searchParams.toString()}`
        : null,
      previous: listResponse.data.previous
        ? `${req.protocol}://${req.get("host")}${
            req.baseUrl
          }/pokemons?${new URL(
            listResponse.data.previous
          ).searchParams.toString()}`
        : null,
      results: formattedPokemons,
    };

    res.json(response);
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
