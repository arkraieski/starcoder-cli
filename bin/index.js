#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');
const os = require('os');
const path = require('path');

const { requestCompletion, createEnvFile } = require("./utils");

const usage = "\nUsage: starcode [options] <code to complete>";

yargs
  .usage(usage)
  .option("f", {
    alias: "file",
    describe: "Specify a file to get text input from",
    type: "string",
    demandOption: false
  })
  .help();

(async () => {
  const args = await yargs.parse();

  if (!args.file) {
    if (args._.length === 0) {
      yargs.showHelp();
      process.exit(1);
    }

    const envFile = path.join(os.homedir(), '.starcoder-cli-env');
    const envResult = require('dotenv').config({ path: envFile });

    if (envResult.error) {
      await createEnvFile(envFile);
    }

    const apiKey = process.env.HF_API_KEY;

    const result = await requestCompletion(args._[0], apiKey);
    console.log(result.generated_text);
  } else {
    // Read the file and process its contents
    const fileContents = fs.readFileSync(args.file, 'utf8');
    const envFile = path.join(os.homedir(), '.starcoder-cli-env');
    const envResult = require('dotenv').config({ path: envFile });

    if (envResult.error) {
      await createEnvFile(envFile);
    }

    const apiKey = process.env.HF_API_KEY;

    const result = await requestCompletion(fileContents, apiKey);
    console.log(result.generated_text);
  }
})();