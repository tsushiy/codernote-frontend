import React from "react";
import styled from "styled-components";

const AppFooter: React.FC<{}> = () => {
  return <Container>© 2020 tsushiy</Container>;
};

export const Container = styled.div`
  display: block;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  height: 52px;
  bottom: 0;
  padding: 14px 16px;
  background-color: #fff;
`;

export default AppFooter;
