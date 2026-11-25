import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export default async function handler(req, res) {
  const input = req.query.query
  const response = await octokit.request('GET /search/code', {
    q: `${input} repo:silentforest134531/wwweb language:html`,
    headers: {
      'X-GitHub-Api-Version': '2026-03-10'
    }
  })
  const data = response.data
  const paths = data.items.map(item => item.path).replaceAll(".html, "")
  return res.status(200).json(paths)
}
