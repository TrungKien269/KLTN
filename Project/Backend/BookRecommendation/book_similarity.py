import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import math
import data

def GetListSimilarityBook(id):
	df = data.bookObj.df
	# df.insert (0, 'Index', df.index)
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
			# print(data.bookObj.get_title_from_index(element[0]) + "\t\t" 
			# + data.bookObj.get_id_from_index(element[0])
			# + "\t Score: " + str(round(element[1], 3)))
			listBook.append(data.bookObj.get_id_from_index(element[0]))
		i = i + 1
		if i > 5:
			break
	# df.drop('Index', 1, inplace=True)
	return listBook


# df = data.bookObj.df
# df.insert (0, 'Index', df.index)
# features = ['Name', 'Category', 'Author', 'Supplier', 'Publisher']

# df["combined_features"] = df.apply(data.bookObj.combine_features, axis=1)

# cv = CountVectorizer()
# count_matrix = cv.fit_transform(df["combined_features"])
# cosine_sim = cosine_similarity(count_matrix)

# book_index = data.bookObj.get_index_from_id('9780349407791')
# similar_books = list(enumerate(cosine_sim[book_index]))
# sorted_similar_books = sorted(similar_books, key=lambda x:x[1], reverse=True)

# i = 0
# for element in sorted_similar_books:
# 	if i > 0:
# 		print(data.bookObj.get_title_from_index(element[0]) + "\t\t" 
# 		+ data.bookObj.get_id_from_index(element[0])
# 		+ "\t Score: " + str(round(element[1], 3)))
# 	i = i + 1
# 	if i > 5:
# 		break





# def get_title_from_index(index):
# 	return df[df.index == index]["Name"].values[0]

# def get_id_from_index(index):
# 	return df[df.index == index]["Id"].values[0]

# def get_index_from_title(title):
# 	return df[df.Name == title]["Index"].values[0]

# def get_index_from_id(id):
# 	return df[df.Id == id]["Index"].values[0]

# df = data.books
# df.insert (0, 'Index', df.index)
# features = ['Name', 'Category', 'Author', 'Supplier', 'Publisher']


# def combine_features(row):
# 	try:
# 		return row['Name'] + " " + row['Category']+ " " + row["Author"] + " " + \
#                row["Supplier"] + " " + row['Publisher']
# 	except:
# 		print("Error:", row)

# df["combined_features"] = df.apply(combine_features, axis=1)

# cv = CountVectorizer()
# count_matrix = cv.fit_transform(df["combined_features"])
# cosine_sim = cosine_similarity(count_matrix)

# book_index = get_index_from_id('9780349407791')
# similar_books = list(enumerate(cosine_sim[book_index]))
# sorted_similar_books = sorted(similar_books, key=lambda x:x[1], reverse=True)

# i = 0
# for element in sorted_similar_books:
# 	if i > 0:
# 		print(get_title_from_index(element[0]) + "\t\t" + get_id_from_index(element[0])
# 		+ "\t Score: " + str(round(element[1], 3)))
# 	i = i + 1
# 	if i > 5:
# 		break
