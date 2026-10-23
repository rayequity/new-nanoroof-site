# nanoroof.com — multi-page build

Static site: every page has its own URL, title, description, canonical link and structured data.

## Deploy
- Netlify: drag this folder into app.netlify.com/drop (uses `_redirects` for the 404 page).
- Vercel: `vercel deploy` from this folder (uses `vercel.json`).
- Any static host works: upload the folder as the web root.

## Files
- `index.html` and one folder per page (`/cleaning/index.html`, ...)
- `assets/site.css`, `assets/site.js`: shared, cacheable
- `assets/img/`: images, loaded only by the pages that use them
- `sitemap.xml`, `robots.txt`: submit the sitemap in Google Search Console

## Before launch
- Social links: set the URLs in the `SOCIAL` map in `assets/site.js` (facebook, linkedin, instagram, youtube).
- Analytics: events are pushed to `window.dataLayer` (page_view, cta_click, call_click, email_click, form_submit, estimate_submit, roof_check_run, roof_check_result, faq_search). Add a Google Tag Manager container to send them to GA4.
- Forms: connect `form[data-demo-form]` submissions to the CRM webhook.
- Photo roof check: runs on the claude.ai-hosted version through Claude; on the public site it shows the 5-question check instead until an API endpoint is connected.
