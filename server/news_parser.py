##############################################
# This file is used to get all essential data from a news article using the newspaper3k library.
# 
# Funtions: 
#   format_string(input_string:str) -> str:
#      - This function is used to format the string by replacing all unwanted characters (data cleaning).
#      - It takes a string as input and returns a formatted string.
#
#   parse_news(link:str)-> dict:
#      - This function is used to parse the news article from the given link.
#      - It takes a string as input and returns a dictionary containing all the essential data.
#
##############################################
from newspaper import Article

def format_string(input_string):
    return input_string.replace('\n', ' ').replace('\r', ' ').replace('\t', ' ').replace('\xa0', ' ').replace('\\', ' ').replace('"', ' ')

def parse_news(link):
    news = Article(link, language='en')
    news.download()
    news.parse()
    news.nlp()
    
    news_dict = {
        "title": format_string(str(news.title)),
        "text": format_string(str(news.text)),
        "authors": news.authors,
        "published_date": format_string(str(news.publish_date)),
        "top_image": format_string(str(news.top_image)),
        "videos": news.movies,
        "keywords": news.keywords,
        "summary": format_string(str(news.summary))
    }
    
    return news_dict 