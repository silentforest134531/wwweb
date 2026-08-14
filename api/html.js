export default function handler(req, res) {
  async function FetchData() {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error('No token found')
    }
    const url = 'https://github.com';
    try {
      const rsp = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ${token}',
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'wweb (Github: silentforest134531)'
        }
      });
    if (!rsp.ok) {
      throw new Error('API Error: Code ${response.status}');
    }
  res.status(200).send("If you can see this, it worked!")
}
