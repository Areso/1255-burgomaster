#!/usr/bin/env python3
from datetime import datetime, date
from flask import Flask, jsonify
burg_server = Flask(__name__)


events = [{
  'id':0,
  'title':'Halloween',
  'description':'Collect as much pumpkins as you can',
  'global_target':500,
  'current_result':0,
}]


@burg_server.route('/api/v1.0/event_countdown', methods=['GET'])
def event_countdown():
    date_cur         = datetime.today()
    date_evt         = datetime.strptime('2019-10-28 0:00:00', '%Y-%m-%d %H:%M:%S')
    date_diff        = date_evt-date_cur
    date_diff_days   = str(days_hours_minutes(date_diff))
    return date_diff_days


@burg_server.route('/api/v1.0/deadend')
def days_hours_minutes(td):
    return td.days, td.seconds//3600, (td.seconds//60)%60


@burg_server.route('/api/v1.0/events', methods=['GET'])
def get_index2():
    return jsonify({'all_events': events})


if __name__ == '__main__':
    burg_server.run(debug=True)

