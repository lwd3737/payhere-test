import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Repos } from "components";
import { searchRepos } from "api/repos";
import { loadRepos, registerRepo, removeRepo } from "modules/repos";

function ReposContainer() {
  const dispatch = useDispatch();
  const [searchedRepos, setSearchedRepos] = useState(null);
  const [searchedWord, setSearchedWord] = useState("");
  const reposSlice = useSelector((state) => state.repos);

  const getRegisteredRepos = () => {
    return reposSlice.allIds.map((id) => reposSlice.byId[id]);
  };

  const handleSearchedWordChange = (e) => {
    const { value } = e.target;
    setSearchedWord(value);
  };

  const handleSearchClick = async (e) => {
    const { items } = await searchRepos(searchedWord);

    setSearchedRepos(
      items.map((repo) => {
        const { id, name, owner, full_name, open_issues_count } = repo;
        return {
          id,
          name,
          owner: owner.login,
          full_name,
          open_issues_count,
        };
      })
    );
  };

  const handleSearchClose = () => {
    setSearchedRepos(null);
  };

  const handleRegisterRepoClick = (repo) => {
    if (reposSlice.count >= 4) {
      alert("등록할 수 있는 repository가 초과되었습니다.");
      return;
    }

    if (repo.id in reposSlice.byId) {
      alert("이미 등록되어 있습니다.");
      return;
    }

    dispatch(registerRepo(repo));

    const reposStore = localStorage.getItem("repos");

    if (reposStore) {
      const reposArr = JSON.parse(reposStore);
      reposArr.push(repo);
      localStorage.setItem("repos", JSON.stringify(reposArr));
    } else {
      localStorage.setItem("repos", JSON.stringify([repo]));
    }

    alert("repository가 등록되었습니다.");
  };

  const handleRemoveRepoClick = (e, id) => {
    e.stopPropagation();

    if (reposSlice.count <= 0) return;

    dispatch(removeRepo(id));

    const reposStore = localStorage.getItem("repos");
    if (reposStore) {
      const reposArr = JSON.parse(reposStore);
      const removedReposArr = reposArr.filter((repo) => repo.id !== id);

      localStorage.setItem("repos", JSON.stringify(removedReposArr));
    }
  };

  useEffect(function initSearchCloseEvent() {
    window.addEventListener("click", handleSearchClose);
    return () => {
      window.removeEventListener("click", handleSearchClose);
    };
  }, []);

  useEffect(function loadReposInStore() {
    const reposStore = localStorage.getItem("repos");

    if (reposStore) {
      const reposArr = JSON.parse(reposStore);
      dispatch(loadRepos(reposArr));
    }
  }, []);

  return (
    <Repos
      searchedRepos={searchedRepos}
      searchedWord={searchedWord}
      registeredRepos={getRegisteredRepos()}
      onSearchClick={handleSearchClick}
      onSearchedWordChange={handleSearchedWordChange}
      onRegisterRepoClick={handleRegisterRepoClick}
      onRemoveRepoClick={handleRemoveRepoClick}
    />
  );
}

export default ReposContainer;
