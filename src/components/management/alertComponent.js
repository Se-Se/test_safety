import React, { useEffect } from "react";
import { Alert, FadeTransition } from "tea-component";
import intl from 'react-intl-universal';

export default function AlertComponent(props) {
  useEffect(() => {
    if (props.show) {
    }
  }, [props.show]);

  function handleEntered() {
    if (props.notAutoClose) {
      return;
    }
    props.close();
  }
  return (
    <>
      {props.showMark && props.show ? <div id="mark"></div> : null}
      <FadeTransition
        onEntered={handleEntered}
        timeout={{
          appear: 500,
          enter: 2000,
          exit: 100,
        }}
        in={props.show}
      >
        <>
          <Alert type={props.type} className={props.className}>
            {props.text || intl.get('MANAGE_ALERT_NOTICE')}
            {props.children}
          </Alert>
        </>
      </FadeTransition>
    </>
  );
}
