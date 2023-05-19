#! /usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');
const os = require('os');
const path = require('path');

const { requestCompletion, createEnvFile } = require("./utils");
const { stderr } = require("process");

const usage = "\nUsage: starcode [options] <code to complete>";
    
yargs
    .usage(usage)  
    .option("f", {alias:"file", 
      describe: "Specify a file to get text input from", 
      type: "string", 
      demandOption: false })  
    .help();                                                                                                  
      
const args = yargs.argv;

if (process.argv.length <= 2) {
    yargs.showHelp();
    process.exit(1);
  }

const envFile = path.join(os.homedir(), '.starcoder-cli-env');
const envResult = require('dotenv').config({ path: envFile });

if(envResult.error){
    (async () => {
        await createEnvFile();
      })();
}

const apiKey = process.env.HF_API_KEY

if (args.f) {
    // Read the file and process its contents
    const fileContents = fs.readFileSync(args.f, 'utf8');
    requestCompletion(fileContents, apiKey).then((result) => {
        console.log(result.generated_text);
      }).catch((error) => {
        console.error(error);
      });
  } else {
    //console.log(args._[0]);
    // Use the provided string input
    requestCompletion(args._[0], apiKey).then((result) => {
        console.log(result.generated_text);
      }).catch((error) => {
        console.error(error);
      });
  }




// const res =  requestCompletion(hf, text);
