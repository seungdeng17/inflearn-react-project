import { Col, Descriptions, PageHeader, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import useFetchInfo from "../../common/hook/useFetchInfo";
import { actions, Types } from "../state";
import Department from "./Department";
import TagList from "./TagList";
import History from "../../common/components/History";
import FetchLabel from "../components/FetchLabel";
import useNeedLogin from "../../common/hook/useNeedLogin";
import useInfinityScroll from "../../common/hook/useInfinityScroll";

/**
 *
 * @param {object} param
 * @param {import('react-router').match} param.match
 */
export default function User({ match }) {
  useNeedLogin();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, userHistory, page, noMoreHistory] = useSelector(
    (state) => [
      // @ts-ignore
      state.user.user,
      // @ts-ignore
      state.user.userHistory,
      // @ts-ignore
      state.user.page,
      // @ts-ignore
      state.user.noMoreHistory,
    ],
    shallowEqual
  );

  const name = match.params.name;
  useEffect(() => {
    dispatch(actions.fetchUser(name));
    dispatch(actions.fetchUserHistory({ name, page: 0 }));
  }, [dispatch, name]);

  useEffect(() => {
    return () => {
      dispatch(actions.initialize());
    };
  }, [dispatch]);

  const { isFetched } = useFetchInfo(Types.FetchUser);

  const targetRef = useInfinityScroll(() => {
    if (noMoreHistory) return console.log("io callback");
    dispatch(actions.fetchUserHistory({ name, page: page + 1 }));
  });

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader
          onBack={() => history.push("/")}
          title={
            <FetchLabel label="사용자 정보" actionType={Types.FetchUser} />
          }
        >
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <FetchLabel
                    label="소속"
                    actionType={Types.FetchUpdateUser}
                    fetchKey="department"
                  />
                }
              >
                <Department />
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <FetchLabel
                    label="태그"
                    actionType={Types.FetchUpdateUser}
                    fetchKey="tag"
                  />
                }
              >
                <TagList />
              </Descriptions.Item>
              <Descriptions.Item label="수정 내역">
                <History items={userHistory} />
                <div ref={targetRef} />
              </Descriptions.Item>
            </Descriptions>
          )}
          {!user && isFetched && (
            <Typography.Text>존재하지 않는 사용자 입니다.</Typography.Text>
          )}
        </PageHeader>
      </Col>
    </Row>
  );
}
