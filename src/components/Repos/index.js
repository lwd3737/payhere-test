import React from "react";
import styled from "styled-components";

import RepoList from "./RepoList";
import RepoRegisteration from "./RepoRegisteration";

function Repos({
  searchedRepos,
  searchedWord,
  registeredRepos,
  onSearchClick,
  onSearchedWordChange,
  onRegisterRepoClick,
  onRemoveRepoClick,
}) {
  return (
    <S.Repos>
      <RepoRegisteration
        word={searchedWord}
        repos={searchedRepos}
        onSearchClick={onSearchClick}
        onWordChange={onSearchedWordChange}
        onRegisterClick={onRegisterRepoClick}
      />
      <RepoList repos={registeredRepos} onRemoveRepoClick={onRemoveRepoClick} />
    </S.Repos>
  );
}

export default Repos;

const S = {
  Repos: styled.div``,
};
