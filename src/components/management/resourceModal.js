import React, { useEffect, useState } from "react";
import { Modal, Button } from "tea-component";
import intl from 'react-intl-universal';

const btnStyleDefault = {
  width: "100px",
  height: "40px",
  marginRight: "20px",
};
export default function RsourceModal(props) {
  const [visible, setVisible] = useState(false);

  const close = () => {
    props.onClose();
  };
  const cancel = () => {
    props.onCancel();
  };

  const sure = () => {
    props.onSure();
  };

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  return (
    <>
      <Modal
        disableEscape
        visible={visible}
        caption={props.caption}
        onClose={close}
        size={props.size}
        className={props.className}
        disableCloseIcon={props.disableCloseIcon}
        // style={props.style}
      >
        <Modal.Body>{props.children}</Modal.Body>
        {props.showFooter ? (
          <Modal.Footer>
            <Button
              style={props.btnStyle || { ...btnStyleDefault }}
              type="primary"
              onClick={sure}
            >
              {intl.get('MANAGE_RESOURCE_SAVE')} 
            </Button>
            <Button
              style={props.btnStyle || { ...btnStyleDefault, color: "#000" }}
              type="weak"
              onClick={cancel}
            >
              {intl.get('MANAGE_RESOURCE_CANCEL')} 
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
}
