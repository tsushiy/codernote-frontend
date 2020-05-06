import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, NavDropdown } from "react-bootstrap";
import { GlobalState } from "../../types/globalState";
import { Contest } from "../../types/apiResponse";
import { setSmallTableCategory } from "../../reducers/appReducer";
import { filteredContests } from "../../utils/problemUtil";
import { RegularTable, OthersTable } from "./InnerTable";

type Props = {
  contests: Contest[];
};

const YukicoderTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;

  const dispatch = useDispatch();
  const { smallTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(smallTableCategory);

  const domain = "yukicoder";
  const regularTabs = ["regular-201", "regular-101", "regular-001"];
  const othersTabs = ["others"];

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => {
          setActiveTab(eventKey);
          dispatch(setSmallTableCategory(eventKey));
        }}
      >
        <NavDropdown title="Regular" id="regular-dropdown">
          <NavDropdown.Item eventKey="regular-201">201 -</NavDropdown.Item>
          <NavDropdown.Item eventKey="regular-101">101 -</NavDropdown.Item>
          <NavDropdown.Item eventKey="regular-001">001 -</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link eventKey="others">Other Contests</Nav.Link>
        </Nav.Item>
      </Nav>
      {regularTabs.map((v) => (
        <React.Fragment key={v}>
          {v === activeTab && (
            <RegularTable contests={filteredContests(domain, contests, v)} />
          )}
        </React.Fragment>
      ))}
      {othersTabs.map((v) => (
        <React.Fragment key={v}>
          {v === activeTab && (
            <OthersTable contests={filteredContests(domain, contests, v)} />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default YukicoderTable;
