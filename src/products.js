const express = require("express");
const serverless = require("serverless-http");
const proxy = require("express-http-proxy");

const app = express();
const router = express.Router();

var layoutServer = "http://localhost:8080",
  catalogServer = "http://localhost:8081",
  cartServer = "http://localhost:8082",
  reviewServer = "http://localhost:8083";

function match(domain) {
  return proxy(domain, {
    proxyReqPathResolver(req) {
      console.log(`${domain}${req.url}`);
      return `${domain}${req.url}`;
    }
  });
}

// router.use("/layout", match(layoutServer));

// router.use("/cart", match(cartServer));

// router.use("/products", match(catalogServer));

// router.use("/reviews", match(reviewServer));

router.use("/", match(catalogServer));

app.use(`/.netlify/functions/products`, router);

module.exports = app;
module.exports.handler = serverless(app);
