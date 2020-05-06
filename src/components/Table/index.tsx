import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Alert } from "react-bootstrap";
import styled from "styled-components";
import { MainContainer } from "../../components/Styles";
import { GlobalState } from "../../types/globalState";
import {
  setLargeTableCategory,
  setSmallTableCategory,
} from "../../reducers/appReducer";
import AtCoderTable from "./AtCoderTable";
import CodeforcesTable from "./CodeforcesTable";
import AOJTable from "./AOJTable";
import YukicoderTable from "./YukicoderTable";
import LeetCodeTable from "./LeetCodeTable";
import SearchTable from "./SearchTable";

const TablePage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: GlobalState) => state.auth);
  const { contests } = useSelector((state: GlobalState) => state.problem);
  const { largeTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(largeTableCategory);

  return (
    <MainContainer>
      <Container>
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
                dispatch(setSmallTableCategory("div1-2020"));
                break;
              case "yukicoder":
                dispatch(setSmallTableCategory("regular-201"));
                break;
              case "aoj":
                dispatch(setSmallTableCategory("joi"));
                break;
              case "leetcode":
                dispatch(setSmallTableCategory("algorithms-1"));
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
          <Nav.Item>
            <Nav.Link eventKey="search">Search</Nav.Link>
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
        {activeTab === "search" && <SearchTable />}
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
