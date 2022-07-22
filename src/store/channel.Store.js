import { http } from "@/utils";

const { makeAutoObservable, runInAction } = require("mobx");

class ChannelStore {
  channelList = [];
  constructor() {
    makeAutoObservable(this);
  }
  loadChannelList = async () => {
    const res = await http.get("/channels");
    runInAction(() => {
      this.channelList = res.data.channels;
    });
  };
}

export default ChannelStore;
