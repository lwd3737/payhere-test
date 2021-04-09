import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Pagination } from "components";
import * as issuesApi from "api/issues";
import { getIssues } from "modules/issues";

function PaginationContainer() {
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(null);
  const repoId = useSelector((state) => state.repos.activeId);
  const reposSlice = useSelector((state) => state.repos);
  const { owner, name, open_issues_count } =
    reposSlice.byId[reposSlice.activeId] || {};

  const countTotalPage = () => {
    return Math.ceil(open_issues_count / 10);
  };

  const countPageRange = () => {
    if (typeof currentPage !== "number") return null;
    if (currentPage <= 0) return null;

    let startPage, lastPage;
    if (currentPage % 10 === 0) {
      //현재 페이지가 현재 페이지네이션의 끝 번호라면
      startPage = currentPage - 9;
      lastPage = currentPage;
    } else {
      startPage = parseInt(currentPage / 10) * 10 + 1;

      if (parseInt(currentPage / 10) * 10 + 10 > totalPage) {
        //현재 페이지네이션의 끝 번호가 totalPage 라면
        lastPage = totalPage;
      } else {
        lastPage = parseInt(currentPage / 10) * 10 + 10;
      }
    }

    return { startPage, lastPage };
  };

  const handleMovePageClick = async (number) => {
    if (number <= 0) return;
    if (number > countTotalPage()) return;

    try {
      const issues = await issuesApi.getIssues({
        owner,
        repo: name,
        page: number,
      });

      dispatch(getIssues({ repoId: reposSlice.activeId, issues }));

      setCurrentPage(number);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    if (!repoId || typeof open_issues_count !== "number") return;

    const _totalPage = countTotalPage();
    setTotalPage(_totalPage);

    if (_totalPage > 0) {
      setCurrentPage(1);
    }
  }, [repoId]);

  return (
    <Pagination
      totalPage={totalPage}
      currentPage={currentPage}
      {...(countPageRange() || {})}
      onMovePageClick={handleMovePageClick}
    />
  );
}

export default PaginationContainer;
