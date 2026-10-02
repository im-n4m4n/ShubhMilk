/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats first. AVIF is ~30-50% smaller than JPEG at equal
    // perceived quality; WebP is the fallback for older browsers.
    formats: ["image/avif", "image/webp"],
    // The site never renders an image wider than ~1600px, so stop generating
    // the 1920/2048/3840 variants — they were pure wasted bytes and build time.
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Qualities used across the app (Next requires them to be declared).
    // 70 is used by the hero carousel and the pour fallback — it MUST be listed
    // here, otherwise Next rejects the request and warns on every render.
    qualities: [50, 65, 70, 75],
    // Cache optimised images for 30 days instead of the 60s default, so repeat
    // visits and navigation don't re-run the optimiser.
    minimumCacheTTL: 2592000,
    dangerouslyAllowSVG: false,
  },
};

module.exports = nextConfig;
