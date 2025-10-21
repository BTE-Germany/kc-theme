// vite.config.ts
import { defineConfig } from "file:///H:/StreamP/kc-theme-v3/node_modules/.pnpm/vite@5.4.19_@types+node@24.0.14_lightningcss@1.30.1/node_modules/vite/dist/node/index.js";
import react from "file:///H:/StreamP/kc-theme-v3/node_modules/.pnpm/@vitejs+plugin-react@4.6.0__59ec8da9c32b95ba17b20072074efcc4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { keycloakify } from "file:///H:/StreamP/kc-theme-v3/node_modules/.pnpm/keycloakify@11.8.50/node_modules/keycloakify/vite-plugin/index.js";
import tailwindcss from "file:///H:/StreamP/kc-theme-v3/node_modules/.pnpm/@tailwindcss+vite@4.1.11_vi_f2d70728f831034dc5c910040753a68c/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "H:\\StreamP\\kc-theme-v3";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    keycloakify({
      accountThemeImplementation: "none"
    }),
    tailwindcss()
    // visualizer({ open: true }) // Deaktiviert für schnelleren Build
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs"
    }
  },
  server: {
    hmr: {
      overlay: true
    }
  },
  logLevel: "info"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJIOlxcXFxTdHJlYW1QXFxcXGtjLXRoZW1lLXYzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJIOlxcXFxTdHJlYW1QXFxcXGtjLXRoZW1lLXYzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9IOi9TdHJlYW1QL2tjLXRoZW1lLXYzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBrZXljbG9ha2lmeSB9IGZyb20gXCJrZXljbG9ha2lmeS92aXRlLXBsdWdpblwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgcmVhY3QoKSxcclxuICAgICAgICBrZXljbG9ha2lmeSh7XHJcbiAgICAgICAgICAgIGFjY291bnRUaGVtZUltcGxlbWVudGF0aW9uOiBcIm5vbmVcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhaWx3aW5kY3NzKCksXHJcbiAgICAgICAgLy8gdmlzdWFsaXplcih7IG9wZW46IHRydWUgfSkgLy8gRGVha3RpdmllcnQgZlx1MDBGQ3Igc2NobmVsbGVyZW4gQnVpbGRcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgICAgICAgICdAdGFibGVyL2ljb25zLXJlYWN0JzogJ0B0YWJsZXIvaWNvbnMtcmVhY3QvZGlzdC9lc20vaWNvbnMvaW5kZXgubWpzJyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIGhtcjoge1xyXG4gICAgICAgICAgICBvdmVybGF5OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxvZ0xldmVsOiAnaW5mbydcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFAsU0FBUyxvQkFBb0I7QUFDdlIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsbUJBQW1CO0FBQzVCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsTUFDUiw0QkFBNEI7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUE7QUFBQSxFQUVoQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLHVCQUF1QjtBQUFBLElBQzNCO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osS0FBSztBQUFBLE1BQ0QsU0FBUztBQUFBLElBQ2I7QUFBQSxFQUNKO0FBQUEsRUFDQSxVQUFVO0FBQ2QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
