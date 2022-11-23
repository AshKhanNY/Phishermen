import re
import nltk
import pickle
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
nltk.download('wordnet')
nltk.download('omw-1.4')
import requests
from bs4 import BeautifulSoup
import numpy as np
nltk.download('stopwords')
from sklearn.feature_extraction.text import TfidfVectorizer

pickled_model = pickle.load(open('naive_bayes.pkl', 'rb'))
tfidfconverter = TfidfVectorizer(max_features=1500, stop_words=stopwords.words('english'))

def removeDigits(List):
    answer = []
    for s in List:
      res=""
      for char in s :
        if not char.isdigit() and char!=' ':
              res+=char
      if len(res)>=2:
        answer.append(res)
    return ' '.join(answer)

def fetch_content(url):
      if "http://" and "https://" not in url:
        url="http://"+url
      X=[]

      try:
        page = requests.get(url)

        soup = BeautifulSoup(page.text, 'html.parser')

        # kill all script and style elements
        for script in soup(["script", "style"]):
            script.extract()    # rip it out
        # get text
        text = soup.get_text()
        text=re.sub('[^A-Za-z0-9]+', ' ', text).strip()
        text=str(text).replace('\n',' ').split(' ')

        for i in text:
          if i:
            X.append(i)
      except:
        X=[]

      documents = []
      stemmer = WordNetLemmatizer()
      print(X)
      if X:
        #Remove the digits from string:
        document = removeDigits(X)

        # Remove all the special characters
        document = re.sub(r'\W', ' ', document)

        # remove all single characters
        document = re.sub(r'\s+[a-zA-Z]\s+', ' ', document)

        # Remove single characters from the start
        document = re.sub(r'^[a-zA-Z]\s+', ' ', document) 

        # Substituting multiple spaces with single space
        document = re.sub(r'\s+', ' ', document, flags=re.I)

        # Removing prefixed 'b'
        document = re.sub(r'^b\s+', '', document)

        # Converting to Lowercase
        document = document.lower()

        # Lemmatization
        document = document.split()

        document = [stemmer.lemmatize(word) for word in document]
        document = ' '.join(document)

        return document

def check_phishing(link):
  temp = fetch_content(link)
  temp = [temp]

  Y = tfidfconverter.fit_transform(temp).toarray()
  Y = np.pad(Y[0], (0, 1500-len(Y[0])), 'constant')
  Y = Y.reshape(-1, 1500)
  return (pickled_model.predict(Y))[0]

