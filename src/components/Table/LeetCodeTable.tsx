import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, NavDropdown } from "react-bootstrap";
import { GlobalState } from "../../types/globalState";
import { Contest } from "../../types/apiResponse";
import { setSmallTableCategory } from "../../reducers/appReducer";
import { filteredProblemNoList } from "../../utils/problemUtil";
import { RowTable } from "./InnerTable";

type Props = {
  contests: Contest[];
};

const LeetCodeTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;

  const dispatch = useDispatch();
  const { smallTableCategory } = useSelector((state: GlobalState) => state.app);
  const { problemMap } = useSelector((state: GlobalState) => state.problem);
  const [activeTab, setActiveTab] = useState(smallTableCategory);

  const domain = "leetcode";
  const categories = ["database", "shell", "concurrency"];
  const split = [1, 201, 401, 601, 801, 1001, 1201, 1401];

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
        <NavDropdown title="ALGORITHMS" id="algorithms-dropdown">
          {split.map((v) => (
            <NavDropdown.Item key={v} eventKey={`algorithms-${v}`}>
              {v} -
            </NavDropdown.Item>
          ))}
        </NavDropdown>
        {categories.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v.toUpperCase()}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {split.map((v) => (
        <React.Fragment key={v}>
          {activeTab === `algorithms-${v}` && (
            <RowTable
              problemNoList={filteredProblemNoList(
                domain,
                contests.find((contest) => contest.ContestID === "algorithms")
                  ?.ProblemNoList,
                problemMap,
                activeTab
              )}
              useFrontendID={true}
            />
          )}
        </React.Fragment>
      ))}
      {categories.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() && (
            <RowTable
              problemNoList={
                contests.find((contest) => contest.ContestID === v)
                  ?.ProblemNoList
              }
              useFrontendID={true}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default LeetCodeTable;
