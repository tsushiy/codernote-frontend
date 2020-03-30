import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppState } from '../../types/appState';

type Props = {
  problemNo: number
}

const TableCell: React.FC<Props> = (props) => {
  const { problemNo } = props;
  const { problemMap } = useSelector((state: AppState) => state.problem);
  const { myNotesMap } = useSelector((state: AppState) => state.note);

  const noteExists = myNotesMap.has(problemNo);
  const problem = problemMap.get(problemNo);
  const title = problem?.Title;
  const editUrl = `/my/${problemNo}`;

  let problemUrl = "";
  if (problem) {
    switch (problem.Domain) {
      case "atcoder":
        problemUrl = `https://atcoder.jp/contests/${problem.ContestID}/tasks/${problem.ProblemID}`;
        break;
      case "codeforces":
        problemUrl = `https://codeforces.com/contest/${problem.ContestID}/problem/${problem.ProblemID}`
        break;
      case "yukicoder":
        problemUrl = `https://yukicoder.me/problems/no/${problem.FrontendID}`
        break;
      case "aoj":
        problemUrl = `https://onlinejudge.u-aizu.ac.jp/problems/${problem.ProblemID}`
        break;
      case "leetcode":
        problemUrl = `https://leetcode.com/problems/${problem.Slug}/`
        break;
    }
  }

  return (
    <Container>
      <div>
        <Link to={editUrl} style={{color: noteExists ? "#39c" : "#555", fontSize: "0.9em", fontWeight: "bold"}}>
          Edit
        </Link>
      </div>
      <a href={problemUrl} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TableCell;