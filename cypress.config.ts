import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://swkxpensetrackerreactapp.vercel.app", // 👈 change if your frontend uses 3000 etc
    env: {
      apiUrl: "https://expensetrackerbackend-xf3e.onrender.com", // 👈 your backend URL
    },
    setupNodeEvents(on, config) {
      // you can add node event listeners here if needed
      return config;
    },
  },
});
