import json
from typing import Dict, List
from langchain_community.embeddings import SagemakerEndpointEmbeddings
from langchain_community.embeddings.sagemaker_endpoint import EmbeddingsContentHandler
from ..extensions import profile_name, embedding_endpoint_name, region_name
# embedding model object
# ref:
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


# Conditionally include credentials_profile_name based on profile_name
embedding_args = {
    "endpoint_name": embedding_endpoint_name,
    "region_name": region_name,
    "content_handler": content_handler,
    "endpoint_kwargs": {"CustomAttributes": "accept_eula=true"}
}

if profile_name != '':
    embedding_args["credentials_profile_name"] = profile_name

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


# Conditionally include credentials_profile_name based on profile_name
query_embedding_args = {
    "endpoint_name": embedding_endpoint_name,
    "region_name": region_name,
    "content_handler": query_content_handler,
    "endpoint_kwargs": {"CustomAttributes": "accept_eula=true"}
}

if profile_name != '':
    query_embedding_args["credentials_profile_name"] = profile_name

query_embedding = SagemakerEndpointEmbeddings(**query_embedding_args)