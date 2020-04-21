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

const CodeforcesTable: React.FC<Props> = (props: Props) => {
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
        <NavDropdown title="Div1" id="div1-dropdown">
          <NavDropdown.Item eventKey="div1-2018">
            Div1 Regular 2018-
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div1-2016">
            Div1 Regular 2016-2017
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div1-2014">
            Div1 Regular 2014-2015
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div1-2013">
            Div1 Regular -2013
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div1-others">
            Div1 Others
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Div2" id="div2-dropdown">
          <NavDropdown.Item eventKey="div2-2018">
            Div2 Regular 2018-
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div2-2016">
            Div2 Regular 2016-2017
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div2-2014">
            Div2 Regular 2014-2015
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div2-2013">
            Div2 Regular -2013
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="div2-others">
            Div2 Others
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link eventKey="div3">Div3</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="educational">Educational</Nav.Link>
        </Nav.Item>
        <NavDropdown title="Others" id="others-dropdown">
          <NavDropdown.Item eventKey="others-2018">
            Others 2018-
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="others-2016">
            Others 2016-2017
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="others-2014">
            Others 2014-2015
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="others-2013">
            Others -2013
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      {activeTab === "div1-2018" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "1" || v.Rated === "12")
            .filter((v) => 1514732400 <= v.StartTimeSeconds)}
        />
      )}
      {activeTab === "div1-2016" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "1" || v.Rated === "12")
            .filter(
              (v) =>
                1451574000 <= v.StartTimeSeconds &&
                v.StartTimeSeconds < 1514732400
            )}
        />
      )}
      {activeTab === "div1-2014" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "1" || v.Rated === "12")
            .filter(
              (v) =>
                1387893600 <= v.StartTimeSeconds &&
                v.StartTimeSeconds < 1451574000
            )}
        />
      )}
      {activeTab === "div1-2013" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "1" || v.Rated === "12")
            .filter((v) => v.StartTimeSeconds < 1387893600)}
        />
      )}
      {activeTab === "div1-others" && (
        <OthersTable
          domain="codeforces"
          contests={contests
            .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "1" || v.Rated === "12")}
        />
      )}
      {activeTab === "div2-2018" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "2" || v.Rated === "12")
            .filter((v) => 1514732400 <= v.StartTimeSeconds)}
        />
      )}
      {activeTab === "div2-2016" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "2" || v.Rated === "12")
            .filter(
              (v) =>
                1451574000 <= v.StartTimeSeconds &&
                v.StartTimeSeconds < 1514732400
            )}
        />
      )}
      {activeTab === "div2-2014" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "2" || v.Rated === "12")
            .filter(
              (v) =>
                1387893600 <= v.StartTimeSeconds &&
                v.StartTimeSeconds < 1451574000
            )}
        />
      )}
      {activeTab === "div2-2013" && (
        <RegularTable
          domain="codeforces"
          contests={contests
            .filter((v) => v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => v.Rated === "2" || v.Rated === "12")
            .filter((v) => v.StartTimeSeconds < 1387893600)}
        />
      )}
      {activeTab === "div2-others" && (
        <OthersTable
          domain="codeforces"
          contests={contests
            .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => !v.Title.match(/^Educational/))
            .filter((v) => v.Rated === "2" || v.Rated === "12")}
        />
      )}
      {activeTab === "div3" && (
        <RegularTable
          domain="codeforces"
          contests={contests.filter((v) => v.Rated === "3")}
        />
      )}
      {activeTab === "educational" && (
        <OthersTable
          domain="codeforces"
          contests={contests.filter((v) => v.Title.match(/^Educational/))}
        />
      )}
      {activeTab === "others-2018" && (
        <OthersTable
          domain="codeforces"
          contests={contests
            .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => !v.Title.match(/^Educational/))
            .filter((v) => v.Rated === "-")
            .filter((v) => 1514732400 <= v.StartTimeSeconds)}
        />
      )}
      {activeTab === "others-2016" && (
        <OthersTable
          domain="codeforces"
          contests={contests
            .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => !v.Title.match(/^Educational/))
            .filter((v) => v.Rated === "-")
            .filter(
              (v) =>
                1451574000 <= v.StartTimeSeconds &&
                v.StartTimeSeconds < 1514732400
            )}
        />
      )}
      {activeTab === "others-2014" && (
        <OthersTable
          domain="codeforces"
          contests={contests
            .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => !v.Title.match(/^Educational/))
            .filter((v) => v.Rated === "-")
            .filter(
              (v) =>
                1387893600 <= v.StartTimeSeconds &&
                v.StartTimeSeconds < 1451574000
            )}
        />
      )}
      {activeTab === "others-2013" && (
        <OthersTable
          domain="codeforces"
          contests={contests
            .filter((v) => !v.Title.match(/Round #[0-9]{1,3}/))
            .filter((v) => !v.Title.match(/^Educational/))
            .filter((v) => v.Rated === "-")
            .filter((v) => v.StartTimeSeconds < 1387893600)}
        />
      )}
    </React.Fragment>
  );
};

export default CodeforcesTable;
