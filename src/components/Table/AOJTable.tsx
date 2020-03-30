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

const AOJInnerTable: React.FC<InnerProps> = props => {
  const { problemMap } = useSelector((state: AppState) => state.problem);

  if (props.contest !== undefined) {
    props.contest.ProblemNoList.sort((a, b) => {
      const x = Number(problemMap.get(a)?.ProblemID)
      const y = Number(problemMap.get(b)?.ProblemID)
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
            <th scope="row">{problemMap.get(e)?.ProblemID}</th>
            <td>
              <TableCell problemNo={e} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

const AOJTable: React.FC<OuterProps> = props => {
  const { contests } = props;
  const [activeTab, setActiveTab] = useState("joi");

  const courses = ["ITP1", "ALDS1", "ITP2", "DSL", "DPL", "GRL", "CGL", "NTL"]
  const cl = ["JOI","PCK","ICPC","JAG","VPC","UOA"]

  return (
    <React.Fragment>
      <Nav
        variant="tabs"
        className="flex-row"
        defaultActiveKey={activeTab}
        onSelect={(eventKey: string) => setActiveTab(eventKey)}>
        {cl.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v}</Nav.Link>
          </Nav.Item>
        ))}
        {courses.map((v, k) => (
          <Nav.Item key={k}>
            <Nav.Link eventKey={v.toLowerCase()}>{v}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      {cl.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() &&
            <AOJInnerTable contest={contests.filter(contest => contest.ContestID.match(new RegExp(`^${v}$`)))[0]} />}
        </React.Fragment>
      ))}
      {courses.map((v, k) => (
        <React.Fragment key={k}>
          {activeTab === v.toLowerCase() &&
            <AOJInnerTable contest={contests.filter(contest => contest.ContestID.match(new RegExp(`^${v}$`)))[0]} />}
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

export default AOJTable;