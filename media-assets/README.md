# Media Assets

This directory contains generated and curated media assets for Shining Beauty & Wellness.

---

## 🎥 Generated Videos

### 1. Promotional Video (Invideo)

**Created:** November 1, 2025  
**Platform:** Instagram  
**Duration:** ~30-60 seconds  
**Target Audience:** Women 25-45, wellness enthusiasts  
**Vibe:** Professional, relaxing  

**Video URL:**  
https://ai.invideo.io/ai-mcp-video?video=shining-beauty-spa-and-wellness-center-promotional-video-kfgrlp

**Script:**
> "Welcome to Shining Beauty and Wellness, Adana's most luxurious spa and wellness center. Experience our signature head massage that melts away stress and tension. Indulge in professional skincare treatments with natural products. Relax with our Swedish and hot stone massage therapies. Book your appointment today and treat yourself to pure bliss. Visit us at Gazipaşa, Adana or call 0505 071 95 01. Shining Beauty - Where beauty meets wellness."

**Usage:**
- Instagram Reels
- Instagram Stories
- Facebook posts
- Website hero section
- Digital advertising

---

## 📸 Existing Media (from uploads/)

The main repository contains 25MB+ of existing media files in the `uploads/` directory:

### Videos (14 files)
- B.mp4, BL.mp4, Face.mp4, Foot.mp4
- Massage.mp4, Msa.mp4, Relax.mp4, Shin.mp4
- Smile.mp4, Tyning.mp4, bn.mp4, f.mp4, fot.mp4

### Images (9 files)
- Facesmask.jpeg, Head.jpeg, N.jpeg, Nail.jpeg
- Nails.jpeg, View.jpeg, b.jpeg, fa.jpeg

### Instagram Reels Covers
- reel2.png (390KB)
- reel3.png (360KB)

**Recommendation:** These files should be:
1. Optimized (converted to WebP for images)
2. Compressed (reduce video file sizes)
3. Organized into the gallery system
4. Used for blog post featured images

---

## 🎨 Graphic Design Assets (Canva)

**Status:** Ready to create  
**Integration:** Canva MCP server tested and working  

**Recommended Designs:**
1. Instagram post templates (weekly schedule)
2. Story templates (campaigns, promotions)
3. Blog header images
4. Service menu graphics
5. Price list infographics
6. Campaign announcement banners

**Process:**
```bash
# Use Canva MCP server to create designs
manus-mcp-cli tool call search-designs --server canva --input '{"query": "spa wellness", "sortBy": "relevance"}'
```

---

## 🎵 Audio Assets (MiniMax)

**Status:** Requires balance top-up  
**Planned Assets:**
1. Relaxing spa background music
2. Turkish voice-over for videos
3. Appointment confirmation audio messages

**When Available:**
- Background music for videos
- Website ambient sound (optional)
- Phone system voice prompts

---

## 📋 Content Assets

All written content is available in the `content-strategy/` directory:

### Blog Posts (6 articles)
- Ready to publish
- SEO-optimized
- 800-1000 words each
- See: `../content-strategy/blog_content.md`

### Social Media Content
- Weekly posting schedule
- Hashtag strategy
- Engagement tactics
- See: `../content-strategy/social_media_plan.md`

---

## 🔄 Asset Management Workflow

### For New Content:

1. **Videos:**
   - Use Invideo for script-based generation
   - Upload to Supabase storage
   - Reference in gallery/blog

2. **Images:**
   - Use Canva for graphic designs
   - Optimize to WebP format
   - Upload to Supabase storage
   - Add to gallery table

3. **Audio:**
   - Use MiniMax when balance available
   - Store in Supabase storage
   - Reference in appropriate pages

### Supabase Storage Structure:
```
shining-beauty-spa/
├── videos/
│   ├── promotional/
│   ├── services/
│   └── testimonials/
├── images/
│   ├── gallery/
│   ├── blog/
│   └── campaigns/
└── audio/
    ├── music/
    └── voiceovers/
```

---

## 📊 Asset Inventory

| Type | Count | Total Size | Status |
|------|-------|------------|--------|
| Videos | 15 | ~25MB | ✅ Existing |
| Images | 9 | ~2MB | ✅ Existing |
| Promotional Video | 1 | N/A | ✅ Generated |
| Blog Posts | 6 | N/A | ✅ Written |
| Social Media Plans | 1 | N/A | ✅ Created |
| Graphic Designs | 0 | N/A | ⏳ Pending |
| Audio Files | 0 | N/A | ⏳ Pending |

---

## 🎯 Next Steps

1. **Immediate:**
   - Download promotional video from Invideo
   - Optimize existing images to WebP
   - Upload optimized assets to Supabase

2. **Short-term (1-2 weeks):**
   - Create Instagram post templates with Canva
   - Generate service-specific videos
   - Create campaign graphics

3. **Medium-term (2-4 weeks):**
   - Generate background music (when MiniMax balance available)
   - Create video testimonial templates
   - Develop brand asset library

---

## 📝 Notes

- All generated content follows brand guidelines (dark gray + gold theme)
- Mobile-first approach for all visual assets
- Accessibility considered (alt texts, captions)
- SEO-optimized file naming convention

---

**Last Updated:** November 1, 2025  
**Maintained by:** Shining Beauty Development Team
