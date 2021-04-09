import { combineReducers } from "redux";

import issuesReducer from "./issues";
import reposReducer from "./repos";

const rootReducer = combineReducers({
  issues: issuesReducer,
  repos: reposReducer,
});

export default rootReducer;
