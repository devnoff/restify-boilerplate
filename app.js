const restify = require("restify");
const CookieParser = require("restify-cookies");
const corsMiddleware = require("restify-cors-middleware");

const server = restify.createServer({
  name: "Boilerplate API v1",
  versions: ["1.0.0"]
});

server.use(CookieParser.parse);
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.gzipResponse());
server.use(
  restify.throttle({
    burst: 100,
    rate: 50,
    ip: true, // throttle based on source ip address
    overrides: {
      "127.0.0.1": {
        rate: 0, // unlimited
        burst: 0
      }
    }
  })
);

// CORS
const cors = corsMiddleware({
  // Whitelist
  origins: ["http://localhost:3000"],
  allowHeaders: [
    "Authorization",
    "Set-Cookie",
    "X-ACCESS-TOKEN",
    "x-access-token",
    "cache-control",
    "accept",
    "accept-version",
    "content-type",
    "request-id",
    "origin",
    "x-api-version",
    "x-request-id",
    "x-requested-with"
  ]
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(function(req, res, next) {
  res.charSet("utf-8");
  res.set({ "content-type": "application/json" });
  next();
});

// Ping
server.get("/ping", function(req, res, next) {
  res.send(200);
});

// load route
require("./route.js")(__dirname + "/controllers", server);

server.listen(process.env.PORT || 3333, function startServer() {
  console.log("%s listening at %s", server.name, server.url);
});
