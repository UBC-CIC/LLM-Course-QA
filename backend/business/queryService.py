from langchain.retrievers import AmazonKendraRetriever

def query_llm(query_data):
    question = query_data['question']
    course_id = query_data['course_id']

    retriever = AmazonKendraRetriever(index_id="")
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
    retriever.attribute_filter = attribute_filter
    documents = retriever.get_relevant_documents(question)



    






