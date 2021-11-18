import React, { useState } from "react";
import { gameList } from "@/pages/management/mock.js";
import { GameColumns } from "@/utils/colums";
import SdkOrGameMain from "@/components/management/sdkOrGameMain";
import intl from 'react-intl-universal';

export default function GameMain() {
  const [list] = useState(gameList);
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
        deleText={intl.get('MANAGE_GAME_DELE_TEXT')}
        placeHolder={intl.get('MANAGE_GAME_PLACEHOLDER')}
        alertText={intl.get('MANAGE_GAME_ALERT')}
        theColumns={GameColumns}
        list={list}
        showAlert={showAlert}
        handleAlert={handleAlert}
        nameAttr="gameName"
      />
    </>
  );
}
