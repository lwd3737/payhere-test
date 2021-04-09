import React from "react";
import styled, { css } from "styled-components";

function PageNumber({ number, isActive, onMoveClick }) {
  return (
    <S.PageNumber isActive={isActive} onClick={() => onMoveClick(number)}>
      {number}
    </S.PageNumber>
  );
}

export default PageNumber;

const S = {
  PageNumber: styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: gray;
    cursor: pointer;

    ${({ isActive }) => {
      if (isActive) {
        return css`
          background-color: skyblue;
          color: white;
        `;
      }
    }}
  `,
};
