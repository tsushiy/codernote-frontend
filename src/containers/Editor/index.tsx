import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InnerEditor from './InnerEditor';
import { AppState } from '../../types/appState';
import { getMyNote, postMyNote } from '../../utils/apiClient';
import { isPublicNote } from '../../types/apiResponse';

const EditorContainer: React.FC<any> = (props) => {
  const problemNo = Number(props.match.params.problemNo);
  const [isFetchTried, setIsFetchTried] = useState(false);
  const [text, setText] = useState("");
  const [pub, setPub] = useState(false);

  const { isLoggedIn, userName } = useSelector((state: AppState) => state.auth);
  const { problemMap } = useSelector((state: AppState) => state.contest);

  useEffect(() => {
    setIsFetchTried(false)
  }, [isLoggedIn])

  useEffect(() => {
    if (isFetchTried) return;
    setIsFetchTried(true);
    (async() => {
      const note = await getMyNote(problemNo);
      if (note !== undefined) {
        setText(note.Text);
        setPub(isPublicNote(note));
      }
    })();
  }, [isFetchTried])

  const onSubmitText = async (text: string) => {
    await postMyNote(problemNo, text, pub);
    setIsFetchTried(false);
  }

  return (
    <div className="container">
      <h1>{problemMap.get(problemNo)?.Title}</h1>
      <InnerEditor text={text} onSubmitText={onSubmitText}/>
    </div>
  )
}

export default EditorContainer;