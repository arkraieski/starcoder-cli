#!/usr/bin/env node
/**
 * Copyright (c) 2023 Alexander Kraieski
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
const yargs = require("yargs");
const { requestCompletion, createEnvFile, handleCodeInput } = require("./utils");
const fs = require('fs');
const os = require('os');
const path = require('path');

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

async function main() {
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

    handleCodeInput(args._[0], apiKey);
  } else {
    const fileContents = fs.readFileSync(args.file, 'utf8');
    const envFile = path.join(os.homedir(), '.starcoder-cli-env');
    const envResult = require('dotenv').config({ path: envFile });

    if (envResult.error) {
      await createEnvFile(envFile);
    }

    const apiKey = process.env.HF_API_KEY;

    handleCodeInput(fileContents, apiKey);
  }
}

main();