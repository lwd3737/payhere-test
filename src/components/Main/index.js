import React from "react";
import styled from "styled-components";

import Header from "../Header";
import {
  ReposContainer,
  IssueListContainer,
  PaginationContainer,
} from "containers";

function Main() {
  return (
    <S.Main>
      <header>
        <Header />
      </header>

      <main>
        <ReposContainer />
        <IssueListContainer />
      </main>

      <footer>
        <PaginationContainer />
      </footer>
    </S.Main>
  );
}

export default Main;

//S == Style
const S = {
  Main: styled.div`
    padding: 5vh 5vw;

    header {
      margin-bottom: 10vh;
    }
  `,
};
