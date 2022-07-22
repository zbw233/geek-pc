import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
  Popconfirm,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import "./index.scss";
import img404 from "@/assets/error.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { http } from "@/utils";
import { useStore } from "@/store";

const { Option } = Select;
const { RangePicker } = DatePicker;

function Article() {
  const { ChannelStore } = useStore();
  useEffect(() => {
    ChannelStore.loadChannelList();
  }, []);
  const onFinish = (values) => {
    const _params = {};
    const { status, channel_id, date } = values;

    if (status !== -1) {
      _params.status = status;
    }
    if (channel_id) {
      _params.channel_id = channel_id;
    }
    if (date) {
      _params.begin_pubdate = date[0].format("YYYY-MM-DD");
      _params.end_pubdate = date[1].format("YYYY-MM-DD");
    }
    setParams({ ...params, ..._params });
  };

  const [Articledata, setArticledata] = useState({ list: [], count: 0 });
  const [params, setParams] = useState({ page: 1, perpage: 5 });

  useEffect(() => {
    const loadArticledata = async () => {
      const res = await http.get("/mp/articles", { params });
      const { results, total_count } = res.data;
      setArticledata({ list: results, count: total_count });
    };
    loadArticledata();
  }, [params]);

  const pageChage = (_page) => {
    setParams({ ...params, page: _page });
  };

  const delArticl = async (data) => {
    console.log(data);
    const res = await http.delete(`/mp/articles/${data.id}`);
    setParams({ ...params, page: 1 });
  };
  const navigate = useNavigate();
  const toPublish = (id) => {
    navigate(`/publish?id=${id}`);
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return <img src={cover || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => toPublish(data.id)}
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
            />
            <Popconfirm
              onConfirm={() => delArticl(data)}
              title="是否确认删除？"
              okText="删除"
              cancelText="取消"
            >
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish} initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {ChannelStore.channelList.map((channel) => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${Articledata.count} 条结果：`}>
        <Table
          pagination={{
            pagesize: params.perpage,
            total: Articledata.count,
            onChange: pageChage,
          }}
          rowKey="id"
          columns={columns}
          dataSource={Articledata.list}
        />
      </Card>
    </div>
  );
}

export default Article;
