import React, { useState } from "react";
import { Table, Icon, Button, Modal } from "tea-component";

// const { expandable, selectable, indentable } = Table.addons;
const { sortable, selectable, pageable } = Table.addons;

const records = [
  {
    sourceID: 1,
    OpenId: 12345,
    preEdit: "2021-03-11 21：30：20 By shawn",
    createTime: "2021-03-11 21：30：20 By shawn",
    type: "账号类型",
    opreat: "安卓",
    gameArea: "*",
    grade: "Z",
    status: "未发布",
    notice: "备注内容填写",
    optrate: "编辑",
  },
  {
    sourceID: 2,
    OpenId: 12345,
    preEdit: "2021-03-11 22：30：20 By shawn",
    createTime: "2021-03-12 21：30：20 By shawn",
    type: "账号类型",
    opreat: "安卓",
    gameArea: "*",
    grade: "Z",
    status: "未发布",
    notice: "备注内容填写",
    optrate: "编辑",
  },
  {
    sourceID: 3,
    OpenId: 12345,
    preEdit: "2021-03-11 24：30：20 By shawn",
    createTime: "2021-03-14 21：30：20 By shawn",
    type: "账号类型",
    opreat: "安卓",
    gameArea: "*",
    grade: "Z",
    status: "master",
    notice: "备注内容填写",
    optrate: "编辑",
  },
  {
    sourceID: 5,
    OpenId: 12345,
    preEdit: "2021-03-11 23：30：20 By shawn",
    createTime: "2021-03-13 21：30：20 By shawn",
    type: "账号类型",
    opreat: "安卓",
    gameArea: "*",
    grade: "Z",
    status: "not",
    notice: "备注内容填写",
    optrate: "编辑",
  },
  {
    sourceID: 4,
    OpenId: 12345,
    preEdit: "2021-03-11 25：30：20 By shawn",
    createTime: "2021-03-15 21：30：20 By shawn",
    type: "账号类型",
    opreat: "安卓",
    gameArea: "*",
    grade: "Z",
    status: "test",
    notice: "备注内容填写",
    optrate: "编辑",
  },
];

export default function GameTable() {
  // 当前排序列
  const [sorts, setSorts] = useState([]);

  // select
  const [selectedKeys, setSelectedKeys] = useState([]);

  function renderOperationColumn(cvm) {
    return (
      <>
        {" "}
        <Button
          type="link"
          onClick={() => {
            console.log(111, cvm);
            Modal.success({
              message: cvm.OpenId,
            });
          }}
        >
          编辑
        </Button>
        <Button
          type="link"
          onClick={() =>
            Modal.success({
              message: "设置点啥",
              description: "我也不知道呀",
            })
          }
        >
          复制
        </Button>
        <Button
          type="link"
          onClick={() =>
            Modal.success({
              message: "设置点啥",
              description: "我也不知道呀",
            })
          }
        >
          发布
        </Button>
        <Button
          type="link"
          onClick={() =>
            Modal.success({
              message: "设置点啥",
              description: "我也不知道呀",
            })
          }
        >
          下线
        </Button>
      </>
    );
  }

  return (
    <>
      <Table
        className="resource-table"
        // 如果要在前端排序，可以用 sortable.comparer 生成默认的排序方法
        records={[...records].sort(sortable.comparer(sorts))}
        disableTextOverflow="true"
        recordKey="sourceID"
        columns={[
          { key: "sourceID", header: "资源ID", width: 120 },
          { key: "OpenId", header: "OpenId", width: 120 },
          {
            key: "preEdit",
            header: "上次编辑",
            width: 120,
          },
          { key: "createTime", header: "创建时间", width: 120 },
          { key: "type", header: "账号类型", width: 120 },
          { key: "opreat", header: "平台", width: 120 },
          { key: "gameArea", header: "游戏⼤区", width: 120 },
          { key: "grade", header: "优先级", width: 120 },
          {
            key: "status",
            header: "状态",
            width: 200,
            render: (cvm) => {
              if (cvm.status === "not") {
                return "未发布";
              }
              if (cvm.status === "test") {
                return (
                  <span style={{ color: "blue", width: "auto" }}>
                    已同步⾄测试环境
                  </span>
                );
              }
              if (cvm.status === "master") {
                return (
                  <span style={{ color: "orange", width: "auto" }}>
                    同步测试环境后编辑
                  </span>
                );
              }
              return cvm.status;
            },
          },
          { key: "notice", header: "备注", width: 120 },
          {
            key: "settings",
            header: "操作",
            width: "auto",
            render: (cvm) => {
              return renderOperationColumn(cvm);
            },
          },
        ]}
        addons={[
          pageable(),
          sortable({
            // 这两列支持排序，其中 age 列优先倒序，mail 采用自定义排序方法
            columns: [
              "sourceID",
              {
                key: "preEdit",
                prefer: "desc",
              },
              "createTime",
              {
                key: "contact.phone",
                prefer: "desc",
                sorter: (first, second) => {
                  if (+first.contact.phone > +second.contact.phone) return 1;
                  if (+first.contact.phone < +second.contact.phone) return -1;
                  return 0;
                },
              },
            ],
            value: sorts,
            onChange: (value) => setSorts(value),
          }),
          selectable({
            value: selectedKeys,
            onChange: (keys, context) => {
              console.log(keys, context);
              setSelectedKeys(keys);
            },
            rowSelect: false,
            render: (element, { disabled }) => {
              return disabled ? <Icon type="loading" /> : element;
            },
          }),
        ]}
      />
    </>
  );
}
