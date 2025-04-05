import { Button } from "@heroui/button";
import { useState } from "react";
import { HeartIcon } from "../icons";
import { Tooltip } from "@heroui/tooltip";

export const FavoriteButton = ({ name, favorite, callback }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleClick = () => {
    if (!isFavorite) {
      fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: name }),
      });
      setIsFavorite(true);
      return;
    }

    fetch(`http://localhost:3000/favorites/${name}`, { method: "DELETE" });
    setIsFavorite(false);
    callback();
  };

  return (
    <Tooltip
      content={isFavorite ? "eliminar de favoritos" : "agregar a favoritos"}
    >
      <Button
        className="bg-default/0"
        isIconOnly
        radius="full"
        size="sm"
        variant="shadow"
        onPress={handleClick}
        aria-label="Toggle artwork style"
      >
        <HeartIcon
          className={`w-5 h-5 ${isFavorite ? "fill-danger" : "fill-default"}`}
        />
      </Button>
    </Tooltip>
  );
};
