import React from "react";
import styled from "styled-components";

import IssueItem from "./IssueItem";

function IssueList({ openIssuesCount, issues }) {
  return (
    <S.IssueList>
      <div className="meta">open issue count: {openIssuesCount}</div>
      <div className="issue-list">
        {issues &&
          issues.map((issue) => <IssueItem key={issue.id} {...issue} />)}
      </div>
    </S.IssueList>
  );
}

export default IssueList;

const S = {
  IssueList: styled.ul`
    list-style: none;
    padding: 0;

    .meta {
      margin-bottom: 5px;
      color: gray;
    }
  `,
};
