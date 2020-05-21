import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import math
import data
import sys

def GetListSearchBook(arg):
	df = data.books
	df.insert (0, 'Index', df.index)
	features = ['Name', 'Category', 'Author', 'Supplier', 'Publisher']

	def get_title_from_index(index):
		return df[df.index == index]["Name"].values[0]
		
	def get_id_from_index(index):
		return df[df.index == index]["Id"].values[0]

	def combine_features(row):
		try:
			return row['Name'] + " " + row['Category']+ " " + row["Author"] + " " + \
				row["Supplier"] + " " + row['Publisher']
		except:
			print("Error:", row)

	df["combined_features"] = df.apply(combine_features, axis=1)
	combined_features_Arr = np.array(df["combined_features"])

	book_like = arg
	combined_features_Arr = np.insert(combined_features_Arr, 0, book_like)

	cv = CountVectorizer()
	count_matrix = cv.fit_transform(combined_features_Arr)
	cosine_sim = cosine_similarity(count_matrix)

	similar_books = list(enumerate(cosine_sim[0]))
	sorted_similar_books = sorted(similar_books, key=lambda x:x[1], reverse=True)

	listBook = []
	if round(sorted_similar_books[1][1], 3) > 0:
		for i in range(1, 6):
			print(get_title_from_index(sorted_similar_books[i][0] - 1) + "\t\t" 
			+ get_id_from_index(sorted_similar_books[i][0] - 1) + "\t Score: " 
			+ str(round(sorted_similar_books[i][1], 3)))
			listBook.append(get_id_from_index(sorted_similar_books[i][0] - 1))
	return listBook
