from langchain_community.document_loaders import AmazonTextractPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from ..extensions import region_name, session


def extract_text(s3_path, document_id):
    client = session.client("textract", region_name=region_name)
    loader = AmazonTextractPDFLoader(s3_path, client=client)
    document = loader.load()
    text_splitter = RecursiveCharacterTextSplitter (chunk_size=2048, chunk_overlap=64)
    documents = text_splitter.split_documents(document)
    return documents

