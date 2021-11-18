import React from "react";
import SdkOrGameAddCom from "@/components/management/sdkOrGameAddCom";
import intl from 'react-intl-universal';

export default function AddGame() {

    function handleSave(data) {
        console.log(data)
    }
  return (
    <>
      <SdkOrGameAddCom text={intl.get('MANAGE_GAME_VERSION_NAME')} save={handleSave}  />
    </>
  );
}
