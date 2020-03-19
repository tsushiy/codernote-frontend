import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InnerEditor from './InnerEditor';
import { AppState } from '../../types/appState';
import { cachedProblemArray, cachedContestArray, cachedProblemMap } from '../../utils/cachedApiClient';
import { Problem, Contest, ProblemNo, ProblemMap } from "../../types/apiResponse";
import { getMyNote, postMyNote } from '../../utils/apiClient';

const EditorContainer: React.FC<any> = (props) => {
  const problemNo = Number(props.match.params.problemNo);
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [text, setText] = useState("");
  const [pub, setPub] = useState(false);
  const [problemMap, setProblemMap] = useState<ProblemMap>(new Map<ProblemNo, Problem>());

  const dispatch = useDispatch();
  const { isLoggedIn, name } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    (async() => {
      const [problemMap] = await Promise.all([
        cachedProblemMap()
      ])
      setProblemMap(problemMap)
      console.log(problemMap.get(problemNo))
    })();
  }, [])

  useEffect(() => {
    setIsFetchTried(false)
  }, [isLoggedIn])

  useEffect(() => {
    if (isFetchTried) return;
    setIsFetchTried(true);
    (async() => {
      const note = await getMyNote(problemNo)
      if (note !== undefined) {
        console.log(note);
        setText(note.Text);
        setPub((note.Public === 2) ? true : false);
      }
    })();
  }, [isFetchTried])

  const onSubmitText = async (text: string) => {
    await postMyNote(problemNo, text, pub);
    setIsFetchTried(false);
  }

  return (
    <React.Fragment>
      <h1>{problemMap.get(problemNo)?.Title}</h1>
      <InnerEditor text={text} onSubmitText={onSubmitText}/>
    </React.Fragment>
  )
}

export default EditorContainer;