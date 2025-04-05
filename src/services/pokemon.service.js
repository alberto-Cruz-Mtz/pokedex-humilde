export function parserPokemonData(pokemonData) {
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

  // Determinar el movimiento característico (usaremos el primero como ejemplo)
  const signatureMove =
    pokemonData.moves.length > 0 ? pokemonData.moves[0].move.name : "unknown";

  // Formatear la respuesta según tu estructura deseada
  const formattedResponse = {
    name: pokemonData.name,
    id: pokemonData.id,
    height: pokemonData.height / 10, // Convertir decímetros a metros
    weight: pokemonData.weight / 10, // Convertir hectogramos a kg
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
  };

  return formattedResponse;
}
