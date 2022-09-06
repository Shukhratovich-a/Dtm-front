import React from "react";

const Context = React.createContext<DirectionContext | null>(null);

const Provider: React.FC<Props> = ({ children }) => {
  const [directions, setDirections] = React.useState<Direction[]>(
    JSON.parse(window.sessionStorage.getItem("directions") as string) || []
  );

  React.useEffect(() => {
    if (directions.length > 0) {
      window.sessionStorage.setItem("directions", JSON.stringify(directions));
    } else {
      window.sessionStorage.removeItem("directions");
    }
  }, [directions]);

  return <Context.Provider value={{ directions, setDirections }}>{children}</Context.Provider>;
};

export { Context, Provider };
