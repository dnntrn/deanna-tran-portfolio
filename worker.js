// Worker with Static Assets - serves static files automatically
export default {
  async fetch(request, env, ctx) {
    // Static assets are served automatically by Cloudflare
    // This worker can add dynamic functionality if needed
    
    const url = new URL(request.url);
    
    // For now, just serve static assets
    // In production, env.ASSETS will be available
    // In local dev, wrangler handles this automatically
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    
    // Fallback for local development
    return fetch(request);
  }
};