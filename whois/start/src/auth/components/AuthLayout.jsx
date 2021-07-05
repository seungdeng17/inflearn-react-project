import { Col, Form, Row, Typography } from "antd";
import React from "react";

/**
 *
 * @param {object} param
 * @param {import('react').ReactNode} param.children
 * @param {() => void} param.onFinish
 */
export default function AuthLayout({ children, onFinish }) {
  return (
    <>
      <Row justify="center" style={{ marginTop: 100 }}>
        <Col>
          <Typography.Title style={{ fontFamily: "Caligrahhy" }}>
            찾 아 야 한 다
          </Typography.Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Form
            initialValues={{ remember: true }}
            style={{ width: 300, marginTop: 50 }}
            onFinish={onFinish}
          >
            {children}
          </Form>
        </Col>
      </Row>
    </>
  );
}
