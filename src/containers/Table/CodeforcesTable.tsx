import React, { useState } from 'react';
import { Table, Nav } from 'react-bootstrap';
import TableCell from '../../components/Table/TableCell';
import { Contest, ProblemMap } from "../../types/apiResponse";
import styled from "styled-components";

type Props = {
  contests: Contest[]
  problemMap: ProblemMap
}

const CodeforcesRegularTable: React.FC<Props> = props => {
  const maxProblemCount = props.contests.reduce(
    (currentCount, { ProblemNoList }) =>
      Math.max(ProblemNoList.length, currentCount), 0);
  const header = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].slice(0, maxProblemCount);

  return (
    <StyledTable className="table-responsive-sm table-bordered table-hover">
      <thead>
        <tr>
          <th>Contest</th>
          {header.map((e, k) => (
            <th key={k}>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.contests.map((contest, i) => (
          <tr key={i}>
            <th scope="row">{contest.Title.match(/#[0-9]{1,3}/)}</th>
            {header.map((_, j) => (
              <React.Fragment key={j}>
                {contest.ProblemNoList[j] !== undefined
                  ? <td key={j}>
                      <TableCell
                        title={props.problemMap.get(contest.ProblemNoList[j])?.Title}
                        problemNo={props.problemMap.get(contest.ProblemNoList[j])?.No}
                      />
                    </td>
                  : null}
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

const CodeforcesOthersTable: React.FC<Props> = props => {
  return (
    <React.Fragment>
      {props.contests && Object.values(props.contests).map((contest, k) => (
        <StyledTable key={k} className="table-responsive-sm table-bordered table-hover">
          <caption>{contest.Title}</caption>
          <tbody>
            <tr>
              {contest.ProblemNoList.map((e, i) => (
                <td key={i}>
                  <TableCell
                    title={props.problemMap.get(e)?.Title}
                    problemNo={props.problemMap.get(e)?.No}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </StyledTable>
      ))}
    </React.Fragment>
  )
}

const CodeforcesTable: React.FC<Props> = props => {
  const [activeTab, setActiveTab] = useState("cr1");
  const contests = props.contests;
  const problemMap = props.problemMap;

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
      {activeTab === "cr1" && <CodeforcesRegularTable contests={cr1} problemMap={problemMap} />}
      {activeTab === "cr2" && <CodeforcesRegularTable contests={cr2} problemMap={problemMap} />}
      {activeTab === "cr3" && <CodeforcesRegularTable contests={cr3} problemMap={problemMap} />}
      {activeTab === "educational" && <CodeforcesOthersTable contests={educational} problemMap={problemMap} />}
      {activeTab === "others-rated" && <CodeforcesOthersTable contests={othersRated} problemMap={problemMap} />}
      {activeTab === "others" && <CodeforcesOthersTable contests={others} problemMap={problemMap} />}
    </React.Fragment>
  )
}

const StyledTable = styled(Table)`
  &&& {
    table-layout: fixed;
    width: 100%;
    word-wrap: break-word;

    & > caption {
      caption-side: top;
      color: #000;
    }

    @media (max-width: 767px) {
      table-layout: auto;
      display: block;
      & > thead {
        display: none;
      }
      & > tbody, tr, th, td, caption {
        display: block;
      }
    }
  }
`

export default CodeforcesTable;