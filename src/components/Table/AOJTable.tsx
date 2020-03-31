import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Contest } from "../../types/apiResponse";
import { RowTable } from './InnerTable';

type Props = {
  contests: Contest[]
}

const AOJTable: React.FC<Props> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("joi");

  const courses = ["ITP1", "ALDS1", "ITP2", "DSL", "DPL", "GRL", "CGL", "NTL"]
  const cl = ["JOI","PCK","ICPC","JAG","VPC","UOA"]

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        {cl.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v}</Nav.Link>
          </Nav.Item>
        ))}
        {courses.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {cl.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() &&
            <RowTable domain="aoj" contest={contests.filter(contest => contest.ContestID.match(new RegExp(`^${v}$`)))[0]} />}
        </React.Fragment>
      ))}
      {courses.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() &&
            <RowTable domain="aoj" contest={contests.filter(contest => contest.ContestID.match(new RegExp(`^${v}$`)))[0]} />}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default AOJTable;