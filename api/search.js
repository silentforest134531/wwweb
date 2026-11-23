import { Octokit } from "octokit"
const octokit = new Octokit({ 
  auth: process.env.GITHUB-TOKEN
});
export default function handler(req, res) {
await octokit.request('GET /search/code', {
  q: 'Q',
  headers: {
    'X-GitHub-Api-Version': '2026-03-10'
  }
})
}
