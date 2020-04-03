import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sklearn
from sklearn.decomposition import TruncatedSVD, PCA
import math
import matplotlib.pyplot as plt
plt.style.use("ggplot")
import data

def GetListBookRating(id):
    data.ratings = data.ratings.dropna()
    popular_books = pd.DataFrame(data.ratings.groupby('Book_ID')['Point'].count())
    most_popular = popular_books.sort_values('Point', ascending=False)

    ratings_utility_matrix = data.ratings.pivot_table(values='Point', 
                            index='User_ID', columns='Book_ID', fill_value=0)

    X = ratings_utility_matrix.T
    X1 = X

    n_dimension = 4
    pca = PCA(n_components = n_dimension)
    SVD = TruncatedSVD(n_components=n_dimension)

    decomposed_matrix = pca.fit_transform(X)
    # decomposed_matrix = SVD.fit_transform(X)

    correlation_matrix = np.corrcoef(decomposed_matrix)

    i = id

    product_names = list(X.index)
    product_ID = product_names.index(i)

    correlation_product_ID = correlation_matrix[product_ID]

    Recommend = list(X.index[correlation_product_ID > 0.8])
    Recommend.remove(i) 

    book = data.bookObj
    listBook = []
    for i in range(0, 10):
        # print(book.get_title_from_id(Recommend[i]))
        listBook.append(Recommend[i])
    return listBook


# data.ratings = data.ratings.dropna()
# popular_books = pd.DataFrame(data.ratings.groupby('Book_ID')['Point'].count())
# most_popular = popular_books.sort_values('Point', ascending=False)

# ratings_utility_matrix = data.ratings.pivot_table(values='Point', 
#                         index='User_ID', columns='Book_ID', fill_value=0)

# X = ratings_utility_matrix.T
# X1 = X

# n_dimension = 4
# pca = PCA(n_components = n_dimension)
# SVD = TruncatedSVD(n_components=n_dimension)

# decomposed_matrix = pca.fit_transform(X)
# # decomposed_matrix = SVD.fit_transform(X)

# correlation_matrix = np.corrcoef(decomposed_matrix)

# i = '9781133313199'

# product_names = list(X.index)
# product_ID = product_names.index(i)

# correlation_product_ID = correlation_matrix[product_ID]

# Recommend = list(X.index[correlation_product_ID > 0.8])
# Recommend.remove(i) 

# book = data.bookObj
# for i in range(0, 10):
#     print(book.get_title_from_id(Recommend[i]))