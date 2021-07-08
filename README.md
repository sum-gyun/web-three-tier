# AWS Cloud Development Kit(CDK) Web-3-tier Example  to Deploy AWS Resource

## AS-IS Architecture

![initial](https://github.com/sum-gyun/web-three-tier/blob/main/image/as-is.png?raw=true)

## To-be Architecture

![initial](https://github.com/sum-gyun/web-three-tier/blob/main/image/to-be.png?raw=true)

This example demonstrates how to use the [AWS CDK](https://aws.amazon.com/cdk) to deploy a VPC with subnets, security groups and EC2 instances.  We will be building the following.

## Prerequisties

You will need the following prerequisites installed in order to build and deploy the this project.

### Typescript

This project is developed in Typescript. Install Typescript using the following command.

```sh
npm install -g typescript
```

Verify that Typescript was installed correctly.

```sh
tsc --version
```

### AWS CLI

The AWS CLI is a tool to manage your AWS services from a terminal session. Follow the steps to install the AWS CLI [here](https://aws.amazon.com/cli).

### AWS CDK

Install the AWS CDK using the following command.

```sh
npm install -g aws-cdk
```

Verify that the AWS CDK was installed correctly.

```sh
cdk --version
```

## Build

Install npm modules

```sh
npm install
```

For example, the command below installs the modules for aws-ec2

```sh
npm i @aws-cdk/aws-ec2
```

Compile typescript to js

```sh
npm run build
```

Deploy this stack to your default AWS account/region

```sh
cdk deploy
```

## Useful commands

### NPM commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests

### Toolkit commands

 * `cdk list (ls)`            Lists the stacks in the app
 * `cdk synthesize (synth)`   Synthesizes and prints the CloudFormation template for the specified stack(s)
 * `cdk bootstrap`            Deploys the CDK Toolkit stack, required to deploy stacks containing assets
 * `cdk deploy`               Deploys the specified stack(s)
 * `cdk deploy '*'`           Deploys all stacks at once
 * `cdk destroy`              Destroys the specified stack(s)
 * `cdk destroy '*'`          Destroys all stacks at once
 * `cdk diff`                 Compares the specified stack with the deployed stack or a local CloudFormation template
 * `cdk metadata`             Displays metadata about the specified stack
 * `cdk init`                 Creates a new CDK project in the current directory from a specified template
 * `cdk context`              Manages cached context values
 * `cdk docs (doc)`           Opens the CDK API reference in your browser
 * `cdk doctor`               Checks your CDK project for potential problems
