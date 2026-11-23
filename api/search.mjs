import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

export default async function handler(req, res) {
  const response = await octokit.request('GET /search/code', {
    q: 'Q',
    headers: {
      'X-GitHub-Api-Version': '2026-03-10'
    }
  })
  const data = response.data
  return res.status(200).json(data)
}
