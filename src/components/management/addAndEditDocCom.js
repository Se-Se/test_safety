import React, { useEffect, useState } from "react";
import {
  Card,
  Layout,
  Row,
  Col,
  Input,
  Select,
  RadioGroup,
  Radio,
  Icon,
  Alert,
  TagSelect,
  DatePicker,
} from "tea-component";
import { useHistory } from "react-router-dom";

import ButtonGroup from "./buttonGroup";
import { tagsArr } from "@/pages/management/mock.js";
import moment from "moment";
import intl from "react-intl-universal";
import {coculateHeight} from "@/utils/index";

const { RangePicker } = DatePicker;
const { Content } = Layout;

// 初始 数据
const initData = {
  name: "产品名称",
  docName: "",
  creater: "albert",
  platid: "All",
  docDescribe: "",
  connectFile: "",
  remarker: "",
  keyName: [],
  connectKey: "",
  durationType: "not",
  durationTime: "",
};
export default function AddAndEditDocCom(props) {
  const history = useHistory();

  const [dataInfo, setDataInfo] = useState(initData);
  const [keyAlert, setKeyAlert] = useState(false); // eslint-disable-next-line
  const [initKeyGroups, setInitKeyGroups] = useState(tagsArr); // eslint-disable-next-line
  const [keyGroups, setKeyGroups] = useState(initKeyGroups); // eslint-disable-next-line
  const [keyName, setKeyName] = useState([]);
  const [noPermission, setNoPermission] = useState(false);
  const [keyUsed, setKeyUsed] = useState(false);

  //   点击回退 btn
  function handleOnBack() {
    history.push({
      pathname: "/resource/package-main",
    });
  }

  //  更新 dataInfo 的fn
  function handleData(attr, val) {
    console.log(123, val);
    if (attr === "connectKey") {
      setKeyAlert(true);
    }
    setDataInfo((pre) => {
      return { ...pre, [attr]: val };
    });
  }

  //  更新 connectKey 的fn
  function handleValidateData(attr, val) {
    console.log(123, val);
    if (val === "aa") {
      setKeyAlert(true);
      setNoPermission(true);
    } else {
      setNoPermission(false);
    }
    if (val === "ss") {
      setKeyAlert(true);
      setKeyUsed(true);
    } else {
      setKeyUsed(false);
    }
    if (val !== "ss" && val !== "aa") {
      setKeyAlert(false);
    }

    setDataInfo((pre) => {
      return { ...pre, [attr]: val };
    });
  }

  // 取消 btn
  function handleCancel() {
    handleOnBack();
  }
  // 确定 btn
  function handleSure() {
    props.save(dataInfo);
    console.log("handleSure");
  }

  //   点击 icon 关闭 btn
  function handleCloseAlert() {
    console.log("icon");
    setKeyAlert(false);
    setNoPermission(false);
    setKeyUsed(false);
  }

  // 关联开关名称 选择 fn
  function handleKeySelect(val) {
    console.log(val);
    let len = val.length;
    if (len) {
      setKeyName((pre) => {
        pre = [];
        let item = val[len - 1];
        return [item];
      });
    } else {
      setKeyName((pre) => {
        pre = [];
        return [];
      });
    }
  }

  // ⼿动配置开关有效期设置 回调fn
  function handleDuration(value) {
    console.log(value);
    let tim_1 = value[0].format().split("+")[0].replace("T", " ");
    let tim_2 = value[1].format().split("+")[0].replace("T", " ");
    console.log(tim_1, tim_2);
    setDataInfo((pre) => {
      return { ...pre, durationTime: tim_1 + "~" + tim_2 };
    });
  }
  // 关联开关名称 改变时 更新 dataInfo.keyName 的值
  useEffect(() => {
    setDataInfo((pre) => {
      return { ...pre, keyName: [...keyName] };
    });
  }, [keyName]);

  // 更新配置回收⽅式 切换时 清空 durationTime
  useEffect(() => {
    if (dataInfo.durationType !== "manual") {
      setDataInfo((pre) => {
        return { ...pre, durationTime: "" };
      });
    }
  }, [dataInfo.durationType]);

  // 刷新计算 滚动容器高度
  useEffect(() => {
    coculateHeight('r-doc-com',['tea-nav','tea-layout__content-header','tea-tabs__tabbar','doc-up-title'],20);
  });

  return (
    <>
      <Card className="doc-up-title">
        <Card.Body>
          <Content.Header
            title={props.title}
            showBackButton="true"
            onBackButtonClick={handleOnBack}
          ></Content.Header>
        </Card.Body>
      </Card>

      <div className="r-doc-com">
        <Card className="r-pack-header">
          <Card.Body
            style={{
              minHeight: "600px",
              minWidth: "800px",
              padding: "20px 40px",
            }}
          >
            <section>
              {/* ==============================产品名称 ======================================*/}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_1")} </div>
                </Col>
                <Col span={8}>
                  <div>{dataInfo.name}</div>
                </Col>
              </Row>
              {/* ==============================创建⼈ ======================================*/}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_2")} </div>
                </Col>
                <Col span={8}>
                  <div>{dataInfo.creater}</div>
                </Col>
              </Row>
              {/* ==============================平台 ======================================*/}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_3")} </div>
                </Col>
                <Col span={16}>
                  <RadioGroup
                    value={dataInfo.platid}
                    onChange={(value) => handleData("platid", value)}
                  >
                    <Radio name="0">{intl.get("MANAGE_DOC_COM_T_4")} </Radio>
                    <Radio name="1">{intl.get("MANAGE_DOC_COM_T_5")} </Radio>
                    <Radio name="All">{intl.get("MANAGE_DOC_COM_T_6")} </Radio>
                  </RadioGroup>
                </Col>
              </Row>
              {/* ==============================更新⽂件夹名称 ======================================*/}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_7")} </div>
                </Col>
                <Col span={8}>
                  <Input
                    placeholder={intl.get("MANAGE_DOC_COM_T_22")}
                    value={dataInfo.docName}
                    onChange={(value) => handleData("docName", value)}
                    size="l"
                  />
                </Col>
              </Row>
              {/* ==============================更新⽂件夹描述 ======================================*/}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_8")} </div>
                </Col>
                <Col span={8}>
                  <Input
                    placeholder={intl.get("MANAGE_DOC_COM_T_23")}
                    value={dataInfo.docDescribe}
                    onChange={(value) => handleData("docDescribe", value)}
                    size="l"
                  />
                </Col>
              </Row>
              {/* =============================关联⽂件排序============================= */}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_9")} </div>
                </Col>
                <Col span={8}>
                  <Input
                    placeholder={intl.get("MANAGE_DOC_COM_T_24")}
                    value={dataInfo.connectFile}
                    onChange={(value) => handleData("connectFile", value)}
                    size="l"
                  />
                </Col>
              </Row>
              {/* ========================================================================================== */}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_10")} </div>
                </Col>
                <Col span={8}>{intl.get("MANAGE_DOC_COM_T_11")} </Col>
              </Row>
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_12")} </div>
                </Col>
                <Col span={12}>
                  {/* <Input
                  placeholder="原有更新⽂件夹描述"
                  value={dataInfo.connectSwitch}
                  onChange={(value) => handleData("connectSwitch", value)}
                  size="l"
                /> */}
                  <div className="r-key-select" style={{ width: "420px" }}>
                    <TagSelect
                      className="r-detail-tags"
                      options={keyGroups}
                      value={keyName}
                      onChange={handleKeySelect}
                      placeholder={intl.get("MANAGE_DOC_COM_T_25")}
                    />
                    <Icon
                      type="arrowdown"
                      size="s"
                      className="r-tags-select-i"
                    />
                  </div>
                </Col>
              </Row>
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_13")} </div>
                </Col>
                <Col span={8}>
                  <Input
                    placeholder={intl.get("MANAGE_DOC_COM_T_26")}
                    value={dataInfo.connectKey}
                    onChange={(value) =>
                      handleValidateData("connectKey", value)
                    }
                    size="l"
                  />
                </Col>
              </Row>

              {keyAlert ? (
                <Row style={{ marginTop: "-30px" }}>
                  <Col span={4}></Col>
                  <Col span={8}>
                    <Alert type="error">
                      {keyUsed ? intl.get("MANAGE_DOC_COM_T_28") : null}
                      {noPermission ? intl.get("MANAGE_DOC_COM_T_29") : null}
                      <Icon
                        type="close"
                        onClick={handleCloseAlert}
                        style={{
                          margin: "0 10px 10px 0",
                          cursor: "pointer",
                          position: "absolute",
                          right: "0px",
                          top: "50%",
                          transform: "translate(0,-50%)",
                        }}
                      />
                    </Alert>
                  </Col>
                </Row>
              ) : null}

              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div>{intl.get("MANAGE_DOC_COM_T_14")} </div>
                  <div style={{ textIndent: "20px" }}>
                    {intl.get("MANAGE_DOC_COM_T_15")}{" "}
                  </div>
                </Col>
                <Col span={16}>
                  <RadioGroup
                    value={dataInfo.durationType}
                    onChange={(value) => handleData("durationType", value)}
                  >
                    <Radio name="manual">
                      {intl.get("MANAGE_DOC_COM_T_16")}{" "}
                    </Radio>
                    <Radio name="auto">
                      {intl.get("MANAGE_DOC_COM_T_17")}{" "}
                    </Radio>
                    <Radio name="not">{intl.get("MANAGE_DOC_COM_T_18")} </Radio>
                  </RadioGroup>
                </Col>
              </Row>
              {dataInfo.durationType === "manual" ? (
                <Row
                  verticalAlign="middle"
                  gap="5"
                  style={{ height: "80px", fontSize: "14px" }}
                >
                  <Col span={4}>
                    <div>{intl.get("MANAGE_DOC_COM_T_19")} </div>
                  </Col>
                  <Col span={16}>
                    <RangePicker
                      defaultValue={[
                        moment("2020-10-01"),
                        moment("2020-11-11"),
                      ]}
                      showTime
                      onChange={(value) => handleDuration(value)}
                    />
                  </Col>
                </Row>
              ) : null}

              {/* ========================================================================================== */}
              <Row
                verticalAlign="middle"
                gap="5"
                style={{ height: "80px", fontSize: "14px" }}
              >
                <Col span={4}>
                  <div style={{ position: "relative" }}>
                    {intl.get("MANAGE_DOC_COM_T_20")}
                    {/* <Bubble content={`备份⼈`}> */}
                    {props.showRemarkAlert ? (
                      <Icon
                        type="infoblue"
                        size="default"
                        style={{
                          position: "absolute",
                          left: "50px",
                          top: "2px",
                          cursor: "pointer",
                        }}
                      />
                    ) : null}
                    {/* </Bubble> */}
                  </div>
                </Col>
                <Col span={8}>
                  <Select
                    type="simulate"
                    appearance="button"
                    size="l"
                    placeholder={intl.get("MANAGE_DOC_COM_T_27")}
                    options={props.remarkers}
                    value={dataInfo.remarker}
                    onChange={(value) => handleData("remarker", value)}
                  />
                </Col>
              </Row>
              {props.showRemarkAlert ? (
                <Row style={{ marginTop: "-30px" }}>
                  <Col span={4}></Col>
                  <Col span={4} style={{ width: "420px" }}>
                    <Alert>{intl.get("MANAGE_DOC_COM_T_21")}</Alert>
                  </Col>
                </Row>
              ) : null}
            </section>
          </Card.Body>
          <Card.Footer style={{ marginBottom: "10px", padding: "20px" }}>
            <ButtonGroup
              cancelClick={handleCancel}
              sureClick={handleSure}
            ></ButtonGroup>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
