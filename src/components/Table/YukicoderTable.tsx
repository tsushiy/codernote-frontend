import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Contest } from "../../types/apiResponse";
import { RegularTable, OthersTable } from './InnerTable';

type Props = {
  contests: Contest[]
}

const YukicoderTable: React.FC<Props> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("regular");

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        <Nav.Item>
          <Nav.Link eventKey="regular">Regular</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "regular" && <RegularTable domain="yukicoder" contests={contests.filter(v => v.Title.match(/^yukicoder contest/))} />}
      {activeTab === "others" && <OthersTable domain="yukicoder" contests={contests.filter(v => !v.Title.match(/^yukicoder contest/))} />}
    </React.Fragment>
  )
}

export default YukicoderTable;