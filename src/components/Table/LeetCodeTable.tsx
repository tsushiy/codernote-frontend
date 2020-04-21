import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { GlobalState } from "../../types/globalState";
import { Contest } from "../../types/apiResponse";
import { setSmallTableCategory } from "../../reducers/appReducer";
import { RowTable } from "./InnerTable";

type Props = {
  contests: Contest[];
};

const LeetCodeTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;

  const dispatch = useDispatch();
  const { smallTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(smallTableCategory);

  const categories = ["algorithms", "database", "shell", "concurrency"];

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
        {categories.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v.toUpperCase()}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {categories.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() && (
            <RowTable
              domain="leetcode"
              contest={
                contests.filter((contest) =>
                  contest.ContestID.match(new RegExp(`^${v}$`))
                )[0]
              }
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default LeetCodeTable;
