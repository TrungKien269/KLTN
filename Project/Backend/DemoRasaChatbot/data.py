import numpy as np
import pandas as pd
import pyodbc

conn = pyodbc.connect("Driver=SQL Server;"
                      "Server=DESKTOP-4UG8V66;"
                      "Database=BookStore;"
                      "Trusted_Connection=yes;")

best_seller = pd.read_sql_query('Select Top 5 dbo.[OrderDetail].Book_ID, dbo.[Book].Name  '
                                'From dbo.[Order] inner join dbo.[OrderDetail] '
                                'on dbo.[Order].ID = dbo.[OrderDetail].Order_ID '
                                'inner join dbo.[Book] on dbo.[Book].ID = dbo.[OrderDetail].Book_ID '
                                'Where GETDATE() - dbo.[Order].CreatedDate <= 31 '
                                'Group by dbo.[OrderDetail].Book_ID, dbo.[Book].Name '
                                'Order By SUM(dbo.[OrderDetail].Quantity) DESC, dbo.[Book].Name ASC;'
                                , conn)

current_sales = pd.read_sql_query('Select Book.ID, Book.Name '
                                'From Promotion inner join PromotionDetail '
                                'on Promotion.ID = PromotionDetail.Promotion_ID '
                                'inner join Book on PromotionDetail.Book_ID = Book.ID '
                                'Where Promotion.IsExpired = 1;', conn)

highest_rating = pd.read_sql_query('Select Top 5 Book.ID, Book.Name, '
                                'Count(Rating.Point) as NumberRating '
                                'From Rating inner join Book '
                                'on Rating.Book_ID = Book.ID '
                                'Where Rating.Point >= 9 '
                                'Group By Book.ID, Book.Name '
                                'Order by NumberRating DESC, Book.Name ASC;', conn)

