#!/usr/bin/env python3
import json
from datetime import datetime, date
import mysql.connector
from flask import Flask, jsonify
from flask import request
burg_server = Flask(__name__)


events = [{
  'id':0,
  'title':'Halloween',
  'description':'Collect as much pumpkins as you can',
  'global_target':500,
  'current_result':0,
}]

def myloading():
    cfgpath = "config-mysql.txt"
    fconf = open(cfgpath, 'r')
    tconf = fconf.read()
    fconf.close()
    conf_list = tconf.split('\n')
    return conf_list

@burg_server.route('/api/v1.0/event_countdown', methods=['GET'])
def event_countdown():
    date_cur         = datetime.today()
    date_evt         = datetime.strptime('2019-10-29 0:00:00', '%Y-%m-%d %H:%M:%S')
    date_diff        = date_evt-date_cur
    date_diff_days   = str(days_hours_minutes(date_diff))
    return {"countdown":date_diff_days,"event_started":0}, 200, {"Access-Control-Allow-Origin" : "*"}


@burg_server.route('/api/v1.0/register_alias', methods=['POST'])
def register_alias():
    content  = request.get_json()
    print(content)
    #myconfig = myloading();
    #mydb = mysql.connector.connect(
    #		host=myconfig[2],
    #		user=myconfig[0],
    #		passwd=myconfig[1],
    #		database=myconfig[4]
    #)
    #mycursor = mydb.cursor()
    #sql = "select * from nicknames where is_ack = 0"
    #print(sql)
    #mycursor.execute(sql)
    #myresult = mycursor.fetchall()
    #nonsentorders = len(myresult)
    #sql = "UPDATE "+table_md+" SET is_ack = 1 WHERE is_ack = 0"
    #print(sql)
    #mycursor.execute(sql)
    #mydb.commit()
    return "200"


@burg_server.route('/api/v1.0/deadend')
def days_hours_minutes(td):
    return td.days, td.seconds//3600, (td.seconds//60)%60


@burg_server.route('/api/v1.0/events', methods=['GET'])
def get_index2():
    return jsonify({'all_events': events})


if __name__ == '__main__':
    burg_server.run(debug=True,host='0.0.0.0')

