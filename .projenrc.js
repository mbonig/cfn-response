const { TypeScriptProject, NpmAccess } = require('projen');
const project = new TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: '@matthewbonig/cfn-response',
  description: 'A simple client library for sending responses back to CloudFormation during Custom Resource event handling.',
  authorEmail: 'matthew.bonig@gmail.com',
  authorName: 'Matthew Bonig',
  npmAccess: NpmAccess.PUBLIC,
  releaseBranches: ['main'],
  npmTokenSecret: 'NPM_TOKEN',
  releaseToNpm: true,
});
project.synth();