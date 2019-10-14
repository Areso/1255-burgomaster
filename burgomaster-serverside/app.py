from flask import Flask, jsonify
app = Flask(__name__)


events = [{
  'id':0,
  'title':'Halloween',
  'description':'Collect as much pumpkins as you can',
  'global_target':500,
  'current_result':0,
}]


@app.route('/api/v1.0/date_of_nearest_event', methods=['GET'])
def date_of_nearest_event():
    return '2019-10-28-00-00'


@app.route('/api/v1.0/events', methods=['GET'])
def get_index2():
    return jsonify({'all_events': events})


if __name__ == '__main__':
    app.run(debug=True)