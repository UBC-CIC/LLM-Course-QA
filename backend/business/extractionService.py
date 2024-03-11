import boto3
from langchain_community.document_loaders import AmazonTextractPDFLoader

def extract_text(s3_path):
    session = boto3.Session(profile_name='Daniel', region_name='us-west-2')
    client = session.client("textract")
    loader = AmazonTextractPDFLoader(s3_path, client=client)
    documents = loader.load()
    
    return documents
