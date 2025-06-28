import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zfxvlrjtthgnolofrcpx.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

export default withBotId(nextConfig);
