from flask import Flask, render_template, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/detect/', methods=['GET'])
def detect():
    return jsonify({'data' : 'It is now working!'})

if __name__ == "__main__":
    app.run(debug=True)
