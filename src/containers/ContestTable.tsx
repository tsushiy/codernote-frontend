import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import TableCell from '../components/TableCell';
import { AppState } from '../types';

const ContestTable: React.FC<any> = (props) => {
  const { isApiFetched, contests, problems, contestToProblems } = useSelector((state: AppState) => { return state.contest })
  const host = props.match.params.host;

  const InnerContestTable = () => {
    switch (host) {
      case "atcoder":
        return (
          <React.Fragment>
            {!isApiFetched && <div>Loading...</div>}
            {isApiFetched && Array.from(contests.entries()).map((value, key) => (
              <React.Fragment key={key}>
                <div>
                  {value[1].title}
                  <Table>
                    <tbody>
                      <tr>
                        {contestToProblems.get(value[0])?.map((e: string) => (
                          <th key={e}>
                            <TableCell host={host} id={e} title={problems?.get(e)?.title}></TableCell>
                          </th>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      default:
        return null;
    }
  }

  return (
    <React.Fragment>
      {InnerContestTable()}
    </React.Fragment>
  )
}

export default ContestTable;