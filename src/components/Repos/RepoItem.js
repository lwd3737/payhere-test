import React from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import { selectRepo } from "modules/repos";

function RepoItem({ id, full_name, isActive, onRemoveClick }) {
  const dispatch = useDispatch();
  const handleSelectRepoClick = () => {
    dispatch(selectRepo(id));
  };

  return (
    <S.RepoItem isActive={isActive} onClick={handleSelectRepoClick}>
      <div className="full-name">{full_name}</div>
      <button className="remove-btn" onClick={(e) => onRemoveClick(e, id)}>
        X
      </button>
    </S.RepoItem>
  );
}

export default RepoItem;

const S = {
  RepoItem: styled.li`
    display: flex;
    border: 1px solid gray;
    width: fit-content;
    height: fit-content;
    padding: 3px 5px;
    margin-right: 2vw;
    border-radius: 8px;
    cursor: pointer;

    .full-name {
      width: 85%;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .remove-btn {
      display: inline-block;
      width: 15%;
      background-color: white;
      border: none;
      color: red;
    }

    ${({ isActive }) => {
      if (isActive) {
        return css`
          border: 2px solid green;

          .full-name {
            color: green;
          }
        `;
      }
    }}
  `,
};
