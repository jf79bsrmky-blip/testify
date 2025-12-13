module.exports = {
  apps: [
    {
      name: "testify",
      script: ".next/standalone/server.js",
      cwd: "/workspace/HeyGen/Testify031225/Runpod/Runpod",
      env: {
        PORT: 8004,
        NODE_ENV: "production",
        ENV_FILE: "/workspace/HeyGen/Testify031225/Runpod/Runpod/heygen.env"
      }
    }
  ]
}

