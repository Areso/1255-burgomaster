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



@burg_server.route('/api/v1.0/get_event_details', methods=['GET'])
def get_event_details():
    myconfig = myloading();
    uid = request.args.get('uid', default=1, type=int)
    mydb = mysql.connector.connect(
        host=myconfig[2],
        user=myconfig[0],
        passwd=myconfig[1],
        database=myconfig[4]
    )
    mycursor = mydb.cursor()
    mycursor.execute("SELECT sum(value) as res FROM pledges WHERE uid = %(uid)s GROUP BY uid", {'uid': uid})
    myresult = mycursor.fetchall()
    if len(myresult)>0:
        for x in myresult:
            the_player_pledge = x
            the_player_pledge = the_player_pledge[0]
            the_player_pledge = int(the_player_pledge)
    else:
        the_player_pledge = 0
    mycursor = mydb.cursor()
    mycursor.execute("SELECT sum(value) as res FROM pledges WHERE id_event = 0 GROUP BY id_event")
    myresult = mycursor.fetchall()
    if len(myresult) > 0:
        for y in myresult:
            the_total_pledge = y
            the_total_pledge = the_total_pledge[0]
            the_total_pledge = int(the_total_pledge)
    else:
        the_total_pledge = 0
    msgToPlayer = "Hello, dear player!<br>"
    msgToPlayer += "Your pledge to the Halloween event is "+str(the_player_pledge)+" collected pumpkins!<br>"
    msgToPlayer += "Total pledge combined to the Halloween event is " + str(the_total_pledge) + " collected pumpkins!<br>"
    msgToPlayer += "The global goal is to collect 500 pumpkins!<br>"
    msgToPlayer += "If players will achieve this high target, they will be well rewarded, accordingly to their pledge!<br>"
    return {"msgToPlayer": msgToPlayer, "the_player_pledge": the_player_pledge, "the_total_pledge": the_total_pledge}, \
           200, {"Access-Control-Allow-Origin": "*"}


@burg_server.route('/api/v1.0/event_countdown', methods=['GET'])
def event_countdown():
    date_cur         = datetime.today()
    date_evt         = datetime.strptime('2019-11-11 0:00:00', '%Y-%m-%d %H:%M:%S')
    date_diff        = date_evt-date_cur
    date_diff_days   = str(days_hours_minutes(date_diff))
    return {"countdown": date_diff_days, "event_started":1}, 200, {"Access-Control-Allow-Origin": "*"}


@burg_server.route('/api/v1.0/register_alias', methods=['POST', 'OPTIONS'])
def register_alias():
    reqdata = request.get_data()
    reqdata = reqdata.decode()
    reqdata = reqdata.split(";")
    uid = int(reqdata[0])
    old_nick = str(reqdata[1])
    if len(old_nick) == 0:
        old_nick = "theNickDidntExist"
    new_nick = str(reqdata[2])
    myconfig = myloading();
    mydb = mysql.connector.connect(
    		host=myconfig[2],
    		user=myconfig[0],
    		passwd=myconfig[1],
    		database=myconfig[4]
    )
    mycursor = mydb.cursor()
    mycursor.execute("select * from nicknames where nickname = %(username)s", {'username': new_nick})
    myresult  = mycursor.fetchall()
    is_exists_w = len(myresult)
    if is_exists_w > 0:
        print("the nick is taken!")
        status = 204
    else:
        mycursor.execute("select * from nicknames where uid = %(uid)s", {'uid': uid})
        myresult = mycursor.fetchall()
        is_exists_uid = len(myresult)
        print(uid)
        if is_exists_uid > 0:
            mycursor.execute("update nicknames set nickname=%(nickname)s where uid=%(uid)s", {'uid': uid, 'nickname': new_nick})
            mydb.commit()
            mycursor.execute("insert into hist_of_nicks(uid,old_nick,new_nick) values (%(uid)s, %(old_nick)s, %(new_nick)s)",
                             {'uid': uid, 'old_nick': old_nick, 'new_nick': new_nick})
            mydb.commit()
            status = 201  # update the record
        else:
            mycursor.execute("insert into nicknames values (%(uid)s, %(nickname)s)",
                             {'uid': uid, 'nickname': new_nick})
            mydb.commit()
            mycursor.execute("insert into hist_of_nicks(uid,old_nick,new_nick) values (%(uid)s, %(old_nick)s, %(new_nick)s)",
                {'uid': uid, 'old_nick': old_nick, 'new_nick': new_nick})
            mydb.commit()
            status = 200  # new record
    return {"content": status}, 200, {"Access-Control-Allow-Origin": "*",
                                       "Content-type": "application/json",
                                       "Access-Control-Allow-Methods": "POST"}


@burg_server.route('/api/v1.0/deadend')
def days_hours_minutes(td):
    return td.days, td.seconds//3600, (td.seconds//60)%60


@burg_server.route('/api/v1.0/events', methods=['GET'])
def get_index2():
    return jsonify({'all_events': events})


if __name__ == '__main__':
    burg_server.run(debug=True,host='0.0.0.0')
