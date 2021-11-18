import React, { useEffect, useState } from "react";
import { Table, Icon, Button, Modal, Card } from "tea-component";
import { sourceList } from "@/pages/management/mock.js";
import RsourceModal from "@/components/management/resourceModal";
import intl from "react-intl-universal";

const { sortable, selectable, pageable, scrollable } = Table.addons;

export default function SourceList(props) {
  // 当前排序列
  const [sorts, setSorts] = useState([]);
  const [showPublicModal, setShowPublicModal] = useState(false);
  const [offlineModal, setOfflineModal] = useState(false);

  // select
  const [selectedKeys, setSelectedKeys] = useState([]);

  // 点击 modal 确定btn
  function handleModalSure(tag) {
    if (tag === "public") {
      setShowPublicModal(false);
    } else if (tag === "offline") {
      setOfflineModal(false);
    }
    console.log(tag);
  }
  // 点击 modal 关闭btn
  function CloseModal(tag) {
    if (tag === "public") {
      setShowPublicModal(false);
    } else if (tag === "offline") {
      setOfflineModal(false);
    }
  }
  // 初始 对数据 按 创建时间 倒序排列
  function descCreateTimeFn(data, sortItem) {
    if (data.length) {
      data.sort(function (a, b) {
        let bs = b[sortItem].substring(0, 19);
        let as = a[sortItem].substring(0, 19);
        let at = new Date(as).getTime();
        let bt = new Date(bs).getTime();
        return bt - at;
      });
    }
  }
  const list = JSON.parse(JSON.stringify(sourceList));
  descCreateTimeFn(list, "createTime");

  // 表格 page 变化回调

  function handlePageChange(p) {
    console.log(p);
    let { pageIndex: page, pageSize } = p;
    console.log(page, pageSize);
  }

  useEffect(() => {
    if (!props.selectMore) {
      setSelectedKeys([]);
    }
  }, [props.selectMore]);

  function renderOperationColumn(cvm) {
    return (
      <>
        <Card>
          <Card.Body>
            <Button
              type="link"
              onClick={() => {
                console.log(111, cvm);
                props.setting("resource-edit", cvm);
                console.log(props);
              }}
            >
              {intl.get("MANAGE_PACKAGE_EDIT")} {/* 编辑 */}
            </Button>
            <Button
              type="link"
              onClick={() =>
                Modal.confirm({
                  message: "设置点啥",
                  description: "我也不知道呀",
                })
              }
            >
              {intl.get("MANAAGE_RESOURCE_COPY")} {/* 复制 */}
            </Button>
            <Button
              type="link"
              onClick={() => {
                setShowPublicModal(true);
              }}
            >
              {intl.get("MANAGE_RESOURCE_PUBLIC")} {/* 发布 */}
            </Button>
            <Button
              type="link"
              onClick={() => {
                setOfflineModal(true);
              }}
            >
              {intl.get("MANAGE_RESOURCE_OFFLINE")} {/* 下线 */}
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }

  return (
    <>
      <RsourceModal
        visible={showPublicModal}
        showFooter={true}
        className="r-conform-modal"
        onCancel={() => {
          CloseModal("public");
        }}
        onSure={() => {
          handleModalSure("public");
        }}
        onClose={() => {
          CloseModal("public");
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "left",
            fontSize: "16px",
            padding: "30px 30px 0px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#000",
              height: "50px",
              textAlign: "left",
            }}
          >
            {intl.get("MANAGE_RESOURCE_MODAL_PUBLIC_TITLE")}
          </div>
          {intl.get("MANAGE_RESOURCE_MODAL_PUBLIC_TEXT")}
        </div>
      </RsourceModal>
      <RsourceModal
        visible={offlineModal}
        showFooter={true}
        className="r-conform-modal"
        onCancel={() => {
          CloseModal("offline");
        }}
        onSure={() => {
          handleModalSure("offline");
        }}
        onClose={() => {
          CloseModal("offline");
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "left",
            fontSize: "16px",
            padding: "30px 30px 0px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#000",
              height: "50px",
              textAlign: "left",
            }}
          >
            {intl.get("MANAGE_RESOURCE_MODAL_OFFLINE_TITLE")}
          </div>
          {intl.get("MANAGE_RESOURCE_MODAL_OFFLINE_TEXT")}
        </div>
      </RsourceModal>
      <Card>
        <Card.Body>
          <Table
            className="resource-table"
            // 如果要在前端排序，可以用 sortable.comparer 生成默认的排序方法
            records={[...list].sort(sortable.comparer(sorts))}
            disableTextOverflow="true"
            recordKey="sourceID"
            columns={[
              {
                key: "sourceID",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_SOURCE_ID"),
                width: 120,
              },
              {
                key: "OpenId",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_OPEN_ID"),
                width: 120,
              },
              {
                key: "preEdit",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_PRE_EDIT"),
                width: 120,
              },
              {
                key: "createTime",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_CREATE_TIME"),
                width: 120,
              },
              {
                key: "type",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_TYPE"),
                width: 120,
              },
              {
                key: "opreat",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_OPRITE"),
                width: 120,
              },
              {
                key: "gameArea",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_GAME_AREA"),
                width: 120,
              },
              {
                key: "grade",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_GRADE"),
                width: 120,
              },
              {
                key: "status",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_STATUS"),
                width: 200,
                render: (cvm) => {
                  if (cvm.status === "not") {
                    return (
                      <span>{intl.get("MANAGE_RESOURCE_NOT_PUBLIC")}</span>
                    );
                  }
                  if (cvm.status === "test") {
                    return (
                      <span style={{ color: "blue", width: "auto" }}>
                        {intl.get("MANAGE_RESOURCE_PULL_TEST")}
                      </span>
                    );
                  }
                  if (cvm.status === "master") {
                    return (
                      <span style={{ color: "orange", width: "auto" }}>
                        {intl.get("MANAGE_RESOURCE_PULL_TEST_EDIT")}
                      </span>
                    );
                  }
                  return cvm.status;
                },
              },
              {
                key: "notice",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_NOTICE"),
                width: 120,
              },
              {
                key: "settings",
                header: intl.get("MANAGE_RESOURCE_COLUMNS_SETTING"),
                width: "auto",
                render: (cvm) => {
                  return renderOperationColumn(cvm);
                },
              },
            ]}
            addons={[
              pageable({
                onPagingChange: handlePageChange,
              }),
              // 支持表格滚动，高度超过 70vh 开始显示滚动条
              scrollable({
                maxHeight: "70vh",
                minWidth: 1600,
                onScrollBottom: () => console.log("到达底部"),
              }),
              sortable({
                // 这两列支持排序，其中 age 列优先倒序，mail 采用自定义排序方法
                columns: [
                  "sourceID",
                  "preEdit",
                  "createTime",
                  // {
                  //   key: "createTime",
                  //   prefer: "desc",
                  //   sorter: (first, second) => {
                  //     // if (+first.contact.phone > +second.contact.phone) return 1;
                  //     // if (+first.contact.phone < +second.contact.phone) return -1;
                  //     // return 0;
                  //   },
                  // },
                ],
                value: sorts,
                onChange: (value) => setSorts(value),
              }),
              props.selectMore &&
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
        </Card.Body>
      </Card>
    </>
  );
}
