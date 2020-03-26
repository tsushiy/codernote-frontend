import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InnerEditor from './InnerEditor';
import { AppState } from '../../types/appState';
import { getMyNote, postMyNote } from '../../utils/apiClient';

const EditorContainer: React.FC<any> = (props) => {
  const problemNo = Number(props.match.params.problemNo);
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [text, setText] = useState("");
  const [pub, setPub] = useState(false);

  const { isLoggedIn, name } = useSelector((state: AppState) => state.auth);
  const { problemMap } = useSelector((state: AppState) => state.contest);

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