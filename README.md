# starcoder-cli 🌟
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)


This is an example of a simple CLI wrapper for the StarCoder code LLM using the Hugging Face inference api and wrapper library in node.js. This exposes the model's capabilities as a sort of high-tech "Unix tool" (referring to the philosophy, not the OS... this is a cross-platform project).

## Features

- AI code generation at the command line! 
- Saves your Hugging Face API key locally in your home directory for subsequent runs
- Composable with other command-line tools using pipes, redirection, etc.

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

You can also use shell pipes with the `starcode` command. For example, this command reads the generated code aloud on macOS:

```
starcode -f new_example.py | say
```

## Contributing 🤝

Contributions are welcome and encouraged! Feel free to submit a PR if you have any improvements!

For now, I am using the [semistandard](https://github.com/standard/semistandard) npm package to check and fix style before my commits, and I ask other contributors to do the same (this may change in the future). Thank you in advance to anyone that wants to help with this project.


## License

This project is licensed under the ISC license.

## Acknowledgments 🙏

Thank you to [BigCode project](https://www.bigcode-project.org/) for the model that inspired this and Hugging Face

## Further Reading

- [StarCoder model paper](https://arxiv.org/abs/2305.06161)
- [HuggingFace.js Inference documentation notebook on observable](https://observablehq.com/@huggingface/hello-huggingface-js-inference)
