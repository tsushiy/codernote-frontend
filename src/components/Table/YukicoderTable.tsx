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

const YukicoderTable: React.FC<Props> = (props: Props) => {
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
          <Nav.Link eventKey="regular">Regular</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "regular" && (
        <RegularTable
          domain="yukicoder"
          contests={contests.filter((v) => v.Title.match(/^yukicoder contest/))}
        />
      )}
      {activeTab === "others" && (
        <OthersTable
          domain="yukicoder"
          contests={contests.filter(
            (v) => !v.Title.match(/^yukicoder contest/)
          )}
        />
      )}
    </React.Fragment>
  );
};

export default YukicoderTable;
