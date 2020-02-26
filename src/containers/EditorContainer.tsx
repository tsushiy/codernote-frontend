import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase'
import InnerEditor from './InnerEditor';
import { save } from '../reducers/editorReducer';
import { AppState } from '../types';

const EditorContainer: React.FC<any> = (props) => {
  const docId = props.match.params.host + "-" + props.match.params.id;
  const [text, setText] = useState("");
  const { problems } = useSelector((state: AppState) => { return state.contest })
  const title = problems.get(props.match.params.id)?.title;

  const dispatch = useDispatch();
  const auth: any = useSelector<any>(state => state.firebase.auth);

  useFirestoreConnect([{
    collection: 'users',
    doc: auth.uid,
  }])

  const notes: any = useSelector<any>(
    ({ firestore: { data } }) => data.users && data.users[auth.uid]
  )

  useEffect(() => {
    if (notes !== undefined && notes !== null && docId in notes) {
      setText(notes[docId]);
    }
  }, [docId, notes])

  const onSubmitText = (text: string) => {
    dispatch(save({docId, text}));
  }

  return (
    <React.Fragment>
      <h1>{title}</h1>
      <InnerEditor auth={auth} text={text} onSubmitText={onSubmitText}/>
    </React.Fragment>
  )
}

export default EditorContainer;