import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: "0.0.0.0",
    port: 5231, // You can use any available port
  },
});
