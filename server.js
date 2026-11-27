const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8", "Allow": "GET, HEAD" });
    return res.end("Method Not Allowed");
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400);
    return res.end("Bad Request");
  }

  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(ROOT, relative);

  if (!filePath.startsWith(ROOT + path.sep) && filePath !== path.join(ROOT, "index.html")) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.stat(filePath, (statErr, stat) => {
    if (!statErr && stat.isFile()) return sendFile(filePath, req, res);

    // Clean URL support for pages such as /about -> /about.html.
    const cleanHtml = filePath + ".html";
    fs.stat(cleanHtml, (htmlErr, htmlStat) => {
      if (!htmlErr && htmlStat.isFile()) return sendFile(cleanHtml, req, res);

      const notFound = path.join(ROOT, "404.html");
      fs.readFile(notFound, (err, body) => {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(err ? "Not Found" : body);
      });
    });
  });
});

function sendFile(filePath, req, res) {
  const type = MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream";
  res.writeHead(200, {
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": type.startsWith("text/html") ? "no-cache" : "public, max-age=3600"
  });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(filePath).pipe(res);
}

server.listen(PORT, "0.0.0.0", () => {
  console.log(`MY Subsale Homes Hub is listening on port ${PORT}`);
});
