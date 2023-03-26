import pymongo
from dotenv import load_dotenv, find_dotenv
import os
from pymongo import MongoClient

load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://arjun:{password}@findmyxicluster.dcwfpzh.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(connection_string)
db = client["FindMyXIData"]
collection = db["users"]


for doc in collection.find():
    if doc.get('isPlayer'):
        collection.update_one({'_id': doc.get('_id')}, {'$set': {'alerts': [], 'availableSat': False, 'availableSun': False, 
                                               'primaryTeamPickedSat': False, 'primaryTeamPickedSun': False, 
                                               'secondaryTeamPickedSat': False, 'secondaryTeamPickedSun': False, 
                                               'secondaryTeamSat': '', 'secondaryTeamSun': ''}})
    else:
        collection.update_one({'_id': doc.get('_id')}, {'$set': {'alerts': [], 'pickedPlayers': []}})

