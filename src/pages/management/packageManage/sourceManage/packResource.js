import React, { useState, useEffect } from "react";
import { Table, Button } from "tea-component";
import { packResourceList, downloadList } from "@/pages/management/mock.js";
import { packageResourceColums, resourceDownloadColums } from "@/utils/colums";
import AlertComponent from "@/components/management/alertComponent";
import ResourceModal from "@/components/management/resourceModal";
import intl from "react-intl-universal";
import JsonReview from "./jsonReview/index";
import { coculateDomsHeight } from "@/utils/index";

const { pageable, scrollable } = Table.addons;

export default function PackResource(props) {
  const [listInfo] = useState(packResourceList);
  const [showJson, setShowJson] = useState(false);
  const [columns] = useState(
    packageResourceColums(renderOperationColumn, renderdocList)
  );
  const [showAlert, setShowAlert] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const [downloadColumns] = useState(
    resourceDownloadColums(renderInnerNet, renderOutNet)
  );
  const [downloadListInfo] = useState(downloadList);
  const [tabHeight, setTabHeight] = useState("50px");

  function handleAlertCloseFn(params) {
    setShowAlert(false);
  }
  function handleDeleClose() {
    setShowDownload(false);
  }

  function renderInnerNet(cvm) {
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            console.log(cvm);
          }}
        >
          Normal
        </Button>
      </>
    );
  }
  function renderOutNet(cvm) {
    return (
      <>
        <Button
          type="primary"
          style={{ backgroundColor: "#0c1a48" ,border:'1px solid #0c1a48'}}
          className="duck-button"
          htmlType="button"
          onClick={() => {
            console.log(cvm);
          }}
        >
          Normal
        </Button>
      </>
    );
  }
  //   资源⽂件列表 render
  function renderdocList(cvm) {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            // console.log(111, cvm);
            // props.setting("doc-upload", cvm);
            console.log(props);
            setShowJson(true);
          }}
        >
          {intl.get("MANAGE_PACKAGE_BTN_CLICK_CHECK")} {/* 点击查看 */}
        </Button>
      </>
    );
  }
   
  useEffect(() => {
   // eslint-disable-line react-hooks/exhaustive-deps
    let offHeight = coculateDomsHeight(
      [
        "tea-nav",
        "tea-layout__content-header",
        "tea-tabs__tabbar",
        "tea-pagination",
        "tea-table__header",
      ],
      +80
    );
    // eslint-disable-line react-hooks/exhaustive-deps
    setTabHeight(offHeight); 
  },[]);
  //   操作 render
  function renderOperationColumn(cvm) {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            console.log(111, cvm);
            setShowAlert(true);
          }}
        >
          {intl.get("MANAGE_PACKAGE_BTN_COPY_SOURCE")} {/* 复制资源 */}
        </Button>
        <Button
          type="link"
          onClick={() => {
            console.log("json", cvm);
            setShowJson(true);
          }}
        >
          {intl.get("MANAGE_PACKAGE_BTN_CHECK_JSON")} {/* 查看json */}
        </Button>
        <Button
          type="link"
          onClick={() => {
            console.log(cvm);
            setShowDownload(true);
          }}
        >
          {intl.get("MANAGE_PACKAGE_BTN_DOWNLOAD_FILE")} {/* 下载⽂件 */}
        </Button>
      </>
    );
  }
  return (
    <>
      <AlertComponent
        show={showAlert}
        showMark={true}
        text={intl.get("MANAGE_PACKAGE_COPY_ALERT")}
        close={handleAlertCloseFn}
        className="alert-notice"
      ></AlertComponent>
      <JsonReview
        title={intl.get("MANAGE_PACKAGE_BTN_CHECK_JSON")}
        show={showJson}
        close={() => {
          setShowJson(false);
        }}
      ></JsonReview>
      <ResourceModal
        onClose={handleDeleClose}
        caption={intl.get("MANAGE_PACKAGE_BTN_DOWNLOAD_FILE")} //下载⽂件
        size="l"
        className="del-list-modal"
        visible={showDownload}
      >
        <Table
          records={downloadListInfo}
          recordKey="id"
          columns={downloadColumns}
          bordered="true"
          disableTextOverflow="false"
          addons={[
            scrollable({
              maxHeight: 500,
              // minWidth: 1600,
              onScrollBottom: () => console.log("到达底部"),
            }),
          ]}
        />
      </ResourceModal>
      <Table
        // 如果要在前端排序，可以用 sortable.comparer 生成默认的排序方法
        records={listInfo}
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
        disableTextOverflow="false"
      />
    </>
  );
}
