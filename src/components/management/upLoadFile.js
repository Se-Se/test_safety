import React, { useState } from "react";
import { Upload, Button } from "tea-component";
import intl from 'react-intl-universal';

export default function UpLoadFile() {
  // eslint-disable-next-line
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(null);


  function handleStart() {
    setUploading(true);
  }

  function handleSuccess(result, { file }) {
    setFileList((fileList) => [
      ...fileList,
      { name: file.name, status: "success" },
    ]);
    setUploading(false);
    console.log(result);
  }

  function handleError(error, { file }) {
    setFileList((fileList) => [
      ...fileList,
      { name: file.name, status: "danger" },
    ]);
    setUploading(false);
    console.error(error);
  }

  return (
    <>
      <Upload
        action="https://run.mocky.io/v3/68ed7204-0487-4135-857d-0e4366b2cfad"
        onStart={handleStart}
        onSuccess={handleSuccess}
        onError={handleError}
      >
        <Button type="primary" loading={uploading}>{intl.get('MANAGE_UPLOAD_FILE_BTN')} </Button>
      </Upload>
    </>
  );
}
