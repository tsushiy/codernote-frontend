import styled from "styled-components";

export const MainContainer = styled.div`
  display: block;
  min-height: calc(100vh - 52px - 16px);
  width: calc(100vw - 32px);
  max-width: 1200px;
  margin: 0 auto 16px;
  padding: 56px 36px 20px;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.5);

  @media (max-width: 544px) {
    width: 100%;
    padding: 56px 0 20px;
  }
`;

export const publicNoteColor = "#ff8800";
export const privateNoteColor = "#39c";