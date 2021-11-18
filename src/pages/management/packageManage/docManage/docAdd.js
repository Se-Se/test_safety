import React from "react";
import { remarkers } from "@/pages/management/mock.js";
import AddAndEditDocCom from "@/components/management/addAndEditDocCom";
import intl from 'react-intl-universal';


export default function DocAdd() {

  function handleSave(data) {
    console.log(data)
  }
  return (
    <>
      <AddAndEditDocCom save={handleSave} title={intl.get('MANAGE_PACKAGE_ADD_DOC')} showRemarkAlert={true} remarkers={remarkers}/>
    </>
  );
}
