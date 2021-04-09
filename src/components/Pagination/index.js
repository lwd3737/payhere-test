import React from "react";
import styled from "styled-components";

import PageNumber from "./PageNumber";

function Pagination({
  totalPage,
  currentPage,
  startPage,
  lastPage,
  onMovePageClick,
}) {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = startPage; i <= lastPage; i++) {
      pageNumbers.push(
        <PageNumber
          key={i}
          number={i}
          isActive={i === currentPage}
          onMoveClick={onMovePageClick}
        />
      );
    }

    return pageNumbers;
  };

  return (
    <S.Pagination>
      <span className="first-page" onClick={() => onMovePageClick(1)}>
        {"<<"}
      </span>
      <span
        className="prev-page"
        onClick={() => onMovePageClick(currentPage - 1)}
      >
        {"<"}
      </span>
      {renderPageNumbers()}
      <span
        className="next-page"
        onClick={() => onMovePageClick(currentPage + 1)}
      >
        {">"}
      </span>
      <span className="last-page" onClick={() => onMovePageClick(totalPage)}>
        {">>"}
      </span>
    </S.Pagination>
  );
}

export default Pagination;

const S = {
  Pagination: styled.div`
    display: flex;
    justify-content: center;

    span {
      border: 1px solid rgba(0, 0, 0, 0.1);
      width: 30px;
      height: 25px;
      text-align: center;
      line-height: 27px;
      color: gray;
      cursor: pointer;
    }
  `,
};
