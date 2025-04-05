import { Schema, model } from "mongoose";

const favoritePokemonSchema = new Schema({
  pokemonId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  nickname: { type: String },
  height: Number,
  weight: Number,
  types: [String],
  abilities: {
    normal: [String],
    hidden: [String],
  },
  stats: {
    hp: Number,
    attack: Number,
    defense: Number,
    "special-attack": Number,
    "special-defense": Number,
    speed: Number,
  },
  sprite: String,
  official_artwork: String,
  signature_move: String,
  sound: String,
  createdAt: { type: Date, default: Date.now },
});

export default model("FavoritePokemon", favoritePokemonSchema);
