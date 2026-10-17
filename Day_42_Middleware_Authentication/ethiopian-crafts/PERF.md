# Performance notes

## Test method

Measurements use the same local production build, Windows machine, and integrated Chromium browser. The catalogue was opened directly at `/products`, allowed to finish loading, and a category control was clicked. No CPU or network throttling was applied. These are single-run local observations, not lab-grade Lighthouse results or field Core Web Vitals.

For LCP and CLS, a browser `PerformanceObserver` was started with buffered entries after navigation. The Event Timing observer was used to look for interaction entries. Navigation timing is reported separately from total resource transfer.

## Before / after

| Metric | Before (catalogue) | After (catalogue) | Notes |
|---|---:|---:|---|
| LCP | 708 ms | 244 ms | One local run; not a production percentile |
| CLS | 0.251 | 0.000 | The initial page used remote images, including one URL that returned 404 |
| INP | Not captured | 16 ms single-interaction Event Timing sample | One category-filter interaction only; not a field INP percentile |
| DOMContentLoaded | 196 ms | 220 ms | Navigation timing |
| Load event | 306 ms | 228 ms | Navigation timing |

## Changes made for the follow-up

- Replaced remote product images with local SVG assets to avoid broken third-party image URLs and unpredictable image loading.
- Moved catalogue filtering to server-rendered URL links and product data to Server Components instead of loading the catalogue through client-side SWR.
- Added explicit image dimensions through `next/image` fill layouts and responsive `sizes`.
- Kept client JavaScript for cart controls and the order form only.

Post-change values were collected using the same local production server and browser, with the Event Timing observer installed before the catalogue navigation. In this run, the local LCP and CLS observations improved; navigation timings varied, and the single interaction sample is not enough to claim a representative INP improvement. The results are directional only.

## Limitations

- A single local run does not represent the LCP/CLS/INP percentiles required for real-user Core Web Vitals.
- The order request is in-memory and is not backed by a database or order API.
- The product artwork is local illustrative SVG rather than a production product photography set.
