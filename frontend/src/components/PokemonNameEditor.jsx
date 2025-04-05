import { useState } from "react";
import { Button } from "@heroui/button";
import { EditIcon } from "./../icons/";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";

export const PokemonNameEditor = ({ pokemon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(pokemon.name);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/favorities/${pokemon.name}/nickname`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname: newName }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al guardar el nuevo nombre");
      }

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <span className="flex gap-2 items-center">
      {isEditing ? (
        <>
          <Input
            type="text"
            className="border rounded"
            variant="underlined"
            value={newName}
            onValueChange={(e) => setNewName(e)}
          />

          <Button size="sm" onPress={handleSave}>
            Guardar
          </Button>

          <Button
            size="sm"
            onPress={() => {
              setIsEditing(false);
              setNewName(pokemon.name);
            }}
          >
            Cancelar
          </Button>
        </>
      ) : (
        <>
          <h1 className="font-bold text-lg">
            {pokemon.nickname
              ? pokemon.nickname.toUpperCase()
              : pokemon.name.toUpperCase()}
          </h1>
          <Tooltip content="modifica el nombre de tu pokemon favorito">
            <Button
              size="sm"
              className="bg-transparent"
              isIconOnly
              onPress={() => setIsEditing(true)}
            >
              <EditIcon className="text-primary" />
            </Button>
          </Tooltip>
        </>
      )}
      {error && <p className="text-danger">{error}</p>}
    </span>
  );
};
