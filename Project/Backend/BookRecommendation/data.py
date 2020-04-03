import numpy as np
import pandas as pd
import pyodbc

conn = pyodbc.connect("Driver=SQL Server;"
                      "Server=DESKTOP-4UG8V66;"
                      "Database=BookStore;"
                      "Trusted_Connection=yes;")

books = pd.read_sql_query('Select Book.Id, Book.Name, SubCategory.Name as Category, '
                          'RawBook.Author, RawBook.Supplier, RawBook.Publisher '
                          'From RawBook left join BookCategory '
                          'on RawBook.Id = BookCategory.BookID '
                          'left join SubCategory on BookCategory.CateID = SubCategory.ID '
                          'left join Book on Book.ID = RawBook.Id '
                          "Where Book.Status = 'Available';"
                          , conn)

age_ranges = pd.read_sql_query('Select '
                            'Case '
                            "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 14 and 20 then '14-20' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 21 and 25 then '21-25' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 26 and 30 then '26-30' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 31 and 35 then '31-35' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 36 and 40 then '36-40' "
                            'End as Age_Range '
                            'From dbo.[User] '
	                        'Where ID = 1 ', conn)

# ratings = pd.read_sql_query('Select Rating.User_ID, RawBook.Id as Book_ID, Point, DateTime ' 
#                             'From RawBook full join Rating on RawBook.Id = Rating.Book_ID;'
#                             , conn)


ratings = pd.read_sql_query('With AgeRange as '
                            '( '
                            'Select dbo.[User].ID, '
                            'Case '
                            "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 14 and 20 then '14-20' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 21 and 25 then '21-25' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 26 and 30 then '26-30' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 31 and 35 then '31-35' "
		                    "When (DATEDIFF(hour, Birthday, GETDATE())/8766) Between 36 and 40 then '36-40' "
                            'End as Age_Range '
                            'From dbo.[User] '
	                        'Where ID > 0 '
                            ')'
                            'Select Rating.User_ID, Age_Range, RawBook.Id as Book_ID, Point, DateTime '
                            'From RawBook full join Rating on RawBook.Id = Rating.Book_ID '
                            'inner join AgeRange on Rating.User_ID = AgeRange.ID '
                            "Where Age_Range = '" + age_ranges['Age_Range'].iloc[0] + "'"
                            , conn)



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


# MongoDB Connection

from pymongo import *

client = MongoClient ('localhost:27017')
db = client.get_database('BookStore')
BookViewTracking = db.get_collection('book_view_tracking')

book_view_trackings = pd.DataFrame(list(BookViewTracking.find()))
# print(book_view_trackings.tail())