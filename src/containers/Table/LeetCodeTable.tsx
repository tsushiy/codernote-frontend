import React, { useState } from 'react';
import { Table, Nav } from 'react-bootstrap';
import TableCell from '../../components/Table/TableCell';
import { Contest, ProblemMap } from "../../types/apiResponse";
import styled from "styled-components";

type InnerProps = {
  contest: Contest
  problemMap: ProblemMap
}

type OuterProps = {
  contests: Contest[]
  problemMap: ProblemMap
}

const LeetCodeInnerTable: React.FC<InnerProps> = props => {
  if (props.contest !== undefined) {
    props.contest.ProblemNoList.sort((a, b) => {
      const x = Number(props.problemMap.get(a)?.FrontendID)
      const y = Number(props.problemMap.get(b)?.FrontendID)
      if (!isNaN(x) && !isNaN(y)) {
        return x - y
      } else {
        return 0
      }
    })
  }
  return (
    <StyledTable className="table-sm table-responsive-sm table-bordered table-hover">
      <thead>
        <tr>
          <th style={{width: "25%"}}>Problem</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {props.contest && props.contest.ProblemNoList.map((v, i) => (
          <tr key={i}>
            <th scope="row">{props.problemMap.get(v)?.FrontendID}</th>
            <td>
              <TableCell
                title={props.problemMap.get(v)?.Title}
                problemNo={props.problemMap.get(v)?.No}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

const LeetCodeTable: React.FC<OuterProps> = props => {
  const [activeTab, setActiveTab] = useState("algorithms");
  const contests = props.contests;
  const problemMap = props.problemMap;

  const categories = ["algorithms", "database", "shell", "concurrency"]

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        {categories.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v.toUpperCase()}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {categories.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() &&
            <LeetCodeInnerTable contest={contests.filter(contest => contest.ContestID.match(new RegExp(`^${v}$`)))[0]} problemMap={problemMap} />}
        </React.Fragment>
      ))}
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

export default LeetCodeTable;