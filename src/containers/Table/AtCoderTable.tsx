import React from 'react';
import { Table } from 'react-bootstrap';
import TableCell from '../../components/Table/TableCell';
import { Contest, ProblemMap } from "../../types/apiResponse";
import { Tab, Nav} from "react-bootstrap"

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
    <Table responsive>
      <thead>
        <tr>
          <th>Contest</th>
          {header.map((e: string) => (
            <th key={e}>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.contests.map((contest: Contest, i) => (
          <tr key={i}>
            <td>{contest.ContestID.toUpperCase()}</td>
            {header.map((_, j) => (
              <td key={j}>
                {contest.ProblemNoList[j] !== undefined
                  ? <TableCell
                      title={props.problemMap.get(contest.ProblemNoList[j])?.Title}
                      problemNo={props.problemMap.get(contest.ProblemNoList[j])?.No}
                    />
                  : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const AtCoderOthersTable: React.FC<Props> = props => {
  return (
    <React.Fragment>
      {props.contests && Object.values(props.contests).map((contest: Contest, k) => (
        <React.Fragment key={k}>
          {contest.Title}
          <Table responsive>
            <tbody>
              <tr>
                {contest.ProblemNoList.map((e: number) => (
                  <td key={e}>
                    <TableCell
                      title={props.problemMap.get(e)?.Title}
                      problemNo={props.problemMap.get(e)?.No}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </React.Fragment>
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
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default AtCoderTable;