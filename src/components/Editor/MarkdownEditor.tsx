import React from "react";
import styled from "styled-components";

type Props = {
  editorPreviewMode: string;
  rawText: string;
  setRawText: (text: React.SetStateAction<string>) => void;
};

const MarkdownEditor: React.FC<Props> = (props: Props) => {
  const display = props.editorPreviewMode === "preview" ? "none" : "block";
  let width;
  switch (props.editorPreviewMode) {
    case "edit":
      width = "100%";
      break;
    case "both":
      width = "50%";
      break;
  }

  return (
    <Container style={{ display, width }}>
      <StyledTextarea
        defaultValue={props.rawText}
        placeholder={"Write something in Markdown."}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          props.setRawText(e.target.value);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  overflow: auto;
  height: 100%;
  left: 0;
  border: solid thin #ccc;
  border-top: none;
  border-collapse: collapse;
`;

const StyledTextarea = styled.textarea`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 12px 14px;
  border: none;
  resize: none;
  outline: none;
`;

export default MarkdownEditor;
