import flask
from flask import request, jsonify
import json
import book_similarity
import book_rating
import search
import recommender

app = flask.Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return "Hello, World!"

@app.route('/booksimilarity/<id>', methods=['GET'])
def get_list_similarity(id):
    return jsonify(book_similarity.GetListSimilarityBook(id))

@app.route('/recommend/<userID>', methods=['GET'])
def recommend_book(userID):
    return jsonify(recommender.GetListRecommendBook(userID))

@app.route('/search/<arg>', methods=['GET'])
def get_list_search(arg):
    return jsonify(search.GetListSearchBook(arg))


@app.route('/rating/<id>', methods=['GET'])
def get_list_rating(id):
    return jsonify(book_rating.GetListBookRating(id))

if __name__ == '__main__':
    app.run(debug=True, port=6000)