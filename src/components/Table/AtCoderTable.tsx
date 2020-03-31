import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Contest } from "../../types/apiResponse";
import { RegularTable, OthersTable } from './InnerTable';

type Props = {
  contests: Contest[]
}

const AtCoderTable: React.FC<Props> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("abc");

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        <Nav.Item>
          <Nav.Link eventKey="abc">ABC</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="arc">ARC</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="agc">AGC</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others-rated">Other Rated</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "abc" && <RegularTable domain="atcoder" contests={contests.filter(v => v.ContestID.match(/^abc\d{3}$/))} />}
      {activeTab === "arc" && <RegularTable domain="atcoder" contests={contests.filter(v => v.ContestID.match(/^arc\d{3}$/))} />}
      {activeTab === "agc" && <RegularTable domain="atcoder" contests={contests.filter(v => v.ContestID.match(/^agc\d{3}$/))} />}
      {activeTab === "others-rated" && <OthersTable domain="atcoder" contests={contests.filter(v => !v.ContestID.match(/^a[brg]c\d{3}$/) && (v.Rated !== "-"))} />}
      {activeTab === "others" && <OthersTable domain="atcoder" contests={contests.filter(v => !v.ContestID.match(/^a[brg]c\d{3}$/) && (v.Rated === "-"))} />}
    </React.Fragment>
  )
}

export default AtCoderTable;