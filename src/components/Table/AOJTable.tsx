import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, NavDropdown } from "react-bootstrap";
import { GlobalState } from "../../types/globalState";
import { Contest } from "../../types/apiResponse";
import { setSmallTableCategory } from "../../reducers/appReducer";
import { RowTable } from "./InnerTable";

type Props = {
  contests: Contest[];
};

const AOJTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;

  const dispatch = useDispatch();
  const { smallTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(smallTableCategory);

  const cl = ["JOI", "PCK", "ICPC", "JAG", "VPC", "UOA"];
  const courses = ["ITP1", "ALDS1", "ITP2", "DSL", "DPL", "GRL", "CGL", "NTL"];

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
        <NavDropdown title="Challenges" id="challenges-dropdown">
          {cl.map((v, k) => (
            <NavDropdown.Item key={k} eventKey={v.toLowerCase()}>
              {v}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        <NavDropdown title="Courses" id="courses-dropdown">
          {courses.map((v, k) => (
            <NavDropdown.Item key={k} eventKey={v.toLowerCase()}>
              {v}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      {cl.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() && (
            <RowTable
              domain="aoj"
              contest={contests.find((contest) => contest.ContestID === v)}
            />
          )}
        </React.Fragment>
      ))}
      {courses.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() && (
            <RowTable
              domain="aoj"
              contest={contests.find((contest) => contest.ContestID === v)}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default AOJTable;
