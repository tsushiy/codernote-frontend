import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { GlobalState } from "../../types/globalState";
import { Contest } from "../../types/apiResponse";
import { ContestLink } from "../Elements/ContestLink";
import TableCell from "./TableCell";

type RowTableProps = {
  domain: string;
  contest: Contest;
};

type RegularTableProps = {
  domain: string;
  contests: Contest[];
};

type OthersTableProps = {
  domain: string;
  contests: Contest[];
};

export const RegularTable: React.FC<RegularTableProps> = (
  props: RegularTableProps
) => {
  const { contests } = props;
  const maxProblemCount = contests.reduce(
    (currentCount, { ProblemNoList }) =>
      Math.max(ProblemNoList.length, currentCount),
    0
  );
  const header = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ].slice(0, maxProblemCount);

  return (
    <StyledRegularTable className="table-responsive-sm table-bordered">
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
            <th scope="row">
              <ContestLink contest={contest} useShortName={true} />
            </th>
            {header.map((_, j) => (
              <React.Fragment key={j}>
                {contest.ProblemNoList[j] !== undefined ? (
                  <TableCell key={j} problemNo={contest.ProblemNoList[j]} />
                ) : null}
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledRegularTable>
  );
};

export const OthersTable: React.FC<OthersTableProps> = (
  props: OthersTableProps
) => {
  const { contests } = props;
  return (
    <OthersTableContainer>
      {contests &&
        Object.values(contests).map((contest, k) => (
          <div key={k}>
            <div className="other-contest-title">
              <ContestLink contest={contest} />
            </div>
            <StyledOthersTable className="table-responsive-sm">
              <tbody>
                <tr>
                  {contest.ProblemNoList.map((e, i) => (
                    <TableCell key={i} problemNo={e} />
                  ))}
                </tr>
              </tbody>
            </StyledOthersTable>
          </div>
        ))}
    </OthersTableContainer>
  );
};

export const RowTable: React.FC<RowTableProps> = (props: RowTableProps) => {
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
      const x = useFrontendID
        ? Number(problemMap.get(a)?.FrontendID)
        : Number(problemMap.get(a)?.ProblemID);
      const y = useFrontendID
        ? Number(problemMap.get(b)?.FrontendID)
        : Number(problemMap.get(b)?.ProblemID);
      if (!isNaN(x) && !isNaN(y)) {
        return x - y;
      } else {
        return 0;
      }
    });
  }

  return (
    <StyledRowTable className="table-sm table-responsive-sm table-bordered">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Problem</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {contest &&
          contest.ProblemNoList.map((e, i) => (
            <tr key={i}>
              <th scope="row">
                {useFrontendID
                  ? problemMap.get(e)?.FrontendID
                  : problemMap.get(e)?.ProblemID}
              </th>
              <TableCell problemNo={e} />
            </tr>
          ))}
      </tbody>
    </StyledRowTable>
  );
};

const StyledRegularTable = styled(Table)`
  &&& {
    table-layout: fixed;
    word-wrap: break-word;

    caption {
      caption-side: top;
      color: #000;
    }

    @media (max-width: 767px) {
      table-layout: auto;
      display: block;

      thead {
        display: none;
      }

      tbody,
      tr,
      th,
      td,
      caption {
        display: block;
      }
    }
  }
`;

const OthersTableContainer = styled.div`
  word-wrap: break-word;
  padding-top: "12px";

  .other-contest-title {
    font-weight: bold;
    padding-top: 0.75em;
    padding-bottom: 0.3em;
  }
`;

const StyledOthersTable = styled(Table)`
  &&& {
    table-layout: fixed;
    word-wrap: break-word;
    border-top: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;

    tr {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    td {
      border-top: none;
      border-right: 1px solid #dee2e6;
      border-bottom: 1px solid #dee2e6;
    }

    @media (max-width: 767px) {
      table-layout: auto;
      display: block;
      border: 1px solid #dee2e6;

      td {
        border: 1px solid #dee2e6;
      }

      tbody,
      tr,
      th,
      td,
      caption {
        display: block;
      }
    }
  }
`;

const StyledRowTable = styled(Table)`
  &&& {
    table-layout: fixed;
    word-wrap: break-word;

    caption {
      caption-side: top;
      color: #000;
    }

    @media (max-width: 767px) {
      table-layout: auto;
      display: block;

      thead {
        display: none;
      }

      tbody,
      tr,
      th,
      td,
      caption {
        display: block;
      }
    }
  }
`;
