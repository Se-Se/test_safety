import React, { useState } from "react";
import { SDKList } from "@/pages/management/mock.js";
import { SDKColumns } from "@/utils/colums";
import SdkOrGameMain from "@/components/management/sdkOrGameMain";
import intl from 'react-intl-universal';

export default function GameMain() {
  const [list] = useState(SDKList);
  const [showAlert, setShowAlert] = useState(false);

  // 确定删除 回调
  function handleDelete(data) {
    console.log(data);
  }

  // 关闭 alert 回调
  function handleAlert(data) {
    setShowAlert(data)
  }
  
  return (
    <>
      <SdkOrGameMain
        deleteEvent={handleDelete}
        deleText={intl.get('MANAGE_SDK_DELE_TEXT')}
        placeHolder={intl.get('MANAGE_SDK_PLACEHOLDER_VERSION_NAME')}
        alertText={intl.get('MANAGE_SDK_DELE_ALERT')}
        theColumns={SDKColumns}
        list={list}
        showAlert={showAlert}
        handleAlert={handleAlert}
        nameAttr="SDKName"
      />
    </>
  );
}
