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

const AtCoderTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;

  const dispatch = useDispatch();
  const { smallTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(smallTableCategory);

  const domain = "atcoder";
  const years = [2020, 2019, 2018, 2017, 2016, 2015, 2014];
  const regularTabs = [
    "abc-1999",
    "abc-1199",
    "abc-unrated",
    "arc-rated",
    "arc-unrated",
    "agc-regular",
  ];
  const othersTabs = [
    "abc-sponsored",
    "arc-sponsored",
    "agc-others",
    "past",
    "joi",
    "jag",
  ];
  years.forEach((v) => othersTabs.push(`others-${v}`));

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
        <NavDropdown title="ABC Class" id="abc-dropdown">
          <NavDropdown.Item eventKey="abc-1999">Rated ~1999</NavDropdown.Item>
          <NavDropdown.Item eventKey="abc-1199">Rated ~1199</NavDropdown.Item>
          <NavDropdown.Item eventKey="abc-unrated">Unrated</NavDropdown.Item>
          <NavDropdown.Item eventKey="abc-sponsored">
            Sponsored
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="ARC Class" id="arc-dropdown">
          <NavDropdown.Item eventKey="arc-rated">Rated</NavDropdown.Item>
          <NavDropdown.Item eventKey="arc-unrated">Unrated</NavDropdown.Item>
          <NavDropdown.Item eventKey="arc-sponsored">
            Sponsored
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="AGC Class" id="agc-dropdown">
          <NavDropdown.Item eventKey="agc-regular">Regular</NavDropdown.Item>
          <NavDropdown.Item eventKey="agc-others">Others</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Other Contests" id="others-dropdown">
          <NavDropdown.Item eventKey="past">PAST</NavDropdown.Item>
          <NavDropdown.Item eventKey="joi">JOI</NavDropdown.Item>
          <NavDropdown.Item eventKey="jag">JAG</NavDropdown.Item>
          {years.map((v) => (
            <NavDropdown.Item key={v} eventKey={`others-${v}`}>
              {v === 2014 && "-"} {v}
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

export default AtCoderTable;
