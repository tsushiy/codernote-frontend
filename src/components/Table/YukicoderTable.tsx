import React, { useState } from 'react';
import { Table, Nav } from 'react-bootstrap';
import TableCell from '../../components/Table/TableCell';
import { Contest } from "../../types/apiResponse";
import styled from "styled-components";

type Props = {
  contests: Contest[]
}

const YukicoderRegularTable: React.FC<Props> = props => {
  props.contests.sort((a, b) => {
    const x = Number(a)
    const y = Number(b)
    if (!isNaN(x) && !isNaN(y)) {
      return x - y
    } else {
      return 0
    }
  })
  const maxProblemCount = props.contests.reduce(
    (currentCount, { ProblemNoList }) =>
      Math.max(ProblemNoList.length, currentCount), 0);
  const header = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].slice(0, maxProblemCount);

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
                      <TableCell problemNo={contest.ProblemNoList[j]} />
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

const YukicoderOthersTable: React.FC<Props> = props => {
  props.contests.sort((a, b) => {
    const x = Number(a)
    const y = Number(b)
    if (!isNaN(x) && !isNaN(y)) {
      return x - y
    } else {
      return 0
    }
  })
  return (
    <React.Fragment>
      {props.contests && Object.values(props.contests).map((contest, k) => (
        <StyledTable key={k} className="table-responsive-sm table-bordered table-hover">
          <caption>{contest.Title}</caption>
          <tbody>
            <tr>
              {contest.ProblemNoList.map((e, i) => (
                <td key={i}>
                  <TableCell problemNo={e} />
                </td>
              ))}
            </tr>
          </tbody>
        </StyledTable>
      ))}
    </React.Fragment>
  )
}

const YukicoderTable: React.FC<Props> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("regular");

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        <Nav.Item>
          <Nav.Link eventKey="regular">Regular</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "regular" && <YukicoderRegularTable contests={contests.filter(v => v.Title.match(/^yukicoder contest/))} />}
      {activeTab === "others" && <YukicoderOthersTable contests={contests.filter(v => !v.Title.match(/^yukicoder contest/))} />}
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

export default YukicoderTable;