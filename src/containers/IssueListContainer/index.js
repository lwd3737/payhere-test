import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IssueList, Loading } from "components";
import * as issuesApi from "api/issues";
import { getIssues, start, finished } from "modules/issues";

function IssueListContainer() {
  const dispatch = useDispatch();
  const repoId = useSelector((state) => state.repos.activeId);
  const { owner, name, open_issues_count } =
    useSelector((state) => state.repos.byId[repoId]) || {};
  const issues = useSelector((state) => state.issues.byRepoId[repoId]);
  const loading = useSelector((state) => state.issues.loading);

  const requestGetIssues = useCallback(
    async (page) => {
      dispatch(start());
      try {
        const issues = await issuesApi.getIssues({
          owner,
          repo: name,
          page,
        });
        dispatch(getIssues({ repoId, issues }));
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch(finished());
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
  if (loading) return <Loading />;

  return <IssueList openIssuesCount={open_issues_count} issues={issues} />;
}

export default IssueListContainer;
