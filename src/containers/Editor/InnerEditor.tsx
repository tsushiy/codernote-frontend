import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import unified from 'unified';
import markdown from 'remark-parse';
import breaks from "remark-breaks";
import math from 'remark-math'
import htmlKatex from 'remark-html-katex';
import hljs from 'remark-highlight.js';
import html from 'remark-html';
import gh from 'hast-util-sanitize/lib/github.json';
import merge from 'deepmerge';

import EditorPane from '../../components/Editor/EditorPane';
import PreviewPane from '../../components/Editor/PreviewPane';
import { changeShowPreview } from '../../reducers/editorReducer';
import { AppState } from '../../types/appState';

const InnerEditor: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const { showPreview } = useSelector((state: AppState) => { return state.editor })

  const [text, setText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [message, setMessage] = useState("");

  const schema = merge(gh, {
    attributes: {
      '*': ['className', 'style']
    }
  });

  const processor =
    unified()
      .use(markdown)
      .use(breaks)
      .use(math)
      .use(htmlKatex)
      .use(hljs)
      .use(html, {sanitize: schema});

  const compile = (txt: string) => {
    setText(txt);
    try {
      const { contents } = processor.processSync(txt);
      setHtmlText(contents as string);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    compile(props.text);
  }, [props.text])

  const onSubmitText = () => { props.onSubmitText(text); }

  const onChangeText = (txt: string) => {
    compile(txt);
  };

  const onClickPreview = useCallback(
    (ev: any) => {
      ev.preventDefault();
      dispatch(changeShowPreview(!showPreview));
    },
    [dispatch, showPreview]
  );

  return (
    <React.Fragment>
      <StyledEditorContainer>
        <EditorPane
          onChangeText={onChangeText}
          onClickPreview={onClickPreview}
          onSubmitText={onSubmitText}
          text={text} />
        {showPreview &&
          <PreviewPane htmlText={htmlText} message={message} />
        }
      </StyledEditorContainer>
    </React.Fragment>
  )
}

const StyledEditorContainer = styled.div`
  display: flex;
`;

export default InnerEditor;