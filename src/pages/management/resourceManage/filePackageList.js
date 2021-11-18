import React, { useEffect, useState } from "react";
import { Table, Button, Checkbox } from "tea-component";
import { docList } from "@/pages/management/mock.js";
import intl from 'react-intl-universal';

const { scrollable } = Table.addons;

export default function FilePackageList(props) {
  const [initList, setInitList] = useState(docList);
  const [filterList, setFilterList] = useState([]);

  //   数据改变 更新initList
  useEffect(() => {
    function formatter() {
      initList.map(item => {
        if (item.setPublic) {
          item.publicCheck = ["public"];
        } else {
          item.publicCheck = [];
        }
        return item
      });

      setInitList([...initList]);
    }
    formatter();
  }, [docList]);// eslint-disable-line react-hooks/exhaustive-deps

  //  根据 创建人搜索筛选
  useEffect(() => {
    if (props.searchName || props.words) {
      filterListFn("creater", props.searchName,'name',props.words);
    } else {
      console.log(3333);
      setFilterList([...initList]);
    }
  }, [props.searchName,props.words]);// eslint-disable-line react-hooks/exhaustive-deps

  //   筛选fn
  function filterListFn(attr_1, data_1,attr_2,data_2) {
      console.log(321)
    let res = initList.filter((item) => {
        if(data_1&&data_2){
            return item[attr_1].indexOf(data_1) >= 0 && item[attr_2].indexOf(data_2)>=0;
        }else{
            if(data_1){
                return item[attr_1].indexOf(data_1) >= 0 
            }
            if(data_2){
                return item[attr_2].indexOf(data_2)>=0;
            }
        }
      return item;
    });
    setFilterList([...res]);
  }

  //   筛选后list
  useEffect(() => {
    setFilterList([...initList]);
  }, [initList]);

  return (
    <Table
      records={filterList}
      recordKey="no"
      columns={[
        { key: "no", header: intl.get('MANAGE_RESOURCE_COLUMNS_NO'), width: 80 },
        { key: "name", header: intl.get('MANAGE_RESOURCE_COLUMNS_NAME'), width: "auto" },
        { key: "fileDis", header: intl.get('MANAGE_RESOURCE_COLUMNS_FILE_DIS'), width: "auto" },
        { key: "remark", header:intl.get('MANAGE_RESOURCE_COLUMNS_NOTICE'), width: "auto" },
        { key: "version", header: intl.get('MANAGE_RESOURCE_COLUMNS_VERSION'), width: "auto" },
        { key: "creater", header: intl.get('MANAGE_RESOURCE_COLUMNS_CREATER'), width: "auto" },
        { key: "connect", header: intl.get('MANAGE_RESOURCE_COLUMNS_CONNECT'), width: "auto" },
        { key: "editTime", header: intl.get('MANAGE_RESOURCE_COLUMNS_EDIT_TIME'), width: 150 },
        {
          key: "setPublic",
          header: intl.get('MANAGE_RESOURCE_COLUMNS_SET_PUBLIC'),
          width: "auto",
          render: (cvm) => {
            return renderSetPublicColumn(cvm);
          },
        },
        {
          key: "setting",
          header: intl.get('MANAGE_RESOURCE_COLUMNS_SETTING'),
          width: "auto",
          render: (cvm) => {
            return renderOperationColumn(cvm);
          },
        },
      ]}
      addons={[
        // 支持表格滚动，高度超过 192 开始显示滚动条
        scrollable({
          maxHeight: 300,
          //   minWidth: 1600,
          onScrollBottom: () => console.log("到达底部"),
        }),
      ]}
    />
  );
  function renderOperationColumn(cvm) {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            console.log(111, cvm);
          }}
        >
          {intl.get('MANAGE_PACKAGE_DELETE')}
        </Button>
      </>
    );
  }
  function renderSetPublicColumn(cvm) {
    return (
      <>
        <Checkbox.Group
          value={cvm.publicCheck}
          onChange={(value) => {
            initList.map((item) => {
              if (item.no === cvm.no) {
                item.publicCheck = value;
              }
              return item
            });
            return setInitList([...initList]);
          }}
        >
          <Checkbox name="public"></Checkbox>
        </Checkbox.Group>
      </>
    );
  }
}
