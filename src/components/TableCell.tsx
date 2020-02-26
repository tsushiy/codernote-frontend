import React from 'react';
import { Link } from 'react-router-dom';

const TableCell: React.FC<any> = (props) => {
  const { host, title, id } = props;
  const url = `/${host}/${id}`;

  return (
    <Link to={url}>{title}</Link>
  )
}

export default TableCell;