import client from "../client";

export const searchRepos = async (word) => {
  const res = await client.get(`/search/repositories?q=${word}`);
  return res.data;
};
