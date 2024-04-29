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
        -   [Step 3: Deploy Frontend on Amplify](#step-3-deploy-frontend-on-amplify)

## Requirements

Before you deploy, you must have the following installed on your device:

-   [git](https://git-scm.com/downloads)
-   [AWS Account](https://aws.amazon.com/account/)
-   [GitHub Account](https://github.com/)
-   [Docker Desktop (Optional)](https://docs.docker.com/desktop/)

## Pre-Deployment

### Step 1: Set up GitHub

#### Forking the GitHub repository onto your account

1. Navigate to the [home page](https://github.com/UBC-CIC/LLM-Course-QA) of the repository and click the fork button.
2. Click 'Create Fork' to complete fork.

#### Installing amplify on GitHub

The front end is going to be hosted on AWS amplify and to do that we need to set up the GitHub account first.

1. Install amplify on github account by navigating to [https://github.com/apps/aws-amplify-REGION/installations/new](https://github.com/apps/aws-amplify-us-west-2/installations/new) (us-west-2 default).
2. Select the Account or Organization to which the repository was forked.
3. Click 'Only select repositories' and select the forked repository name and complete installation.

### Step 2: (Optional) Set up docker container for backend

You can use a container with the latest code, already hosted on dockerhub or optionally, you can set up your own docker container for deploying the backend. To set up your own container for the backend:

1. Install docker on your local machine.
2. Login to your docker account on your local machine.
3. Go to [docker hub](hub.docker.com).
4. Create a new public docker hub repository (cannot deploy backend automatically without public repository).
5. Navigate to the backend directory of the cloned repository on terminal or shell.
6. Enter the following command.

```
docker build -t account_name/repo_name .
docker push account_name/repo_name
```

This will dockerize the backend and push it to dockerhub.
account_name/repo_name should be assigned to the 'DockerImageName' parameter in the CloudFormation template.

### Step 3: Set up AWS Secrets

We can use the AWS Secrets Manager to securely store the master username and password of the postgres database.

To store the keys securely:

1. Navigate to the Secrets Manager console in AWS console.
2. Click 'Store a new secret'.
3. Click 'Other type of secret'.
4. Add 1 more row to make it 2 pairs in total.
5. Set the keys and values for the master username and master password for your RDS Database.
   The key names should be assigned to the 'DBUserKey' and 'DBPasswordKey' parameters in the CloudFormation template.
6. Set Secret name.
   The secret name should be assigned to the 'SecretId' in the CloudFormation template.
7. Click Next, Next and Store.

## Deployment

### Step 1: Deploy LLM and Embedding model on Sagemaker

In this deployment step, you will be deploying the embedding model and Large Language Model in Sagemaker for Vectorization and Generation.

1. In the AWS console, navigate to the Sagemaker console (us-west-2 region).
2. Navigate to 'Domains' under 'Admin configurations'.
3. If you don't already have a domain, create a domain by clicking 'Create Domain' and then 'Set up for single user'.
4. Click the QuickSetupDomain... after it is in service.
5. Click the launch button next to the default user.
6. Click Studio.
7. Once the Studio window opens, click Jumpstart.

Here you can find the embedding model and the LLM.

For Deploying LLM:

1. Search Mistral-7B-Instruct (Recommended model).
2. Click Deploy.
3. Set custom endpoint name to something simple like cic-llm.
   The endpoint name should be assigned to the 'LLMEndpointName' parameter in the CloudFormation template.
4. Set Instance type to ml.g5.2xlarge.
5. Set maximum instance count to 1 so that you do not get charged for an extra instance.
6. Click Deploy.
   Once the model is deployed, you should be able to find it under 'Deployments', in 'Endpoints'.
7. Click on the llm endpoint and copy the 'Name' column of the model in the 'Model' table.
   This is the inference component name. It should be assigned to the 'LLMInference' parameter in the CloudFormation template.

For Deploying Embedding Model:

1. Search Bge-Base-En (Recommended model).
2. Click Deploy.
3. Set custom endpoint name to something simple like cic-emb.
   The endpoint name should be assigned to the 'EmbeddingEndpointName' parameter in the CloudFormation template.
4. Set Instance type to ml.c6i.xlarge.
5. Set maximum instance count to 1 so that you do not get charged for an extra instance.
6. Click Deploy.

### Step 2: Deploy Infrastructure through CloudFormation

In this deployment step, you will be deploying the entire backend, which includes a Flask server in EC2, API Gateway for HTTPS endpoint for your backend, a Postgres DB in RDS, S3 bucket for storing course documents and connecting the Sagemaker model to the backend.

1. In the AWS Console, navigate to the cloudformation console.
2. Click Create Stack > With New Resources (standard).
3. Click 'Choose an existing template'.
4. Click 'Upload a template file'.
5. Click 'Choose file'.
6. Navigate to the cloudformation.yml file in the root directory of the repository and click it.
7. Enter a stack name of your choice.
8. Set the paramter values to the values from the previous steps.
   (Note: Add values from Sagemaker for models, Secrets Manager for RDS and if you pushed your docker container to dockerhub, you can add the repo details. Change the other values according to your preferences).
9. Click Next and then Next again and click the checkbox asking for acknowledgement and then click submit.
10. Wait for all resources to deploy.
11. Click Outputs and keep the window open as the outputs are the environment variables for the frontend.

### Step 3: Deploy Frontend on Amplify

In this deployment step, you will be deploying the Frontend on Amplify and connecting it to the backend.

1. In the AWS console, navigate to Amplify console.
2. Click Create App > Host Web App.
3. Click GitHub and then Continue.
4. Authorize Amplify to access your forked repository.
5. Click the branch you want to deploy.
6. Click the 'monorepo' checkbox and enter Frontend as the source directory.
7. Click the Advanced setting dropdown and add the following environment variables (Right hand side is cloudformation outputs) :

```
VITE_BACKEND_API_URL  -> BackendAPIURL
VITE_USER_POOL_ID     -> UserPoolId
VITE_CLIENT_ID        -> UserPoolClientId
```

8. Click Save and Deploy.
9. After the app has started building, click 'Rewrites and redirects' in app settings.
10. Add the following rule to your rewrites and redirects.

```
Source Address: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`

Target Address: `/`

Type: `200 (Rewrite)`
```

Then hit save.

#### You can find the webapp url under Hosting Environments in the Amplify App window
