import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Contest } from "../../types/apiResponse";
import { RegularTable, OthersTable } from './InnerTable';

type Props = {
  contests: Contest[]
}

const CodeforcesTable: React.FC<Props> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("cr1");

  let [cr1, cr2, cr3, educational, othersRated, others] :
    [Contest[], Contest[], Contest[], Contest[], Contest[], Contest[]] = [[], [], [], [], [], []];
  contests.forEach((contest, k) => {
    if (contest.Title.match(/Round #[0-9]{1,3}/)) {
      if (contest.Rated.match(/^12$/)) {
        cr1.push(contest);
        cr2.push(contest);
      }
      else if (contest.Rated.match(/^1$/)) cr1.push(contest)
      else if (contest.Rated.match(/^2$/)) cr2.push(contest)
      else if (contest.Rated.match(/^3$/)) cr3.push(contest)
    }
    else if (contest.Title.match(/^Educational/)) educational.push(contest)
    else if (contest.Rated.match(/^-$/)) others.push(contest)
    else othersRated.push(contest)
  })

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        <Nav.Item>
          <Nav.Link eventKey="cr1"># Div1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="cr2"># Div2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="cr3"># Div3</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="educational">Educational</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others-rated">Other Rated</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "cr1" && <RegularTable domain="codeforces" contests={cr1} />}
      {activeTab === "cr2" && <RegularTable domain="codeforces" contests={cr2} />}
      {activeTab === "cr3" && <RegularTable domain="codeforces" contests={cr3} />}
      {activeTab === "educational" && <OthersTable domain="codeforces" contests={educational} />}
      {activeTab === "others-rated" && <OthersTable domain="codeforces" contests={othersRated} />}
      {activeTab === "others" && <OthersTable domain="codeforces" contests={others} />}
    </React.Fragment>
  )
}

export default CodeforcesTable;