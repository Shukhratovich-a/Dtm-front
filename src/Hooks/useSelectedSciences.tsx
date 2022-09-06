import React from "react";

import { Context } from "../Context/Sciences";

const useSelectedSciences = (): [SelectedScience, (state: SelectedScience) => void] => {
  const ctx = React.useContext(Context);

  return [ctx!.sciences, ctx!.setSciences];
};

export default useSelectedSciences;
