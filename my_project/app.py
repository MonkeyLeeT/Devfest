from flask import *
import requests
from requests_oauthlib import OAuth1Session
from requests_oauthlib import OAuth1

# Credentials from the application page
key = '2pB3rfVQT89wbREIXsyy53uvE'
secret = 'Fnbt6UuNnDXa8dpxrlXBNJp0akniYa9t1qp1ldJVs01EyP24AV'

# OAuth URLs given on the application page
request_token_url = 'https://api.twitter.com/oauth/request_token'
authorization_base_url = 'https://api.twitter.com/oauth/authorize'
access_token_url = 'https://api.twitter.com/oauth/access_token'

# Fetch a request token
twitter = OAuth1Session(key, client_secret=secret)
twitter.fetch_request_token(request_token_url)

# Link user to authorization page
authorization_url = twitter.authorization_url(authorization_base_url)
print 'Please go here and authorize,', authorization_url

# Get the verifier code from the URL
redirect_response = raw_input('Paste the full redirect URL here: ')
twitter.parse_authorization_response(redirect_response)

# Fetch the access token
twitter.fetch_access_token(access_token_url)

# Fetch a protected resource
print twitter.get('https://api.twitter.com/1/account/settings.json')

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/')
def home_show():
    url = 'https://api.twitter.com/1/account/settings.json'
    return twitter.get('https://api.twitter.com/1/account/settings.json')


if __name__ == "__main__":
    app.run(host="0.0.0.0")
