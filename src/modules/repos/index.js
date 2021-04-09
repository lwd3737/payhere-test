//action type
const LOAD_REPOS = "repos/LOAD_REPOS";
const REGISTER_REPO = "repos/REGISTER_REPO";
const REMOVE_REPO = "repos/REMOVE_REPO";
const SELECT_REPO = "repos/SELECT_REPO";

//action creator
export const loadRepos = (repos) => ({
  type: LOAD_REPOS,
  repos,
});

export const registerRepo = (repo) => ({
  type: REGISTER_REPO,
  repo,
});

export const removeRepo = (id) => ({
  type: REMOVE_REPO,
  id,
});

export const selectRepo = (id) => ({
  type: SELECT_REPO,
  id,
});

const initialState = {
  count: 0,
  activeId: null,
  byId: {},
  allIds: [],
};

const removeRepoById = (state, id) => {
  const reposById = {
    ...state,
  };
  delete reposById[id];
  return reposById;
};

function reposReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS: {
      const { repos } = action;

      return {
        ...state,
        count: repos.length,
        activeId: repos[0].id,
        byId: {
          ...repos.reduce((obj, repo) => {
            obj[repo.id] = {
              ...repo,
            };
            return obj;
          }, {}),
        },
        allIds: repos.map((repo) => repo.id),
      };
    }
    case REGISTER_REPO: {
      const { id, name, owner, full_name, open_issues_count } = action.repo;
      const activeId = state.activeId ? state.activeId : id;

      return {
        ...state,
        count: state.count + 1,
        activeId,
        byId: {
          ...state.byId,
          [id]: {
            id,
            name,
            owner,
            full_name,
            open_issues_count,
          },
        },
        allIds: [...state.allIds, id],
      };
    }
    case REMOVE_REPO: {
      const { id } = action;
      const activeId = (() => {
        if (state.count <= 0) return null;

        if (state.allIds[0] === id) {
          //삭제하려는 id가 첫번째 id라면
          return state.allIds[1];
        } else {
          return state.allIds[0];
        }
      })();

      return {
        ...state,
        count: state.count - 1,
        activeId,
        byId: removeRepoById(state.byId, id),
        allIds: state.allIds.filter((_id) => _id !== id),
      };
    }
    case SELECT_REPO: {
      return {
        ...state,
        activeId: action.id,
      };
    }
    default:
      return state;
  }
}

export default reposReducer;
