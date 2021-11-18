import React, { useState } from "react";
import {
  Button,
  Card,
  Layout,
  Stepper,
  Row,
  Col,
  Input,
  Select,
} from "tea-component";
import { useHistory } from "react-router-dom";
import { languages } from "@/pages/management/mock.js";
import intl from 'react-intl-universal';

const { Content } = Layout;
const initPackInfo = {
  name: "",
  language: "",
};
export default function DocPack(props) {
  const history = useHistory();
  const steps = [
    { id: "connectBtn", label: intl.get('MANAGE_PACKAGE_STEP_1') },
    { id: "international", label: intl.get('MANAGE_PACKAGE_STEP_2') },
    { id: "confirmInfo", label: intl.get('MANAGE_PACKAGE_STEP_3') },
  ];

  const [current, setCurrent] = useState("connectBtn");
  const currentIndex = current ? steps.findIndex((x) => x.id === current) : -1;
  const next = current && steps[currentIndex + 1];
  const prev = current ? steps[currentIndex - 1] : steps[steps.length - 1];

  const [packInfo, setPackInfo] = useState(initPackInfo);
  
  //   点击回退 btn
  function handleOnBack() {
    history.push({
      pathname: "/resource/package-main",
    });
  }

  //  更新 packInfo 的fn
  function handleData(attr, val) {
    console.log(123, val);
    setPackInfo({ ...packInfo, [attr]: val });
  }

  function sepContentFn() {
    let dom = null;
    if (current === "international") {
      dom = (
        <section>
          <Row>
            <Col span={4}>
              <div>{intl.get('MANAGE_PACKAGE_UNIVERSAL_NAME')}</div> {/*国际化活动名称*/}
            </Col>
            <Col span={8}>
              <div>
                <Input
                  placeholder={intl.get('MANAGE_PACKAGE_PLACEHOLDER_CREATE_NAME')} //创建名称
                  value={packInfo.name}
                  onChange={(value) => handleData("name", value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <div>{intl.get('MANAGE_PACKAGE_USE_LANGUAGE')}</div> {/*使⽤语⾔*/}
            </Col>
            <Col span={8}>
              <Select
                type="simulate"
                appearance="button"
                size="m"
                options={languages}
                value={packInfo.language}
                onChange={(value) => handleData("language", value)}
              />
            </Col>
          </Row>
        </section>
      );
    }
    if (current === "confirmInfo") {
      dom = (
        <section>
          <Row>
            <Col span={8}>
              <div>{intl.get('MANAGE_PACKAGE_UPDATE_FILENAME')}</div> {/*更新⽂件名称*/}
            </Col>
            <Col span={8}>
              <div>{packInfo.name}</div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div>{intl.get('MANAGE_PACKAGE_CONNECT_KEY')}</div> {/*更新⽂件名称*/}
            </Col>
            <Col span={8}>
              <div>{packInfo.name}</div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div>{intl.get('MANAGE_PACKAGE_UNIVERSAL_NAME')}</div> {/*国际化活动名称*/}
            </Col>
            <Col span={8}>
              <div>{packInfo.name}</div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
            <div>{intl.get('MANAGE_PACKAGE_USE_LANGUAGE')}</div> {/*使⽤语⾔*/}
            </Col>
            <Col span={8}>
              <div>{packInfo.language}</div>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <div>{intl.get('MANAGE_PACKAGE_RECIVE_METHOD')}</div> {/*更新配置回收⽅式*/}
            </Col>
            <Col span={8}>
              <div>
                ⼿动配置开关有效期（2018-12-01 09:00:00 ⾄ 2018-12-01 09:00:00）
              </div>
            </Col>
          </Row>
        </section>
      );
    }
    return dom;
  }

  return (
    <>
      <Card className="doc-up-title">
        <Card.Body>
          <Content.Header
            title="打包⽂件"
            showBackButton="true"
            onBackButtonClick={handleOnBack}
          ></Content.Header>
        </Card.Body>
      </Card>

      <Card className="r-pack-header">
        <Card.Header style={{ marginTop: "30px" }}>
          <Stepper steps={steps} current={current} />
        </Card.Header>
        <Card.Body style={{ height: "500px" }}>{sepContentFn()}</Card.Body>

        <Card.Footer style={{ marginBottom: "10px", padding: "20px" }}>
          <section>
            <Row>
              <Col span={8}>
                <div>
                  {prev ? (
                    <Button
                      disabled={!prev}
                      onClick={() => setCurrent(prev.id)}
                    >
                     {intl.get('MANAGE_PACKAGE_PRE_STEP')} {/*上一步*/}
                    </Button>
                  ) : null}

                  <Button
                    type="primary"
                    disabled={!next && !current}
                    onClick={() => setCurrent(next ? next.id : null)}
                    style={{ marginLeft: 10 }}
                  >
                    {next ? intl.get('MANAGE_PACKAGE_NEXT_STEP'): intl.get('MANAGE_PACKAGE_SURE_BTN')}
                  </Button>
                </div>
              </Col>
            </Row>
          </section>
        </Card.Footer>
      </Card>
    </>
  );
}
