from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/detect/', methods=['GET', 'POST'])
def detect():
    import predictor
    # POST request
    if request.method == 'POST':
        data = request.get_json()
        url = data['url']
        message = {'message':'Default'}
        print(predictor.check_phishing(url))
        if (predictor.check_phishing(url)): 
            message = {'message':'This is a safe site.',
                       'site': url}
        else:
            message = {'message':'This is NOT safe site.',
                       'site': url}
        return jsonify(message)
    # GET request
    else:
        message = {'message':'This is a locally hosted site!'}
        return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)
