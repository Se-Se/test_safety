import React from "react";
import { Layout, NavMenu } from "tea-component";
import TableContent from "./tableContent";
const { Header } = Layout;

export default function ResourcePage() {
  return (
      <Layout className="demo-layout-l resource-wrap">
        <Header>
          <NavMenu
            left={
              <>
                <NavMenu.Item type="logo">
                  <img
                    src="https://via.placeholder.com/32.png?text=LOGO"
                    alt="logo"
                  />
                </NavMenu.Item>
                <NavMenu.Item>总览</NavMenu.Item>
              </>
            }
          />
        </Header>
        <TableContent ></TableContent>
      </Layout>
  );
}
