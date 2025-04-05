import React, { useEffect, useState } from "react";

import FavoritePokemonCard from "../components/FavoritePokemonCard";
import { Input } from "@heroui/input";
import PokemonCard from "../components/PokemonCard";
import { Button } from "@heroui/button";
import Modal from "../components/Modal";
import { ReloadIcon } from "../icons";
import { FloatingMenu } from "../components/FloatingMenu";

export default function FavoritiesPokemon() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/favorites`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [reload]);

  const removePokemon = (name) => {
    setData((prev) => prev.filter((item) => item.name !== name));
  };

  const pokemonSearch = () => {
    if (!search.trim()) return;

    fetch(`http://localhost:3000/pokemon/${search}`, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon no encontrado");
        return res.json();
      })
      .then((json) => setPokemon(json));
  };

  const closeModal = () => {
    setPokemon(null);
  };

  return (
    <main className="min-h-svh w-full px-3 py-7 flex flex-wrap justify-around gap-5">
      <article className="w-full">
        <div className="flex gap-3 justify-center items-center">
          <Input
            className="w-[300px]"
            placeholder="busca tu pokemon favorito"
            value={search}
            onValueChange={setSearch}
          />
          <Button onPress={pokemonSearch}>Buscar</Button>
          <Button onPress={() => setReload(!reload)} size="sm" isIconOnly>
            <ReloadIcon />
          </Button>
          <Modal pokemon={pokemon} onClose={closeModal} />
        </div>
      </article>

      {data &&
        data.map((pokemon) => (
          <FavoritePokemonCard
            pokemon={pokemon}
            key={pokemon.pokemonId}
            removeFavorite={removePokemon}
          />
        ))}
      <FloatingMenu />
    </main>
  );
}
