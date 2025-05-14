import type { NextConfig } from "next";
import withExportImages from "next-export-optimize-images";

const nextConfig: NextConfig = {};

export default withExportImages(nextConfig);
