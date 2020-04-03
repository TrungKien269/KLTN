import flask
from flask import request, jsonify
import json
import book_similarity
import book_rating
import search


app = flask.Flask(__name__)
# app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def index():
    return "Hello, World!"

@app.route('/booksimilarity/<id>', methods=['GET'])
def get_list_similarity(id):
    return jsonify(book_similarity.GetListSimilarityBook(id))


@app.route('/search/<arg>', methods=['GET'])
def get_list_search(arg):
    return jsonify(search.GetListSearchBook(arg))


@app.route('/rating/<id>', methods=['GET'])
def get_list_rating(id):
    return jsonify(book_rating.GetListBookRating(id))

if __name__ == '__main__':
    app.run(debug=True)