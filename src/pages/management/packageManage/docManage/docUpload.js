import React, { useState,useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Layout,
  Justify,
  SearchBox,
  Icon,
} from "tea-component";
import { fileList } from "@/pages/management/mock.js";
import { upfileList } from "@/utils/colums";
import { useHistory } from "react-router-dom";
import UpLoadFile from "@/components/management/upLoadFile";
import intl from 'react-intl-universal';
import { coculateDomsHeight } from "@/utils/index";

const { pageable, selectable,scrollable } = Table.addons;
const { Content } = Layout;

export default function DocUpload(props) {
  const history = useHistory();

  //   表格数据
  const [listInfo] = useState(fileList); // eslint-disable-line
  //   表格的 colums
  const [columns] = useState(upfileList(renderOperationColumn)); // eslint-disable-line

  // select 多选 key 数组
  const [selectedKeys, setSelectedKeys] = useState([]);

  const [tabHeight, setTabHeight] = useState("50px");

  //   点击回退 btn
  function handleOnBack() {
    history.push({
      pathname: "/resource/package-main",
    });
  }
  // 点击搜索 btn
  function handleSearch(v) {
    console.log(v);
  }
  //   点击删除 btn
  function handleDelete(v) {
    console.log("delete", v);
  }
  //   点击下载 btn
  function handleDownLoad(v) {
    console.log("download", v);
  }

  //   表格 setting（操作）btn 渲染
  function renderOperationColumn(cvm) {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            handleDownLoad(cvm);
          }}
        >
       {intl.get('MANAGE_PACKAGE_DOWNLOAD')}   {/* 下载 */}
        </Button>
        <Button
          type="link"
          onClick={() => {
            handleDelete(cvm);
          }}
        >
       {intl.get('MANAGE_PACKAGE_DELETE')}   {/* 删除 */}
        </Button>
      </>
    );
  }
  //   Content.Header 右侧 btn
  function operationReturn() {
    let result = (
      <>
        <UpLoadFile></UpLoadFile>
      </>
    );

    return result;
  }
  let subtitle = (
    <>
      <Justify
        left={
          <>
            <SearchBox placeholder={intl.get('MANAGE_PLACEHOLDER_SERACH')} size="m" onSearch={handleSearch} />
          </>
        }
      ></Justify>
    </>
  );
  useEffect(() => {// eslint-disable-line react-hooks/exhaustive-deps
    let offHeight = coculateDomsHeight(
      [
        "tea-nav",
        "tea-layout__content-header",
        "tea-tabs__tabbar",
        "doc-up-title",
        "tea-table__header",
        "tea-pagination",
      ],
      +80
    );
    setTabHeight(offHeight);
  });
  return (
    <>
      <Card className="doc-up-title">
        <Card.Body>
          <Content.Header
            title={intl.get('MANAGE_PACKAGE_UPLOAD_FILE')}
            showBackButton="true"
            onBackButtonClick={handleOnBack}
            subtitle={subtitle}
            operation={operationReturn()}
          ></Content.Header>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Table
            // 如果要在前端排序，可以用 sortable.comparer 生成默认的排序方法
            records={listInfo}
            recordKey="no"
            columns={columns}
            addons={[
              pageable(),
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
