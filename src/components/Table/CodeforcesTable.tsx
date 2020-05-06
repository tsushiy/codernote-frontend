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

const CodeforcesTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;

  const dispatch = useDispatch();
  const { smallTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(smallTableCategory);

  const domain = "codeforces";
  const years = [2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];
  const regularTabs = ["div3"];
  const othersTabs = ["div1-others", "div2-others", "educational"];
  years.forEach((v) => {
    regularTabs.push(`div1-${v}`);
    regularTabs.push(`div2-${v}`);
    othersTabs.push(`others-${v}`);
  });

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
        <NavDropdown title="Div1" id="div1-dropdown">
          {years.map((v) => (
            <NavDropdown.Item key={v} eventKey={`div1-${v}`}>
              {v === 2012 && "-"} {v}
            </NavDropdown.Item>
          ))}
          <NavDropdown.Item eventKey="div1-others">Others</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Div2" id="div2-dropdown">
          {years.map((v) => (
            <NavDropdown.Item key={v} eventKey={`div2-${v}`}>
              {v === 2012 && "-"} {v}
            </NavDropdown.Item>
          ))}
          <NavDropdown.Item eventKey="div2-others">Others</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link eventKey="div3">Div3</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="educational">Educational</Nav.Link>
        </Nav.Item>
        <NavDropdown title="Other Contests" id="others-dropdown">
          {years.map((v) => (
            <NavDropdown.Item key={v} eventKey={`others-${v}`}>
              {v === 2012 && "-"} {v}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
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

export default CodeforcesTable;
