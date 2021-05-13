import numpy as np
import pymongo
from pymongo import MongoClient
from bson.json_util import loads, dumps
client = MongoClient()
import datetime
import re  
from flask import Flask, request, jsonify, json, render_template

app = Flask(__name__)

map_cities =[
    'Islamabad',
    'Lahore',
    'Karachi',
    'Multan',
    'Quetta',
]

map_categories=[
    'Plumbing',
    'Electrician',
    'Laundary',
    'Carpenting',
    'Cooking',
    'Gardening'
]

map_areas = [

]

@app.route('/search',methods=['POST'])
def find_workers():
    categories = request.get_json()['categories']
    city = request.get_json()['city']
    area = request.get_json()['area']
    date_ = datetime.datetime.now()
    try:
        client = MongoClient("mongodb+srv://Mominadar:oth009@database.sxhxy.mongodb.net/doorstep?retryWrites=true&w=majority")
        db = client.get_database('doorstep')
        rec = db.workers
        workers = list(rec.find())
        for i in workers:
            i['score'] = 0
        for i in workers:
            if(i['city']==city):
                i['score']+=1
                if(i['area']==area):
                    i['score']+=2
            if(categories[0] in i['categories']):
                i['score']+=2
            if(i['dateCreated'] > date_):
                i['score']+=1
            if(i['avg_rating']>=4):
                i['score']+=3
            if(i['completed_jobs']>5):
                i['score']+=1
        
        sorted_workers = sorted(workers, key = lambda item: item['score'])
        if(len(workers)<10):
            filtered_workers = sorted_workers
        else:
            filtered_workers = sorted_workers[10]
        #print(filtered_workers)
        data = {'success':True,'result':dumps(filtered_workers)}
        #print('success')
        return data, 200
    except Exception as e:
        data = {'success':False}
        print('failed',e)
        return data, 400

@app.route('/')
def index():
    return 'hello world'

if __name__ == "__main__":
    app.run(debug=True,port=4000,host="0.0.0.0")
    
