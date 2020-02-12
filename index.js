const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var convertFactory = require("electron-html-to");
const generateHTML = require("./generateHTML");
const util = require("util");


inquirer
  .prompt([
    {
    type: "input",
    message: "What is your GitHub username?",
    name: "username"
    },
    {
      type: "list",
      message: "What color would you like the background to be? ",
      name: "color",
      choices: ["green", "blue", "pink", "red"]
    }
  ])
  .then(function(answers) { 
    console.log(answers);
    const queryUrl = `https://api.github.com/users/${answers.username}`;

    axios.get(queryUrl).then(function(response) {

      const profileInfo = {
        name: response.data.login,
        color: answers.color,
        img: response.data.avatar_url,
        bio: response.data.bio,
        location: response.data.location,
        gitHub: response.data.html_url,
        repos: response.data.public_repos,
        followers: response.data.followers,
        following: response.data.following,
        stars: 0
      };
      console.log(profileInfo);

    const htmlDone = generateHTML(profileInfo);

      fs.writeFile("repo.html", htmlDone, function(err) {
        if (err) {
          throw err;
        }
      });

var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});

conversion({ html: htmlDone }, function(err, result) {
  if (err) {
    return console.error(err);
  }

  console.log(result.numberOfPages);
  console.log(resul.log);
  result.stream.pipe(fs.createWriteStream("pdf.pdf"));
})

  })
})
