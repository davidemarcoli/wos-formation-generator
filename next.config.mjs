import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "www-cf.whiteoutsurvival.wiki",
                protocol: "https",
                pathname: "/wp-content/uploads/**",
            }
        ]
    }
};

const confWithPWA = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
});

export default confWithPWA(nextConfig);
