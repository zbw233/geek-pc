import React from "react";
import LoginStore from "./login.Store";

class RootStore {
  constructor() {
    this.LoginStore = new LoginStore();
  }
}

const rootstore = new RootStore();
const context = React.createContext(rootstore);

const useStore = () => React.useContext(context);

export { useStore };
