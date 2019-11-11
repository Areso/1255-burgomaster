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


@burg_server.route('/api/v1.1/make_event_pledge', methods=['POST'])
def make_event_pledge():
    myconfig = myloading();
    reqdata = request.get_data()
    uid = int(reqdata)
    mydb = mysql.connector.connect(
        host=myconfig[2],
        user=myconfig[0],
        passwd=myconfig[1],
        database=myconfig[4]
    )
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO pledges(id_event, uid, pledge_value) VALUES (0, %(uid)s, 1)", {'uid': uid})
    mydb.commit()
    return {"content": 200}, 200, {"Access-Control-Allow-Origin": "*",
                                      "Content-type": "application/json",
                                      "Access-Control-Allow-Methods": "POST"}


@burg_server.route('/api/v1.0/get_reward', methods=['POST'])
def get_reward():
    myconfig = myloading();
    reqdata = request.get_data()
    uid = int(reqdata)
    mydb = mysql.connector.connect(
        host=myconfig[2],
        user=myconfig[0],
        passwd=myconfig[1],
        database=myconfig[4]
    )
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM event_reward_notify WHERE uid = %(uid)s", {'uid': uid})
    myresult = mycursor.fetchall()
    rewarded = False
    if len(myresult) > 0:
        rewarded = True
    else:
        rewarded = False
        mycursor.execute("INSERT INTO event_reward_notify(uid, id_event) VALUES (%(uid)s, 0)", {'uid': uid})
        mydb.commit()
    if rewarded is False:
        mycursor.execute("SELECT sum(pledge_value) as res FROM pledges WHERE uid = %(uid)s AND paid=0 GROUP BY uid", {'uid': uid})
        myresult = mycursor.fetchall()
        if len(myresult) > 0:
            for x in myresult:
                the_player_pledge = x
                the_player_pledge = the_player_pledge[0]
                the_player_pledge = int(the_player_pledge)
        else:
            the_player_pledge = 0
            return {"msgToPlayer": 0, "gems": 0, "prize_v": 0, "position": 0}, \
                   201, {"Access-Control-Allow-Origin": "*",
                         "Content-type": "application/json",
                         "Access-Control-Allow-Methods": "POST"}
        msgToPlayer="""Hello player.<br>
                       You didn't participate in the event, but I hope you will join the next one.<br>
                       See you!<br>
                       Sincerely yours, Areso, the game developer."""
        prize_v = 0
        the_user_pos = -1
        if the_player_pledge > 0:
            mycursor.execute("UPDATE pledges SET paid=1 where uid=%(uid)s AND paid=0", {'uid': uid})
            mydb.commit()
            mycursor.execute("""select uid, sum(pledge_value) as pledge from pledges
                                    group by uid
                                    order by pledge desc;""")
            myresult = mycursor.fetchall()
            position = 0
            the_user_pos = -1
            for x in myresult:
                position += 1
                if (x[0] == uid):
                    usersRecord = True
                    the_user_pos = position
            prize1 = ". For the first place you were additionally awarded with %arg3 gems"
            prize_v1 = 30
            prize2 = ". For the second place you were additionally awarded with %arg3 gems"
            prize_v2 = 20
            prize3 = ". For the third place you were additionally awarded with %arg3 gems"
            prize_v3 = 10
            msgToPlayer = """Hello player.<br>
                             First of all, I would like to thank you because your help made this event happen.<br>
                             As a token of my gratitude, I would like to give you %arg1 gems, according to your pledge.<br>
                             They will become useful in the nearest future.<br>
                             Your place was %arg2 %prize<br>
                             I hope will participate in the next event too.<br>
                             See you!<br>
                             Sincerely yours, Areso, the game developer."""
            if (the_user_pos==1 or the_user_pos==2 or the_user_pos==3):
                if the_user_pos == 1:
                    msgToPlayer = msgToPlayer.replace("%prize", prize1)
                    prize_v = prize_v1
                if the_user_pos == 2:
                    msgToPlayer = msgToPlayer.replace("%prize", prize2)
                    prize_v = prize_v2
                if the_user_pos == 3:
                    msgToPlayer = msgToPlayer.replace("%prize", prize3)
                    prize_v = prize_v3
                msgToPlayer = msgToPlayer.replace("%arg3", str(prize_v))
            else:
                msgToPlayer = msgToPlayer.replace("%prize", ".")
            msgToPlayer = msgToPlayer.replace("%arg1", str(the_player_pledge))
            msgToPlayer = msgToPlayer.replace("%arg2", str(the_user_pos))
        return {"msgToPlayer": msgToPlayer, "gems": the_player_pledge, "prize_v": prize_v, "position": the_user_pos}, \
                                          200, {"Access-Control-Allow-Origin": "*",
                                          "Content-type": "application/json",
                                          "Access-Control-Allow-Methods": "POST"}
    else:
        return {"msgToPlayer": 0, "gems": 0, "prize_v": 0, "position": 0}, \
               201, {"Access-Control-Allow-Origin": "*",
                     "Content-type": "application/json",
                     "Access-Control-Allow-Methods": "POST"}

@burg_server.route('/api/v1.1/get_event_leaderboard', methods=['GET'])
def get_event_leaderboard():
    myconfig = myloading();
    uid = request.args.get('uid', default=1, type=int)
    mydb = mysql.connector.connect(
        host=myconfig[2],
        user=myconfig[0],
        passwd=myconfig[1],
        database=myconfig[4]
    )
    mycursor = mydb.cursor()
    mycursor.execute("""select summed.uid, nickname, summed.pledge from
                        (select sum(pledge_value) as pledge,
                        uid from pledges
                        group by uid) as summed
                        left join nicknames
                        on summed.uid = nicknames.uid
                        order by pledge desc;""")
    myresult = mycursor.fetchall()
    msgToUser  = "<table>"
    msgToUser += "<tr><td>#</td><td>nickname<td><td>pledge</td></tr>"
    print("hw")
    usersRecord = False
    placeCounter = 0
    for x in myresult:
        placeCounter += 1
        msgToUser += "<tr>"
        msgToUser += "<td>"+str(placeCounter)+"</td>"
        if (x[0] == uid):
            usersRecord = True
        if (x[1] is None):
            nickname = str(x[0])[-5:]
        else:
            nickname = x[1]
        pledge = x[2]
        msgToUser += "<td>" + str(nickname) + "</td>"
        if (usersRecord == True):
            msgToUser += "<td>" + str(pledge) + "<-- it is your pledge! </td>"
        else:
            msgToUser += "<td>" + str(pledge) + "</td>"
        msgToUser += "</tr>"
        usersRecord = False
    msgToUser +="</table>"
    return {"msgToPlayer": msgToUser}, \
           200, {"Access-Control-Allow-Origin": "*"}


@burg_server.route('/api/v1.1/get_event_details', methods=['GET'])
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
    mycursor.execute("SELECT sum(pledge_value) as res FROM pledges WHERE uid = %(uid)s GROUP BY uid", {'uid': uid})
    myresult = mycursor.fetchall()
    if len(myresult)>0:
        for x in myresult:
            the_player_pledge = x
            the_player_pledge = the_player_pledge[0]
            the_player_pledge = int(the_player_pledge)
    else:
        the_player_pledge = 0
    mycursor = mydb.cursor()
    mycursor.execute("SELECT sum(pledge_value) as res FROM pledges WHERE id_event = 0 GROUP BY id_event")
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
    msgToPlayer += "Pumpkins could be found only on the newly generated adventure map.<br>"
    msgToPlayer += "If you do have one before the event, you need to regenerate the map to get event items on it"
    return {"msgToPlayer": msgToPlayer, "the_player_pledge": the_player_pledge, "the_total_pledge": the_total_pledge}, \
           200, {"Access-Control-Allow-Origin": "*"}


@burg_server.route('/api/v1.1/event_countdown', methods=['GET'])
def event_countdown():
    date_cur         = datetime.today()
    date_evt         = datetime.strptime('2019-11-12 0:00:00', '%Y-%m-%d %H:%M:%S')
    date_diff        = date_evt-date_cur
    date_diff_days   = str(days_hours_minutes(date_diff))
    return {"countdown": date_diff_days, "event_started":1}, 200, {"Access-Control-Allow-Origin": "*"}


@burg_server.route('/api/v1.1/register_alias', methods=['POST', 'OPTIONS'])
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


@burg_server.route('/api/v1.1/deadend')
def days_hours_minutes(td):
    return td.days, td.seconds//3600, (td.seconds//60)%60


@burg_server.route('/api/v1.1/events', methods=['GET'])
def get_index2():
    return jsonify({'all_events': events})


if __name__ == '__main__':
    burg_server.run(debug=True,host='0.0.0.0')
