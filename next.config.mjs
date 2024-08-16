/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    disableStaticImages: true,
  },
};

export default nextConfig;
