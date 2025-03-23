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

export default nextConfig;
