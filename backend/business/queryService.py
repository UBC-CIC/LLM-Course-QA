from langchain.retrievers import AmazonKendraRetriever

def query_llm(query_data):
    question = query_data['question']

    retriever = AmazonKendraRetriever(index_id="")
    documents = retriever.get_relevant_documents(question)
    retriever._kendra_query(question)
    print(documents)


