import React, { useState } from "react";
import { Card, Row, Col, RadioGroup, Radio, Input } from "tea-component";
import ButtonGroup from "./buttonGroup";
import intl from 'react-intl-universal';

const initData = {
  name: "产品名称",
  creater: "albert",
  platid: "0",
  version: "",
};
export default function SdkOrGameAddCom(props) {
  const [data, setData] = useState(initData);

  //   设置data 值
  function handleData(attr, val) {
    console.log(123, val);
    setData({ ...data, [attr]: val });
  }

  //  取消btn
  function handleCancel() {
    console.log("cancel");
  }
  //   确定 btn
  function handleSure() {
    props.save(data)
  }

  return (
    <>
      <Card>
        <Card.Body
          style={{
            minHeight: "600px",
            minWidth: "1200px",
            padding: "20px 40px",
          }}
        >
          <section>
            <Row
              verticalAlign="middle"
              gap="5"
              style={{ height: "80px", fontSize: "14px" }}
            >
              <Col span={4}>
                <div>{intl.get('MANAGE_SDK_PRODUCT_NAME')}</div>
              </Col>
              <Col span={8}>
                <div>{data.name}</div>
              </Col>
            </Row>
            <Row
              verticalAlign="middle"
              gap="5"
              style={{ height: "80px", fontSize: "14px" }}
            >
              <Col span={4}>
                <div>{intl.get('MANAGE_SDK_CREATOR')}</div>
              </Col>
              <Col span={8}>
                <div>{data.creater}</div>
              </Col>
            </Row>
            <Row
              verticalAlign="middle"
              gap="5"
              style={{ height: "80px", fontSize: "14px" }}
            >
              <Col span={4}>
                <div>{intl.get('MANAGE_SDK_PLATID')}</div>
              </Col>
              <Col span={16}>
                <RadioGroup
                  value={data.platid}
                  onChange={(value) => handleData("platid", value)}
                >
                  <Radio name="0">{intl.get('MANAGE_SDK_PLATID_IOS')}</Radio>
                  <Radio name="1">{intl.get('MANAGE_SDK_PLATID_ANDROID')}</Radio>
                </RadioGroup>
              </Col>
            </Row>
            <Row
              verticalAlign="middle"
              gap="5"
              style={{ height: "80px", fontSize: "14px" }}
            >
              <Col span={4}>
                <div>{props.text}</div>
              </Col>
              <Col span={8}>
                <Input
                  placeholder={intl.get('MANAGE_SDK_ENTER_VERSION_NAME')}
                  value={data.version}
                  onChange={(value) => handleData("version", value)}
                  size="l"
                />
              </Col>
            </Row>
          </section>

          <section style={{ marginTop: "400px" }}>
            <hr />
            <ButtonGroup
              cancelClick={handleCancel}
              sureClick={handleSure}
            ></ButtonGroup>
          </section>
        </Card.Body>
      </Card>
    </>
  );
}
