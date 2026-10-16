// Explicit public runtime files only. Paths are relative to each source checkout.
export const explorerDemos = [
  { id: 'volatility', repo: 'IVTrading', folder: 'lab', files: ['index.html', 'app.js', 'math.js', 'styles.css'], screenshot: 'docs/volatility-lab.png' },
  { id: 'model-comparison', repo: 'GPTvsGeminiTrader', folder: 'studio', files: ['index.html', 'app.js', 'engine.js', 'style.css'], screenshot: 'docs/comparison-studio.png' },
  { id: 'market-depth', repo: 'PolymarketArbitrage', folder: 'lab', files: ['index.html', 'app.js', 'archive.json', 'depth.js', 'style.css'], screenshot: 'docs/depth-lab.png' },
  { id: 'ml-observatory', repo: 'MLProjects', folder: 'lab', files: ['index.html', 'app.js', 'metrics.js', 'report.json', 'style.css'], screenshot: 'docs/experiment-observatory.png' },
  { id: 'settlement', repo: 'ArbitrageFinder', folder: '', files: ['index.html', 'app.js', 'lab.js', 'arbitrage_opportunities.json', 'style.css', 'LICENSE'], screenshot: 'docs/settlement-lab.png' },
  { id: 'orderbook', repo: 'pm-tradingdesk', folder: 'replay', files: ['index.html', 'app.js', 'book.js', 'fixtures.js', 'style.css'], screenshot: 'docs/replay-lab.png' },
  { id: 'auction-review', repo: 'SkyblockSniper', folder: 'review', files: ['index.html', 'app.js', 'report.json', 'style.css'], extras: ['LICENSE'], screenshot: 'docs/snapshot-review.png' },
  { id: 'interview', repo: 'Interview-Prep', folder: 'studio', files: ['index.html', 'app.js', 'core.js', 'questions.js', 'style.css'], screenshot: 'docs/rehearsal-studio.png' },
  { id: 'anagrams', repo: 'Game-Pigeon-Anagrams', folder: '', entry: 'web/index.html', files: ['web/index.html', 'web/app.js', 'web/solver.js', 'web/style.css', 'web/worker.js', 'Anagrams/wordlist.txt'], screenshot: 'docs/anagram-atelier.png' },
  { id: 'oura-brief', repo: 'Oura-message-bot', folder: 'demo', files: ['index.html'], screenshot: 'docs/preview.png' },
  { id: 'catalog-evidence', repo: 'openai_merch_bot', folder: 'demo', files: ['index.html'], screenshot: 'docs/observatory.png' },
  { id: 'action-guard', repo: 'insta_confirm_action', folder: '', entry: 'demo.html', files: ['demo.html', 'demo.js', 'core.js', 'content.js', 'style.css'], screenshot: 'docs/test-bench.png' },
  { id: 'focus', repo: 'Pomodoro-App', folder: 'dist/ui', files: ['index.html', 'assets/index-B7fTs8FH.js', 'assets/index-DEBt-oRx.css'] },
  { id: 'sensor-review', repo: 'studentsdrivesafe', folder: 'dist', files: ['index.html', 'assets/index-Cks4VGgJ.css', 'assets/index-XOeHGj8S.js', 'assets/inference.worker-B5dxQz5V.js', 'model/group1-shard1of1.bin', 'model/model.json'] },
  { id: 'retry-lab', repo: 'tiktodv4', folder: 'lab', files: ['index.html', 'app.js', 'engine.js', 'scenarios.js', 'style.css'], screenshot: 'docs/reliability-lab.png' },
];

export const localPreviews = [
  { id: 'splitframe', repo: 'TikTok-Video-Creator', file: 'docs/studio.png' },
  { id: 'correspondence', repo: 'Email-Writer-with-web-search', file: 'docs/workspace.png' },
];
