import React from "react";
import styled from "styled-components";

function Loading() {
  let i = 0;
  while (i < 20000) {
    console.log(i);
    i++;
  }

  return (
    <S.Loading>
      <div className="inner">Loading...</div>
    </S.Loading>
  );
}

export default Loading;

const S = {
  Loading: styled.div`
    display: flex;
    justify-content: center;
    height: 20vh;
    padding: 100px 0;

    .inner {
      display: inline-block;
      width: 100px;
      height: 100px;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      line-height: 100px;
      border: 2px solid gray;
      border-radius: 100%;
    }
  `,
};
