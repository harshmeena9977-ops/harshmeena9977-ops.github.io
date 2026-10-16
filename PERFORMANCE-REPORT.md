# Performance optimization report

## Summary

The portfolio-guide code now loads only after a visitor opens it. This removes its automatic welcome popover from the initial view and avoids requesting its JavaScript during page load. The hero entrance sequence was also shortened.

The target is met in the comparable local production-export audit: Lighthouse Performance is 99/100, simulated LCP is 2.1 s, and TTI is 2.1 s. Browser-observed LCP improved from 2.98 s to 0.75 s.

The reported production score of 80 was not reproducible in this local test. The production-export baseline and optimized build both scored 99/100 under the same audit settings; the LCP improvement below is the directly measured before/after change.

## Before and after

| Metric | Before | After |
| --- | ---: | ---: |
| Lighthouse Performance | 99/100 | 99/100 |
| Lighthouse simulated LCP | 2.1 s | 2.1 s |
| Browser-observed LCP | 2,982 ms | 747 ms |
| Time to Interactive | 2.1 s | 2.1 s |
| Total Blocking Time | 30 ms | 20 ms |
| Speed Index | 1.9 s | 1.6 s |
| Compressed transfer size | 206 KiB | 203 KiB |
| Initial requests / scripts | 12 / 8 | 11 / 7 |
| Portfolio-guide chunk on initial load | Loaded | Not loaded |

## Changes and scope

- Changed the portfolio guide from idle-time loading to click-to-load. Its welcome panel no longer appears automatically; selecting “Ask the portfolio” still opens the guide.
- Kept recruiter brief and case-study code split into separate dynamic chunks. Browser checks confirmed each is requested only after its corresponding action.
- Shortened the hero entrance, laptop, dashboard, and chart animation durations.
- Kept the existing WebP project imagery and `next/image` usage; these were already optimized and were not changed.
- Did not remove global CSS. Lighthouse reported zero unused-CSS byte or timing savings in the compressed production-export audit, so removing below-the-fold styles would add risk without a measured benefit.

The unused-JavaScript estimate remained effectively flat (21.2 KiB before, 21.3 KiB after, within audit variation). The measurable reduction was deferring the guide chunk: one fewer initial request and about 3 KiB less compressed transfer. No broader dead-code reduction is claimed.

## Method

- Lighthouse CLI 13.5.0, mobile emulation at 390 × 844, simulated throttling.
- Production static export served locally with gzip for HTML, JavaScript, and CSS.
- Before and after used the same server, browser, route, and Lighthouse options.
- The user-reported score of 80 refers to a separate production measurement and was not independently reproduced here.
