import React from "react";
import SdkOrGameAddCom from "@/components/management/sdkOrGameAddCom";
import intl from 'react-intl-universal';

export default function AddSDK() {

    function handleSave(data) {
        console.log(data)
    }
  return (
    <>
      <SdkOrGameAddCom text={intl.get('MANAGE_SDK_VERSION_NAME')} save={handleSave}  />
    </>
  );
}
