import React from "react";
import { Layout, NavMenu } from "tea-component";
import Content from "./content";
const { Header } = Layout;

export default function ResourcePage() {
  return (
      <Layout className="demo-layout-l resource-wrap">
        <Header style={{ backgroundColor: "white" ,color:'black'}}>
          <NavMenu
          style={{ backgroundColor: "white",color:'black'}}
            left={
              <>
                <NavMenu.Item style={{ color:'black'}} type="logo">
                  <img
                    src="https://via.placeholder.com/32.png?text=LOGO"
                    alt="logo"
                  />
                </NavMenu.Item>
                <NavMenu.Item>安全知识平台</NavMenu.Item>
              </>
            }
          />
        </Header>
        <Content ></Content>
      </Layout>
  );
}
