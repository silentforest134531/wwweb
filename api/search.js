export default function handler(req, res) {
const octokit = new Octokit()

await octokit.request('GET /search/code', {
  q: 'Q',
  headers: {
    'X-GitHub-Api-Version': '2026-03-10'
  }
})
}
