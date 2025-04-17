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
	server: {
		host: "0.0.0.0",
		allowedHosts: ["33bc-14-169-45-197.ngrok-free.app", "fashion_fe.ndlamdev.website", "fashion.ndlamdev.website"],
	},
});
