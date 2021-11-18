import React, { useEffect, useState } from "react";
import { Table, Button, Card } from "tea-component";
import { packageList } from "@/pages/management/mock.js";
import { packageColums } from "@/utils/colums";
import RsourceModal from "@/components/management/resourceModal";
import intl from "react-intl-universal";
import { coculateDomsHeight } from "@/utils/index";

const { pageable, scrollable } = Table.addons;

export default function DocList(props) {
  const [listInfo] = useState(packageList);
  const [columns] = useState(packageColums(renderOperationColumn, intl));
  const [deletePackageModal, setDeletePackageModal] = useState(false);
  const [thePack, setThePack] = useState(null);
  const [tabHeight, setTabHeight] = useState("50px");

  function handleDeletePackage() {
    console.log(333, thePack);
    setDeletePackageModal(false);
  }

  function renderOperationColumn(cvm) {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            console.log(111, cvm);
            props.setting("doc-upload", cvm);
            console.log(props);
          }}
        >
          {intl.get("MANAGE_PACKAGE_UPLOAD")} {/* 上传 */}
        </Button>
        <Button
          type="link"
          onClick={() => {
            props.setting("doc-pack", cvm);
          }}
        >
          {intl.get("MANAGE_PACKAGE_PACK")} {/* 打包 */}
        </Button>
        <Button
          type="link"
          onClick={() => {
            props.setting("doc-edit", cvm);
          }}
        >
          {intl.get("MANAGE_PACKAGE_EDIT")} {/* 编辑 */}
        </Button>
        <Button
          type="link"
          onClick={() => {
            setThePack(cvm);
            setDeletePackageModal(true);
          }}
        >
          {intl.get("MANAGE_PACKAGE_DELETE")} {/* 删除 */}
        </Button>
      </>
    );
  }

  useEffect(() => {// eslint-disable-line react-hooks/exhaustive-deps
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
    setTabHeight(offHeight);
  }); 
  return (
    <>
      {/*查看已有的更新⽂件包列表  modal 弹出层  */}
      <RsourceModal
        visible={deletePackageModal}
        size="m"
        showFooter={true}
        onCancel={() => {
          setDeletePackageModal(false);
        }}
        onSure={() => {
          handleDeletePackage();
        }}
        onClose={() => {
          setDeletePackageModal(false);
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
          {intl.get("MANAGE_PACKAGE_MODAL_DELETE")} {/* 确定 删除⽂件夹？ */}
        </div>
      </RsourceModal>

      {/*查看已有的更新⽂件包列表  modal 弹出层 ^^^^*/}
      <Card>
        <Card.Body>
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
            disableTextOverflow="true"
          />
        </Card.Body>
      </Card>
    </>
  );
}
