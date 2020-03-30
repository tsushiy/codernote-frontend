import React, { useState } from 'react';
import { Table, Nav } from 'react-bootstrap';
import TableCell from '../../containers/Table/TableCell';
import { Contest } from "../../types/apiResponse";
import styled from "styled-components";

type Props = {
  contests: Contest[]
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

const AtCoderTable: React.FC<Props> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("abc");

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
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
          <Nav.Link eventKey="others-rated">Other Rated</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "abc" && <AtCoderRegularTable contests={contests.filter(v => v.ContestID.match(/^abc\d{3}$/))} />}
      {activeTab === "arc" && <AtCoderRegularTable contests={contests.filter(v => v.ContestID.match(/^arc\d{3}$/))} />}
      {activeTab === "agc" && <AtCoderRegularTable contests={contests.filter(v => v.ContestID.match(/^agc\d{3}$/))} />}
      {activeTab === "others-rated" && <AtCoderOthersTable contests={contests.filter(v => !v.ContestID.match(/^a[brg]c\d{3}$/) && (v.Rated !== "-"))} />}
      {activeTab === "others" && <AtCoderOthersTable contests={contests.filter(v => !v.ContestID.match(/^a[brg]c\d{3}$/) && (v.Rated === "-"))} />}
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

export default AtCoderTable;