import React from "react";
import { remarkers } from "@/pages/management/mock.js";
import AddAndEditDocCom from "@/components/management/addAndEditDocCom";
import intl from 'react-intl-universal';


export default function DocEdit() {

  function handleSave(data) {
    console.log(data)
  }
  return (
    <>
      <AddAndEditDocCom save={handleSave} title={intl.get('MANAGE_PACKAGE_EDIT_TITLE')} showRemarkAlert={false} remarkers={remarkers}/>
    </>
  );
}
