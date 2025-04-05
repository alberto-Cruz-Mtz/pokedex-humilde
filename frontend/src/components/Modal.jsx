import React from "react";
import PokemonCard from "./PokemonCard";
import { Button } from "@heroui/button";
import { CloseIcon } from "../icons";
import { motion } from "framer-motion";

export default function Modal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 grid place-content-center w-full h-svh z-50 inset-0 bg-black/30 backdrop-blur-sm"
    >
      <Button onPress={onClose} className="bg-transparent" size="sm" isIconOnly>
        <CloseIcon className="text-danger" />
      </Button>
      <div>{pokemon && <PokemonCard pokemon={pokemon} />}</div>
    </motion.div>
  );
}
