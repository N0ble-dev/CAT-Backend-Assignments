const http = require("http");

const server = http.createServer((req, res) => {
  let [opertaion, queryString] = req.url.split("?");
  nums = queryString.match(/\d+/g).map(Number);
  if (nums.length > 2) {
    res.statusCode = 400;
    res.statusMessage = "Bad Request";
    res.end("<h1>Bad Request</h1>");
    return;
  }
  switch (opertaion) {
    case "/add":
      res.end(`<h1>${nums[0] + nums[1]}</h1>`);
      break;
    case "/subtract":
      res.end(`<h1>${nums[0] - nums[1]}</h1>`);
      break;
    case "/multiply":
      res.end(`<h1>${nums[0] * nums[1]}</h1>`);
      break;
    case "/divide":
      res.end(`<h1>${nums[0] / nums[1]}</h1>`);
      break;
    default:
      res.statusCode = 404;
      res.statusMessage = "Method Not Allowed";
      res.end("<h1>Method Not Allowed</h1>");
  }
});
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
