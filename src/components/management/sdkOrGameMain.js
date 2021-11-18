import React, { useState, useEffect } from "react";
import { Table, Icon, Button, Input, Card } from "tea-component";
import RsourceModal from "./resourceModal";
import AlertComponent from "./alertComponent";
import intl from "react-intl-universal";
import { coculateDomsHeight } from "@/utils/index";

const { pageable, scrollable } = Table.addons;

export default function SdkOrGameMain(props) {
  const [columns] = useState(props.theColumns(renderSetting));
  const [deleModal, setDeleModal] = useState(false);
  const [editNameModal, setEditNameModal] = useState(false);
  const [theSelect, setTheSelect] = useState(null);
  const [name, setName] = useState("");
  const [tabHeight, setTabHeight] = useState("50px");

  // 删除 modal 确定 btn
  function handleDelete() {
    props.deleteEvent(theSelect);
    setDeleModal(false);
    props.handleAlert(true);
  }

  // 编辑名称 modal 确定 btn
  function handleEditName() {
    console.log(theSelect);
    console.log("edit");
    setEditNameModal(false);
  }

  // 请重  名称
  function handleClear() {
    setName("");
  }

  function handleAlertCloseFn() {
    props.handleAlert(false);
  }

  // 关闭 警告 alert
  function handleCloseAlert() {
    props.handleAlert(false);
  }

  // 渲染 操作 部分
  function renderSetting(cvm) {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            setTheSelect(cvm);
            setName(cvm[props.nameAttr]);
            setEditNameModal(true);
          }}
        >
          {intl.get("MANAGE_EDIT_NAME")}
        </Button>
        <Button
          type="link"
          onClick={() => {
            setTheSelect(cvm);
            setDeleModal(true);
          }}
        >
          {intl.get("MANAGE_BTN_DELETE")}
        </Button>
      </>
    );
  }
  // 计算表格滚动最大高度
  // eslint-disable-next-line
  useEffect(() => {
    let offHeight = coculateDomsHeight(
      [
        "tea-nav",
        "tea-layout__header-title",
        "tea-pagination",
        "tea-table__header",
      ],
      +80
    );
    setTabHeight(offHeight);
  });
  return (
    <>
      <AlertComponent
        show={props.showAlert}
        type="error"
        showMark={true}
        notAutoClose={true}
        text={props.alertText}
        className="alert-error"
        close={handleAlertCloseFn}
      >
        <Icon
          type="close"
          onClick={handleCloseAlert}
          style={{
            margin: "0 10px 10px 0",
            cursor: "pointer",
            position: "absolute",
            right: "0px",
            top: "50%",
            transform: "translate(0,-50%)",
          }}
        />
      </AlertComponent>
      {/* 编辑名称 */}
      <RsourceModal
        visible={editNameModal}
        size="m"
        caption="编辑名称"
        showFooter={true}
        disableCloseIcon={true}
        onCancel={() => {
          setEditNameModal(false);
        }}
        onSure={() => {
          handleEditName();
        }}
        onClose={() => {
          setEditNameModal(false);
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "16px",
            marginBottom: "50px",
            position: "relative",
          }}
        >
          <Input
            size="l"
            value={name}
            onChange={(val, context) => {
              setName(val);
              console.log(val, context);
            }}
            placeholder={props.placeHolder}
            style={{ height: "40px", paddingRight: "40px" }}
          />
          <Icon
            type="close"
            onClick={handleClear}
            style={{
              margin: "0 10px 10px 0",
              cursor: "pointer",
              position: "absolute",
              right: "40px",
              top: "50%",
              transform: "translate(0,-50%)",
            }}
          />
        </div>
      </RsourceModal>

      {/* 删除 */}
      <RsourceModal
        visible={deleModal}
        size="m"
        showFooter={true}
        onCancel={() => {
          setDeleModal(false);
        }}
        onSure={() => {
          handleDelete();
        }}
        onClose={() => {
          setDeleModal(false);
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "16px",
            height: "100px",
            lineHeight: "100px",
          }}
        >
          {props.deleText}
        </div>
      </RsourceModal>
      <Card>
        <Card.Body>
          <Table
            className="resource-table"
            // 如果要在前端排序，可以用 sortable.comparer 生成默认的排序方法
            records={props.list}
            disableTextOverflow="true"
            recordKey="no"
            columns={columns}
            addons={[
              pageable(),
              // 支持表格滚动，高度超过 70vh 开始显示滚动条
              scrollable({
                maxHeight: `calc(100vh - ${tabHeight})`,
                minWidth: 1600,
                onScrollBottom: () => console.log("到达底部"),
              }),
            ]}
          />
        </Card.Body>
      </Card>
    </>
  );
}
