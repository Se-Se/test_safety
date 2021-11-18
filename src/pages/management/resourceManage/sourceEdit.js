import React, { useEffect, useState } from "react";
import { tagsArr, testArr, gradArr } from "@/pages/management/mock.js";
import {
  Form,
  Input,
  RadioGroup,
  Radio,
  Select,
  Card,
  Icon,
  Bubble,
  Tag,
  Button,
  Row,
  Col,
  SearchBox,
  TagSelect,
} from "tea-component";
import { useHistory } from "react-router-dom";
import RsourceModal from "@/components/management/resourceModal";
import FilePackageList from "./filePackageList";
import ButtonGroup from "@/components/management/buttonGroup";
import intl from "react-intl-universal";
import SdkOrGameAddCom from "@/components/management/sdkOrGameAddCom";
import { useDispatch } from "react-redux";

import { coculateHeight } from "@/utils/index";

const { TextArea } = Input;

export default function SourceEdit(props) {
  const areaidArr = [
    { value: "All", text: intl.get("MANAGE_RESOURCE_AREA_ID_ALL") },
    { value: "manual", text: intl.get("MANAGE_RESOURCE_AREA_ID_MANUAL") },
  ];
  const openIdArr = [
    { value: "one", text: intl.get("MANAGE_RESOURCE_OPEN_ID_ONE") },
    { value: "some", text: intl.get("MANAGE_RESOURCE_OPEN_ID_SOME") },
    { value: "All", text: intl.get("MANAGE_RESOURCE_OPEN_ID_ALL") },
  ];
  const logGradeArr = [
    { value: "0", text: "0-DEBUG" },
    { value: "1", text: "1-INFO" },
    { value: "2", text: "2-WARNING" },
    { value: "3", text: "3-ERROR" },
    { value: "4", text: "4-FATAL" },
  ];
  const initSourceData = {
    APPID: "albert_111",
    grade: "Z",
    acdtype: "All",
    platid: "All",
    areaid: "All",
    partitionid: "All",
    partitionid_level: null,
    openId: "All",
    openIdVal: "111",
    Lua: null,
    gameV: null,
    SDKV: null,
    allQuite: "All",
    debugModel: "release",
    payType: "diamond",
    area: "dev",
    IP: "",
    api: "",
    IP_1: "",
    IP_2: "",
    allQuiteSend: "send",
    logGrade: "0",
    loginStatus: "",
    LUA_V: "",
    ZIP: "",
    LUA_MD5: "",
    grayContract: "",
    contractText: "",
    remarks: "",
  };

  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [tagSelectVal] = useState([]); // eslint-disable-next-line
  const [initTagsGroup, setInitTagsGroup] = useState(tagsArr);
  const [tagGroups, setTagGroups] = useState(initTagsGroup);

  const [isUpPackage, setIsUpPackage] = useState(true);
  const [sourceData, setSourceData] = useState(initSourceData); //初始话 页面数据
  const [upPackageModal, setUpPackageModal] = useState(false);
  const [nameVal, setNameVal] = useState("");
  const [wordsVal, setWordsVal] = useState("");
  const [createrName, setCreaterName] = useState(null);
  const [theWords, setTheWords] = useState(null);

  const dispacth = useDispatch();

  const changePageType = (val) => ({ type: "SET_PAGE_TYPE", pageType: val });

  // 更改 pagetype 状态
  function handlePageType(val) {
    dispacth(changePageType(val));
  }

  // 使用 TagSelect试禁止输入fn
  function disableInput() {
    if (document.getElementsByClassName("r-detail-tags").length) {
      let input =
        document.getElementsByClassName("r-detail-tags")[0].childNodes[0]
          .childNodes[0].childNodes[0];
      // input.setAttribute("readOnly", true);       设置为true时 不可输入
      input.style.backgroundColor = "#ffff";
    }
  }

  useEffect(() => {
    disableInput();
  });

  //使用 TagSelect 回调
  function handleTagSelect(val) {             //之后查看
    let allValues = initTagsGroup.map((item) => {
      return item.value;
    });


// ----------可输入的 TagSelect  
    val.map((item) => {
      if (allValues.indexOf(item) >= 0) {
        let opt = initTagsGroup.filter((tag) => {
          return tag.value === item;
        });
        setTags((pre) => {
          return [...pre, ...opt];
        });
      }else{
        let obj={value:Date.now(),text:item};
        setTags((pre) => {
          return [...pre, obj];
        });
      }
      return item;
    });


// ----------不可输入的 TagSelect
    // val.map((item) => {
    //   if (allValues.indexOf(item) >= 0) {
    //     let opt = initTagsGroup.filter((tag) => {
    //       return tag.value === item;
    //     });
    //     setTags((pre) => {
    //       return [...pre, ...opt];
    //     });
    //   }
    //   return item;
    // });

  }

  // 使用 select 选择功能开关回调
  // eslint-disable-next-line
  function handleSelect(tag) {
    let obj = initTagsGroup.filter((item) => {
      return item.value === tag;
    })[0];
    setTags([...tags, obj]);
  }
  const handleUpdateList = (tap) => {
    if (tap === "upPackage") {
      console.log("upPackage");
      setIsUpPackage(true);
      setUpPackageModal(true);
    }
    if (tap === "updoc") {
      console.log("updoc");
      setIsUpPackage(false);
    }
  };

  // sourceData 改变回调
  function handleSourceData(attr, val) {
    console.log(123, val);
    if (attr === "partitionid" && val === "All") {
      setSourceData({ ...sourceData, [attr]: val, partitionid_level: null });
    } else {
      setSourceData({ ...sourceData, [attr]: val });
    }
  }

  function handleSave() {
    console.log("save", sourceData);
  }
  function handleCancel() {
    console.log("cancel");
    setSourceData({ ...initSourceData });
    history.push({
      pathname: `/resource/resource`,
    });
  }
  function handleModalSure(tag) {
    setUpPackageModal(false);
    console.log(tag);
  }
  function CloseModal(tag) {
    setUpPackageModal(false);
    handleClear();
  }

  // 点击 检索 按钮
  const handleSearch = () => {
    setCreaterName(nameVal);
    setTheWords(wordsVal);
  };
  // 点击 清空 按钮
  const handleClear = () => {
    setCreaterName("");
    setTheWords("");
    setNameVal("");
    setWordsVal("");
  };

  // 创建⼈ 搜索框
  const handleCreaterSearch = (v) => {
    setNameVal(v);
  };

  // 关键词 搜索框
  const handleWordsSearch = (v) => {
    setWordsVal(v);
  };

  // 快速添加 SDK/游戏版本
  const addFast = (val) => {
    props.changeCur(val);
    handlePageType(val);
  };

  // 快速添加SDK 回调
  const handleSdkSave = (data) => {
    console.log(data);
  };
  // 快速添加 游戏版本 回调
  const handleGameSave = (data) => {
    console.log(data);
  };

  // 功能开关 filter 选择的开关
  useEffect(() => {
    let newGroups = initTagsGroup.filter((item) => {
      return tags.indexOf(item) < 0;
    });

    setTagGroups(newGroups);
    setSourceData((pre) => {
      return { ...pre, tags: [...tags] };
    });
  }, [tags]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (sourceData.areaid === "All") {
      setSourceData((pre) => {
        return { ...pre, partitionid: "All" };
      });
    }
  }, [sourceData.areaid]);

  // 刷新计算 滚动容器高度
  useEffect(() => {
    if (props.current === "mainPage") {
      coculateHeight(
        "r-content-scroll",
        ["tea-nav", "tea-layout__content-header"],
        60
      );
    }
  }, [props.current]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/*查看已有的更新⽂件包列表  modal 弹出层  */}
      <RsourceModal
        visible={upPackageModal}
        showFooter={true}
        className={"r-modal"}
        caption={intl.get("MANAGE_RESOURCE_RESOURCE_MODAL_CAPTION")}
        onCancel={() => {
          CloseModal("upPackage");
        }}
        onSure={() => {
          handleModalSure("upPackage");
        }}
        onClose={() => {
          CloseModal("upPackage");
        }}
      >
        <section>
          <Row>
            <Col span={24}>
              <div>{intl.get("MANAGE_RESOURCE_POP_SEARCH")}</div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row verticalAlign="middle">
                <Col span={2}>
                  <div>{intl.get("MANAGE_RESOURCE_POP_KEY_WORD")}</div>
                </Col>
                <Col span={6}>
                  <SearchBox
                    size="full"
                    className="r-doc-search"
                    value={wordsVal}
                    onChange={handleWordsSearch}
                  />
                </Col>
                <Col span={2}>
                  <div>{intl.get("MANAGE_RESOURCE_POP_CREATER")}</div>
                </Col>
                <Col span={6}>
                  <SearchBox
                    size="full"
                    className="r-doc-search"
                    value={nameVal}
                    onChange={handleCreaterSearch}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col span={24}>
              {/* <Button
                type="primary"
                onClick={handleSearch}
                style={{ marginRight: "20px" }}
              >
                检索
              </Button>
              <Button onClick={handleClear} type="weak">
                清空
              </Button> */}
              <ButtonGroup
                primaryText={intl.get("MANAGE_RESOURCE_POP_RETRIEVE")}
                weakText={intl.get("MANAGE_RESOURCE_POP_CLEAR")}
                cancelClick={handleClear}
                sureClick={handleSearch}
              ></ButtonGroup>
            </Col>
          </Row>
          <Row className="r-doctable-title" verticalAlign="middle">
            <Col>{intl.get("MANAGE_RESOURCE_POP_CHECK_NOTICE")}</Col>
          </Row>
          <Row>
            <FilePackageList
              words={theWords}
              searchName={createrName}
            ></FilePackageList>
          </Row>
        </section>
      </RsourceModal>
      {/*查看已有的更新⽂件包列表  modal 弹出层 ^^^^*/}

      {props.current === "SDK-add" ? (
        <SdkOrGameAddCom
          text={intl.get("MANAGE_SDK_VERSION_NAME")}
          save={handleSdkSave}
        />
      ) : null}
      {props.current === "game-add" ? (
        <SdkOrGameAddCom
          text={intl.get("MANAGE_GAME_VERSION_NAME")}
          save={handleGameSave}
        />
      ) : null}
      {props.current === "mainPage" ? (
        <div className="r-content-scroll" style={{ display: "-none" }}>
          <Card>
            <Card.Body>
              <div className="example-stage">
                <Form.Title>
                  {intl.get("MANAGE_RESOURCE_POP_THE_SOURCE")}
                </Form.Title>
                <Form>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_POP_GAME_APPID")}>
                    <Input
                      placeholder={intl.get("MANAGE_RESOURCE_POP_GAME_APPID")}
                      value={initSourceData.APPID}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item
                    label={intl.get("MANAGE_RESOURCE_POP_GRADE")}
                    style={{ position: "relative" }}
                  >
                    <Bubble content={intl.get("MANAGE_RESOURCE_POP_GRADE")}>
                      <Icon
                        type="infoblue"
                        size="default"
                        style={{
                          position: "absolute",
                          left: "-64px",
                          cursor: "pointer",
                        }}
                      />
                    </Bubble>
                    <Select
                      type="simulate"
                      appearance="button"
                      size="m"
                      options={gradArr}
                      value={sourceData.grade}
                      onChange={(value) => handleSourceData("grade", value)}
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_POP_ACDTYPE")}>
                    <RadioGroup
                      value={sourceData.acdtype}
                      onChange={(value) => handleSourceData("acdtype", value)}
                    >
                      <Radio name="Guest">
                        {intl.get("MANAGE_RESOURCE_POP_ACDTYPE_GUEST")}
                      </Radio>
                      <Radio name="All">
                        {intl.get("MANAGE_RESOURCE_POP_ACDTYPE_ALL")}
                      </Radio>
                    </RadioGroup>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_POP_PLATID")}>
                    <RadioGroup
                      value={sourceData.platid}
                      onChange={(value) => handleSourceData("platid", value)}
                    >
                      <Radio name="0">
                        {intl.get("MANAGE_RESOURCE_POP_PLATID_0")}
                      </Radio>
                      <Radio name="1">
                        {intl.get("MANAGE_RESOURCE_POP_PLATID_1")}
                      </Radio>
                      <Radio name="All">
                        {intl.get("MANAGE_RESOURCE_POP_PLATID_ALL")}
                      </Radio>
                    </RadioGroup>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_POP_AREAID")}>
                    {" "}
                    {/*游戏大区*/}
                    <Select
                      type="simulate"
                      appearance="button"
                      size="m"
                      options={areaidArr}
                      value={sourceData.areaid}
                      onChange={(value) => handleSourceData("areaid", value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={intl.get("MANAGE_RESOURCE_POP_PARTITION_ID")} // 游戏小区  //之后查看
                    style={{ position: "relative" }}
                  >
                    <Select
                      className="r-partitionid-select"
                      type="simulate"
                      appearance="button"
                      size="m"
                      options={testArr}
                      value={sourceData.partitionid}
                      disabled={sourceData.areaid === "All"}
                      onChange={(value) =>
                        handleSourceData("partitionid", value)
                      }
                    />
                    <Select
                      type="simulate"
                      appearance="button"
                      disabled={sourceData.areaid === "All"}
                      options={testArr}
                      value={sourceData.partitionid_level}
                      // placeholder={null}
                      onChange={(value) =>
                        handleSourceData("partitionid_level", value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label={intl.get("MANAGE_RESOURCE_POP_ID")}
                    style={{ position: "relative" }}
                  >
                    <Bubble content={intl.get("MANAGE_RESOURCE_POP_ID")}>
                      <Icon
                        type="infoblue"
                        size="default"
                        style={{
                          position: "absolute",
                          left: "-86px",
                          cursor: "pointer",
                        }}
                      />
                    </Bubble>
                    <Select
                      type="simulate"
                      appearance="button"
                      size="m"
                      options={openIdArr}
                      value={sourceData.openId}
                      onChange={(value) => handleSourceData("openId", value)}
                      style={{ marginRight: "20px" }}
                    />
                    <Input
                      placeholder={intl.get(
                        "MANAGE_RESOURCE_OPEN_ID_PLACEHOLDER"
                      )}
                      value={sourceData.openIdVal}
                      onChange={(value) => handleSourceData("openIdVal", value)}
                      size="l"
                    />
                  </Form.Item>
                  <Form.Item
                    label={intl.get("MANAGE_RESOURCE_LUA_VERSION")}
                    style={{ position: "relative" }}
                  >
                    <Bubble content={intl.get("MANAGE_RESOURCE_LUA_VERSION")}>
                      <Icon
                        type="infoblue"
                        size="default"
                        style={{
                          position: "absolute",
                          left: "-86px",
                          cursor: "pointer",
                        }}
                      />
                    </Bubble>
                    <Select
                      type="simulate"
                      appearance="button"
                      size="l"
                      options={testArr}
                      value={sourceData.Lua}
                      onChange={(value) => handleSourceData("Lua", value)}
                      placeholder=""
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_GAME_VERSION")}>
                    <Select
                      type="simulate"
                      appearance="button"
                      size="m"
                      options={testArr}
                      value={sourceData.gameV}
                      onChange={(value) => handleSourceData("gameV", value)}
                      placeholder={intl.get("MANAGE_RESOURCE_GAME_VERSION")}
                    />
                    <Button
                      type="weak"
                      style={{ marginLeft: "20px", color: "black" }}
                      onClick={() => {
                        addFast("game-add");
                      }}
                    >
                      {intl.get("MANAGE_RESOURCE_ADD_FAST")}
                    </Button>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_SDK_VERSION")}>
                    <Select
                      type="simulate"
                      appearance="button"
                      size="m"
                      options={testArr}
                      value={sourceData.SDKV}
                      onChange={(value) => handleSourceData("SDKV", value)}
                      placeholder={intl.get("MANAGE_RESOURCE_SDK_VERSION_NAME")}
                    />
                    <Button
                      type="weak"
                      style={{ marginLeft: "20px", color: "black" }}
                      onClick={() => {
                        addFast("SDK-add");
                      }}
                    >
                      {intl.get("MANAGE_RESOURCE_ADD_FAST")}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card.Body>
          </Card>
          <Card style={{ marginBottom: "20px" }}>
            <Card.Body>
              <div className="example-stage">
                <Form.Title>{intl.get("MANAGE_RESOURCE_OUTPUT")}</Form.Title>
                <Form>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_ALL_QUITE")}>
                    <RadioGroup
                      value={sourceData.allQuite}
                      onChange={(value) => handleSourceData("allQuite", value)}
                    >
                      <Radio name="close">
                        {intl.get("MANAGE_RESOURCE_ALL_QUITE_CLOSE")}
                      </Radio>
                      <Radio name="All">
                        {intl.get("MANAGE_RESOURCE_ALL_QUITE_ALL")}
                      </Radio>
                    </RadioGroup>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_DEBUG_MODEL")}>
                    <RadioGroup
                      value={sourceData.debugModel}
                      onChange={(value) =>
                        handleSourceData("debugModel", value)
                      }
                    >
                      <Radio name="release">
                        {intl.get("MANAGE_RESOURCE_RELEASE_MODEL")}
                      </Radio>
                      <Radio name="debug">
                        {intl.get("MANAGE_RESOURCE_DEBUG_MODEL")}
                      </Radio>
                    </RadioGroup>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_PAYTYPE")}>
                    <RadioGroup
                      value={sourceData.payType}
                      onChange={(value) => handleSourceData("payType", value)}
                    >
                      <Radio name="diamond">
                        {intl.get("MANAGE_RESOURCE_DIAMOND")}
                      </Radio>
                      <Radio name="cash">
                        {intl.get("MANAGE_RESOURCE_CASH")}
                      </Radio>
                      <Radio name="glod">
                        {intl.get("MANAGE_RESOURCE_GLOD")}
                      </Radio>
                    </RadioGroup>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_MI_AREA")}>
                    <RadioGroup
                      value={sourceData.area}
                      onChange={(value) => handleSourceData("area", value)}
                    >
                      <Radio name="dev">
                        {intl.get("MANAGE_RESOURCE_DEV")}
                      </Radio>
                      <Radio name="pro">
                        {intl.get("MANAGE_RESOURCE_PRO")}
                      </Radio>
                    </RadioGroup>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_IP")}>
                    <Input
                      placeholder=""
                      size="l"
                      value={sourceData.IP}
                      onChange={(value) => handleSourceData("IP", value)}
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_BACK_IP")}>
                    <Input
                      placeholder=""
                      size="l"
                      value={sourceData.api}
                      onChange={(value) => handleSourceData("api", value)}
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_DEFAULT_IP_1")}>
                    <Input
                      placeholder=""
                      size="l"
                      value={sourceData.IP_1}
                      onChange={(value) => handleSourceData("IP_1", value)}
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_DEFAULT_IP_2")}>
                    <Input
                      placeholder=""
                      size="l"
                      value={sourceData.IP_2}
                      onChange={(value) => handleSourceData("IP_2", value)}
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_LOG")}>
                    <RadioGroup
                      value={sourceData.allQuiteSend}
                      onChange={(value) =>
                        handleSourceData("allQuiteSend", value)
                      }
                    >
                      <Radio name="notSend">
                        {intl.get("MANAGE_RESOURCE_ONT_SEND")}
                      </Radio>
                      <Radio name="send">
                        {intl.get("MANAGE_RESOURCE_SEND")}
                      </Radio>
                    </RadioGroup>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_LOG_GRADE")}>
                    <Select
                      type="simulate"
                      appearance="button"
                      size="m"
                      options={logGradeArr}
                      value={sourceData.logGrade}
                      onChange={(value) => handleSourceData("logGrade", value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label={intl.get("MANAGE_RESOURCE_LOGIN_STATUS")}
                    style={{ position: "relative" }}
                  >
                    <Bubble content={`⾝份ID`}>
                      <Icon
                        type="infoblue"
                        size="default"
                        style={{
                          position: "absolute",
                          left: "-86px",
                          cursor: "pointer",
                        }}
                      />
                    </Bubble>
                    <Input
                      placeholder=""
                      value={sourceData.loginStatus}
                      onChange={(value) =>
                        handleSourceData("loginStatus", value)
                      }
                      size="l"
                    />
                  </Form.Item>
                  <Form.Item
                    label={intl.get("MANAGE_RESOURCE_LUA_NEW_VERSION")}
                  >
                    <Input
                      placeholder=""
                      value={sourceData.LUA_V}
                      onChange={(value) => handleSourceData("LUA_V", value)}
                      size="l"
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_ZIP")}>
                    <Input
                      placeholder=""
                      value={sourceData.ZIP}
                      onChange={(value) => handleSourceData("ZIP", value)}
                      size="l"
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_LUA_MD5")}>
                    <Input
                      placeholder=""
                      value={sourceData.LUA_MD5}
                      onChange={(value) => handleSourceData("LUA_MD5", value)}
                      size="l"
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_GRAY")}>
                    <Bubble content={`⾝份ID`}>
                      <Icon
                        type="infoblue"
                        size="default"
                        style={{
                          position: "absolute",
                          left: "-86px",
                          cursor: "pointer",
                        }}
                      />
                    </Bubble>
                    <Input
                      placeholder=""
                      value={sourceData.grayContract}
                      onChange={(value) =>
                        handleSourceData("grayContract", value)
                      }
                      size="l"
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_FN_SWITCH")}>
                    <div className="r-tags">
                      <div
                        className={`${tags.length ? "r-tags-content" : ""}`}
                        style={{ minHeight: "0px" }}
                      >
                        <Tag.Group>
                          {tags.map((item) => (
                            <Tag
                              key={item.value}
                              onClose={() =>
                                setTags(
                                  tags.filter((tag) => tag.value !== item.value)
                                )
                              }
                            >
                              {item.text}
                            </Tag>
                          ))}
                        </Tag.Group>
                      </div>

                      <div className="r-tags-select">
                        {/* 使用TagSelect 生成taps */}
                        <TagSelect
                          className="r-detail-tags"
                          options={tagGroups}
                          value={tagSelectVal}
                          // optionsOnly
                          onChange={handleTagSelect}
                          placeholder={intl.get(
                            "MANAGE_RESOURCE_SWICH_SELECT_PLACEHOLDER"
                          )}
                        />
                        <Icon
                          type="arrowdown"
                          size="s"
                          className="r-tags-select-i"
                        />

                        {/* 使用selec 生成taps */}
                        {/* <Select
                      className="r-tags-select-dom"
                      size="full"
                      type="simulate"
                      appearance="default"
                      options={tagGroups}
                      value={tagSelectVal}
                      onChange={handleSelect}
                      placeholder="请选择开关"
                    /> */}
                      </div>
                    </div>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_SOURCE_LIST")}>
                    <Button
                      type={isUpPackage ? "primary" : "weak"}
                      style={{
                        marginRight: "20px",
                        width: "200px",
                        color: isUpPackage ? "#fff" : "black",
                      }}
                      onClick={() => {
                        handleUpdateList("upPackage");
                      }}
                    >
                      {intl.get("MANAGE_RESOURCE_DOC_LIST")}
                    </Button>
                    <Button
                      type={!isUpPackage ? "primary" : "weak"}
                      style={{
                        color: !isUpPackage ? "#fff" : "black",
                        width: "200px",
                      }}
                      onClick={() => {
                        handleUpdateList("updoc");
                      }}
                    >
                      {intl.get("MANAGE_RESOURCE_UPDATE_FILE_LIST")}
                    </Button>
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_CONNECT_TEXT")}>
                    <Input
                      placeholder=""
                      value={sourceData.contractText}
                      onChange={(value) =>
                        handleSourceData("contractText", value)
                      }
                      size="l"
                    />
                  </Form.Item>
                  <Form.Item label={intl.get("MANAGE_RESOURCE_COLUMNS_NOTICE")}>
                    <TextArea
                      size="l"
                      value={sourceData.remarks}
                      onChange={(value) => handleSourceData("remarks", value)}
                      placeholder=""
                    />
                  </Form.Item>
                </Form>
              </div>
            </Card.Body>
          </Card>
          <div className="r-footer-sec">
            <section>
              <Row>
                <Col span={12}>
                  <Button
                    className="save-btn btn"
                    onClick={handleSave}
                    type="primary"
                  >
                    {intl.get("MANAGE_RESOURCE_SAVE")}
                  </Button>
                  <Button
                    className="cancel-btn btn"
                    onClick={handleCancel}
                    type="weak"
                  >
                    {intl.get("MANAGE_RESOURCE_CANCEL")}
                  </Button>
                </Col>
              </Row>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}
