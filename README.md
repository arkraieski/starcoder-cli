# starcoder-cli 🌟
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)


This is an example of a simple CLI wrapper for the StarCoder code LLM using the Hugging Face inference api and wrapper library in node.js. This exposes the model's capabilities as a sort of high-tech "Unix tool" (referring to the philosophy, not the OS... this is a cross-platform project).



## Installation
Requires:
- git
- node.js
- an account on the Hugging Face hub 🤗

Steps:

1. Accept the conditions for the [bigcode/starcoder](https://huggingface.co/bigcode/starcoder) model and create a personal access token if you do not already have one.
2. Clone the repository and then navigate to it.
3. Run ```npm install``` to install the dependencies.
4. Run ```npm install -g .``` to install the CLI.

This installs the package globally. You will be prompted for your API token the first time you run the command.

I will probably push this to npm once there's a good test suite and I set up CI.

## Usage

```
~$ starcode --help
Usage: starcode [options] <code to complete>

Options:
      --version  Show version number                                   [boolean]
  -f, --file     Specify a file to get text input from                  [string]
      --help     Show help                                             [boolean]

```

## License

This project is licensed under the ISC license.
