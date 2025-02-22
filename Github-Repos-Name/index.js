const https = require("https");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter GitHub username: ", (username) => {
  if (!username) {
    console.log("Username is required!");
    rl.close();
    return;
  }

  const url = `https://api.github.com/users/${username}/repos`;

  const options = {
    headers: { "User-Agent": "node.js" },
  };

  https
    .get(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode !== 200) {
          console.error(
            ` Error: ${res.statusCode} ${JSON.parse(data).message}`
          );
          rl.close();
          return;
        }

        const repos = JSON.parse(data).map((repo) => repo.name);

        if (repos.length === 0) {
          console.log(` No repositories found for ${username}`);
        } else {
          const filename = `${username}.txt`;
          fs.writeFileSync(filename, repos.join("\n"));
          console.log(`Repositories saved to ${filename}`);
        }

        rl.close();
      });
    })
    .on("error", (err) => {
      console.error(` Error fetching repositories: ${err.message}`);
      rl.close();
    });
});
