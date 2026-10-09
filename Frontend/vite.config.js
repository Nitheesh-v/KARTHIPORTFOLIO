import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on 0.0.0.0 so the app is reachable from outside
    // Allow any host header (local network, tunnels, cloud preview URLs)
    allowedHosts: true,
    /**
     * Dev proxy: every request starting with /api is forwarded to the
     * Express backend. That way the browser only ever talks to the Vite
     * origin -> no CORS configuration needed while developing.
     */
    proxy: {
      "/api": {
        target: process.env.VITE_PROXY_TARGET || "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
