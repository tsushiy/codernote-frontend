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

const AtCoderTable: React.FC<Props> = (props: Props) => {
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
        <NavDropdown title="ABC Class" id="abc-dropdown">
          <NavDropdown.Item eventKey="abc-1999">
            ABC Rated ~1999
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="abc-sponsored">
            ABC Sponsored
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="abc-1199">
            ABC Rated ~1199
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="abc-unrated">
            ABC Unrated
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="ARC Class" id="arc-dropdown">
          <NavDropdown.Item eventKey="arc-rated">ARC Rated</NavDropdown.Item>
          <NavDropdown.Item eventKey="arc-sponsored">
            ARC Sponsored
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="arc-unrated">
            ARC Unrated
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="AGC Class" id="agc-dropdown">
          <NavDropdown.Item eventKey="agc-regular">
            AGC Regular
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="agc-others">AGC Others</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Others" id="others-dropdown">
          <NavDropdown.Item eventKey="others-2018">
            Others 2018-
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="others-2016">
            Others 2016-2017
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="others-2015">
            Others -2015
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="joi">JOI</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      {activeTab === "abc-1999" && (
        <RegularTable
          domain="atcoder"
          contests={contests
            .filter((v) => v.ContestID.match(/^abc\d{3}$/))
            .filter((v) => v.Rated === " ~ 1999")}
        />
      )}
      {activeTab === "abc-sponsored" && (
        <OthersTable
          domain="atcoder"
          contests={contests
            .filter((v) => !v.ContestID.match(/^abc\d{3}$/))
            .filter((v) => v.Rated === " ~ 1199" || v.Rated === " ~ 1999")}
        />
      )}
      {activeTab === "abc-1199" && (
        <RegularTable
          domain="atcoder"
          contests={contests
            .filter((v) => v.ContestID.match(/^abc\d{3}$/))
            .filter((v) => v.Rated === " ~ 1199")}
        />
      )}
      {activeTab === "abc-unrated" && (
        <RegularTable
          domain="atcoder"
          contests={contests
            .filter((v) => v.ContestID.match(/^abc\d{3}$/))
            .filter((v) => v.Rated === "-")}
        />
      )}
      {activeTab === "arc-rated" && (
        <RegularTable
          domain="atcoder"
          contests={contests
            .filter((v) => v.ContestID.match(/^arc\d{3}$/))
            .filter((v) => v.Rated === " ~ 2799")}
        />
      )}
      {activeTab === "arc-sponsored" && (
        <OthersTable
          domain="atcoder"
          contests={contests
            .filter((v) => !v.ContestID.match(/^arc\d{3}$/))
            .filter((v) => v.Rated === " ~ 2799")}
        />
      )}
      {activeTab === "arc-unrated" && (
        <RegularTable
          domain="atcoder"
          contests={contests
            .filter((v) => v.ContestID.match(/^arc\d{3}$/))
            .filter((v) => v.Rated === "-")}
        />
      )}
      {activeTab === "agc-regular" && (
        <RegularTable
          domain="atcoder"
          contests={contests.filter((v) => v.ContestID.match(/^agc\d{3}$/))}
        />
      )}
      {activeTab === "agc-others" && (
        <OthersTable
          domain="atcoder"
          contests={contests
            .filter((v) => !v.ContestID.match(/^agc\d{3}$/))
            .filter((v) => v.Rated === "All")}
        />
      )}
      {activeTab === "others-2018" && (
        <OthersTable
          domain="atcoder"
          contests={contests
            .filter((v) => !v.ContestID.match(/^a[brg]c\d{3}$/))
            .filter((v) => v.Rated === "-")
            .filter(
              (v) =>
                !(
                  v.Title.match(/^JOI/) || v.Title.match(/日本情報オリンピック/)
                )
            )
            .filter((v) => 1514732400 <= v.StartTimeSeconds)}
        />
      )}
      {activeTab === "others-2016" && (
        <OthersTable
          domain="atcoder"
          contests={contests
            .filter((v) => !v.ContestID.match(/^a[brg]c\d{3}$/))
            .filter((v) => v.Rated === "-")
            .filter(
              (v) =>
                !(
                  v.Title.match(/^JOI/) || v.Title.match(/日本情報オリンピック/)
                )
            )
            .filter(
              (v) =>
                1451574000 <= v.StartTimeSeconds &&
                v.StartTimeSeconds < 1514732400
            )}
        />
      )}
      {activeTab === "others-2015" && (
        <OthersTable
          domain="atcoder"
          contests={contests
            .filter((v) => !v.ContestID.match(/^a[brg]c\d{3}$/))
            .filter((v) => v.Rated === "-")
            .filter(
              (v) =>
                !(
                  v.Title.match(/^JOI/) || v.Title.match(/日本情報オリンピック/)
                )
            )
            .filter((v) => v.StartTimeSeconds < 1451574000)}
        />
      )}
      {activeTab === "joi" && (
        <OthersTable
          domain="atcoder"
          contests={contests.filter(
            (v) =>
              v.Title.match(/^JOI/) || v.Title.match(/日本情報オリンピック/)
          )}
        />
      )}
    </React.Fragment>
  );
};

export default AtCoderTable;
