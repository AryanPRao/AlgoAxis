import axios from 'axios';

// Initialize a simple client-side mock layer for axios when running in dev-bypass mode.
// This avoids needing a backend while developing the frontend. It overrides axios
// get/post methods for known API routes and returns realistic mock payloads.
export function initDevMocks() {
  if (typeof window === 'undefined') return;
  if (window.__devMocksInitialized) return;
  window.__devMocksInitialized = true;

  // Simple mock datasets
  const summary = { total_problems: 42, total_points: 1280, streak: 7 };
  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{ data: [20, 15, 7], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'] }]
  };
  const topicData = { labels: ['Arrays', 'Graphs', 'DP'], datasets: [{ data: [12, 18, 10] }] };
  const pointsData = { labels: ['Week1','Week2','Week3'], datasets: [{ data: [200, 400, 680] }] };
  const leaderboard = [
    { id: 'u1', name: 'Alice', points: 2400 },
    { id: 'u2', name: 'Bob', points: 2100 },
    { id: 'u3', name: 'Carol', points: 1900 }
  ];

  const problems = Array.from({ length: 12 }).map((_, i) => ({
    id: `p${i + 1}`,
    title: `Sample Problem ${i + 1}`,
    difficulty: ['Easy','Medium','Hard'][i % 3],
    tags: ['arrays','graph'].slice(0, (i % 2) + 1),
    solved: i % 4 === 0
  }));

  // Keep originals
  const origGet = axios.get.bind(axios);
  const origPost = axios.post.bind(axios);

  axios.get = async function (url, config) {
    const u = String(url || '').toLowerCase();

    // analytics summary
    if (u.includes('/api/analytics/summary')) {
      return Promise.resolve({ data: summary, status: 200, statusText: 'OK', headers: {}, config });
    }
    if (u.includes('/api/analytics/difficulty')) {
      return Promise.resolve({ data: difficultyData, status: 200, statusText: 'OK', headers: {}, config });
    }
    if (u.includes('/api/analytics/topics')) {
      return Promise.resolve({ data: topicData, status: 200, statusText: 'OK', headers: {}, config });
    }
    if (u.includes('/api/analytics/points')) {
      return Promise.resolve({ data: pointsData, status: 200, statusText: 'OK', headers: {}, config });
    }
    if (u.includes('/api/leaderboard')) {
      return Promise.resolve({ data: leaderboard, status: 200, statusText: 'OK', headers: {}, config });
    }
    if (u.includes('/api/problems')) {
      return Promise.resolve({ data: problems, status: 200, statusText: 'OK', headers: {}, config });
    }

    // Fallback to real network
    return origGet(url, config);
  };

  axios.post = async function (url, payload, config) {
    const u = String(url || '').toLowerCase();

    if (u.includes('/api/login')) {
      // Return fake user
      return Promise.resolve({ data: { user: { id: 'dev-user', name: 'Dev User', email: 'dev@local' }, token: 'dev-token' }, status: 200, statusText: 'OK', headers: {}, config });
    }
    if (u.includes('/api/upload')) {
      // Simulate upload result
      return Promise.resolve({ data: { success: true, url: 'https://example.com/resume/dev-user.pdf' }, status: 200, statusText: 'OK', headers: {}, config });
    }

    // Default: forward to real network
    return origPost(url, payload, config);
  };

  // Optionally seed localStorage with mock problem progress etc.
  try {
    if (!localStorage.getItem('mock_problems')) {
      localStorage.setItem('mock_problems', JSON.stringify(problems));
    }
    if (!localStorage.getItem('mock_leaderboard')) {
      localStorage.setItem('mock_leaderboard', JSON.stringify(leaderboard));
    }
  } catch (e) {
    // ignore
  }

  console.info('[devMocks] initialized (dev bypass)');
}

export default initDevMocks;
