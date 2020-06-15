import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import math
import data

def GetListSimilarityBook(id):
	df = data.bookObj.df
	if 'Index' not in df.columns:
		df.insert (0, 'Index', df.index)
	features = ['Name', 'Category', 'Author', 'Supplier', 'Publisher']

	df["combined_features"] = df.apply(data.bookObj.combine_features, axis=1)

	cv = CountVectorizer()
	count_matrix = cv.fit_transform(df["combined_features"])
	cosine_sim = cosine_similarity(count_matrix)

	book_index = data.bookObj.get_index_from_id(id)
	similar_books = list(enumerate(cosine_sim[book_index]))
	sorted_similar_books = sorted(similar_books, key=lambda x:x[1], reverse=True)

	i = 0
	listBook = []
	for element in sorted_similar_books:
		if i > 0:
			listBook.append(data.bookObj.get_id_from_index(element[0]))
		i = i + 1
		if i > 10:
			break
	return listBook
