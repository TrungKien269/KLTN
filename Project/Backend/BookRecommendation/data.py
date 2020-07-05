import numpy as np
import pandas as pd
import pyodbc

conn = pyodbc.connect("Driver=SQL Server;"
                      "Server=DESKTOP-4UG8V66;"
                      "Database=BookStore;"
                      "Trusted_Connection=yes;")
                      
# conn = pyodbc.connect("Driver=SQL Express;"
                      # "Server=desktop-tk99ngi;"
                      # "Database=BookStore;"
                      # "Trusted_Connection=yes;")

books = pd.read_sql_query('Select Book.Id, Book.Name, SubCategory.Name as Category, '
                          'RawBook.Author, RawBook.Supplier, RawBook.Publisher '
                          'From RawBook left join BookCategory '
                          'on RawBook.Id = BookCategory.BookID '
                          'left join SubCategory on BookCategory.CateID = SubCategory.ID '
                          'left join Book on Book.ID = RawBook.Id '
                          "Where Book.Status = 'Available';"
                          , conn)

ratings = pd.read_sql_query('Select * From Rating '
                            '', conn)


tracking = pd.read_sql_query('Select RecentTracking.UserID, RecentTracking.BookID,'
                            'Count(RecentTracking.ID) as NumberView From( '
                            'Select * From BookViewTracking '
                            'Where GETDATE() - BookViewTracking.DateTime <= 30) as RecentTracking '
                            'Group by RecentTracking.UserID, RecentTracking.BookID', conn)

best_seller = pd.read_sql_query('Select Top 15 dbo.[OrderDetail].Book_ID '
                                'From dbo.[Order] inner join dbo.[OrderDetail] '
                                'on dbo.[Order].ID = dbo.[OrderDetail].Order_ID '
                                'Where GETDATE() - dbo.[Order].CreatedDate <= 31 '
                                'Group by dbo.[OrderDetail].Book_ID '
                                'Order By SUM(dbo.[OrderDetail].Quantity) DESC;'
                                , conn)

def CountUserRating(userID):
    count_rating = pd.read_sql_query('Select Count(Rating.Book_ID) as NumberRating '
                                    'From dbo.Rating Where Rating.User_ID = ' + str(userID)
                                    , conn)
    return count_rating

def CountUserTracking(userID):
    count_tracking = pd.read_sql_query('Select Count(BookViewTracking.BookID) as NumberTracking '
                                    'From dbo.BookViewTracking '
                                    'Where BookViewTracking.UserID = ' + str(userID) + 
                                    'and GETDATE() - BookViewTracking.DateTime <= 30'
                                    , conn)
    return count_tracking

def CountRecentOrder(userID):
    count_order = pd.read_sql_query('Select Count(*) as NumberOrder '
                                    'From dbo.[Order] '
                                    'Where dbo.[Order].User_ID = ' + str(userID) + 
                                    'and GETDATE() - dbo.[Order].CreatedDate <= 90;'
                                    , conn)
    return count_order

def GetBookWishList(userID):
    wishlist = pd.read_sql_query('Select BookID '
                                'From WishList '
                                'Where WishList.UserID = ' + str(userID) +
                                'Order by WishList.DateTime DESC;'
                                , conn)
    return wishlist

def GetNewestTrackingBook(userID):
    book = pd.read_sql_query('Select Distinct Top 3 BookID, Tracking.DateTime '
                            'From BookViewTracking as Tracking '
                            'Where Tracking.UserID = ' + str(userID) +
                            'Order by Tracking.DateTime DESC;'
                            , conn)
    return book

def GetNewestBookRating(userID):
    rating = pd.read_sql_query('Select Top 1 Book_ID '
                            'From Rating '
                            'Where Rating.User_ID = ' + str(userID) +
                            'Order by Rating.DateTime DESC;'
                            , conn)
    return rating

def GetNewestBookBought(userID):
    book = pd.read_sql_query('Select Book_ID  '
                            'From dbo.[OrderDetail] '
                            'Where dbo.[OrderDetail].Order_ID in '
                            '(Select dbo.[Order].ID '
                            'From dbo.[Order] '
                            'Where dbo.[Order].User_ID = ' + str(userID) + 
                            'and GETDATE() - dbo.[Order].CreatedDate <= 90)'
                            # 'Order by dbo.[Order].CreatedDate DESC)'
                            , conn)
    return book

class Book:

    def __init__(self, df):
        self.df = df

    def get_title_from_index(self, index):
	    return self.df[self.df.index == index]["Name"].values[0]

    def get_id_from_index(self, index):
	    return self.df[self.df.index == index]["Id"].values[0]

    def get_index_from_title(self, title):
	    return self.df[self.df.Name == title]["Index"].values[0]

    def get_index_from_id(self, id):
	    return self.df[self.df.Id == id]["Index"].values[0]

    def get_title_from_id(self, id):
	    return self.df[self.df.Id == id]["Name"].values[0]
    
    def combine_features(self, row):
	    try:
		    return row['Name'] + " " + row['Category']+ " " + row["Author"] + " " + \
            row["Supplier"] + " " + row['Publisher']
	    except:
		    print("Error:", row)

bookObj = Book(books)
