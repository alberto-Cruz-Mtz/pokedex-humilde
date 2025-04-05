import axios from "axios";
import { Router } from "express";
import FavoritePokemon from "../models/FavoritePokemon.js";

export const favoriteRouter = Router();

favoriteRouter.post("/favorites", async (req, res) => {
  try {
    const { identifier } = req.body;

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${identifier}`
    );
    const pokemonData = response.data;

    const existingFavorite = await FavoritePokemon.findOne({
      pokemonId: pokemonData.id,
    });

    if (existingFavorite) {
      return res.status(400).json({
        error: "Este Pokémon ya está en favoritos",
      });
    }

    const newFavorite = new FavoritePokemon({
      pokemonId: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height / 10,
      weight: pokemonData.weight / 10,
      types: pokemonData.types.map((t) => t.type.name),
      abilities: {
        normal: pokemonData.abilities
          .filter((a) => !a.is_hidden)
          .map((a) => a.ability.name),
        hidden: pokemonData.abilities
          .filter((a) => a.is_hidden)
          .map((a) => a.ability.name),
      },
      stats: pokemonData.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
      }, {}),
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
      official_artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
      signature_move: pokemonData.moves[0]?.move.name || "unknown",
      sound: pokemonData.cries.latest,
    });

    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: "Pokémon no encontrado" });
    }
    console.error("Error:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

favoriteRouter.get("/favorites", async (req, res) => {
  try {
    const favorites = await FavoritePokemon.find().sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al obtener favoritos" });
  }
});

favoriteRouter.delete("/favorites/:id", async (req, res) => {
  try {
    const result = await FavoritePokemon.findOneAndDelete({
      $or: [
        { pokemonId: Number(req.params.id) || null },
        { name: req.params.id },
      ],
    });

    if (!result) {
      return res
        .status(404)
        .json({ error: "Pokémon no encontrado en favoritos" });
    }

    res.json({ message: "Pokémon eliminado de favoritos", deleted: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al eliminar favorito" });
  }
});

favoriteRouter.patch("/favorities/:id/nickname", async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname } = req.body;

    if (!nickname || typeof nickname !== "string") {
      return res.status(400).json({ error: "Se requiere un nickname válido" });
    }

    const updatedPokemon = await FavoritePokemon.findOneAndUpdate(
      {
        $or: [
          { pokemonId: !isNaN(id) ? Number(id) : null },
          { name: id.toLowerCase() },
        ],
      },
      { nickname: nickname.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedPokemon) {
      return res.status(404).json({ error: "Pokémon favorito no encontrado" });
    }

    res.json({
      message: "Mote actualizado exitosamente",
      pokemon: {
        id: updatedPokemon.pokemonId,
        originalName: updatedPokemon.name,
        nickname: updatedPokemon.nickname,
        fullName: updatedPokemon.nickname
          ? `${updatedPokemon.nickname} (${updatedPokemon.name})`
          : updatedPokemon.name,
      },
    });
  } catch (error) {
    console.error("Error al actualizar el mote:", error);
    res.status(500).json({
      error: "Error interno del servidor",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});
