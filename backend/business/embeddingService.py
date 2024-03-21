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

    def transform_input(self, inputs: list[str], model_kwargs: Dict) -> bytes:
        # Example: inference.py expects a JSON string with a "inputs" key:
        input_str = json.dumps({"text_inputs": inputs, "mode": "embedding"})
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes) -> List[List[float]]:
        # Example: inference.py returns a JSON string with the list of
        # embeddings in a "vectors" key:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json["embedding"]
         
content_handler = ContentHandler()

embedding = SagemakerEndpointEmbeddings(
        credentials_profile_name=profile_name, # for local testing
        endpoint_name=embedding_endpoint_name,
        region_name=region_name, # input
        content_handler=content_handler,
        endpoint_kwargs={"CustomAttributes":"accept_eula=true",
        # model_kwargs={"parameters": {"max_new_tokens": 1024, "temperature": 1, "stop_sequences": None}},
        }
    )

class QueryContentHandler(EmbeddingsContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, inputs: list[str], model_kwargs: Dict) -> bytes:
        # Example: inference.py expects a JSON string with a "inputs" key:
        for i in range(len(inputs)):
            inputs[i] = "Represent this sentence for searching relevant passages: " + inputs[i]
        input_str = json.dumps({"text_inputs": inputs, "mode": "embedding"})
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes) -> List[List[float]]:
        # Example: inference.py returns a JSON string with the list of
        # embeddings in a "vectors" key:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json["embedding"]
         
query_content_handler = QueryContentHandler()

query_embedding = SagemakerEndpointEmbeddings(
        credentials_profile_name=profile_name, # for local testing
        endpoint_name=embedding_endpoint_name,
        region_name=region_name, # input
        content_handler=query_content_handler,
        endpoint_kwargs={"CustomAttributes":"accept_eula=true",
        # model_kwargs={"parameters": {"max_new_tokens": 1024, "temperature": 1, "stop_sequences": None}},
        }
    )