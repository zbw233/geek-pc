import { http, setToken, getToken, clearToken } from "@/utils";
import { makeAutoObservable, runInAction } from "mobx";

class LoginStore {
  token = getToken() || "";
  constructor() {
    makeAutoObservable(this);
  }
  getmyToken = async ({ mobile, code }) => {
    const res = await http.post("http://geek.itheima.net/v1_0/authorizations", {
      mobile,
      code,
    });
    runInAction(() => {
      this.token = res.data.token;
    });
    setToken(this.token);
  };
  Logout = () => {
    this.token = "";
    clearToken();
  };
}
export default LoginStore;
