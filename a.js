const https = require("https");

const getRequest = ({ baseUrl, query = {}, headers = {} }) => {
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

(async () => {
  await getRequest({
    baseUrl: "https://api.agify.io/",
    query: { name: "meelad" },
    headers: {},
  });
})();
