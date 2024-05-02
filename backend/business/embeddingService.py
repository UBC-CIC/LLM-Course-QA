import json
from typing import Dict, List
from langchain_community.embeddings import SagemakerEndpointEmbeddings
from langchain_community.embeddings.sagemaker_endpoint import EmbeddingsContentHandler
from ..config import Config

# Embedding model object
# ref: https://python.langchain.com/docs/integrations/llms/sagemaker/
class ContentHandler(EmbeddingsContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, inputs: List[str], model_kwargs: Dict) -> bytes:
        input_str = json.dumps({"text_inputs": inputs, "mode": "embedding"})
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes) -> List[List[float]]:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json["embedding"]

content_handler = ContentHandler()

embedding_args = {
    "endpoint_name": Config.EMBEDDING_ENDPOINT_NAME,
    "region_name": Config.REGION_NAME,
    "content_handler": content_handler,
    "endpoint_kwargs": {"CustomAttributes": "accept_eula=true"}
}

# Conditionally include credentials_profile_name based on profile_name
if Config.ENVIRONMENT != 'production':
    embedding_args["credentials_profile_name"] = Config.PROFILE_NAME

embedding = SagemakerEndpointEmbeddings(**embedding_args)

class QueryContentHandler(EmbeddingsContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, inputs: List[str], model_kwargs: Dict) -> bytes:
        for i in range(len(inputs)):
            inputs[i] = "Represent this sentence for searching relevant passages: " + inputs[i]
        input_str = json.dumps({"text_inputs": inputs, "mode": "embedding"})
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes) -> List[List[float]]:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json["embedding"]

query_content_handler = QueryContentHandler()


# Conditionally include credentials_profile_name based on environment
query_embedding_args = {
    "endpoint_name": Config.EMBEDDING_ENDPOINT_NAME,
    "region_name": Config.REGION_NAME,
    "content_handler": query_content_handler,
    "endpoint_kwargs": {"CustomAttributes": "accept_eula=true"}
}

if Config.ENVIRONMENT != 'production':
    embedding_args["credentials_profile_name"] = Config.PROFILE_NAME

query_embedding = SagemakerEndpointEmbeddings(**query_embedding_args)
