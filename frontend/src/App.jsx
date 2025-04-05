import { Route, Routes } from "react-router";
import Pokemons from "./pages/Pokemons";
import FavoritiesPokemon from "./pages/FavoritiesPokemon";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokemons />} />
      <Route path="/favorities" element={<FavoritiesPokemon />} />
    </Routes>
  );
}
