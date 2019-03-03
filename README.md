# Smart India Hackathon #

This project was developed by the team Hack-O'-Holics, College Of Engineering and Technology,Bhubaneswar,Odisha for SIH 2019.




# Problem Statement Details  #
Micro and small units have man power problem but must manufacture quality products to sustain in the market and because of financial constraints, these units cannot employ more people for small job works which are hourly based. So, there is a requirement of development of open source software which can be customized as per the requirement of micro, small units for work flow requirement containing allocation of work or timeline, qualitative follow up reminders, approvals, filling of statutory requirements with easy date of format.

# Ministry #
Central Ministry

# Company Name #
M/s Prescience Calibration Pvt. Ltd.


# Abstract #
This is an open source software which is highly customisable for micro and small scale industries to manage their workers allotment, work or time line allotment, management of deadlines,monitoring the work flow, keep track of performance and analyse to predict the future trends in a company. 

* Optimised Allocation Algorithm-
This algoritm is developed to allocate the timing for different workers for specific tasks in a company. This time line allocation algorithm pipelines and has a buffer to predict whether the given work can be completed on time. This algorithm takes in the real life situation of risk analysis into consideration and alerts the admin about any discrepancy in the proposed work flow, which the admin can solve by allocating new workers. The proposed work flow and the comparisions with previous reports are visually represented with the help of different dynamic charts.

* Workers Registration-
There is the provision for workers to register for the company by filling up the application form available online.Through this all the interested workers their contact details and skills are forwarded to the admin where he/she can allocate them during any crisis period of the company.

* Deadline Management and Monitoring-
The admin has access to all the database of workers in different departments of the company and tracks their performance through the daily performance hits received by the departments. The department personnel fill up the daily details regarding the work process in the portal. The workers and the department officials receive scheduled SMS and emails regarding the need to meet particular deaxlines and upcoming inspections in their workspace.

* Predictive Analysis-
The data analysis is performed on the dummy data set with the independent variables of - Department, Involvment, Hourly Rate and Standard Hours. These attributes predict the Performance Rating of the proposed work plan. After gathering a lot of data from the company the data analysis technique can be used to predict what will be the future trends of allocation according to the current trends.

### Tech
We have used a number of libraries and tools:
##### For Model:
* **Python3** - Used for scripting our model. And many of its libraries were used:
    * **Scikit-Learn 0.19.1** 
    * **Pandas 0.22.0** - For Data Cleaning.
    * **NumPy 1.14.2** - For mathematical opearations.
    * **Matplotlib 2.2.2** - For visualisations.
##### For WebApp:
* **HTML5** - Used for Markup.
* **CSS3** - For styling the Markup.
* **Bootstrap3** - For pre-prepared styling classes.
* **JQuery** - For JavaScript sending requests to the web server.
* **Flask** - A python library used for creating the web server.
* **Chart.JS** - For visualisations.


### Installing Dependencies 

* To install the libraries required to execute the scripts and run the web-application go to the root folder and execute the following commands:
```sh
$ pip3 install -r requirements.txt
```
* Generate the model.sav file by executing following command
```sh
$ python3 model.py
```

### How to run?
* Go to the root directory of the project folder and execute the following commands:
```sh
$ python3 prediction.py
```
* In a new terminal window execute the following command:
```sh
$ xdg-open templates/allocate.html
