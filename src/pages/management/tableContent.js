import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Justify,
  Button,
  SearchBox,
  ConfigProvider,
} from "tea-component";

import SourceList from "./resourceManage/SourceList";
import PackageMain from "./packageManage/packageMain";
import SDKMain from "./SDKManage/SDKMain";
import GameMain from "./gameManage/gameMain";
import ResourceEdit from "./resourceManage/sourceEdit";
import AddSDK from "./SDKManage/addSDK";
import AddGame from "./gameManage/addGame";
import GuideCom from "@/components/management/guide.js";
import { useSelector, useDispatch } from "react-redux";

import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import intl from "react-intl-universal";

const { Body, Sider, Content } = Layout;

const icon = /** @type {[string, string]} */ ([
  `https://via.placeholder.com/16.png?text=icon`,
  `https://via.placeholder.com/16/006eff/444444`,
]);
const menus = [
  { title: "MANAGE_UPDATE_SOURCE", id: "resource" },
  { title: "MANAGE_UPDATE_AND_PACKAGE", id: "package-main" },
  { title: "MANAGE_SDK_VERSION", id: "SDK" },
  { title: "MANAGE_GAME_VERSION", id: "game" },
];

export default function TableContent(props) {
  const { pathname } = useLocation();
  const history = useHistory();

  const initSelected = handleRoutePath();
  const [selected, setSelected] = useState(initSelected);

  const { language } = useSelector((state) => state.localesReducer);
  const [teaLocale, setTeaLocale] = useState("zh");

  const { pageType } = useSelector((state) => state.resourceReducer);

  const dispatch = useDispatch();
  const chnageLangguage = (val) => ({ type: "SET_LANGUAGE", language: val });
  const changePageType = (val) => ({ type: "SET_PAGE_TYPE", pageType: val });

  const [selectMore, setSelectMore] = useState(false);
  const [currentCom, setCurrentCom] = useState("mainPage");
  const [guideCurrent, setGuideCurrent] = useState(-1);

  const getMenuItemProps = (id) => ({
    selected: selected === id,
    className: selected === id ? "the-select" : null,

    onClick: () => handleLeftMenuClick(id),
  });

  // ??????????????????
  function handleLeftMenuClick(id) {
    setSelected(id);
    history.push({
      pathname: `/resource/${id}`,
    });
    handlePageType(id);
  }

  // ?????? pageType fn
  function handlePageType(val) {
    dispatch(changePageType(val));
  }
  //????????? ???????????? selectId
  function handleRoutePath() {
    let res = "resource";
    let str = pathname.substring(10);
    if (str.indexOf("resource") >= 0) {
      res = "resource";
    }
    if (
      str.indexOf("package-main") >= 0 ||
      str.indexOf("doc-upload") >= 0 ||
      str.indexOf("doc-edit") >= 0 ||
      str.indexOf("doc-add") >= 0
    ) {
      res = "package-main";
    }
    if (str.indexOf("SDK") >= 0) {
      res = "SDK";
    }
    if (str.indexOf("game") >= 0) {
      res = "game";
    }
    return res;
  }

  // ??????????????????, setType ????????????
  function handleSetTypeReflesh() {
    let type = null;
    let str = pathname.substring(10);
    if (str.indexOf("SDK") >= 0) {
      type = "SDK";
    }
    if (str.indexOf("SDK-add") >= 0) {
      type = "SDK-add";
    }
    if (str.indexOf("game") >= 0) {
      type = "game";
    }
    if (str.indexOf("game-add") >= 0) {
      type = "game-add";
    }
    if (str.indexOf("resource") >= 0) {
      type = "resource";
    }
    if (str.indexOf("resource-edit") >= 0) {
      type = "resource-edit";
    }
    if (str.indexOf("resource-add") >= 0) {
      type = "resource-add";
    }
    if (str.indexOf("package-main") >= 0) {
      type = "package-main";
    }
    if (str.indexOf("doc-upload") >= 0) {
      type = "doc-upload";
    }
    if (str.indexOf("doc-pack") >= 0) {
      type = "doc-pack";
    }
    if (str.indexOf("doc-edit") >= 0) {
      type = "doc-edit";
    }
    if (str.indexOf("doc-add") >= 0) {
      type = "doc-add";
    }
    return type;
  }

  // ????????????
  function addResource() {
    history.push({
      pathname: "/resource/resource-add",
    });
  }

  // ?????????????????????
  function gomaster() {
    console.log("gomaster");
  }


  // ?????????
  function handleSearch() {
    console.log("handleSearch");
  }

  // ???????????? btn
  function onlineResource() {
    console.log("onlineResource");
  }

  // ???????????? btn
  function refleshResource() {
    console.log("refleshResource");
  }

  // ????????????????????? btn
  function addPackage() {
    history.push({
      pathname: "/resource/package-main/doc-add",
    });
  }

  // ???????????? btn
  function newGard() {
    console.log("newGard");
    setGuideCurrent(0);
  }
  // ???????????? ?????? fn
  function showGuide(v) {
    console.log(v);
    setGuideCurrent();
  }
  // ??????SDK?????? btn
  function addSDK() {
    history.push({
      pathname: "/resource/SDK-add",
    });
  }

  // ?????????????????? btn
  function addGame() {
    history.push({
      pathname: "/resource/game-add",
    });
  }
  function handleOnBack() {
    history.push({
      pathname: `/resource/resource`,
    });
  }
  // ??????????????????
  function handleGoBack(data) {
    console.log(pathname);
    console.log(data);
    if (
      pathname === "/resource/resource-add" ||
      pathname.indexOf("/resource/resource-edit") >= 0
    ) {
      setCurrentCom("mainPage");
      let str = pathname.split("/")[2];
      handlePageType(str);
    } else {
      history.push({
        pathname: `/resource/${data}`,
      });
    }
  }

  // ?????? ??????btn
  function selectMoreFn() {
    setSelectMore(!selectMore);
  }

  function handleSetting(type, data) {
    if (type === "resource-edit") {
      history.push({
        pathname: `/resource/resource-edit/${data.sourceID}`,
      });
    }
    if (type === "doc-upload") {
      history.push({
        pathname: `/resource/package-main/doc-upload/${data.no}`,
      });
    }
    if (type === "doc-pack") {
      history.push({
        pathname: `/resource/package-main/doc-pack/${data.no}`,
      });
    }
    if (type === "doc-edit") {
      history.push({
        pathname: `/resource/package-main/doc-edit/${data.no}`,
      });
    }
    handlePageType(type);
  }

  //??????????????????
  const operationReturn = () => {
    let result = null;
    switch (pageType) {
      case "resource-edit":
        result = (
          <>
            <Button type="primary" onClick={onlineResource}>
              {intl.get("MANAGE_ONLINE_SOURCE")} {/*????????????*/}
            </Button>
            <Button type="primary" onClick={refleshResource}>
              {intl.get("MANAGE_REFLESH_SOURCE")} {/*????????????*/}
            </Button>
          </>
        );

        break;
      case "resource-add":
        result = (
          <>
            <Button type="primary" onClick={onlineResource}>
              {intl.get("MANAGE_ONLINE_SOURCE")} {/*????????????*/}
            </Button>
            <Button type="primary" onClick={refleshResource}>
              {intl.get("MANAGE_REFLESH_SOURCE")} {/*????????????*/}
            </Button>
          </>
        );

        break;
      case "package-main":
        result = (
          <>
            {pathname.indexOf("packageResource") >= 0 ? null : (
              <Button type="primary" onClick={addPackage}>
                {intl.get("MANAGE_ADD_DOC")} {/* ????????????????????? */}
              </Button>
            )}
            <Button type="weak" onClick={newGard}>
              {intl.get("MANAGE_NEW_GUID")} {/* ???????????? */}
            </Button>
          </>
        );

        break;
      case "doc-upload":
        result = null;
        break;
      case "doc-pack":
        result = null;
        break;
      case "doc-edit":
        result = null;
        break;

      case "doc-add":
        result = null;
        break;

      case "SDK":
        result = (
          <>
            <Button type="primary" onClick={addSDK}>
              {intl.get("MANAGE_ADD_SDK")} {/* ??????SDK?????? */}
            </Button>
            <Button type="weak" onClick={newGard}>
              {intl.get("MANAGE_NEW_GUID")} {/* ???????????? */}
            </Button>
          </>
        );
        break;

      case "SDK-add":
        result = null;
        break;

      case "game":
        result = (
          <>
            <Button type="primary" onClick={addGame}>
              {intl.get("MANAGE_ADD_GAME")} {/* ?????????????????? */}
            </Button>
            <Button type="weak" onClick={newGard}>
              {intl.get("MANAGE_NEW_GUID")} {/* ???????????? */}
            </Button>
          </>
        );
        break;

      case "game-add":
        result = null;
        break;

      case "resource":
        result = (
          <>
            <Button onClick={addResource} type="primary">
              {intl.get("MANAGE_ADD_SOURCE")} {/* ???????????? */}
            </Button>
            <Button
              onClick={gomaster}
              style={{ background: "rgb(18, 18, 58)", color: "white" }}
            >
              {intl.get("MANAGE_ON_PRODUCE")} {/* ????????????????????? */}
            </Button>
            <Button onClick={newGard}>
              {intl.get("MANAGE_NEW_GUID")} {/* ???????????? */}
            </Button>
          </>
        );
        break;
      default:
        result = null;
    }
    return result;
  };

  //Content.Header ??????????????????
  function handleHeader() {
    let result = null;
    let subtitle = (
      <>
        <Justify
          left={
            <>
              <SearchBox
                placeholder={intl.get("MANAGE_PLACEHOLDER_SERACH")}
                onSearch={handleSearch}
              />
              <Button
                type="primary"
                style={{ marginLeft: "20px", width: "90px" }}
                onClick={selectMoreFn}
              >
                {selectMore
                  ? intl.get("MANAGE_BTN_CANCEL_SELECT_MORE")
                  : intl.get("MANAGE_BTN_SELECT_MORE")}
              </Button>
            </>
          }
        ></Justify>
      </>
    );
    let sdk_header = (
      <>
        <Justify
          left={
            <>
              <SearchBox
                placeholder={intl.get("MANAGE_PLACEHOLDER_SERACH")}
                onSearch={handleSearch}
              />
            </>
          }
        ></Justify>
      </>
    );
    switch (pageType) {
      case "resource":
        result = {
          title: intl.get("MANAGE_UPDATE_SOURCE"), //??????????????????
          subtitle: subtitle,
        };
        break;
      case "resource-edit":
        result = {
          showBackButton: true,
          onBackButtonClick: handleOnBack,
          title: intl.get("MANAGE_RESOURCE_EDIT"), //????????????
        };
        break;
      case "resource-add":
        result = {
          showBackButton: true,
          onBackButtonClick: handleOnBack,
          title: intl.get("MANAGE_ADD_SOURCE"), //????????????
        };
        break;
      case "package-main":
        result = {
          title: intl.get("MANAGE_UPDATE_AND_PACKAGE"), //???????????????/????????????
        };
        break;
      case "doc-upload":
        result = {
          title: intl.get("MANAGE_UPDATE_AND_PACKAGE"), //???????????????/????????????
        };
        break;
      case "doc-pack":
        result = {
          title: intl.get("MANAGE_UPDATE_AND_PACKAGE"), //???????????????/????????????
        };
        break;
      case "doc-edit":
        result = {
          title: intl.get("MANAGE_UPDATE_AND_PACKAGE"), //???????????????/????????????
        };
        break;
      case "doc-add":
        result = {
          title: intl.get("MANAGE_UPDATE_AND_PACKAGE"), //???????????????/????????????
        };
        break;
      case "SDK":
        result = {
          title: intl.get("MANAGE_SDK_VERSION"), //SKD????????????
          subtitle: sdk_header,
        };
        break;
      case "SDK-add":
        result = {
          title: intl.get("MANAGE_ADD_SDK"), // ??????SDK??????
          showBackButton: true,
          onBackButtonClick: () => handleGoBack("SDK"),
        };
        break;
      case "game":
        result = {
          title: intl.get("MANAGE_GAME_VERSION"), //??????????????????
          subtitle: sdk_header,
        };
        break;
      case "game-add":
        result = {
          title: intl.get("MANAGE_ADD_GAME"), //??????????????????
          showBackButton: true,
          onBackButtonClick: () => handleGoBack("game"),
        };
        break;

      default:
        result = {
          title: intl.get("MANAGE_UPDATE_SOURCE"),
          subtitle: subtitle,
        };
    }
    return result;
  }
  // ???????????? pageType ???????????? className
  function classNameFn() {
    let name = "content-relative";
    if (
      ["doc-upload", "doc-pack", "doc-add", "doc-edit"].indexOf(pageType) >= 0
    ) {
      name = "content-relative package-tabs";
    } else if (["resource-edit", "resource-add"].indexOf(pageType) >= 0) {
      name = "content-relative r-scroll-content-body";
    } else {
      name = "content-relative";
    }
    return name;
  }

  // ??????????????????, ??????setType ????????????
  useEffect(() => {
    let theType = handleSetTypeReflesh();
    handlePageType(theType);

    history.push({
      search: `?lang=${language}`,
    });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // ??????pageType??????, ????????????????????????????????????
  useEffect(() => {
    handleHeader();
    operationReturn();
  }, [pageType]); // eslint-disable-line react-hooks/exhaustive-deps

  // ?????? ????????? language ??????
  useEffect(() => {
    history.push({
      search: `?lang=${language}`,
    });
    let str = language.substring(0, 2);
    setTeaLocale(str);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleLanguageChange(lan) {
    dispatch(chnageLangguage(lan));
  }

  return (
    <>
      {/* <Button
        size="m"
        type="primary"
        onClick={() => {
          handleLanguageChange("zh-cn");
        }}
      >
        zh
      </Button>
      <Button
        size="m"
        type="primary"
        onClick={() => {
          handleLanguageChange("en-us");
        }}
      >
        en
      </Button> */}
      <GuideCom
        current={guideCurrent}
        handleCurrent={(val) => showGuide(val)}
      ></GuideCom>
      <Body>
        <Sider className="resource-sider">
          <Menu title={intl.get("MANAGE_TITLE")}>
            <Menu.SubMenu
              defaultOpened
              title={intl.get("MANAGE_SOURCE_SET")}
              icon={icon}
            >
              {menus.map((item) => {
                return (
                  <Menu.Item
                    title={intl.get(item.title)}
                    key={item.id}
                    {...getMenuItemProps(item.id)}
                  />
                );
              })}
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content>
          <Content.Header {...handleHeader()} operation={operationReturn()} />
          <Content.Body className={classNameFn()}>
            {/* ???????????????????????? Card ?????????????????? */}
            <ConfigProvider locale={teaLocale}>
              <Switch>
                <Route path={`/resource/resource`}>
                  <SourceList
                    selectMore={selectMore}
                    setting={handleSetting}
                  ></SourceList>
                </Route>
                <Route path={`/resource/resource-edit/:sourceID`}>
                  <ResourceEdit
                    current={currentCom}
                    changeCur={(v) => setCurrentCom(v)}
                  ></ResourceEdit>
                </Route>
                <Route path={`/resource/resource-add`}>
                  <ResourceEdit
                    current={currentCom}
                    changeCur={(v) => setCurrentCom(v)}
                  ></ResourceEdit>
                </Route>
                <Route path={"/resource/package-main"}>
                  <PackageMain setting={handleSetting}></PackageMain>
                </Route>

                <Route path={`/resource/SDK`} component={SDKMain} />
                <Route path={`/resource/SDK-add`} component={AddSDK} />
                <Route path={`/resource/game`} component={GameMain} />
                <Route path={`/resource/game-add`} component={AddGame} />
              </Switch>
            </ConfigProvider>
          </Content.Body>
        </Content>
      </Body>
    </>
  );
}
