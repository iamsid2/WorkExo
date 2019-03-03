from flask import Flask, request, jsonify, render_template
import json
from pprint import pprint
from flask_cors import CORS

import pandas as pd
import numpy as np
import pickle
import nexmo
import datetime
from pymongo import MongoClient
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['Workexo']
collection = db['prev']
prev = db.prev

with open("text_sms.json") as fp:
    data = json.load(fp)

app = Flask(__name__)
CORS(app)

@app.route('/')
def webprint():
    return render_template('login.html')

@app.route('/dashboard.html', methods=['POST'])
def webprint1():
    return render_template('dashboard.html')

@app.route('/predict', methods=['POST'])
def predict():
    work_type = request.form['work_type']
    job_involvement = request.form['job_involvement']
    hourly_rate = request.form['hourly_rate']
    standard_hrs = request.form['standard_hrs']
    attributes = np.array([work_type,job_involvement,hourly_rate,standard_hrs])
    print(attributes)
    response = jsonify(predictor(attributes))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def res(x):
    if x == 1:
        return 'Average'
    elif x == 2:
        return 'Good'
    elif x == 3:
        return 'Very Good'
    elif x == 4:
        return 'Excellent'


def predictor(test):
    classifier = pickle.load(open('model.sav', 'rb'))
    test = test.reshape(1, -1)
    result = classifier.predict(test)
    print("result")
    print(res(result[0]))
    ret = {'type' : "JSON/TXT"}
    ret['result'] = str(res(result[0]))
    print(ret)
    return ret

@app.route('/allot', methods=['POST'])
def allot():
    print("hello")
    print(request.form)
    contracts_no = int(request.form['contracts_no'])
    worker_types = np.array(request.form['worker_types'].split(","))
    worker_no = np.fromstring(request.form['worker_no'], dtype=float, sep=",")
    working_share = np.fromstring(request.form['working_share'], dtype=float, sep=",")
    contract_duration = np.fromstring(request.form['contract_duration'], dtype=float, sep=",")
    response1, response2 = allotment(contracts_no,worker_types,worker_no,working_share,contract_duration)
    response1 = response1.tolist()
    print(response1)
    post = {"with":response1[(contracts_no)-1][len(worker_types)],
            "without":response2[contracts_no-1]}
    post_id = prev.insert_one(post).inserted_id
    project = prev.find()
    projects = []
    graph = []
    for i in project:
        projects.append(i['with'])
        projects.append(i['without'])
    print(projects)
    for k in range(len(projects)-8,len(projects)):
        graph.append(projects[k])
    print(graph,"Dadaddjskdjsihisjdjksj")
    response1.append(response2)
    response1.append(graph)
    print("ABCD",response1)
    for i in worker_types:
        for j in range(0,len(data[''+i+''])):
            print(data[''+i+''][j]["phone"])
            client = nexmo.Client(key='7d7f3c5f', secret='ha8U5VQTNBGglH9h')
            client.send_message({
                'from': 'Workexo',
                'to': data[''+i+''][j]["phone"],
                'text': "Hello Department A. The project deadline is on 5th March 2019. Has your team submitted their final report yet? Make sure to update your progress in the dashboard and be prepared for the next site visit by Mr. John Doe. Please ignore if done. ",
            })
    response1 = jsonify(response1)
    response1.headers.add('Access-Control-Allow-Origin', '*')
    return response1
def allotment(contracts_no,worker_types,worker_no,working_share,contract_duration):
    cummulative_freq = []
    s = []
    cummulative_freq.append(contract_duration[0])
    for i in range(1, contracts_no):
        cummulative_freq.append(cummulative_freq[i-1]+contract_duration[i])
    for i in range(contracts_no):
        for j in range (len(worker_types)):
            s.append(contract_duration[i]*working_share[j] / worker_no[j])

    s = np.reshape(s, (len(contract_duration), len(worker_types)))

    allot = np.zeros(shape = (len(contract_duration), len(worker_types) + 1))

    for i in range(len(contract_duration)):
        if i < len(contract_duration) and i >0:
            allot[i][0] = allot[i-1][1]
        for j in range(1, len(worker_types) + 1):
            allot[i][j] = allot[i][j-1] + s[i][j-1]
    return allot, cummulative_freq

@app.route('/regd',methods=['POST'])
def regd():
    collection = db['regd']
    regd = db.regd
    name = request.form['name']
    phone = request.form['phone']
    skills = request.form['skills']
    post = {"name":name,
            "phone":phone,
            "skills":skills}
    post_id = regd.insert_one(post).inserted_id
    if not post_id:
        return "0"
    else:
        return "1"

@app.route('/dash',methods=['GET'])
def dash():
    regd = db.regd
    resp = regd.find()
    workers = []
    for i in resp:
        workers.append({'name':i['name'],'phone':i['phone'],'skills':i['skills']})
    workers = jsonify(workers)
    return workers

@app.route('/prod',methods=['GET'])
def prod():
    regd = db.regd
    resp = regd.find()
    workers = []
    for i in resp:
        workers.append({'name':i['name'],'phone':i['phone'],'skills':i['skills']})
    workers = jsonify(workers)
    return workers


app.run(port=8000, debug=True)
