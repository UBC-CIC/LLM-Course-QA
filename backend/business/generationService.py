import json
from typing import Dict
from langchain_community.llms.sagemaker_endpoint import LLMContentHandler, SagemakerEndpoint
from langchain.prompts import PromptTemplate
from ..extensions import profile_name, region_name, llm_endpoint_name, llm_inference_component_name

class ContentHandler(LLMContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, prompt: str, model_kwargs: Dict) -> bytes:
        input_str = json.dumps({"inputs": prompt, "parameters": model_kwargs})
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes) -> str:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json[0]["generated_text"]

content_handler = ContentHandler()


parameters = {
    "max_new_tokens": 1024,
    "temperature": 0.1,
    "top_k": 10,
}


llm_open_args = {
    "endpoint_name": llm_endpoint_name,
    "region_name": region_name,
    "model_kwargs": parameters,
    "endpoint_kwargs": {"CustomAttributes": "accept_eula=true",
                        "InferenceComponentName": llm_inference_component_name},
    "content_handler": content_handler
}

if profile_name != '':
    llm_open_args["credentials_profile_name"] = profile_name

llm_open = SagemakerEndpoint(**llm_open_args)


# llm_open = Ollama(model="mistral")

template = """ <s>[INST] 
You are a helpful assistant that provides direct and concise answers based only on the provided information.
Use the following information from the course information to answer the user's question. If the answer is not present in the provided information, your answer must only be 'I do not know the answer'.
Do not refer to the fact that there are provided course documents in your answer, just directly answer the question. 
< -- COURSE INFORMATION -- >
{context}
< -- END COURSE INFORMATION -- >
< -- QUESTION -- > 
{question}
< -- END QUESTION -- >
Solution:
[/INST]"""

PROMPT = PromptTemplate(
                template=template, input_variables=["context", "question"],
            )

prompt = PromptTemplate(input_variables=["context", "question"], template=template)