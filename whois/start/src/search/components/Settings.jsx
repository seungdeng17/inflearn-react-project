import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { SettingFilled } from "@ant-design/icons";

/**
 *
 * @param {object} param
 * @param {() => void} param.logout
 */
export default function Settings({ logout }) {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="logout" onClick={logout}>
            로그아웃
          </Menu.Item>
        </Menu>
      }
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button shape="circle" icon={<SettingFilled />} />
    </Dropdown>
  );
}
