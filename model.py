import pandas as pd
import numpy as np
import pickle as pk

#importing datasets
data = pd.read_csv("./datasets/Workexo.csv", usecols = ['JobInvolvement', 'Department','HourlyRate', 'StandardHours','PerformanceRating'])
data=data.reindex(columns=['Department','JobInvolvement', 'HourlyRate', 'StandardHours','PerformanceRating'])\

#distributing independent and dependent variables
X = data.iloc[:,:-1].values
y = data.iloc[:,-1].values

#Integer Encoding of Department type
from sklearn.preprocessing import LabelEncoder
label_encoder = LabelEncoder()
X[:,0] = label_encoder.fit_transform(X[:,0])
X = X.astype(np.int64)

#Splitting the dataset into Training and Test set
from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X, y, test_size=0.25)

# Fitting Decision Tree Classification to the Training set
from sklearn.tree import DecisionTreeClassifier
classifier = DecisionTreeClassifier(criterion = 'entropy', random_state = 0)
classifier.fit(X, y)

#Predicting the Test Set Results
y_pred = classifier.predict(X_test)

#Accuracy/100
print(classifier.score(X_test, y_test))

pk.dump(classifier, open( "model.sav", "wb" ))
