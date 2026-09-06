import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sharp'],
  outputFileTracingIncludes: {
    '**/*': [
      './node_modules/@img/sharp-libvips-linux-x64/**/*',
      './node_modules/@img/sharp-linux-x64/**/*',
    ],
  },
};

export default withPayload(nextConfig);
