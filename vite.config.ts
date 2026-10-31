import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("development"),
  },
  server: {
    allowedHosts: [".ngrok-free.app"],
  },
  preview: {
  allowedHosts: [".ngrok-free.app", ".trycloudflare.com"],
  },
});