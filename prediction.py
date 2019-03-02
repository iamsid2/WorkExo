from flask import Flask, request, jsonify, render_template
import json
from pprint import pprint
from flask_cors import CORS

import pandas as pd
import numpy as np
import pickle
import nexmo

with open("text_sms.json") as fp:
    data = json.load(fp)
print(len(data['a']))

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
    attributes = np.array([workers_no,working_hr,work_section])
    response = jsonify(predictor(attributes))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/allot', methods=['POST'])
def allot():
    print("hello")
    print(request.form)
    contracts_no = int(request.form['contracts_no'])
    worker_types = np.array(request.form['worker_types'].split(","))
    worker_no = np.fromstring(request.form['worker_no'], dtype=float, sep=",")
    working_share = np.fromstring(request.form['working_share'], dtype=float, sep=",")
    contract_duration = np.fromstring(request.form['contract_duration'], dtype=float, sep=",")
    response = allotment(contracts_no,worker_types,worker_no,working_share,contract_duration)
    response = response.tolist()
    for i in worker_types:
        for j in range(0,len(data[''+i+''])):
            print(data[''+i+''][j]["phone"])
            client = nexmo.Client(key='7d7f3c5f', secret='ha8U5VQTNBGglH9h')
            client.send_message({
                'from': 'Workexo',
                'to': data[''+i+''][j]["phone"],
                'text': "please do your pending works according to your allotment",
            })
    response = jsonify(response)
    return response
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
            
    return allot
        

app.run(port=8000, debug=True)
