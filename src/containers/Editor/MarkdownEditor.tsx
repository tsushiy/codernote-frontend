import React from 'react';
import styled from "styled-components";

type Props = {
  showPreview: boolean,
  rawText: string,
  onChangeText: (txt: string) => void
}

const MarkdownEditor: React.FC<Props> = props => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChangeText(e.target.value)
  };

  return (
    <div style={{position: "absolute", width: props.showPreview ? "50%" : "100%", height: "100%"}}>
      <StyledTextarea
        defaultValue={props.rawText}
        placeholder={"Write something in Markdown."}
        onChange={onChange}
      />
    </div>
  )
}

const StyledTextarea = styled.textarea`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 14px;
  border: none;
  resize: none;
  outline: none;
`;

export default MarkdownEditor;