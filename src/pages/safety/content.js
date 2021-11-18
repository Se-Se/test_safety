import React, { useState } from "react";
import {
  Layout,
  Card,
  Text,
  ExternalLink,
  Menu,
//   Icon,
} from "tea-component";

const { Body, Sider, Content } = Layout;
const icon =  [

  ];

export default function MenuExample() {
  const [selected, setSelected] = useState("2-1");

  const getMenuItemProps = id => ({
    selected: selected === id,
    onClick: () => setSelected(id),
  });

  return (
    <Layout className="demo-layout-l">
      <Body>
        <Sider>
          <Menu
          >
            <Menu.SubMenu title="行业资产">
              <Menu.Item icon="" title="重要业务" {...getMenuItemProps("1-1")} />
              <Menu.Item title="应用系统" {...getMenuItemProps("1-2")} />
              <Menu.Item title="业务数据" {...getMenuItemProps("1-3")} />
              <Menu.Item title="系统架构" {...getMenuItemProps("1-4")} />
            </Menu.SubMenu>

            <Menu.SubMenu title="知识展示">
              <Menu.Item title="业务场景" {...getMenuItemProps("2-1")} />
              <Menu.Item title="手法与漏洞" {...getMenuItemProps("2-2")} />
              <Menu.Item title="改进建议" {...getMenuItemProps("2-3")} />
            </Menu.SubMenu>


          </Menu>
        </Sider>
        <Content>
          <Content.Header
            title="内容标题"
            subtitle={
              <>
                说明文字 <Text theme="label">带颜色说明文字</Text>
              </>
            }
            operation={<ExternalLink weak>内容帮助</ExternalLink>}
          />
          <Content.Body>
            {/* 内容区域一般使用 Card 组件显示内容 */}
            <Card>
              <Card.Body>内容卡片</Card.Body>
            </Card>
          </Content.Body>
        </Content>
      </Body>
    </Layout>
  );
}