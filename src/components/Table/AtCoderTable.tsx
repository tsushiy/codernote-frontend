import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { GlobalState } from "../../types/globalState";
import { Contest } from "../../types/apiResponse";
import { setSmallTableCategory } from "../../reducers/appReducer";
import { RegularTable, OthersTable } from "./InnerTable";

type Props = {
  contests: Contest[];
};

const AtCoderTable: React.FC<Props> = (props: Props) => {
  const { contests } = props;

  const dispatch = useDispatch();
  const { smallTableCategory } = useSelector((state: GlobalState) => state.app);
  const [activeTab, setActiveTab] = useState(smallTableCategory);

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => {
          setActiveTab(eventKey);
          dispatch(setSmallTableCategory(eventKey));
        }}
      >
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
          <Nav.Link eventKey="others-rated">Others Rated</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "abc" && (
        <RegularTable
          domain="atcoder"
          contests={contests.filter((v) => v.ContestID.match(/^abc\d{3}$/))}
        />
      )}
      {activeTab === "arc" && (
        <RegularTable
          domain="atcoder"
          contests={contests.filter((v) => v.ContestID.match(/^arc\d{3}$/))}
        />
      )}
      {activeTab === "agc" && (
        <RegularTable
          domain="atcoder"
          contests={contests.filter((v) => v.ContestID.match(/^agc\d{3}$/))}
        />
      )}
      {activeTab === "others-rated" && (
        <OthersTable
          domain="atcoder"
          contests={contests.filter(
            (v) => !v.ContestID.match(/^a[brg]c\d{3}$/) && v.Rated !== "-"
          )}
        />
      )}
      {activeTab === "others" && (
        <OthersTable
          domain="atcoder"
          contests={contests.filter(
            (v) => !v.ContestID.match(/^a[brg]c\d{3}$/) && v.Rated === "-"
          )}
        />
      )}
    </React.Fragment>
  );
};

export default AtCoderTable;
