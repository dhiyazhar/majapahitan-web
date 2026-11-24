import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2e3f0qwmk8wcq.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  outputFileTracingIncludes: {
    '**/*': [
      './node_modules/@img/sharp-libvips-linux-x64/**/*',
      './node_modules/@img/sharp-linux-x64/**/*',
    ],
  },
};

export default withPayload(nextConfig);
