/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'location-border-images.s3.us-east-1.amazonaws.com',
                hostname: 'esgnaturerisk.s3.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
