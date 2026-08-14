export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const q = (req.query.q || '').toString().trim();
  if (!q) {
    return res.status(400).json({ error: 'Missing or empty "q" query parameter' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    // Deployment must set GITHUB_TOKEN in environment (Vercel Secrets / env vars)
    return res.status(500).json({ error: 'Server not configured: missing GITHUB_TOKEN' });
  }

  const query = encodeURIComponent(`path:${q} OR content:${q}`);
  const url = `https://api.github.com/search/code?q=${query}`;

  try {
    const rsp = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'wweb (GitHub: silentforest134531)'
      }
    });

    // Handle non-OK responses with helpful info
    if (!rsp.ok) {
      const bodyText = await rsp.text().catch(() => '');
      const rateRemaining = rsp.headers.get('x-ratelimit-remaining');
      const rateReset = rsp.headers.get('x-ratelimit-reset');
      const details = { status: rsp.status, statusText: rsp.statusText, rateRemaining, rateReset, body: bodyText };
      return res.status(502).json({ error: 'Upstream GitHub API error', details });
    }

    const data = await rsp.json();
    // Return a small, useful subset to the client (avoid leaking too much)
    return res.status(200).json({
      total_count: data.total_count,
      items: data.items || []
    });
  } catch (error) {
    // Log for server diagnostics (do NOT log token)
    console.error('api/html.js error:', error && error.message ? error.message : error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
