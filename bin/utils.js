module.exports = {requestCompletion, createEnvFile}

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