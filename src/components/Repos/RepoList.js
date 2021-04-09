import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import RepoItem from "./RepoItem";

function RepoList({ repos, onRemoveRepoClick }) {
  const activeId = useSelector((state) => state.repos.activeId);

  return (
    <S.RepoList>
      {repos &&
        repos.map((repo) => (
          <RepoItem
            key={repo.id}
            {...repo}
            isActive={repo.id === activeId}
            onRemoveClick={onRemoveRepoClick}
          />
        ))}
    </S.RepoList>
  );
}

export default RepoList;

const S = {
  RepoList: styled.ul`
    display: flex;
    padding: 0;
    margin-top: 6vh;
  `,
};
