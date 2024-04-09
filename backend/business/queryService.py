from langchain_community.vectorstores import Chroma
from langchain_community.retrievers import AmazonKendraRetriever
from langchain.chains import RetrievalQA
from ..data.models.conversation import Conversation
from ..data.models.query import Query
import boto3
from ..extensions import vecdb, db
from .embeddingService import query_embedding
from .generationService import llm_open, prompt



def query_llm(query_data):
    question = query_data['question']
    course_id = query_data['course_id']
    conversation_id = query_data['conversation_id']
    user_id = query_data['user_id']
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
    
    if (conversation_id == None):
        conversation = Conversation(
            conversation_name = question,
            student_id = user_id,
            course_id = course_id,
        )
        db.session.add(conversation)
    query = Query(
        question = question,
        answer = llm_response['result'],
        conversation_id = conversation_id
    )
    db.session.add(query)
    
    # sources = []
    # for source in llm_response["source_documents"]:
    #     sources.append(source.metadata['source'])
    
    response = {
        "result": llm_response['result'],
        # "sources": sources
    }
    return response

def query_list(query_data):
    queries = Conversation.query.get(query_data['conversation_id']).queries.order_by(Query.date)
    query_objects = []
    for query in queries:
        query_objects.append({
            'question': query.question,
            'answer': query.answer,
        })
    response = {
        "result": query_objects,
    }
    return response

def query_conversations(query_data):
    conversations = Conversation.query.filter_by(user_id=query_data['user_id'], course_id=query_data['course_id']).order_by(Conversation.date.desc()).all()
    conversation_objects = []
    for conversation in conversations:
        conversation_objects.append({
            'conversation_id': conversation.id,
            'name': conversation.name
        })
    response = {
        "result": conversation_objects,
        # "sources": sources
    }
    return response

