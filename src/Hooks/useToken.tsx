import React from "react";

import { Context } from "../Context/Token";

const useToken = (): [string, (state: string) => void] => {
  const ctx = React.useContext(Context);

  return [ctx!.token, ctx!.setToken];
};

export default useToken;
