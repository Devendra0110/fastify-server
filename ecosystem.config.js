module.exports = {
    apps : [{
      name        : "API",
      script      : "./dist/server.js",
      watch       : false,
      instances  : 1,
      exec_mode  : "cluster",
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
         "NODE_ENV": "production"
        }
    }]
  }
