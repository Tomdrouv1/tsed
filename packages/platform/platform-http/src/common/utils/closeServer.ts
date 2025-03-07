import type Http from "node:http";
import type Https from "node:https";

import type Http2 from "http2";

export function closeServer(server: Http.Server | Https.Server | Http2.Http2Server) {
  return new Promise((resolve) => server.close(() => resolve(undefined)));
}
