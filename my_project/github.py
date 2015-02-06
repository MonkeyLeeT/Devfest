from flask import Flask, jsonify
import requests

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/search/<search_query>")
def search(search_query):
    url = "https://api.github.com/search/repositories?q=" + search_query
    response_dict = requests.get(url).json()
    return jsonify(response_dict)

if __name__ == "__main__":
    app.run(host="0.0.0.0")

