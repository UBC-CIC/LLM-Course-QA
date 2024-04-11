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
            "temperature": 1,
            "stop_sequences": None,
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


if profile_name != '':
    llm_open_args["credentials_profile_name"] = profile_name

template = """<s>[INST]
            The following is a conversation between a human and a friendly AI.
            The AI uses the information in the context to answer the question from the human.
            It does not use any other information.
            This is the context:
            {context}
            Instruction: Based on the above documents, provide a detailed answer for, {question} Answer "I don't know"
            if not present in the document. Never provide an answer that is not based on the context, even if it is a well known fact.
            Solution:
            [/INST]"""
PROMPT = PromptTemplate(
                template=template, input_variables=["context", "question"],
            )

prompt = PromptTemplate(input_variables=["context", "question"], template=template)