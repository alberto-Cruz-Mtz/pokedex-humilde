import { Switch } from "@heroui/switch";
import { MoonIcon, SunIcon } from "../icons";
import { useThemeContext } from "./../context/ThemeContext";

export default function SwitchTheme() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="">
      <Switch
        size="sm"
        isSelected={theme === "dark"}
        onValueChange={toggleTheme}
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <MoonIcon className={className} />
          ) : (
            <SunIcon className={className} />
          )
        }
      ></Switch>
    </div>
  );
}
