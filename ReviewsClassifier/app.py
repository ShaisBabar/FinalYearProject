import numpy as np
import pandas as pd 
import nltk  
nltk.download('stopwords') 
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer 
import re  
from flask import Flask, request, jsonify, json, render_template
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from pymongo import MongoClient
from bson.json_util import loads, dumps
client = MongoClient()

app = Flask(__name__)
model = joblib.load('review_classifier_model_saved.pkl')
vectorizer = joblib.load('vectorizer_saved.pkl')


def classifyReview(review):
  review = review
  review = re.sub('[^a-zA-Z]', ' ', review)
  review = review.lower()
  review = review.split()
  ps = PorterStemmer()
  all_stopwords = stopwords.words('english')
  #all_stopwords.remove('not')
  review = [ps.stem(word) for word in review if not word in  set(all_stopwords)]
  review = ' '.join(review)
  new_corpus = [review]
  new_X_test = vectorizer.transform(new_corpus).toarray()
  new_y_pred = model.predict(new_X_test)
  return new_y_pred

@app.route('/predict',methods=['POST'])
def predict():
    try:
        review = request.get_json()['review']
        user_id = request.get_json()['user_id']
        worker_id = request.get_json()['worker_id']
        job_id = request.get_json()['job_id']
        rating = request.get_json()['rating']

        prediction = classifyReview(review)
        client = MongoClient("mongodb+srv://Mominadar:oth009@database.sxhxy.mongodb.net/doorstep?retryWrites=true&w=majority")
        db = client.get_database('doorstep')
        rec = db.reviews 
        review_obj = {
            'user_id':  user_id,
            'worker_id': worker_id,
            'job_id': job_id,
            'review_text':review,
            'sentiment':'{}'.format(prediction[0]),
            'rating':rating
        }
        print(review_obj)
        rec.insert_one(review_obj)

        if prediction[0]==1:
            good_review=1
            return jsonify({'result':good_review,'success':True})
        else :
            good_review=0
            return jsonify({'result': good_review,'success':True})
    except Exception as e:
        print("error: ",e)
        return jsonify({'success':False})

@app.route('/')
def index():
    return 'hellooo'

if __name__ == "__main__":
    app.run(debug=True,port=4001,host="0.0.0.0")
