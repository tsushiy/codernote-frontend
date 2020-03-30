import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import unified from 'unified';
import markdown from 'remark-parse';
import breaks from "remark-breaks";
import math from 'remark-math'
import htmlKatex from 'remark-html-katex';
import hljs from 'remark-highlight.js';
import html from 'remark-html';
import gh from 'hast-util-sanitize/lib/github.json';
import merge from 'deepmerge';

type Props = {
  rawText: string
}

const EditorPreview: React.FC<Props> = props => {
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

  const compile = (raw: string) => {
    try {
      const { contents } = processor.processSync(raw);
      setHtmlText(contents as string);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    compile(props.rawText);
  })

  return (
    <Container>
      <ErrorMessage>{message}</ErrorMessage>
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: htmlText as string }}
      />
    </Container>
  )
}

const Container = styled.div`
  top: 0;
  padding-top: 5px;
  padding-bottom: 12px;
  padding-left: 18px;
  word-wrap: break-word;
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default EditorPreview;