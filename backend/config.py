import boto3
import os
import json


class Config:
    ENVIRONMENT = os.environ.get('environment') 
    if ENVIRONMENT != 'production':
        PROFILE_NAME = 'parithi' # input for local testing
        EMBEDDING_ENDPOINT_NAME = '' # input for local testing
        LLM_ENDPOINT_NAME = '' # input for local testing
        LLM_INFERENCE_COMPONENT_NAME = '' # input for local testing
        REGION_NAME = 'us-west-2' # input for local testing
        BUCKET_NAME = 'institutionname' # input for local testing
        SESSION = boto3.Session(profile_name=PROFILE_NAME, region_name=REGION_NAME)
        SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost/course-qa'
    else:
        REGION_NAME = os.environ.get('region_name')
        SESSION = boto3.Session(region_name=REGION_NAME)
        LLM_ENDPOINT_NAME = os.environ.get('llm_endpoint_name')
        EMBEDDING_ENDPOINT_NAME = os.environ.get('embedding_endpoint_name')
        BUCKET_NAME = os.environ.get('bucket_name')
        LLM_ENDPOINT_NAME = os.environ.get('llm_inference_component_name')
        # Get secret from AWS Secrets Manager for RDS
        secrets_manager_client = SESSION.client('secretsmanager')
        secret_response = secrets_manager_client.get_secret_value(SecretId=os.environ.get('secret_id'))
        secret = secret_response.get('SecretString')
        secret_dict = json.loads(secret)
        DBName = secret_dict.get('DBName')
        DBPassword = secret_dict.get('DBPassword')

        # Set the SQLALCHEMY_DATABASE_URI
        SQLALCHEMY_DATABASE_URI = 'postgresql://' + DBName + ':' + DBPassword + '@' + os.environ.get('postgres_hostname') + ':' + os.environ.get('postgres_port') + '/' + os.environ.get('postgres_database_name')
    

