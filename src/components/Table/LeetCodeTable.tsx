import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Nav } from 'react-bootstrap';
import styled from "styled-components";
import TableCell from '../../components/Table/TableCell';
import { Contest } from "../../types/apiResponse";
import { AppState } from '../../types/appState';

type InnerProps = {
  contest: Contest
}

type OuterProps = {
  contests: Contest[]
}

const LeetCodeInnerTable: React.FC<InnerProps> = props => {
  const { problemMap } = useSelector((state: AppState) => state.problem);

  if (props.contest !== undefined) {
    props.contest.ProblemNoList.sort((a, b) => {
      const x = Number(problemMap.get(a)?.FrontendID)
      const y = Number(problemMap.get(b)?.FrontendID)
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
        {props.contest && props.contest.ProblemNoList.map((e, i) => (
          <tr key={i}>
            <th scope="row">{problemMap.get(e)?.FrontendID}</th>
            <td>
              <TableCell problemNo={e} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

const LeetCodeTable: React.FC<OuterProps> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("algorithms");

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
            <LeetCodeInnerTable contest={contests.filter(contest => contest.ContestID.match(new RegExp(`^${v}$`)))[0]} />}
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