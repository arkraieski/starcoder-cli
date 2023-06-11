# starcoder-cli 🌟
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)


This is an example of a simple CLI wrapper for the StarCoder code LLM using the Hugging Face inference api and wrapper library in node.js. This exposes the model's capabilities in a simple program inspired by old-school, text-based Unix tools and Github Copilot.
  
## Features

- AI code generation at the command line! 
- Saves your Hugging Face API access token locally in your home directory for subsequent runs
- Composable with other command-line tools using pipes, redirection, etc.
- it's free!

  
## Installation
Requires:
- Node.js >= 18
- an account on the Hugging Face hub 🤗

Steps:

1. Accept the conditions for the [bigcode/starcoder](https://huggingface.co/bigcode/starcoder) model and create a personal access token if you do not already have one.
2. Run ```npm install -g starcoder-cli``` to install the CLI globally
3. You will be prompted for your API access token the first time you run the command (this will be stored locally for subsequent runs).
  

## Usage

```
~$ starcode --help
Usage: starcode [options] <code to complete>

Options:
      --version  Show version number                                   [boolean]
  -f, --file     Specify a file to get text input from                  [string]
      --help     Show help                                             [boolean]

```
For example:

```
~$ starcode "def print_hello_world():"
def print_hello_world():
    print("Hello World")

def print_hello_world_twice():
    print
```

Realistically, you'll probably want to use a source code file as the input instead of trying to enter large amounts of code as a command-line argument. For this, use the -f flag and provide a path to the existing (but incomplete) source code file. You can also use also redirect output to a file with shell redirection:

```
~$ starcode -f example.py > new_example.py
```
(this may fail with larger input files)

You can also use shell pipes with the `starcode` command. For example, this command reads the generated code aloud on macOS:

```
$ starcode -f new_example.py | say
```
  
## Prompting Tips

- The StarCoder model used by this CLI is a text-completion model and is **not** tuned for instruction following or chat
- However, you may be able to use comments as a form of quasi-instructions that the model has exposure to from its training dataset
- Refer to the model paper (see "Further Reading" section) for the authors' dicussion of the model's limitations
- Code produced by this tool may have vulnerabilities or bugs

## Contributing 🤝

Contributions are welcome and encouraged! Feel free to submit a PR if you have any improvements!

For now, I am using [semistandard](https://github.com/standard/semistandard) to check and fix style issues (this may change in the future). 

Thank you in advance to anyone that wants to help with this project.

  
## License

This project is licensed under the ISC license.
  

## Acknowledgments 🙏

Thank you to [BigCode project](https://www.bigcode-project.org/) for the model that inspired this and Hugging Face

  
## Further Reading

- [StarCoder model paper](https://arxiv.org/abs/2305.06161)
- [HuggingFace.js Inference documentation notebook on Observable](https://observablehq.com/@huggingface/hello-huggingface-js-inference)
