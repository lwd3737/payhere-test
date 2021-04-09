import React from "react";
import styled from "styled-components";

function RepoRegisteration({
  word,
  repos,
  onSearchClick,
  onWordChange,
  onRegisterClick,
}) {
  const renderRepo = (repo) => {
    const { id, full_name, open_issues_count } = repo;

    const onRegister = () => {
      onRegisterClick(repo);
    };

    return (
      <li className="repo-item" key={id}>
        <div className="info">
          <div className="full-name">{full_name}</div>
          <div className="open-issues">open issues: {open_issues_count}</div>
        </div>
        <button onClick={onRegister}>등록</button>
      </li>
    );
  };

  return (
    <S.RepoRegisteration>
      <div className="search">
        <input
          type="text"
          name="word"
          defaultValue={word}
          onChange={onWordChange}
        />
        <button onClick={onSearchClick}>검색</button>
      </div>

      {repos && (
        <ul className="repo-list" onClick={(e) => e.stopPropagation()}>
          {repos.map(renderRepo)}
        </ul>
      )}
    </S.RepoRegisteration>
  );
}

export default RepoRegisteration;

const S = {
  RepoRegisteration: styled.div`
    position: relative;

    .repo-list {
      position: absolute;
      top: 10px;
      list-style: none;
      height: 60vh;
      width: 40vw;
      border: 1px solid gray;
      background-color: white;
      padding: 0;
      overflow: auto;

      .repo-item {
        display: flex;
        justify-content: space-between;
        padding: 5px;
        margin-bottom: 10px;
        border-bottom: 1px solid gray;

        .info {
          width: 80%;

          .full-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
          }

          .open-issues {
            font-size: 0.8rem;
          }
        }
      }
    }
  `,
};
