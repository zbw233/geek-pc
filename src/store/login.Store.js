import { http, setToken, getToken } from "@/utils";
import { makeAutoObservable } from "mobx";

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
    this.token = res.data.token;
    setToken(this.token);
  };
}
export default LoginStore;
