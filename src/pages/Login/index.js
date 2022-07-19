import { Card, Form, Input, Checkbox, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import "./index.scss";
import { useStore } from "@/store";

function Login() {
  const { LoginStore } = useStore();
  const navigate = useNavigate();
  async function onFinish(values) {
    await LoginStore.getmyToken({
      mobile: values.username,
      code: values.password,
    });
    message.success("登陆成功");
    navigate("/", { replace: true });
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{
            remember: true,
          }}
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入手机号",
                validateTrigger: "onblur",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号",
                validateTrigger: "onblur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
                validateTrigger: "onblur",
              },
              {
                len: 6,
                message: "请输入六位密码",
                validateTrigger: "onblur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
