import React from "react";
import { Modal } from "tea-component";
import ReactJson from "react-json-view";
import { jsonData } from "@/pages/management/mock.js";

const options = {
  displayDataTypes: false,
  displayObjectSize: false,
  enableClipboard:false,
  theme:"monokai"
};
export default function JsonReview(props) {
    const data = JSON.parse(JSON.stringify(jsonData))
  function close() {
    props.close();
  }
  return (
    <>
      <Modal
        visible={props.show}
        className="code-modal"
        onClose={close}
        caption={props.title}
      >
        <Modal.Body >
          <hr />
          <div className="json-review-content">
          <ReactJson src={data} {...options} style={{ fontFamily: "none"}} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
