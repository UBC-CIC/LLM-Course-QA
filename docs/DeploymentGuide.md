# Deployment walkthrough

## Table of Contents

-   [Deployment walkthrough](#deployment-walkthrough)
    -   [Table of Contents](#table-of-contents)
    -   [Requirements](#requirements)
    -   [Deployment](#deployment)
        -   [Step 1: Set up GitHub](#step-1-set-up-github)
        -   [Step 2: (Optional) Set up docker container for the backend](#step-2-optional-set-up-docker-container-for-the-backend)
        -   [Step 2: CDK Deployment](#step-2-cdk-deployment)
            -   [**Extra: Taking down the deployed stacks**](#extra-taking-down-the-deployed-stacks)
        -   [Step 3: Uploading the configuration file](#step-3-uploading-the-configuration-file)

## Requirements

Before you deploy, you must have the following installed on your device:

-   [git](https://git-scm.com/downloads)
-   [git lfs](https://git-lfs.com/)
-   [AWS Account](https://aws.amazon.com/account/)
-   [GitHub Account](https://github.com/)
-   [AWS CLI](https://aws.amazon.com/cli/)
-   [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/cli.html)
-   [Docker Desktop (Optional)](https://docs.docker.com/desktop/) (make sure to install the correct version for you machine's operating system).

If you are on a Windows device, it is recommended to install the [Windows Subsystem For Linux](https://docs.microsoft.com/en-us/windows/wsl/install)(WSL), which lets you run a Linux terminal on your Windows computer natively. Some of the steps will require its use. [Windows Terminal](https://apps.microsoft.com/store/detail/windows-terminal/9N0DX20HK701) is also recommended for using WSL.

\*It is recommended to use a npm version manager rather than installing npm directly. For Linux, install npm using [nvm](https://github.com/nvm-sh/nvm). For Windows, it is recommended to use WSL to install nvm. Alternatively, Windows versions such as [nvm-windows](https://github.com/coreybutler/nvm-windows) exist.

## Pre-Deployment

## Deployment

### Step 1: Set up GitHub

#### Forking the GitHub repository onto your account

1. Navigate to the [home page](https://github.com/UBC-CIC/LLM-Course-QA) of the repository and click the fork button
2. Click 'Create Fork' to complete fork.

#### Installing amplify on GitHub

The front end is going to be hosted on AWS amplify and to do that we need to set up the GitHub account first.

1. Install amplify on github account by navigating to [https://github.com/apps/aws-amplify-REGION/installations/new](https://github.com/apps/aws-amplify-us-west-2/installations/new) (us-west-2 default)
2. Select the Account or Organization to which the repository was forked
3. Click 'Only select repositories' and select the forked repository name and complete installation.

#### Getting GitHub Personal Access Token

1. Navigate to the [developer settings](https://github.com/settings/apps) of your github account settings.
2. Select 'Personal Access Tokens' > 'Fine-grained tokens' > 'Generate New Token'
3. Enter Name and Expiration of your choice.
4. In the 'Repository access' section, click 'Only select repositories' and select the forked repository name.
5. Set the following permissions: Contents > Read Only, Webhooks > Read and Write
6. Generate the token and store it somewhere safe.

### Step 2: (Optional) Set up docker container for backend

You can use a container with the latest code, already hosted on dockerhub or optionally, you can set up your own docker container for deploying the backend. To set up your own container for the backend:

1. Install docker on your local machine
2. Login to your docker account on your local machine
3. Go to [docker hub](hub.docker.com)
4. Create a new public docker hub repository (cannot deploy backend automatically without public repository)
5. Clone repository on your local machine
6. Navigate to the backend directory of the cloned repository on terminal or shell
7. Enter the following command

```
docker build -t account_name/repo_name .
docker push account_name/repo_name
```

This will dockerize the backend and push it to dockerhub.

### Step 3: Deploy LLM and Embedding model on Sagemaker

1. In the AWS console, navigate to the Sagemaker console
2. Click domain

### Step 3: Storing Keys in AWS Secrets Manager

It is time to secure

**IMPORTANT**: Before moving forward with the deployment, please make sure that your **Docker Desktop** software is running (and the Docker Daemon is running). Also ensure that you have npm installed on your system.

Note this CDK deployment was tested in `us-west-2` region only.

Open a terminal in the `/backend/cdk` directory.
The file `demo-app.zip` should already exist in the directory. In the case that it does not, navigate back to the root directory `student-advising-assitant/` and run the following command to create it:

```bash
zip -r demo-app.zip aws_helpers/ flask_app/ Dockerfile -x "*/.*" -x ".*" -x "*.env" -x "__pycache__*"
```

Note: `zip` command requires that you use Linux or WSL. If `zip` is not installed, run `sudo apt install zip` first.

**Download Requirements**
Install requirements with npm:
`npm install`

**Configure the CDK deployment**
The configuration options are in the `/backend/cdk/config.json` file. By default, the contents are:

```
{
    "retriever_type": "pgvector",
    "llm_mode": "ec2"
}
```

-   `retriever_type` allowed values: "pgvector", "pinecone"
-   `llm_mode` allowed values: "ec2", "sagemaker", "none"

If you chose to use Pinecone.io retriever, replace the `"pgvector"` value with `"pinecone"`.

If you would prefer not to deploy the LLM, replace the `"ec2"` value with `"none"`. The system will not deploy a LLM endpoint, and it will return references from the information sources only, without generated responses.

The `"sagemaker"` options for `llm_mode` will host the model with an SageMaker inference endpoint instead of an EC2 instance. This may incur a higher cost.

**Initialize the CDK stacks**
(required only if you have not deployed any resources with CDK in this region before)

```bash
cdk synth --profile your-profile-name
cdk bootstrap aws://YOUR_AWS_ACCOUNT_ID/YOUR_ACCOUNT_REGION --profile your-profile-name
```

**Deploy the CDK stacks**

You may run the following command to deploy the stacks all at once. Please replace `<profile-name>` with the appropriate AWS profile used earlier.

```bash
cdk deploy --all --profile <profile-name>
```

#### **Extra: Taking down the deployed stacks**

To take down the deployed stack for a fresh redeployment in the future, navigate to AWS Cloudformation, click on the stack(s) and hit Delete. Please wait for the stacks in each step to be properly deleted before deleting the stack downstream. The deletion order is as followed:

1. HostingStack
2. InferenceStack
3. student-advising-DatabaseStack
4. student-advising-VpcStack

### Step 3: Uploading the configuration file

To complete the deployment, you will need to upload a configuration file specifying the websites to scrape for information. Continue with the [User Guide](./UserGuide.md#updating-the-configuration-file) for this step.
