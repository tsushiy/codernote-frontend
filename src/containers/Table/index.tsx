import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav } from "react-bootstrap"
import { AppState } from '../../types/appState';
import AtCoderTable from "./AtCoderTable";

const ContestTable: React.FC<{}> = () => {
  const [activeTab, setActiveTab] = useState("atcoder");
  const { contests, problems, problemMap } = useSelector((state: AppState) => state.contest);

  return (
    <div className="container">
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey="atcoder"
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        <Nav.Item>
          <Nav.Link eventKey="atcoder">AtCoder</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="codeforces">Codeforces</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "atcoder" && <AtCoderTable contests={contests} problemMap={problemMap} />}
      {activeTab === "codeforces" && "codeforces"}
    </div>
  );
}

export default ContestTable;