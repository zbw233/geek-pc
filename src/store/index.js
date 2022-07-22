import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./user.Store";
import ChannelStore from "./channel.Store";

class RootStore {
  constructor() {
    this.LoginStore = new LoginStore();
    this.UserStore = new UserStore();
    this.ChannelStore = new ChannelStore();
  }
}

const rootstore = new RootStore();
const context = React.createContext(rootstore);

const useStore = () => React.useContext(context);

export { useStore };
