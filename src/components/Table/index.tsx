import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Alert } from "react-bootstrap";
import styled from "styled-components";
import { MainContainer } from "../../components/Styles";
import { GlobalState } from "../../types/globalState";
import {
  setLargeTableCategory,
  setSmallTableCategory,
  setShowTableInfoMessage,
} from "../../reducers/appReducer";
import AtCoderTable from "./AtCoderTable";
import CodeforcesTable from "./CodeforcesTable";
import AOJTable from "./AOJTable";
import YukicoderTable from "./YukicoderTable";
import LeetCodeTable from "./LeetCodeTable";

const TablePage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
  const { contests } = useSelector((state: GlobalState) => state.problem);
  const { largeTableCategory, showTableInfoMessage } = useSelector(
    (state: GlobalState) => state.app
  );
  const [activeTab, setActiveTab] = useState(largeTableCategory);

  return (
    <MainContainer>
      <Container>
        {showTableInfoMessage && (
          <Alert
            variant="info"
            onClose={() => dispatch(setShowTableInfoMessage(false))}
            style={{ marginBottom: "8px" }}
            dismissible
          >
            The contest table is updated around 5:00 AM JST (UTC+9)
          </Alert>
        )}
        {!isLoggedIn && (
          <Alert variant="warning" style={{ marginBottom: "8px" }}>
            You must be logged in to create notes.
          </Alert>
        )}
        <Nav
          variant="tabs"
          defaultActiveKey={activeTab}
          onSelect={(eventKey: string) => {
            setActiveTab(eventKey);
            dispatch(setLargeTableCategory(eventKey));
            switch (eventKey) {
              case "atcoder":
                dispatch(setSmallTableCategory("abc-1999"));
                break;
              case "codeforces":
                dispatch(setSmallTableCategory("div1-2018"));
                break;
              case "yukicoder":
                dispatch(setSmallTableCategory("regular-201"));
                break;
              case "aoj":
                dispatch(setSmallTableCategory("joi"));
                break;
              case "leetcode":
                dispatch(setSmallTableCategory("algorithms"));
                break;
            }
          }}
        >
          <Nav.Item>
            <Nav.Link eventKey="atcoder">AtCoder</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="codeforces">Codeforces</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="yukicoder">yukicoder</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="aoj">AOJ</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="leetcode">LeetCode</Nav.Link>
          </Nav.Item>
        </Nav>
        {activeTab === "atcoder" && (
          <AtCoderTable
            contests={contests.filter(
              (contest) => contest.Domain === "atcoder"
            )}
          />
        )}
        {activeTab === "codeforces" && (
          <CodeforcesTable
            contests={contests.filter(
              (contest) => contest.Domain === "codeforces"
            )}
          />
        )}
        {activeTab === "yukicoder" && (
          <YukicoderTable
            contests={contests.filter(
              (contest) => contest.Domain === "yukicoder"
            )}
          />
        )}
        {activeTab === "aoj" && (
          <AOJTable
            contests={contests.filter((contest) => contest.Domain === "aoj")}
          />
        )}
        {activeTab === "leetcode" && (
          <LeetCodeTable
            contests={contests.filter(
              (contest) => contest.Domain === "leetcode"
            )}
          />
        )}
      </Container>
    </MainContainer>
  );
};

const Container = styled.div`
  display: block;
  position: relative;
  padding: 14px 6px 0;
`;

export default TablePage;
