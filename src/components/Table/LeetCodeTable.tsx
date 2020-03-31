import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Contest } from "../../types/apiResponse";
import { RowTable } from './InnerTable';

type Props = {
  contests: Contest[]
}

const LeetCodeTable: React.FC<Props> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("algorithms");

  const categories = ["algorithms", "database", "shell", "concurrency"]

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        {categories.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v.toUpperCase()}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {categories.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() &&
            <RowTable domain="leetcode" contest={contests.filter(contest => contest.ContestID.match(new RegExp(`^${v}$`)))[0]} />}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default LeetCodeTable;