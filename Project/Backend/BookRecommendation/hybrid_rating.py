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
import book_rating
from surprise import Reader, Dataset, SVD, BaselineOnly, accuracy, KNNBasic
from surprise.model_selection import cross_validate, KFold, train_test_split, GridSearchCV
import joblib

def ContentBase(id):
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
			listBook.append([
				data.bookObj.get_id_from_index(element[0]),
				data.bookObj.get_title_from_index(element[0])
			])
		i = i + 1
		if i > 25:
			break
	return listBook

def Hybrid(userID, bookID):
	model = joblib.load('./models/rating.sav')
	BaseID = ContentBase(bookID)
	estList = []

	for i in range(0, len(BaseID)):
		estList.append([BaseID[i][0], BaseID[i][1], 
					model.predict(userID, BaseID[i][0], clip=False).est])

	df = pd.DataFrame(estList, columns=['ID', 'Name', 'EST'])
	df = df.sort_values("EST", ascending=False)
	return df

def SaveModel():
	reader = Reader()
	data.ratings = data.ratings.dropna()
	rating_data = Dataset.load_from_df(data.ratings[['User_ID', 'Book_ID', 'Point']], 
										reader)

	svd = SVD()
	cross_validate(svd, rating_data, measures=['RMSE', 'MAE'], cv=5, verbose=True)


	trainset = rating_data.build_full_trainset()
	svd.fit(trainset)
	joblib.dump(svd, './models/rating.sav')

