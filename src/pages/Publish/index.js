import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useStore } from "@/store";
import { useState, useRef, useEffect } from "react";
import { http } from "@/utils";

const { Option } = Select;
const Publish = () => {
  const formRef = useRef();
  const [params] = useSearchParams();
  const id = params.get("id");
  const fileListRef = useRef();
  const { ChannelStore } = useStore();
  const [fileList, setFileList] = useState([]);
  const [imgCount, setImgCount] = useState(1);
  const navigate = new useNavigate();
  useEffect(() => {
    const loadDetial = async () => {
      const res = await http.get(`/mp/articles/${id}`);
      const data = res.data;
      formRef.current.setFieldsValue({
        ...data,
        type: data.cover.type,
      });

      setFileList(
        data.cover.images.map((url) => {
          return {
            url: url,
          };
        })
      );
      fileListRef.current = data.cover.images.map((url) => {
        return {
          url: url,
        };
      });
    };
    if (id) {
      loadDetial();
    }
  }, [id]);
  const onUploadChange = ({ fileList }) => {
    const formatList = fileList.map((file) => {
      if (file.response) {
        return { url: file.response.data.url };
      }
      return file;
    });
    setFileList(formatList);
    fileListRef.current = formatList;
  };
  const typeChange = (e) => {
    setImgCount(e.target.value);
    if (e.target.value === 0) {
      setFileList([]);
    }
    if (
      e.target.value === 1 &&
      fileListRef.current &&
      fileListRef.current.length !== 0
    ) {
      const img = fileListRef.current[0];
      setFileList([img]);
    }
    if (e.target.value === 3) {
      setFileList(fileListRef.current);
    }
  };

  const onFinish = async (values) => {
    const { channel_id, content, title, type } = values;
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((file) => file.url),
      },
    };
    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params);
    } else {
      await http.post("/mp/articles?draft=false", params);
    }
    navigate("/Article");
    message.success(`${id ? "更新" : "发布"}成功`);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? "编辑" : "发布"}文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          ref={formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: "" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {ChannelStore.channelList.map((channel) => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={typeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount !== 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? "更新" : "发布"}文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
