const express = require("express");
const next = require("next");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

// Load .env.production or .env (with fallback)
const dotenv = require("dotenv");
const envProdPath = path.join(__dirname, ".env.production");
const envPath = path.join(__dirname, ".env");

// Try .env.production first, then fallback to .env
if (require("fs").existsSync(envProdPath)) {
  dotenv.config({ path: envProdPath });
  console.log("📁 Loaded .env.production");
} else if (require("fs").existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log("📁 Loaded .env");
} else {
  console.warn("⚠️ No .env.production or .env file found");
}

// --- ENV ---
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8004;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const backendPath = path.join(__dirname, "backend");

nextApp.prepare().then(() => {
  const app = express();

  console.log("⚠ Helmet disabled: inline scripts must run for Next.js dev");
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));
  app.use(compression());
  app.use(morgan("dev"));

  // 🔥 Backend API routes
  app.use("/api/health", require(path.join(backendPath, "routes/health")));
  app.use("/api/auth", require(path.join(backendPath, "routes/auth")));
  app.use("/api/sessions", require(path.join(backendPath, "routes/sessions")));
  app.use("/api/llm", require(path.join(backendPath, "routes/llm")));
  app.use("/api/heygen", require(path.join(backendPath, "routes/heygen")));
  app.use(
    "/api/knowledge-base",
    require(path.join(backendPath, "routes/knowledgeBase"))
  );
  app.use("/api/analysis", require(path.join(backendPath, "routes/analysis")));
  app.use("/api/settings", require(path.join(backendPath, "routes/settings")));

  // Optional realtime
  try {
    const { router: realtimeRouter } = require(path.join(
      backendPath,
      "routes/realtime"
    ));
    app.use("/api/realtime", realtimeRouter);
  } catch (e) {
    console.log("⚠ Realtime routes missing (OK)");
  }

  // ⭐ Next.js frontend handler - catch all routes
  app.use((req, res) => handle(req, res));

  // Start server
  app.listen(port, "0.0.0.0", () => {
    console.log(`\n🚀 Testify running on port ${port}`);
    console.log(`🌍 URL: https://aio83wt0ai4vge-8004.proxy.runpod.net`);
    console.log(`🌍 Local URL: http://localhost:${port}`);
    console.log("Frontend + Backend on SAME server ✔️");
    
    // Verify HeyGen API Key
    if (process.env.HEYGEN_API_KEY) {
      console.log(`✅ HeyGen API Key: Configured (${process.env.HEYGEN_API_KEY.substring(0, 10)}...)`);
    } else {
      console.warn(`⚠️ HeyGen API Key: NOT SET - Please add HEYGEN_API_KEY to .env or .env.production`);
    }
  });
});
