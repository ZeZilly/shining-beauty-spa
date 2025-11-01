// Supabase Edge Function: instagram-feed
// Fetches latest Instagram posts using Meta APIs and returns a trimmed, cacheable payload.
// Supports two modes via env:
// 1) Instagram Graph API (Business/Creator): set IG_USER_ID and IG_ACCESS_TOKEN (Page token)
//    -> Uses https://graph.facebook.com/v19.0/{IG_USER_ID}/media
// 2) Basic Display Graph fallback: set IG_ACCESS_TOKEN only (User token)
//    -> Uses https://graph.instagram.com/me/media

// CORS headers
const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const limit = Math.min(Number(url.searchParams.get('limit') ?? '12'), 20) // cap to 20

    const IG_ACCESS_TOKEN = Deno.env.get('IG_ACCESS_TOKEN')
    const IG_USER_ID = Deno.env.get('IG_USER_ID') // required for Business Graph API

    if (!IG_ACCESS_TOKEN) {
      throw new Error('Missing IG_ACCESS_TOKEN in environment')
    }

    const fields = [
      'id',
      'caption',
      'media_type',
      'media_url',
      'thumbnail_url',
      'permalink',
      'timestamp'
    ].join(',')

    // Prefer Business Graph API if IG_USER_ID is provided, else fallback to Basic Display Graph
    const apiEndpoint = IG_USER_ID
      ? `https://graph.facebook.com/v19.0/${IG_USER_ID}/media?fields=${fields}&access_token=${IG_ACCESS_TOKEN}&limit=${limit}`
      : `https://graph.instagram.com/me/media?fields=${fields}&access_token=${IG_ACCESS_TOKEN}&limit=${limit}`

    const igRes = await fetch(apiEndpoint, { headers: { 'Content-Type': 'application/json' } })
    const igJson = await igRes.json()

    if (!igRes.ok) {
      const message = igJson?.error?.message || JSON.stringify(igJson)
      throw new Error(`Instagram API error: ${message}`)
    }

    const rawItems = Array.isArray(igJson?.data) ? igJson.data : []

    // Normalize payload for frontend
    const items = rawItems.map((p: any) => ({
      id: p.id,
      caption: p.caption ?? '',
      media_type: p.media_type,
      media_url: p.media_url,
      thumbnail_url: p.thumbnail_url ?? null,
      permalink: p.permalink,
      timestamp: p.timestamp,
    }))

    return new Response(
      JSON.stringify({ success: true, count: items.length, items }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          // Cache at the edge for 1 hour, allow stale-while-revalidate
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        },
      },
    )
  } catch (err) {
    console.error('instagram-feed error:', err)
    return new Response(
      JSON.stringify({ success: false, error: String((err as Error).message) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
