import client from "../client";

export const getIssues = async ({ owner, repo, page }) => {
  const res = await client.get(`repos/${owner}/${repo}/issues`, {
    params: {
      sort: "created",
      per_page: 10,
      page,
    },
  });
  return res.data;
};
