import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Pagination, Form } from "react-bootstrap";
import styled from "styled-components";
import { GlobalState } from "../../types/globalState";
import { paginationList, escapedText } from "../../utils/filter";
import { serviceName } from "../../utils/problemUtil";
import { ContestLink } from "../Elements/ContestLink";
import TableCell from "./TableCell";

const SearchTable: React.FC<{}> = () => {
  const { problems, contestMap } = useSelector(
    (state: GlobalState) => state.problem
  );
  const [query, setQuery] = useState("");
  const [currPage, setCurrPage] = useState(1);

  const limit = 100;
  const pattern = new RegExp(escapedText(query), "i");
  const filteredProblems =
    query === "" ? [] : problems.filter((v) => pattern.test(v.Title));
  const limitedProblems = filteredProblems.slice(
    limit * (currPage - 1),
    limit * currPage
  );
  const maxPage = Math.max(1, Math.ceil(filteredProblems.length / limit));
  const pages = paginationList(currPage, maxPage);

  return (
    <div style={{ padding: "22px 6px 12px" }}>
      <Form>
        <Form.Group controlId="problem-name">
          <Form.Control
            type="text"
            placeholder="Search Problems"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              setCurrPage(1);
            }}
          />
        </Form.Group>
      </Form>
      <Pagination style={{ justifyContent: "center" }}>
        {pages.map((page, k) => (
          <Pagination.Item
            key={k}
            active={page === currPage}
            onClick={() => setCurrPage(page)}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
      <StyledTable className="table-sm table-responsive-sm">
        <thead>
          <tr>
            <th style={{ width: "90px" }}>Service</th>
            <th style={{ width: "35%" }}>Contest</th>
            <th>Problem</th>
          </tr>
        </thead>
        <tbody>
          {limitedProblems.map((problem, i) => (
            <tr key={i}>
              <td
                className="ignore-sm"
                style={{ textAlign: "center", padding: "1rem .3rem" }}
              >
                {serviceName(problem.Domain)}
              </td>
              <td className="ignore-sm" style={{ padding: "1rem .3rem" }}>
                <ContestLink
                  contest={contestMap.get(problem.Domain + problem.ContestID)}
                />
              </td>
              <TableCell key={i} problemNo={problem.No} />
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

const StyledTable = styled(Table)`
  &&& {
    table-layout: fixed;
    word-wrap: break-word;

    @media (max-width: 767px) {
      table-layout: auto;
      display: block;

      thead,
      .ignore-sm {
        display: none;
      }

      tbody,
      tr,
      th,
      td {
        display: block;
      }
    }
  }
`;

export default SearchTable;
