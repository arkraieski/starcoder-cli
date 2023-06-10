const sinon = require('sinon');
const fs = require('fs');
const readline = require('readline');

const { createEnvFile} = require('../bin/utils');

describe('starcoder-cli', () => {
  let sandbox;
  let envFile;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    envFile = '.starcoder-cli-env';
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createEnvFile', () => {
    it('should prompt the user for the API key and write it to the env file', async () => {
      const mockKey = 'hf_1234567890';
      const mockQuestion = sandbox.stub(readline.Interface.prototype, 'question');
      mockQuestion.yields(mockKey);
      const mockWriteFile = sandbox.stub(fs, 'writeFile');
      mockWriteFile.yields(null);

      await createEnvFile(envFile);

      sinon.assert.calledOnce(mockQuestion);
      sinon.assert.calledOnce(mockWriteFile);
      sinon.assert.calledWith(mockWriteFile, envFile, `API_KEY=${mockKey}`);
    });

    it('should handle errors from writing the env file', async () => {
      const mockKey = 'hf_1234567890';
      const mockQuestion = sandbox.stub(readline.Interface.prototype, 'question');
      mockQuestion.yields(mockKey);
      const mockWriteFile = sandbox.stub(fs, 'writeFile');
      const mockError = new Error('write error');
      mockWriteFile.yields(mockError);
      const mockStderr = sandbox.stub(process.stderr, 'write');

      await createEnvFile(envFile);

      sinon.assert.calledOnce(mockQuestion);
      sinon.assert.calledOnce(mockWriteFile);
      sinon.assert.calledOnce(mockStderr);
      sinon.assert.calledWith(mockStderr, mockError);
    });
  });
});
