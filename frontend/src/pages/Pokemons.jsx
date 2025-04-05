import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { Button } from "@heroui/button";
import { FloatingMenu } from "../components/FloatingMenu";

export default function Pokemons() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 12;

  useEffect(() => {
    fetch(`http://localhost:3000/pokemons?offset=${offset}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setData(json.results));
  }, [offset]);

  const handleNext = () => {
    setOffset((prev) => prev + limit);
  };

  const handlePrev = () => {
    setOffset((prev) => Math.max(prev - limit, 0));
  };

  return (
    <main className="min-h-svh w-full px-3 py-7 flex flex-wrap justify-around gap-5">
      {data &&
        data.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      <span className="flex gap-2">
        <Button
          isDisabled={offset === 0}
          variant="shadow"
          color="primary"
          onPress={handlePrev}
        >
          Anterior
        </Button>
        <Button variant="shadow" color="primary" onPress={handleNext}>
          Siguiente
        </Button>
      </span>
      <FloatingMenu />
    </main>
  );
}
