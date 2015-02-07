from flask import *
import requests

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/')
def home_show():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
