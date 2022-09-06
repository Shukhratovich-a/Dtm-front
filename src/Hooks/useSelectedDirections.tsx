import React from "react";

import { Context } from "../Context/Direction";

const useSelectedDirections = (): [Direction[], (state: Direction[]) => void] => {
  const ctx = React.useContext(Context);

  return [ctx!.directions, ctx!.setDirections];
};

export default useSelectedDirections;
