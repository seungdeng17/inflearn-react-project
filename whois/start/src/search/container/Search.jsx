import React, { useEffect } from "react";
import { Col, Row, Typography } from "antd";
import Settings from "../components/Settings";
import SearchInput from "./SearchInput";
import History from "../../common/components/History";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state";

export default function Search() {
  const dispatch = useDispatch();

  // @ts-ignore
  const history = useSelector((state) => state.search.history);

  useEffect(() => {
    dispatch(actions.fetchAllHistory());
  }, [dispatch]);

  return (
    <>
      <Row justify="end" style={{ padding: 20 }}>
        <Col>
          <Settings logout={() => {}} />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 100 }}>
        <Col>
          <Typography.Title style={{ fontFamily: "Caligrahhy" }}>
            찾 아 야 한 다
          </Typography.Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col xs={20} md={16} lg={12}>
          <SearchInput />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col xs={20} md={16} lg={12}>
          <History items={history} />
        </Col>
      </Row>
    </>
  );
}
