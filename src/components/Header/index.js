import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <S.Header>
      <h1>Github Issue Viewer</h1>
    </S.Header>
  );
}

export default Header;

const S = {
  Header: styled.div`
    h1 {
      text-align: center;
      font-weight: bold;
    }
  `,
};
