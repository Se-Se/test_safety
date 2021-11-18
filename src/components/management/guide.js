import React, { useState } from "react";
import { Guide, Button, Icon } from "tea-component";

const GuideCom = React.forwardRef((props, ref) => {
  // const [current, setCurrent] = useState(-1);
  const desDom = (
    <>
      <Icon
        type="infoblue"
        size="m"
        style={{ margin: "0 10px 10px 0", cursor: "pointer" }}
      />
      Step1：点击“游戏版本管理”
    </>
  );
  return (
    <>
      <Guide
        current={props.current}
        onCurrentChange={(val) => props.handleCurrent(val)}
        steps={[
          {
            element: () => document.querySelector(".the-select"),
            arrowPointAtCenter: false,
            bubbleStyle: {
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            },
            description: desDom,
          },
        ]}
      />
    </>
  );
});
export default GuideCom;
