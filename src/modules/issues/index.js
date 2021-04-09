const START = "issues/START";
const FINISHED = "issues/FINISHED";
const GET_ISSUES = "issues/GET_ISSUES";

export const start = () => ({
  type: START,
});

export const finished = () => ({
  type: FINISHED,
});

export const getIssues = ({ repoId, issues }) => ({
  type: GET_ISSUES,
  repoId,
  issues,
});

const initialState = {
  byRepoId: {},
  loading: false,
};

const parseIssues = (state, repoId, issues) => {
  return {
    ...state,
    [repoId]: issues.map((issue) => {
      const { id, number, title, state, html_url } = issue;
      return {
        id,
        number,
        title,
        state,
        html_url,
      };
    }),
  };
};

function issuesReducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return {
        ...state,
        loading: true,
      };
    case GET_ISSUES:
      const { repoId, issues } = action;
      return {
        ...state,
        byRepoId: parseIssues(state.byRepoId, repoId, issues),
      };
    case FINISHED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default issuesReducer;
