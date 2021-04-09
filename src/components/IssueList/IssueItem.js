import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function IssueItem({ id, number, title, state, html_url }) {
  const reposSlice = useSelector((state) => state.repos);
  const { full_name } = reposSlice.byId[reposSlice.activeId];

  const handleMoveDetailClick = () => {
    window.open(html_url);
  };

  return (
    <S.IssueItem onClick={handleMoveDetailClick}>
      <div className="head">{full_name}</div>
      <div className="body">
        <div className="number">#{number}</div>
        <div className="title">{title}</div>
      </div>
      <div className="meta">
        <div className="state">{state}</div>
      </div>
    </S.IssueItem>
  );
}

export default IssueItem;

const S = {
  IssueItem: styled.li`
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px;
    margin-bottom: 10px;
    cursor: pointer;

    .head {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .body {
      display: flex;

      .number {
        width: 100px;
        color: gray;
      }
    }

    .meta {
      font-size: 0.8rem;
      color: green;
      margin: 5px;
    }
  `,
};
