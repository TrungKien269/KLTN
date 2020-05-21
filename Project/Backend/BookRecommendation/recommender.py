import os
import pandas as pd
import numpy as np
import hybrid_rating
import hybrid_tracking
import data
import random
import book_similarity

def RecommendBook(userID, bookID):
    ratingsList = hybrid_rating.Hybrid(userID, bookID)['ID'].to_list()
    trackingsList = hybrid_tracking.Hybrid(userID, bookID)['ID'].to_list()
    result = []

    count = 0
    for i in range(0, len(ratingsList)):
        result.append(ratingsList[i])
        count = count + 1
        if trackingsList[i] not in result:
            result.append(trackingsList[i])
            count = count + 1
        if count >= 10:
            break
    return result

def GetListRecommendBook(userID):
    count_rating = data.CountUserRating(userID).iloc[0, 0]
    count_tracking = data.CountUserTracking(userID).iloc[0, 0]

    if(count_rating == 0 and count_tracking <= 3):
        bookArr = data.GetNewestTrackingBook(userID)['BookID'].to_list()
        bookID = bookArr[random.randint(0, len(bookArr) - 1)]
        return book_similarity.GetListSimilarityBook(bookID)
    else: 
        style = np.random.choice(['wish list', 'view', 'rating', 'order'], 1,
                        p=[0.4, 0.3, 0.2, 0.1])
        if style == 'wish list':
            bookArr = data.GetBookWishList(userID)['BookID'].to_list()
            bookID = bookArr[random.randint(0, len(bookArr) - 1)]
        elif style == 'view':
            bookArr = data.GetNewestTrackingBook(userID)['BookID'].to_list()
            bookID = bookArr[random.randint(0, len(bookArr) - 1)]
        elif style == 'order':
            bookArr = data.GetNewestBookBought(userID)['Book_ID'].to_list()
            bookID = bookArr[random.randint(0, len(bookArr) - 1)]
        else: 
            bookArr = data.GetNewestBookRating(userID)['Book_ID'].to_list()
            bookID = bookArr[random.randint(0, len(bookArr) - 1)]
        return RecommendBook(userID, bookID)
