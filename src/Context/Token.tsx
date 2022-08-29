import React from "react";

const Context = React.createContext<Token | null>(null);

const Provider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = React.useState<string>("");

  React.useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", JSON.stringify(token));
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  return <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>;
};

export { Context, Provider };
