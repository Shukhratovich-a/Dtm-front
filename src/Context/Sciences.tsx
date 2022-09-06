import React from "react";

const Context = React.createContext<ScienceContext | null>(null);

const Provider: React.FC<Props> = ({ children }) => {
  const [sciences, setSciences] = React.useState<SelectedScience>(
    JSON.parse(window.sessionStorage.getItem("sciences") as string) || {}
  );

  React.useEffect(() => {
    if (sciences.firstScienceId && sciences.secondScienceId) {
      window.sessionStorage.setItem(
        "sciences",
        JSON.stringify({
          firstScienceId: sciences.firstScienceId,
          secondScienceId: sciences.secondScienceId,
        })
      );
    } else {
      window.sessionStorage.removeItem("token");
    }
  }, [sciences]);

  return <Context.Provider value={{ sciences, setSciences }}>{children}</Context.Provider>;
};

export { Context, Provider };
