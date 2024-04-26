# Deployment walkthrough

## Table of Contents

-   [Deployment walkthrough](#deployment-walkthrough)
    -   [Table of Contents](#table-of-contents)
    -   [Requirements](#requirements)
    -   [Pre-Deployment](#pre-deployment)
        -   [Step 1: Set up GitHub](#step-1-set-up-github)
        -   [Step 2: (Optional) Set up docker container for backend](#step-2-optional-set-up-docker-container-for-backend)
        -   [Step 3: Set up AWS Secrets](#step-3-set-up-aws-secrets)
    -   [Deployment](#deployment)
        -   [Step 1: Deploy LLM and Embedding model on Sagemaker](#step-1-deploy-llm-and-embedding-model-on-sagemaker)
        -   [Step 2: Deploy Infrastructure through CloudFormation](#step-2-deploy-infrastructure-through-cloudformation)

## Requirements

Before you deploy, you must have the following installed on your device:

-   [git](https://git-scm.com/downloads)
-   [AWS Account](https://aws.amazon.com/account/)
-   [GitHub Account](https://github.com/)
-   [Docker Desktop (Optional)](https://docs.docker.com/desktop/)

## Pre-Deployment

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

### Step 3: Set up AWS Secrets

We can use the AWS Secrets Manager to securely store the github access token and the master username and password of the postgres database.
Note: These secrets will directly be used in Cloudformation Template if you use the same name and key as mentioned in this guide. If you choose a new name, you have to change the cloudformation code to reflect the new name and keys
To store the keys securely:

1. Navigate to the Secrets Manager console in AWS console
2. Click 'Store a new secret'
3. Click 'Other type of secret'
4. Add 2 mores rows to make it 3 pairs in total
5. Set the first Key to 'GitHubPAT' and set the value to the personal access token you got from GitHub.
6. Set the second Key to 'DBUser' and set the value to the master username for the database.
7. Set the third key to 'DBPassword' and set the value to the master password for the database

## Deployment

### Step 1: Deploy LLM and Embedding model on Sagemaker

1. In the AWS console, navigate to the Sagemaker console (us-west-2 region)
2. Click 'Set up for single user'
3. Navigate to 'Domains' under 'Admin configurations'
4. Click the QuickSetupDomain... after it is in service
5. Click the launch button next to the default user
6. Click Studio
7. Click Jumpstart

Here you can find the embedding model and the LLM.

For Deploying LLM:

1. Search Mistral-7B-Instruct (Recommended model)
2. Click Deploy
3. Set custom endpoint name to something simple like cic-llm
4. Set maximum instance count to 1 so that you do not get charged for an extra instance
5. Open the Advanced Options and get the 'model name' environment variable value and store it (needs to be added to CloudFormation template)
6. Click Deploy

For Deploying Embedding Model:

1. Search Bge-Base-En (Recommended model)
2. Click Deploy
3. Set custom endpoint name to something simple cic-emb
4. Set Instance type to ml.c6i.xlarge
5. Set maximum instance count to 1 so that you do not get charged for an extra instance
6. Click Deploy

### Step 2: Deploy Infrastructure through CloudFormation

1. In the AWS Console, navigate to the cloudformation console
2. Click Create Stack > With New Resources (standard)
3. Click 'Choose an existing template '
4. Click 'Upload a template file'
5. Click 'Choose file'
6. Navigate to the cloudformation.yml file in the root directory of the repository and click it
7. Enter a stack name of your choice
8. Set the paramter values to the values from the previous steps
   (Note: LLMInference is the model name environment variable value from sagemaker)
9. Click Next and then Next again and click the checkbox asking for acknowledgement and then click submit.
10. Wait for all resources to deploy.
11. Click outputs and click the url value of AppURL key for accessing the web application.
