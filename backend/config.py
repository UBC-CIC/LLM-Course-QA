import boto3
import os
import json

class Config:
    ENVIRONMENT = os.environ.get('environment')
    if ENVIRONMENT != 'production':
        PROFILE_NAME = '' # input for local testing
        EMBEDDING_ENDPOINT_NAME = '' # input for local testing
        LLM_ENDPOINT_NAME = '' # input for local testing
        LLM_INFERENCE_COMPONENT_NAME = '' # input for local testing
        REGION_NAME = '' # input for local testing
        BUCKET_NAME = '' # input for local testing
        SESSION = boto3.Session(profile_name=PROFILE_NAME, region_name=REGION_NAME)
        SQLALCHEMY_DATABASE_URI = ''
    else:
        REGION_NAME = os.environ.get('region_name')
        SESSION = boto3.Session(region_name=REGION_NAME)
        LLM_ENDPOINT_NAME = os.environ.get('llm_endpoint_name')
        EMBEDDING_ENDPOINT_NAME = os.environ.get('embedding_endpoint_name')
        BUCKET_NAME = os.environ.get('bucket_name')
        LLM_INFERENCE_COMPONENT_NAME = os.environ.get('llm_inference_component_name')
        # Get secret from AWS Secrets Manager for RDS
        secrets_manager_client = SESSION.client('secretsmanager')
        secret_response = secrets_manager_client.get_secret_value(SecretId=os.environ.get('secret_id'))
        secret = secret_response.get('SecretString')
        secret_dict = json.loads(secret)
        DBUser = secret_dict.get(os.environ.get('db_user_key'))
        DBPassword = secret_dict.get(os.environ.get('db_password_key'))

        # Set the SQLALCHEMY_DATABASE_URI
        SQLALCHEMY_DATABASE_URI = 'postgresql://' + str(DBUser) + ':' + str(DBPassword) + '@' + os.environ.get('postgres_hostname') + ':' + os.environ.get('postgres_port') + '/' + os.environ.get('postgres_database_name')


