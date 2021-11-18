import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  withRouter,
  useHistory,
  useLocation,
} from "react-router-dom";

import DocList from "./docManage/docList";
import DocUpload from "./docManage/docUpload";
import DocPack from "./docManage/docPack";
import DocEdit from "./docManage/docEdit";
import DocAdd from "./docManage/docAdd";
import PackResource from "./sourceManage/packResource";

import { Tabs, TabPanel, Card } from "tea-component";
import intl from 'react-intl-universal';

export default withRouter(function PackageMain(props) {
  const history = useHistory();
  const { pathname } = useLocation();
  const tabs = [
    { id: "docFile", label: intl.get('MANAGE_PACKAGE_UPDATE_DOC') },  //更新⽂件夹管理
    { id: "packResource", label:intl.get('MANAGE_PACKAGE_PACK_SOURCE') }, //打包资源管理
  ];
  const [activeId, setActiveId] = useState("docFile");

  // 向 父组件传递 子组件传来的data
  function handleSetting(type, cvm) {
    props.setting(type, cvm);
  }

  // tab 切换回调
  function handleTabChange(t) {
    if (t.id === "docFile") {
      setActiveId("docFile");
      history.push({
        pathname: "/resource/package-main",
      });
    } else {
      setActiveId("packResource");
      history.push({
        pathname: "/resource/package-main/packageResource",
      });
    }
  }

  // 刷新后 停留在当前tab
  useEffect(() => {
    if (pathname.indexOf("packageResource") >= 0) {
      setActiveId("packResource");
    } else {
      setActiveId("docFile");
    }
  }, [pathname]);
  return (
    <Route>
      <Tabs
        ceiling
        animated={false}
        activeId={activeId}
        onActive={handleTabChange}
        tabs={tabs}
      >
        <TabPanel id="docFile">
          <Switch>
            <Route exact path={"/resource/package-main"}>
              <DocList setting={handleSetting}></DocList>
            </Route>
            <Route exact path={"/resource/package-main/doc-upload/:no"}>
              <DocUpload setting={handleSetting}></DocUpload>
            </Route>
            <Route exact path={"/resource/package-main/doc-pack/:no"}>
              <DocPack setting={handleSetting}></DocPack>
            </Route>
            <Route exact path={"/resource/package-main/doc-edit/:no"}>
              <DocEdit setting={handleSetting}></DocEdit>
            </Route>
            <Route exact path={"/resource/package-main/doc-add"}>
              <DocAdd setting={handleSetting}></DocAdd>
            </Route>
          </Switch>
        </TabPanel>
        <TabPanel id="packResource">
          <Card>
            <Card.Body>
              <Switch>
                <Route exact path={"/resource/package-main/packageResource"}>
                  <PackResource setting={handleSetting}></PackResource>
                </Route>
              </Switch>
            </Card.Body>
          </Card>
        </TabPanel>
      </Tabs>
    </Route>
  );
});
