const GET_ISSUES = "issues/GET_ISSUES";

export const getIssues = ({ repoId, issues }) => ({
  type: GET_ISSUES,
  repoId,
  issues,
});

const initialState = {
  byRepoId: {},
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
    case GET_ISSUES:
      const { repoId, issues } = action;
      return {
        ...state,
        byRepoId: parseIssues(state.byRepoId, repoId, issues),
      };
    default:
      return state;
  }
}

export default issuesReducer;
