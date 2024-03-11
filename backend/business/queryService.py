import json
from langchain.chat_models import ChatOpenAI
from langchain_community.retrievers import AmazonKendraRetriever
from typing import Dict
from langchain_community.llms.sagemaker_endpoint import LLMContentHandler, SagemakerEndpoint
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
import boto3
# Singleton class runs only once
class SingletonQueryService:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(SingletonQueryService, cls).__new__(cls)
            cls._instance.__initialized = False
        return cls._instance

    def __init__(self, *args, **kwargs):
        if self.__initialized:
            return
        self.__initialized = True

        parameters = {
            "max_new_tokens": 1024,
            "temperature": 1,
            "stop_sequences": None,
        }

        class ContentHandler(LLMContentHandler):
            content_type = "application/json"
            accepts = "application/json"

            def transform_input(self, prompt: str, model_kwargs: Dict) -> bytes:
                input_str = json.dumps({"inputs": prompt, "parameters": model_kwargs})
                return input_str.encode("utf-8")

            def transform_output(self, output: bytes) -> str:
                response_json = json.loads(output.read().decode("utf-8"))
                return response_json[0]["generated_text"]

        self.content_handler = ContentHandler()

        self.llm_open = SagemakerEndpoint(
            credentials_profile_name="", # input
            endpoint_name="", # input
            region_name="us-west-2", # input
            model_kwargs=parameters,
            endpoint_kwargs={"CustomAttributes":"accept_eula=true",
                             "InferenceComponentName": ""}, # input
            content_handler=self.content_handler,
        )

        template = """ <s>[INST] 
            The following is a conversation between a human and a friendly AI. 
            The AI uses the information in the context to answer the question from the human.
            It does not use any other information. 
            This is the context:
            {context}
            Instruction: Based on the above documents, provide a detailed answer for, {question} Answer "I don't know" 
            if not present in the document. Never provide an answer that is not based on the context, even if it is a well known fact.
            Solution:
            [/INST]"""
        self.PROMPT = PromptTemplate(
                template=template, input_variables=["context", "question"],
            )

        self.prompt = PromptTemplate(input_variables=["context", "question"], template=template)


query_service = SingletonQueryService()

def query_llm(query_data):
    question = query_data['question']
    course_id = query_data['course_id']

    attribute_filter = {
    'AndAllFilters': [{  
        'EqualsTo': {
            'Key': "course_id",
            'Value': {
                'StringValue': course_id
            }
        }
    }]
    }
    session = boto3.Session(profile_name='') # input
    # use boto and kendra to get documents
    kendra = session.client('kendra', region_name='us-west-2')# input
  
    retriever = AmazonKendraRetriever(index_id="", credentials_profile_name="",region_name="us-west-2" ) # input
    docs = retriever.get_relevant_documents(question)

    qa_chain = RetrievalQA.from_chain_type(llm=query_service.llm_open,
                                  chain_type="stuff",
                                  retriever=retriever,
                                  return_source_documents=True,
                                  verbose=True,
                                  chain_type_kwargs={"prompt": query_service.prompt})
    llm_response = qa_chain(question)
    # sources = []
    # for source in llm_response["source_documents"]:
    #     sources.append(source.metadata['source'])
    response = {
        "result": llm_response['result'],
        # "sources": sources
    }
    return response