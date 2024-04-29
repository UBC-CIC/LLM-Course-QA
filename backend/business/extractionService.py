from langchain_community.document_loaders import AmazonTextractPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from ..app import app


def extract_text(s3_path, document_id):
    client = app.config['SESSION'].client("textract", region_name=app.config['REGION_NAME'])
    loader = AmazonTextractPDFLoader(s3_path, client=client)
    document = loader.load()
    text_splitter = RecursiveCharacterTextSplitter (chunk_size=2048, chunk_overlap=64)
    documents = text_splitter.split_documents(document)
    return documents

