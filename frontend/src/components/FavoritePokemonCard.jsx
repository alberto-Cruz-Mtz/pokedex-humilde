import { useState } from "react";
import {
  DnaIcon,
  EditIcon,
  HeartIcon,
  LeftRow,
  RightRow,
  ShieldIcon,
  SwordIcon,
  ThunderIcon,
} from "../icons";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tab, Tabs } from "@heroui/tabs";
import { Progress } from "@heroui/progress";
import { FavoriteButton } from "./FavoriteButton";
import { PokemonNameEditor } from "./PokemonNameEditor";
import { AudioButton } from "./AudioButton";

export default function FavoritePokemonCard({ pokemon, removeFavorite }) {
  const [showArtwork, setShowArtwork] = useState(true);

  // Get type color
  const getTypeColor = (type) => {
    const typeColors = {
      normal: "bg-default",
      fire: "bg-orange-500",
      water: "bg-primary",
      electric: "bg-yellow-400",
      grass: "bg-green-500",
      ice: "bg-blue-300",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-600",
      flying: "bg-indigo-300",
      psychic: "bg-pink-500",
      bug: "bg-lime-500",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-600",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
    };

    return typeColors[type] || "bg-gray-400";
  };

  if (!pokemon) return null;

  return (
    <Card className="w-[290px] h-[575px]">
      <header className="w-full grid py-3 px-2 gap-2 relative">
        <div aria-label="title" className="w-full flex justify-between">
          <PokemonNameEditor pokemon={pokemon} />
          <h2 className="font-bold text-lg">
            #{pokemon.pokemonId.toString().padStart(3, "0")}
          </h2>
        </div>
        <span className="flex gap-3">
          {pokemon.types.map((type) => (
            <Chip
              classNames={{ base: getTypeColor(type), content: "text-white" }}
              key={`${pokemon.name}-${type}`}
              variant="shadow"
              size="sm"
            >
              {type}
            </Chip>
          ))}
        </span>
        <article className="relative h-48 w-full flex items-center justify-center bg-default/30 rounded-lg overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: showArtwork ? 1 : 0 }}
          >
            <Image
              src={pokemon.official_artwork || "/placeholder.svg"}
              alt={pokemon.name}
              width={150}
              height={150}
              isZoomed
              className="object-contain h-full w-full p-4"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showArtwork ? 0 : 1 }}
          >
            <Image
              src={pokemon.sprite || "/placeholder.svg"}
              alt={pokemon.name}
              width={150}
              height={150}
              isZoomed
              className="object-contain h-full w-full p-4 pixelated"
            />
          </motion.div>
        </article>
        <div className="absolute bottom-5 right-4 flex gap-2">
          <Button
            isIconOnly
            radius="full"
            size="sm"
            variant="shadow"
            onPress={() => setShowArtwork(!showArtwork)}
            aria-label="Toggle artwork style"
          >
            {showArtwork ? (
              <LeftRow className="h-5 w-5 text-primary" />
            ) : (
              <RightRow className="h-5 w-5 text-primary" />
            )}
          </Button>
          <AudioButton sound={pokemon.sound} />
        </div>
        <div className="absolute bottom-5 left-4 flex gap-2">
          <FavoriteButton
            name={pokemon.name}
            favorite
            callback={() => removeFavorite(pokemon.name)}
          />
        </div>
      </header>
      <CardBody>
        <Tabs radius="full" color="primary" classNames={{ tabList: "w-full" }}>
          <Tab title="info" key="info">
            <article className="grid grid-cols-2 gap-5 w-full">
              <span className="bg-default/30 text-sm p-2 rounded-lg">
                <p className="text-primary font-medium">Height</p>
                <p>{pokemon.height}</p>
              </span>
              <span className="bg-default/30 text-sm p-2 rounded-lg">
                <p className="text-primary font-medium">Weight</p>
                <p>{pokemon.weight}</p>
              </span>
              <span className="col-span-2 bg-default/30 text-sm p-2 rounded-lg">
                <p className="text-sm font-medium">Signature Move</p>
                <p className="text-md font-bold capitalize text-primary">
                  {pokemon.signature_move}
                </p>
                <p className="text-sm">
                  {pokemon.name === "ditto"
                    ? "Allows the user to copy the opponent's appearance and moves."
                    : "Special move unique to this Pokémon."}
                </p>
              </span>
            </article>
          </Tab>
          <Tab title="stats" key="stats">
            <article className="w-full grid gap-2">
              <StatBase name="hp" value={pokemon.stats.hp}>
                <DnaIcon className="fill-success w-5 h-5" />
              </StatBase>
              <StatBase name="attack" value={pokemon.stats.attack}>
                <SwordIcon className="fill-danger w-5 h-5" />
              </StatBase>
              <StatBase name="defense" value={pokemon.stats.defense}>
                <ShieldIcon className="fill-primary w-5 h-5" />
              </StatBase>
              <StatBase
                name="special attack"
                value={pokemon.stats["special-attack"]}
              >
                <SwordIcon className="fill-danger w-5 h-5" />
              </StatBase>
              <StatBase
                name="special defense"
                value={pokemon.stats["special-defense"]}
              >
                <ShieldIcon className="fill-primary w-5 h-5" />
              </StatBase>
              <StatBase name="speed" value={pokemon.stats.speed}>
                <ThunderIcon className="fill-warning w-5 h-5" />
              </StatBase>
            </article>
          </Tab>
          <Tab title="habilidades" key="abilities">
            <div>
              <h3 className="text-sm font-medium mb-2">Normal Abilities</h3>
              <div className="space-y-2">
                {pokemon.abilities.normal.map((ability) => (
                  <div key={ability} className="bg-default/30 p-3 rounded-lg">
                    <p className="font-bold capitalize">{ability}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {ability === "limber"
                        ? "Prevents the Pokémon from being paralyzed."
                        : "A special ability of this Pokémon."}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-primary mt-3">
                Hidden Abilities
              </h3>
              <div className="space-y-2">
                {pokemon.abilities.hidden.map((ability) => (
                  <div key={ability} className="bg-default/30 p-3 rounded-lg">
                    <p className="font-bold capitalize">{ability}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {ability === "imposter"
                        ? "When this Pokémon enters battle, it transforms into its opponent."
                        : "A rare hidden ability of this Pokémon."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}

const StatBase = ({ name, value, children }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="rounded-full bg-default/40 p-2 w-[35px]">{children}</div>
      <StatWrapper name={name} value={value} />
    </div>
  );
};

const StatWrapper = ({ name, value }) => {
  return (
    <div className="flex-1">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium capitalize">{name}</span>
        <span className="text-sm">{value}/255</span>
      </div>
      <Progress value={(value / 255) * 100} className="h-2" />
    </div>
  );
};
