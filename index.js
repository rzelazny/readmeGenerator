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
    # ${response.projectName}

## Description 

${response.descriptionText}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

${response.installationText}

## Usage 

[${response.imageName}](${response.imageURL})

${response.usageText}

## Credits

${response.collaboratorsText}

## License

${response.licenseText}

## Contributing

${response.contributeText}

## Tests

${response.tests}
    `
    return(markdownString)
}

promptUser();