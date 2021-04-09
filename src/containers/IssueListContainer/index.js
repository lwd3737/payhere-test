import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IssueList } from "components";
import * as issuesApi from "api/issues";
import { getIssues } from "modules/issues";

function IssueListContainer() {
  const dispatch = useDispatch();
  const repoId = useSelector((state) => state.repos.activeId);
  const { owner, name, open_issues_count } =
    useSelector((state) => state.repos.byId[repoId]) || {};
  const issues = useSelector((state) => state.issues.byRepoId[repoId]);

  const requestGetIssues = useCallback(
    async (page) => {
      try {
        const issues = await issuesApi.getIssues({
          owner,
          repo: name,
          page,
        });
        dispatch(getIssues({ repoId, issues }));
      } catch (e) {
        alert(e.message);
      }
    },
    [repoId, owner, name]
  );

  useEffect(
    async function getInitialIssues() {
      if (repoId && owner && name) {
        requestGetIssues(1);
      }
    },
    [repoId, owner, name]
  );

  if (!issues) return null;

  return <IssueList openIssuesCount={open_issues_count} issues={issues} />;
}

export default IssueListContainer;
