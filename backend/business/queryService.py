from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from ..data.models.conversation import Conversation
from ..data.models.query import Query
from ..extensions import db, vecdb
from ..config import Config
from .embeddingService import query_embedding
from .generationService import llm_open, prompt
from .courseService import get_course


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

    if (conversation_id is None):
        conversation = Conversation(
            name = question,
            user_id = user_id,
            course_id = course_id,
        )
        db.session.add(conversation)
        db.session.commit()
        conversation_id = conversation.id

    query = Query(
        question = question,
        answer = llm_response['result'],
        conversation_id = conversation_id
    )
    db.session.add(query)
    db.session.commit()
    s3 = Config.SESSION.client('s3')
    sources = []
    for source in llm_response["source_documents"]:
        s3_presigned_data = split_s3_url(source.metadata['source'])
        presigned_url = s3.generate_presigned_url('get_object', Params={'Bucket': s3_presigned_data['bucket_name'], 'Key': s3_presigned_data['object_name']}, ExpiresIn=3600)
        if presigned_url not in sources:
            sources.append(presigned_url)

    response = {
        "result": llm_response['result'],
        "conversation_id": conversation_id,
        "sources": sources
    }

    return response

def split_s3_url(source):
    parts = source.replace("s3://", "").split("/", 1)
    bucket_name = parts[0]
    object_name = parts[1]

    return {"bucket_name": bucket_name, "object_name": object_name}

def query_list(query_data):
    conversation = Conversation.query.get(query_data['conversation_id'])
    queries = sorted(conversation.queries, key=lambda query: query.date)

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

def conversation_history(query_data):
    conversations = Conversation.query.filter_by(user_id=query_data['user_id'], course_id=query_data['course_id']).order_by(Conversation.date.desc()).all()
    cId = get_course(query_data['course_id'])
    conversation_objects = []
    for conversation in conversations:
        conversation_objects.append({
            'conversation_id': conversation.id,
            'name': conversation.name
        })
    response = {
        "result": conversation_objects,
        "course_name": cId.course_code
        # "sources": sources
    }

    return response

