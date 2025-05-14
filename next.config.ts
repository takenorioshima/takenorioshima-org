import type { NextConfig } from "next";
import withExportImages from "next-export-optimize-images";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withExportImages({
  nextConfig,
  output: "export",
});
