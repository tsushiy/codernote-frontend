import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import styled from "styled-components";
import { GlobalState } from '../../types/globalState';
import { Contest } from "../../types/apiResponse";
import TableCell from './TableCell';

type RowTableProps = {
  domain: string;
  contest: Contest;
}

type RegularTableProps = {
  domain: string;
  contests: Contest[]
}

type OthersTableProps = {
  domain: string;
  contests: Contest[]
}

export const RegularTable: React.FC<RegularTableProps> = props => {
  const { domain, contests } = props;
  const maxProblemCount = contests.reduce(
    (currentCount, { ProblemNoList }) =>
      Math.max(ProblemNoList.length, currentCount), 0);
  const header = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"].slice(0, maxProblemCount);

  const title = (contest: Contest) => {
    if (domain === "codeforces") {
      return contest.Title.match(/#[0-9]{1,3}/);
    } else {
      return contest.ContestID.toUpperCase();
    }
  }

  return (
    <StyledRegularTable className="table-responsive-sm table-bordered table-hover">
      <thead>
        <tr>
          <th>Contest</th>
          {header.map((e, k) => (
            <th key={k}>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {contests.map((contest, i) => (
          <tr key={i}>
            <th scope="row">{title(contest)}</th>
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
    </StyledRegularTable>
  )
}

export const OthersTable: React.FC<OthersTableProps> = props => {
  const { domain, contests } = props;
  return (
    <div>
      {contests && Object.values(contests).map((contest, k) => (
        <StyledOthersTable key={k} className="container">
          <div className="other-contest-title">{contest.Title}</div>
          <div className="row">
            {contest.ProblemNoList.map((e, i) => (
              <div className="other-contest-col col-md-2" key={i}>
                <TableCell problemNo={e} />
              </div>
            ))}
          </div>
        </StyledOthersTable>
      ))}
    </div>
  )
}

export const RowTable: React.FC<RowTableProps> = props => {
  const { problemMap } = useSelector((state: GlobalState) => state.problem);
  const { domain, contest } = props;
  let useFrontendID = false;
  switch (domain) {
    case "aoj":
      useFrontendID = false;
      break;
    case "leetcode":
      useFrontendID = true;
      break;
  }

  if (contest !== undefined) {
    contest.ProblemNoList.sort((a, b) => {
      const x = useFrontendID ? Number(problemMap.get(a)?.FrontendID) : Number(problemMap.get(a)?.ProblemID);
      const y = useFrontendID ? Number(problemMap.get(b)?.FrontendID) : Number(problemMap.get(b)?.ProblemID);
      if (!isNaN(x) && !isNaN(y)) {
        return x - y
      } else {
        return 0
      }
    })
  }

  return (
    <StyledRowTable className="table-sm table-responsive-sm table-bordered table-hover">
      <thead>
        <tr>
          <th style={{width: "25%"}}>Problem</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {contest && contest.ProblemNoList.map((e, i) => (
          <tr key={i}>
            <th scope="row">{useFrontendID ? problemMap.get(e)?.FrontendID : problemMap.get(e)?.ProblemID}</th>
            <td>
              <TableCell problemNo={e} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledRowTable>
  )
}

const StyledRegularTable = styled(Table)`
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

const StyledOthersTable = styled.div`
  padding-bottom: 1em;
  word-wrap: break-word;

  .other-contest-col {
    padding: .75em;
    border: 1px solid #dee2e6;
  }

  .other-contest-title {
    font-size: 1.2em;
    padding-top: .75em;
    padding-bottom: .75em;
  }
`

const StyledRowTable = styled(Table)`
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