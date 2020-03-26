import React, { useState, useEffect } from 'react';
import { cachedProblemArray, cachedContestArray, cachedProblemMap } from '../../utils/cachedApiClient';
import { Problem, Contest, ProblemNo, ProblemMap } from "../../types/apiResponse";
import { Tab, Nav} from "react-bootstrap"
import AtCoderTable from "./AtCoderTable";

const ContestTable: React.FC<{}> = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemMap, setProblemMap] = useState<ProblemMap>(new Map<ProblemNo, Problem>());

  useEffect(() => {
    (async() => {
      const [c, p, pm] = await Promise.all([
        cachedContestArray(),
        cachedProblemArray(),
        cachedProblemMap()
      ])
      setContests(c);
      setProblems(p);
      setProblemMap(pm);
    })();
  }, [])

  return (
    <div className="container">
      <Tab.Container id="domain-tabs" defaultActiveKey="atcoder" transition={false}>
        <Nav variant="pills" className="flex-row">
          <Nav.Item>
            <Nav.Link eventKey="atcoder">AtCoder</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="codeforces">Codeforces</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="atcoder">
            <AtCoderTable contests={contests} problemMap={problemMap} />
          </Tab.Pane>
          <Tab.Pane eventKey="codeforces">
            codeforces
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default ContestTable;