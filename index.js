const inquirer = require ("inquirer");
const fs = require ("fs");
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile);

//ask user for user input
const promptUser = () => {
    inquirer.prompt([{
        type: "input",
        message: "What's is your name?",
        name: "name"
    },
    {
        type: "input",
        message: "Where are you from?",
        name: "location"
    },
    {
        type: "input",
        message: "What's is your GitHub username?",
        name: "gitHubName"
    },
    {
        type: "list",
        message: "What's is your GitHub license?",
        choices:[
            "MIT",
            "Apache"
        ],
        name: "license"
    }
    ]).then (function(response) {
        console.log(response);
        let markdown = generateMarkdown(response);

        writeFileAsync("README.md", markdown).then( 
            err => console.log("Success!")
        );
    })
}
//generate markdown string from user input 
function generateMarkdown(response) {
    let markdownString = `
    # ${projectName}

## Description 

${description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

${installation}

## Usage 

USAGE IMG

## Credits

${collaborators}

## License

${license}

## Contributing

${contribute}

## Tests

${tests}
    `
    return(markdownString)
}

promptUser();