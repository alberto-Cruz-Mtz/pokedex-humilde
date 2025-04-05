import { Button } from "@heroui/button";
import { useRef } from "react";
import { SoundIcon } from "../icons";

export const AudioButton = ({ sound }) => {
  const audioRef = useRef(new Audio(sound));

  const handlePlay = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <Button onPress={handlePlay} isIconOnly size="sm">
      <SoundIcon className="text-primary" />
    </Button>
  );
};
