from flask import Flask, request, jsonify, render_template
import json
from flask_cors import CORS

import pandas as pd
import numpy as np
import pickle
import nexmo

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
    contracts_no = request.form['contracts_no']
    worker_types = request.form['worker_types']
    worker_no = request.form['worker_no']
    working_share = request.form['working_share']
    contract_duration = request.form['contract_duration']
    allotment = allotment(contracts_no,worker_types,worker_no,working_share,contract_duration)
    client = nexmo.Client(key='7d7f3c5f', secret='ha8U5VQTNBGglH9h')
    client.send_message({
        'from': 'Workexo',
        'to': '918270857295',
        'text': 'Hello from Nexmo',
    })
    return allotment
def allotment(contracts_no,worker_types,worker_no,working_share,contract_duation):
    cummulative_freq = []
    s = []
    cummulative_freq.append(contract_duration[0])
    for i in range(1, contracts_no):
        cummulative_freq.append(cummulative_freq[i-1]+contract_duration[i])
    print(cummulative_freq)
    for i in range(len(contract_duration)):
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
