
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv
import os


load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://arjun:{password}@findmyxicluster.dcwfpzh.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(connection_string)
db = client["FindMyXIData"]
collection = db["users"]


emails = []
for doc in collection.find({"isPlayer": True}):
    if 'email' in doc:
        emails.append(doc['email'])

for email in emails:
    print(email)

print(len(emails))