import React from 'react';
import { Table, Tab, Nav } from 'react-bootstrap';
import TableCell from '../../components/Table/TableCell';
import { Contest, ProblemMap } from "../../types/apiResponse";
import styled from "styled-components";

type Props = {
  contests: Contest[]
  problemMap: ProblemMap
}

const AtCoderRegularTable: React.FC<Props> = props => {
  const maxProblemCount = props.contests.reduce(
    (currentCount, { ProblemNoList }) =>
      Math.max(ProblemNoList.length, currentCount), 0);
  const header = ["A", "B", "C", "D", "E", "F", "F2"].slice(0, maxProblemCount);
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
            <th scope="row">{contest.ContestID.toUpperCase()}</th>
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

const AtCoderOthersTable: React.FC<Props> = props => {
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

const AtCoderTable: React.FC<Props> = props => {
  const contests = props.contests;
  const problemMap = props.problemMap;

  let [abc, arc, agc, others] : [Contest[], Contest[], Contest[], Contest[]] = [[], [], [], []]
  contests.forEach((contest, k) => {
    if (contest.ContestID.match(/^abc\d{3}$/)) abc.push(contest)
    else if (contest.ContestID.match(/^arc\d{3}$/)) arc.push(contest)
    else if (contest.ContestID.match(/^agc\d{3}$/)) agc.push(contest)
    else others.push(contest)
  })

  return (
    <Tab.Container id="atcoder-tabs" defaultActiveKey="abc" transition={false}>
      <Nav variant="pills" className="flex-row">
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
          <Nav.Link eventKey="other">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="abc">
          <AtCoderRegularTable contests={abc} problemMap={problemMap} />
        </Tab.Pane>
        <Tab.Pane eventKey="arc">
          <AtCoderRegularTable contests={arc} problemMap={problemMap} />
        </Tab.Pane>
        <Tab.Pane eventKey="agc">
          <AtCoderRegularTable contests={agc} problemMap={problemMap} />
        </Tab.Pane>
        <Tab.Pane eventKey="other">
          <AtCoderOthersTable contests={others} problemMap={problemMap} />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
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

export default AtCoderTable;