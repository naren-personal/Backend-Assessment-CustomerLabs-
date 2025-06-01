const crypto = require("crypto");
const http = require("http");
const https = require("https");
const { URL } = require("url");

class CommonUtils {
  static generateUUID = () => {
    const uuid = crypto.randomUUID();
    return uuid;
  };
  static isValidEmail = (email) => {
    if (typeof email !== "string") return false;

    const parts = email.split("@");
    if (parts.length !== 2) return false;

    const [local, domain] = parts;

    if (!local || !domain) return false;
    if (!domain.includes(".")) return false;
    if (domain.startsWith(".") || domain.endsWith(".")) return false;

    return true;
  };
}

const validateBody = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "Body is required" });
    return;
  }
  next();
  return;
};

const validateQueryString = (req, res, next) => {
  console.log(req.query);

  if (!req.query || !Object.keys(req.query).length) {
    res.status(400).json({ message: "Query is required" });
    return;
  }
  next();
  return;
};

const httpsRequest = ({
  url,
  method = "GET",
  headers = {},
  data = null,
  protocol,
}) => {
  return new Promise((resolve, _reject) => {
    try {
      const parsedUrl = new URL(url);
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === "https:" ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method,
        headers,
      };

      const req = protocol.request(options, (res) => {
        let body = "";

        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          console.log(`[Response][${method}] ${url}:`, body);
          resolve({ statusCode: res.statusCode, body });
        });
      });

      req.on("error", (err) => {
        console.error(`[ERROR][Req][${method}] ${url}:`, err);
        resolve(err?.message || err);
      });

      // Write body if POST/PUT
      if (data && (method === "POST" || method === "PUT")) {
        const jsonData = JSON.stringify(data);
        req.write(jsonData);
      }

      req.end();
    } catch (err) {
      console.error(`[ERROR][httpsRequest]:`, err);
      resolve(err?.message || err);
    }
  });
};

const sendMultipleRequest = async (destinations, body) => {
  try {
    let responseStatus = [];
    for (const dest of destinations) {
      try {
        const method = dest.http_method.toUpperCase();
        const headers = dest.headers || {};
        console.log("method", method);
        console.log("parsedUrl", dest.url);
        console.log("headers", headers);
        if (method.toUpperCase() === "GET") {
          const res = await getMethodRequest({
            baseUrl: dest.url,
            headers,
            query: body,
          });
          responseStatus = [
            ...responseStatus,
            { url: dest.url, response: res },
          ];
        }

        if (method.toUpperCase() === "POST") {
          const res = await postRequest({
            url: dest.url,
            data: body,
            headers,
          });
          responseStatus = [
            ...responseStatus,
            { url: dest.url, response: res },
          ];
        }
      } catch (error) {
        console.log("[ERROR][Loop]", error);
      }
    }
    console.log("[Response-All]", responseStatus);
  } catch (error) {
    console.log("[ERROR][sendRequest]", error);
  }
};

const getMethodRequest = ({ baseUrl, query = {}, headers = {} }) => {
  return new Promise((resolve) => {
    const url = new URL(baseUrl);
    Object.keys(query).forEach((key) =>
      url.searchParams.append(key, query[key])
    );
    const req = https.request(
      url.toString(),
      { method: "GET", headers },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          console.log(`[Response][GET] ${url}:`, body);
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );

    req.on("error", (err) => {
      console.error(`[ERROR][GET] ${url}:`, err);
      resolve(err?.message || err);
    });

    req.end();
  });
};

const postRequest = ({ url, data = {}, headers = {} }) => {
  return new Promise((resolve) => {
    const jsonData = JSON.stringify(data);

    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(jsonData),
          ...headers,
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          console.log(`[Response][POST] ${url}:`, body);
          resolve({ statusCode: res.statusCode, body });
        });
      }
    );

    req.on("error", (err) => {
      console.error(`[ERROR][POST] ${url}:`, err);
      resolve(err?.message || err);
    });

    req.write(jsonData);
    req.end();
  });
};

module.exports = {
  CommonUtils,
  validateBody,
  validateQueryString,
  httpsRequest,
  sendMultipleRequest,
  getMethodRequest,
};
