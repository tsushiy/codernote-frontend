import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Nav } from "react-bootstrap"
import styled from "styled-components";
import { GlobalState } from '../../types/globalState';
import { setLargeTableCategory, setSmallTableCategory } from '../../reducers/appReducer';
import AtCoderTable from "./AtCoderTable";
import CodeforcesTable from "./CodeforcesTable";
import AOJTable from "./AOJTable";
import YukicoderTable from "./YukicoderTable";
import LeetCodeTable from "./LeetCodeTable";

const TablePage: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { contests } = useSelector((state: GlobalState) => state.problem);
  const { largeTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(largeTableCategory);

  return (
    <Container>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => {
          setActiveTab(eventKey);
          dispatch(setLargeTableCategory(eventKey));
          switch (eventKey) {
            case "atcoder":
              dispatch(setSmallTableCategory("abc"));
              break;
            case "codeforces":
              dispatch(setSmallTableCategory("cr1"));
              break;
            case "yukicoder":
              dispatch(setSmallTableCategory("regular"));
              break;
            case "aoj":
              dispatch(setSmallTableCategory("joi"));
              break;
            case "leetcode":
              dispatch(setSmallTableCategory("algorithms"));
              break;
          }
        }}>
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
      {activeTab === "atcoder" && <AtCoderTable contests={contests.filter(contest => contest.Domain === "atcoder")} />}
      {activeTab === "codeforces" && <CodeforcesTable contests={contests.filter(contest => contest.Domain === "codeforces")} />}
      {activeTab === "yukicoder" && <YukicoderTable contests={contests.filter(contest => contest.Domain === "yukicoder")} />}
      {activeTab === "aoj" && <AOJTable contests={contests.filter(contest => contest.Domain === "aoj")} />}
      {activeTab === "leetcode" && <LeetCodeTable contests={contests.filter(contest => contest.Domain === "leetcode")} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: calc(100vh - 64px);
  width: calc(100vw - 64px);
  max-width: 1200px;
  top: 64px;
  bottom: 0;
	left: 50%;
	transform: translateX(-50%);
`;

export default TablePage;