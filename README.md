
# Phishermen
**By Ashraq Khan and Chuantian Lin**

A catchy name for catching phishing sites.

This is a Google Chrome extension that will run in the background and detect if the current webpage you are on is safe or not. It is simple but effective, especially since in recent years phishing websites try to appear normal and welcoming, but ultimately they have motives for stealing personal information. It’s hard to tell if a website is a scam or not, which is where this extension comes in place to do the work for you.

## Table of Contents

[TOC]

## Overall Descriptions
### Description

A Google Chrome extension designed to warn users if the current Chrome tab they are on is unsafe or if it has the means to phish data from you. This extension works in the background and combines the simple extension UI with the trained machine learning model in the background into one simple-to-use Chrome extension that doesn’t even require the user to do anything more than let it run automatically. 

### Purpose
Phishing is the most commonly used social engineering and cyber attack. The way phishing works is that the phisher targets naive online users and tricks them into sharing personal information, for the purpose of using it fraudulently. There are ways to avoid getting phished, like having an awareness of phishing websites, saving a list of previous sites (which requires prior knowledge that the site is unsafe), or detecting them early on to prevent any phishing using machine learning. We took the approach of going with the machine learning route for this 
capstone project, and integrated Python with JavaScript to make a Google Chrome extension that solves this issue of detecting phishing pages.

### What It Does
After the extension has been downloaded and the server started, the application runs on its own from there on. In Google Chrome, whenever the user loads a new website or refreshes an existing web page, the contents of the site will be processed in the background and the extension will inform the user if the site is phishing or not. How does it work though?

If you click on the extension on a new tab, it’ll show nothing significant simply because there is no website to process. When you go to a new site with a URL, the extension will grab the URL in the background and send it over to a Python Flask server. The server hosts multiple functions, including one that takes the URL and grabs the HTML content of the page via BeautifulSoup. This allows us to take a deeper look at the Data Object Model, or DOM, of the website and essentially extract as much information as we can from the page. The content is preprocessed by this function. To be specific, before this is sent over to the ML model (in our case, we used a Naive Bayes model), we need to clean up the HTML content into something readable. There were many filters utilized to make an acceptable input for the model, which was hosted in a separate pickle file so we didn't need to retrain it every time we loaded a new site.

Once the model takes its input, it provides a prediction almost instantly. This output is a simple 0 or 1, where 0 confirms that the website is not phishing and 1 is otherwise. The result is passed back to the extension, where it will update the appearance of the extension in real time to the user. There will be a large shield with a check mark indicating that the website is safe if it is so. If the website has been detected to be phishing, it will show a large shield with an X mark on it, followed by a long banner on top of the page signaling a warning. This extension also remembers websites from the past, even if you close the Chrome window, allowing the user to grab instant results from phishing sites that they may be accidentally revisiting.


## Design and Experiment Details
### Software Tech Stack
We used Visual Studio Code as our main IDE to host our project. In our frontend folder we held our JavaScript and HTML/CSS files, which were connected to the Chrome extension directly. In our backend folder we held our Python files, which were connected to the ML model and the Flask server. Both sides communicated via Flask and Chrome calls in order to pass data to and from each other.
<p align="center">
  <img src="https://i.imgur.com/IGrU3MT.png" width="400px"/>
</p>

The following two flows described the two halves of the operation:
<p align="center">
  <img src="https://i.imgur.com/d68BUYZ.png" />
  <img src="https://i.imgur.com/h66ytEk.png" />
</p>

### ML Model Design
Our models for the “Phishermen” can simply be divided into two major categories. One of such is based on features extracted from url links accepting the numerical inputs,another takes a string type of data as input and classifies the website safety level based on it.As we mentioned before our google chrome extention will send the urls to our server and all the features extraction will happen in the server site and return the results.So we trained a total of 9 different models, they all have an accuracy that is over 80 percent. The models we trained are RandomForestClassifier,  DecisionTreeClassifier,SVM;XGBClassifier,VotingClassifier with combination of DecisionTree; RandomForest; SVM and NaiveBayes,StackingClassifier stacking with
RandomForestClassifier; KNN; LogisticRegression; DecisionTrees; NaiveBayes and SVM, RandomForest+Tfidf ,NaiveBayes+Tfidf and Pytorch+LSTM.After the experiments of all sorts of models with different Hyperparameters, data processing, we found out that the text classification models have a better performance than the models that take url features as input in identifying  the phishing website, our final plan is to integrate NaiveBayes with our server to  implement the functionality of our final project. Even though we do train a  pytorch+Lstm model which beats the accuracy over the current model in the backend ,when running it with actual websites, most of the time the results were unexpected. One of our assumptions is  that the way we tokenize the text content and convert it into tensors is different from the model itself. On our pytorch model we used pretrained  “GloVe 6B Vectors” in the embedding layers. We might not use it in the correct way causing the unexpected outcomes. 

### ML Dataset Description
The topic of our project is to identify whether those websites are phishing or not. 
Since we train two types of models with different inputs but they are essentially all about URL links because we can also fetch the contents of websites by the beautifulSoup API, with which HTML will be fetched through the URL links and then we do some text processing to it to train our models. Hence we need a dataset with both “phishing” and “safe” websites. We got the phishing URLs from the phishing tank and the none-phishing website URLs from Kaggle. So what is PhishingTank? 

By Wikipedia: PhishTank was launched in October 2006.The company offers a community-based phish verification system where users submit suspected phishing and other users “vote" if it is a phish or not. Their service is also used by companies like Yahoo,Opera,Cisco and so on. Kaggle is an online community of data scientists and machine learning practitioners.  We believe our dataset is very reliable, and with proper processing, the trained models with those data are  also reliable too. The ratio between “phishing” and “safe” is 1:1 and the total URLs are 10000 in total. But the URLs itself are not the eventual data we need for our models. 

We extract features like “ Domain of the URL”, “ IP Address in the URL”, “"@" Symbol in URL”, “ Length of URL”, “ Depth of URL” , “Redirection "//" in URL”, “  "http/https" in Domain name”,”Shortening Services “TinyURL”,“Prefix or Suffix "-" in Domain”, “DNS Record”, “Website Traffic”, ”Age of Domain ”,”End Period of Domain”,”IFrame Redirection”,”Status Bar Customization”,”Disabling Right Click”, and “Website Forwarding” we record those features as either 1 or 0 and along with the websites’ label into the  CSV file called “urldata.csv”. For the text classification models, we used the contents that were fetched from the urls and did some text processing. The steps we did are: First get rid of all the html tags. Secondly we  removed the digits,all the special characters,all single characters,Substituting multiple spaces with single space,Converting to Lowercase. Lastly we do lemmatization to the strings. Lemmatization is a way to categorize the same worlds so their rooted word.For example we categorize “stars” and “star” as one word”. Finally we save all those text data to csv file call “textdata.csv”. Some URLs either have no text data or are not allowed to access, so there are fewer data than 10000. 


### ML Model Experimental Performance
We have tried different experiments by changing the Hyperparameters of the classifier or with different thresholds.  For example we trained  Decision Tree classifiers with different maximum depth and we trained the SVM with different kernels. So the way we compare each model is we pick the one with highest accuracy and then we set the different thresholds  for those models with highest accuracy to see the changes in precision and recall. Take the Decision Tree classifier as an example. After we varis the maximum depth , we found out that the model with tree classifier with maximum depth of 10 yields the best performance. Then we set a range of thresholds to do the experience on tree models. Again we choose the threshold that makes the model produce the best performance. If there are more than one share the highest accuracy we choose the one that has least precision and recall difference.Similarly, we conduct the same experience to the other models. We attempt to get a model that is sensitive to the phishing website but without “ignoring” the safe websites. We recorded all the performance into this the chart below:

![](https://i.imgur.com/exzC6ip.png)
Confusion matrix of corresponding models:
![](https://i.imgur.com/SGcAZwy.png)


### User Interface Design
When the user is browsing the website and when the user clicks on the google chrome extension. After like 1s the right up corner will pop up a notification board to inform the users if the website is safe or not. If the website is safe, then the notification board is green which  commonly represents a healthy, however if the website is risky, the color of the notification is red which emphasizes the risk of browsing the website.Besides that there is also a horizontal bar that notices the risk of the website. On the notification board, there is a toggle, users can also turn it off after they see the information about the website.



## Description of the Code Organization
We basically break down our projects into four parts – front end,backend,data and models.
Frontend which is the code we developed for Google Chrome  Extention which can be found in https://github.com/AshKhanNY/Phishermen/tree/main/frontend
Backend which is the flask code we developed for our back server which can be found in https://github.com/AshKhanNY/Phishermen/tree/main/backend
Dataset that used to train models can be found in https://github.com/AshKhanNY/Phishermen/tree/main/backend/dataa
Experiments of different models can be found in
found on https://github.com/AshKhanNY/Phishermen/tree/main/backend/data

## Instructions on How to Run
1) Download the entire repository as a ZIP file in your local computer. Unpack the ZIP file into a separate folder, preferably named “Phishermen”.
2) In Google Chrome, click the puzzle piece icon on the top right to go to the extensions tab.
3) In the tab, toggle the “Developer mode” switch on the top right. There should be three new buttons that appear on the left side.
4) Click “Load unpacked” to unpack the extension into your Chrome. Select the “Phishermen” folder that was unpacked earlier.
5) The Flask server must be active in your local system for this to run. In the terminal, navigate to Phishermen/backend and enter the following (note: you must have Flask installed for Python for this to work):
``` flask --app main run ```
6) Once the server is successfully running, return back to Chrome and refresh the Phishermen extension. Now the extension should be running in the background, and anytime you load a new website, you may click on the extension icon, which is a shield, and it’ll let you know the status of the site’s safety.

## Instructions on How to Train the Models

Generally speaking there 5 steps to train a model, click on link how to see how to train a model https://github.com/AshKhanNY/Phishermen/blob/main/backend/models/UrlsModels.ipynb

Collecting Data:As you know, machines initially learn from the data that you give them. It is of the utmost importance to collect reliable data so that your machine learning model can find the correct patterns.

Data Processing, and Splitting data into train set and test set:Putting together all the data you have and randomizing it. This helps make sure that data is evenly distributed, and the ordering does not affect the learning process.Cleaning the data to remove unwanted data, missing values, rows, and columns, duplicate values, data type conversion, etc. You might even have to restructure the dataset and change the rows and columns or index of rows and columns.Splitting the cleaned data into two sets - a training set and a testing set. The training set is the set your model learns from. A testing set is used to check the accuracy of your model after training

Choosing a Model:A machine learning model determines the output you get after running a machine learning algorithm on the collected data. It is important to choose a model which is relevant to the task at hand

Training the Model: In training, you pass the prepared data to your machine learning model to find patterns and make predictions. It results in the model learning from the data so that it can accomplish the task set. Over time, with training, the model gets better at predicting.

Evaluating the Model:After training your model, you have to check to see how it’s performing. This is done by testing the performance of the model on previously unseen data. The unseen data used is the testing set that you split our data into earlier.

## Challenges Faced
During the development process, there are two main challenges we have faced:
1.teamwork: This is the last semester before graduating, most team members are occupied with job hunting. There are some communication issues between the members, which causes some conflicts.
2. problem solve skills: so we have limited knowledge about the packages or models. When we try to seek help from the Internet, sometimes the tutorial is outdated and it is not working anymore. Sometimes we just don't know the alternative ways, and we are stuck on one thing for a long time and it slows down our process a lot 

What we learnt from this journey:
Learning from the challenges, we know that communication is very important, whether the communication between the team members or between the professor with us. sometimes we should have just asked help earlier and we would have saved a lot time and keep the same peace with our original plans


## Future Work
There are many things that can be improved on this project. Unfortunately due to the lack of having two extra teammates, it was difficult delivering a fully finished product. But if we were given more time and had put extra work into this extension, we’d first have the server run online instead of having it hosted locally. Obviously we want to make sure we put the least amount of stress and work on the user, and so having them run a Flask server on their own computer is definitely a hassle that we’d like to get rid of, since it’s not very user friendly. In an online server we can make sure that not only does the user only need to install the extension, but we can also have multiple people using it at the same time. On the topic of the extension, we’d have it published on the Chrome store rather than having it saved in a repo for someone to download in order for them to use it. Downloading it from the store is much more convenient than having to traverse through file explorer and unpacking it on your own.

Regarding the extension and model itself, there are also various adjustments that can be made. The extension UI can use a bit of cleanup so it could look more modern and minimalistic. There aren’t many buttons or menus to navigate through, which can be both a good and a bad thing. Perhaps if we had an area where users could manually input their own websites they’d like to have blocked, or pick out websites to whitelist from the websites that the extension predicted was phishing. Having that customizability ensures that the user feels like the extension is personal and can be tailored to their needs. Regarding the model, the Naive Bayes model only looks at the HTML contents of the websites, but if we had a dual ML model where it combined the results of the Naive Bayes model and the URL processing model, we’d possibly have more accurate results and even have the ability to separate websites into three categories instead of just two: safe, warning (possible threat), and phishing (full block).

