import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Pagination, Badge } from "react-bootstrap";
import styled from "styled-components";
import { MainContainer } from "../Styles";
import { paginationList } from "../../utils/filter";
import { serviceName } from "../../utils/problemUtil";
import { submissionUrl, isAccepted } from "../../utils/submissionUtil";
import { GlobalState } from "../../types/globalState";
import { ProblemLinkWithID } from "../Elements/ProblemLink";
import { EditButton, ViewButton } from "../Elements/NoteLink";
import { NotesLinkButton } from "../Elements/NotesLink";

const SubmissionsPage: React.FC<{}> = () => {
  const { aojID } = useSelector((state: GlobalState) => state.auth);
  const { myNotesMap } = useSelector((state: GlobalState) => state.note);
  const { problemMap, submissions } = useSelector(
    (state: GlobalState) => state.problem
  );
  const [currPage, setCurrPage] = useState(1);

  const limit = 30;
  const limitedSubmisions = submissions.slice(
    limit * (currPage - 1),
    limit * currPage
  );
  const maxPage = Math.max(1, Math.ceil(submissions.length / limit));
  const pages = paginationList(currPage, maxPage);

  return (
    <MainContainer>
      <Container>
        <h1 style={{ padding: "22px 12px 10px" }}>Submissions</h1>
        <FilterContainer>
          <PaginationContainer>
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
          </PaginationContainer>
        </FilterContainer>
        <StyledTable className="table-responsive-sm table-hover" size="sm">
          <thead>
            <tr>
              <th style={{ width: "18%" }}>Date</th>
              <th style={{ width: "10%" }}>Service</th>
              <th>Problem</th>
              <th style={{ width: "5%" }}>Status</th>
              <th style={{ width: "16%" }}>Language</th>
              <th style={{ width: "7%" }}>Detail</th>
              <th style={{ width: "10%" }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {limitedSubmisions.map((submission, i) => (
              <tr key={i}>
                <td className="text-center">
                  {new Date(submission.date * 1000).toLocaleString()}
                </td>
                <td className="text-center">
                  {serviceName(submission.domain)}
                </td>
                <td>
                  <ProblemLinkWithID
                    problem={problemMap.get(submission.problemNo)}
                  />
                  <NotesLinkButton problemNo={submission.problemNo} />
                </td>
                <td className="text-center">
                  <Badge
                    pill
                    variant={isAccepted(submission) ? "success" : "warning"}
                  >
                    {submission.status}
                  </Badge>
                </td>
                <td>{submission.language}</td>
                <td className="text-center">
                  {submission.id !== 0 && (
                    <a
                      href={submissionUrl(submission, aojID)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Detail
                    </a>
                  )}
                </td>
                <td className="text-center">
                  <EditButton problemNo={submission.problemNo} />
                  {myNotesMap.has(submission.problemNo) && (
                    <React.Fragment>
                      {" / "}
                      <ViewButton note={myNotesMap.get(submission.problemNo)} />
                    </React.Fragment>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Container>
    </MainContainer>
  );
};

const Container = styled.div`
  display: block;
  position: relative;
  padding: 0 6px 0;
`;

const FilterContainer = styled.div`
  display: block;
  word-wrap: break-word;
`;

const PaginationContainer = styled.div`
  display: block;
  width: 100%;
`;

const StyledTable = styled(Table)`
  &&& {
    color: #444;
    font-size: 0.98em;
  }
`;

export default SubmissionsPage;
