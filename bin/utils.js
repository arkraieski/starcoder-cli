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
module.exports = {requestCompletion, createEnvFile, handleCodeInput}

const HfInference = require("@huggingface/inference").HfInference;
const fs = require('fs');
const readline = require('readline');

async function requestCompletion(text, key){
    const hf = new HfInference(key); // make sure I move this later

    try{
        
    const result = await hf.textGeneration({
        model: "bigcode/starcoder",
        inputs: text
    });

    return result; 
} catch (error) {
    process.stderr.write(error);
    }
}



async function createEnvFile(envPath) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    try {
      const apiKey = await new Promise((resolve) => {
        rl.question('Please enter your API key: ', (apiKey) => {
          resolve(apiKey);
        });
      });
  
      await new Promise((resolve, reject) => {
        fs.writeFile(envPath, `API_KEY=${apiKey}`, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      process.stderr.write(error);
    } finally {
      rl.close();
    }
  }

async function handleCodeInput(input, apiKey) {
    const result = await requestCompletion(input, apiKey);
    process.stdout.write(result.generated_text + "\n");
  }