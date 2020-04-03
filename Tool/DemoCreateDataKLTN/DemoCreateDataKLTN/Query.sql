Select Count(*) From dbo.[Order];

Select *
From dbo.[Order] 
Where CreatedDate > '2020-02-25';

Select *
From dbo.[OrderDetail]
Where Order_ID in (Select ID From dbo.[Order] Where CreatedDate > '2020-02-25');

Delete From dbo.[OrderDetail] Where Order_ID in (Select ID From dbo.[Order] Where CreatedDate > '2020-02-25');
Delete From dbo.[Order] Where CreatedDate > '2020-02-25';s


Select *
From dbo.[Order];

Select *
From dbo.[OrderDetail];