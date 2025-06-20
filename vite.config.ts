import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	assetsInclude: ["**/*.png"],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimizeDeps: {
		entries: ["quill"],
	},
	server: {
		host: "0.0.0.0",
		allowedHosts: ["localhost_5173.ndlamdev.website", "fashion_fe.ndlamdev.website", "fashion.ndlamdev.website"],
		proxy: {
			// Khi bạn fetch('/treeVN.json') từ React, Vite sẽ forward đến target
			"/treeVN.json": {
				target: "https://www.coolmate.me/json",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/treeVN\.json/, "/treeVN.min.json"),
			},
		},
	},
});
