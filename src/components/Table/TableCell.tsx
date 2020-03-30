import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../types/appState';

type Props = {
  problemNo: number
}

const TableCell: React.FC<Props> = (props) => {
  const { problemNo } = props;
  const { problemMap } = useSelector((state: AppState) => state.problem);

  const title = problemMap.get(problemNo)?.Title;
  const url = `/my/${problemNo}`;

  return (
    <Link to={url}>{title}</Link>
  )
}

export default TableCell;