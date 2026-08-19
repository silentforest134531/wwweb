export default async function handler(req, res) {
  async function FetchData() {
    const query = encodeURIComponent(req.query.q)
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error('No token found')
    }
    const url = 'https://api.github.com/search/code?q=`content:${query}`';
    try {
      const rsp = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'wweb (Github: silentforest134531)',
          'X-GitHub-Api-Version': '2026-03-10'
        }
      });
    if (!rsp.ok) {
      throw new Error(`API Error: Code ${rsp.status}`);
    }
  const text = await rsp.json();
  return text;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  try {
    const data = await FetchData();
    res.status(200).json({article: data});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
