from langchain_community.vectorstores import Chroma
from langchain_community.retrievers import AmazonKendraRetriever
from langchain.chains import RetrievalQA
import boto3
from ..extensions import vecdb
from .embeddingService import query_embedding
from .generationService import llm_open, prompt



def query_llm(query_data):
    question = query_data['question']
    course_id = query_data['course_id']
    question = question

    # use chroma and sagemaker embeddings to get documents
    vectordb = Chroma(client=vecdb, collection_name = course_id ,embedding_function=query_embedding)
    retriever = vectordb.as_retriever()

    qa_chain = RetrievalQA.from_chain_type(llm=llm_open,
                                  chain_type="stuff",
                                  retriever=retriever,
                                  return_source_documents=True,
                                  verbose=True,
                                  chain_type_kwargs={"prompt": prompt})
    llm_response = qa_chain(question)
    
    sources = []
    for source in llm_response["source_documents"]:
        sources.append(source.metadata['source'])
    response = {
        "result": llm_response['result'],
        "sources": sources
    }
    return response