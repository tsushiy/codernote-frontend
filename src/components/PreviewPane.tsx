import React from 'react';
import styled from 'styled-components';

const PreviewPane: React.FC<any> = (props: any) => {
  return (
    <div className="container">
      <StyledErrorMessage>{props.message}</StyledErrorMessage>
      <div
        id="preview"
        dangerouslySetInnerHTML={{ __html: props.htmlText as string }}
      />
    </div>
  )
}

const StyledErrorMessage = styled.p`
  color: red;
`;

export default PreviewPane;