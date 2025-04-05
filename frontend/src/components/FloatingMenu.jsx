import { Link } from "@heroui/link";
import SwitchTheme from "./SwitchTheme";
import { Card, CardBody, CardHeader } from "@heroui/card";

export const FloatingMenu = () => {
  return (
    <Card className="fixed bottom-5 right-5  rounded-lg p-3 flex flex-col gap-2 shadow-lg z-50">
      <CardBody>
        <SwitchTheme />
        <Link href="/" className="text-blue-600 font-bold hover:underline">
          Inicio
        </Link>
        <Link
          href="/favorities"
          className="text-blue-600 font-bold hover:underline"
        >
          Favoritos
        </Link>
      </CardBody>
    </Card>
  );
};
