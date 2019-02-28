from flask import Flask, request, jsonify, render_template
import json
from flask_cors import CORS

import pandas as pd
import numpy as np
import pickle

app = Flask(_name_)
CORS(app)

@app.route('/')
def webprint():
    return render_template('/visualisation/index.html') 

@app.route('/predict', methods=['POST'])
def predict():
    wokers_no = float(request.form['workers_no'])
    working_hr = float(request.form['working_hr'])
    work_section = float(request.form['work_section'])
    attributes = np.array([workers_no,working_hr,work_section])
    response = jsonify(predictor(attributes))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/allot', methods=['POST'])
def allot():
    contracts_no = request.form['contracts_no']
    worker_types = request.from['worker_types']
    worker_no = request.from['worker_no']
    working_share = request.from['working_share']
    contract_duration = request.from['contract_duration']
    allotment = allotment(contracts_no,worker_types,worker_no,working_share,contract_duation)
    return allotment
def allotment(contracts_no, worker_types, worker_no, working_share, contract_duration):
    s = []
    for i in range(len(contract_duration)):
        for j in range (len(worker_types)):
            s.append(contract_duration[i]*working_share[j] / worker_no[j])
            
    s = np.reshape(s, (len(contract_duration), len(worker_types)))     
    
    allot = np.zeros(shape = (len(contract_duration), len(worker_types)))

    for i in range(len(contract_duration)):
        if i < len(contract_duration) and i >0:
            allot[i][0] = allot[i-1][1] 
        for j in range(1, len(worker_types)):
            allot[i][j] = allot[i][j-1] + s[i][j-1]
    print(allot)