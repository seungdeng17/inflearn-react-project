import {
  Col,
  Descriptions,
  PageHeader,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useFetchInfo from "../../common/hook/useFetchInfo";
import { actions, Types } from "../state";
import Department from "./Department";
import TagList from "./TagList";
import History from "../../common/components/History";

/**
 *
 * @param {object} param
 * @param {import('react-router').match} param.match
 */
export default function User({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // @ts-ignore
  const user = useSelector((state) => state.user.user);

  const name = match.params.name;
  useEffect(() => {
    dispatch(actions.fetchUser(name));
  }, [dispatch, name]);

  const { isFetched, isSlow } = useFetchInfo(Types.FetchUser);

  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={14}>
        <PageHeader
          onBack={history.goBack}
          title={
            <Space>
              사용자 정보
              {isSlow && <Spin size="small" />}
            </Space>
          }
        >
          {user && (
            <Descriptions layout="vertical" bordered column={1}>
              <Descriptions.Item label="이름">
                <Typography.Text>{user.name}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="소속">
                <Department />
              </Descriptions.Item>
              <Descriptions.Item label="태그">
                <TagList />
              </Descriptions.Item>
              <Descriptions.Item label="수정 내역">
                <History />
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
