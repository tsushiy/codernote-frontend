import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { markdownProcessor } from "../../utils/markdownProcessor";

type Props = {
  editorPreviewMode: string;
  rawText: string;
  setAndShowMessage: (message: string) => void;
};

const EditorPreview: React.FC<Props> = (props: Props) => {
  const { rawText, setAndShowMessage } = props;
  const [htmlText, setHtmlText] = useState("");

  const display = props.editorPreviewMode === "edit" ? "none" : "block";
  let width;
  switch (props.editorPreviewMode) {
    case "both":
      width = "50%";
      break;
    case "preview":
      width = "100%";
      break;
  }

  useEffect(() => {
    try {
      const { contents } = markdownProcessor.processSync(rawText);
      setHtmlText(contents as string);
    } catch (error) {
      setAndShowMessage(error.message);
    }
  }, [rawText, setAndShowMessage, setHtmlText]);

  return (
    <Container style={{ display, width }}>
      <StyledPreview
        id="preview"
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlText as string }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  overflow: auto;
  height: 100%;
  right: 0;
  word-wrap: break-word;
  border: solid thin #ccc;
  border-top: none;
  border-collapse: collapse;
`;

const StyledPreview = styled.div`
  position: absolute;
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 1.4em 1.4em 1.6em;
`;

export default EditorPreview;
