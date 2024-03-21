import boto3
from langchain_community.document_loaders import AmazonTextractPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from ..extensions import profile_name, region_name


def extract_text(s3_path, document_id):
    session = boto3.Session(profile_name=profile_name, region_name=region_name)
    client = session.client("textract")
    loader = AmazonTextractPDFLoader(s3_path, client=client)
    document = loader.load()
    text_splitter = RecursiveCharacterTextSplitter (chunk_size=512, chunk_overlap=64) # can be adjusted based on the embedding model
    documents = text_splitter.split_documents(document)
    return documents

