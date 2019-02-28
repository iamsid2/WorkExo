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
def allotment(a,b,c,d,e):
    print(a,b,c,d,e)