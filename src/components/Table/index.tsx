import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav } from "react-bootstrap"
import { AppState } from '../../types/appState';
import AtCoderTable from "./AtCoderTable";
import CodeforcesTable from "./CodeforcesTable";
import AOJTable from "./AOJTable";
import YukicoderTable from "./YukicoderTable";
import LeetCodeTable from "./LeetCodeTable";

const ContestTable: React.FC<{}> = () => {
  const { contests } = useSelector((state: AppState) => state.contest);
  const [activeTab, setActiveTab] = useState("atcoder");

  return (
    <div className="container">
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
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
    </div>
  );
}

export default ContestTable;