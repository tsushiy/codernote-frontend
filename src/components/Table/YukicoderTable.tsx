import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, NavDropdown } from "react-bootstrap";
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
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => {
          setActiveTab(eventKey);
          dispatch(setSmallTableCategory(eventKey));
        }}
      >
        <NavDropdown title="Regular" id="regular-dropdown">
          <NavDropdown.Item eventKey="regular-201">
            Regular 201-
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="regular-101">
            Regular 101-200
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="regular-001">
            Regular -100
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "regular-201" && (
        <RegularTable
          domain="yukicoder"
          contests={contests
            .filter((v) => v.Title.match(/^yukicoder contest/))
            .filter(
              (v) => 201 <= Number(v.Title.match(/[0-9]{1,3}/)?.toString())
            )}
        />
      )}
      {activeTab === "regular-101" && (
        <RegularTable
          domain="yukicoder"
          contests={contests
            .filter((v) => v.Title.match(/^yukicoder contest/))
            .filter(
              (v) =>
                101 <= Number(v.Title.match(/[0-9]{1,3}/)?.toString()) &&
                Number(v.Title.match(/[0-9]{1,3}/)?.toString()) < 201
            )}
        />
      )}
      {activeTab === "regular-001" && (
        <RegularTable
          domain="yukicoder"
          contests={contests
            .filter((v) => v.Title.match(/^yukicoder contest/))
            .filter(
              (v) => Number(v.Title.match(/[0-9]{1,3}/)?.toString()) < 101
            )}
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
