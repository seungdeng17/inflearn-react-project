import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Typography } from "antd";
import Settings from "../components/Settings";
import SearchInput from "./SearchInput";
import History from "../../common/components/History";
import { useDispatch, useSelector } from "react-redux";
import { actions, Types } from "../state";
import useNeedLogin from "../../common/hook/useNeedLogin";
import { actions as authActions } from "../../auth/state";
import useInfinityScroll from "../../common/hook/useInfinityScroll";
import useFetchInfo from "../../common/hook/useFetchInfo";

export default function Search() {
  useNeedLogin();
  const dispatch = useDispatch();

  function logout() {
    dispatch(authActions.fetchLogout());
  }

  // @ts-ignore
  const history = useSelector((state) => state.search.history);
  const { isSlow } = useFetchInfo(Types.FetchAllHistory);

  const targetRef = useInfinityScroll(() =>
    dispatch(actions.fetchAllHistory())
  );

  useEffect(() => {
    dispatch(actions.fetchAllHistory());
  }, [dispatch]);

  return (
    <>
      <Row justify="end" style={{ padding: 20 }}>
        <Col>
          <Settings logout={logout} />
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
          <div ref={history.length ? targetRef : null} />
          {isSlow && (
            <div
              style={{
                position: "fixed",
                top: 30,
                left: 30,
              }}
            >
              <Spin size="large" />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
