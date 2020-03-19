import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  title: string | undefined
  problemNo: number | undefined
}

const TableCell: React.FC<Props> = (props) => {
  const { title, problemNo } = props;
  const url = `/my/${problemNo}`;

  return (
    <Link to={url}>{title}</Link>
  )
}

export default TableCell;