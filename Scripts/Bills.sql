
GO
ALTER table Bills add IsCredit bit DEFAULT(0)
UPDATE Bills set isCredit = 0


GO
ALTER VIEW vwBills
as 
SELECT 
--* 
b.Id
,ROW_NUMBER() OVER(PARTITION BY pc.Id ORDER BY pc.Id DESC) AS RowNumber
,pc.Id AS ClientId
,bd.Id AS DetalleId
,b.CreateBy
,b.CreateAt
,pc.FirstName
,pc.LastName
,pc.Inss
,pct.Name TypeCustomer
,c.Name AS ContractType
,a.Name AS Area
,fp.Id AS Tranferencia
,pwo.[Date] AS RegisterAt
,s.Id as ServiceId
,s.Name AS ServiceName
,b.CurrencyId
,pwod.Quantity
,CASE WHEN (pwod.Price) > (s.Price*20) THEN ROUND(pwod.Price/r.[Value],2)
ELSE pwod.Price  END  AS Price
,pwod.Quantity*pwod.Price AS SubTotal
,b.[Active]
,r.[Value]
,pc.AddAt
,pc.Observation
FROM Bills AS b
JOIN FollowsPrivates AS fp ON fp.BillId = b.Id
JOIN Areas AS a ON a.Id = fp.AreaTargetId
JOIN PrivateCustomers AS pc ON pc.Id = b.PrivateCustomerId
LEFT JOIN PrivateWorkOrders AS pwo ON pwo.FollowsPrivateId = fp.Id
JOIN PrivateWorkOrderDetails AS pwod ON pwod.PrivateWorkOrderId = pwo.Id
JOIN dbo.[Services] AS s ON pwod.ServiceId =s.Id
JOIN PrivateCustomerTypes AS pct ON pct.Id = pc.TypeId
LEFT JOIN Contracts AS c ON c.Id = pc.ContractId
LEFT JOIN Rates AS r ON pwo.[Date] = r.[Date]
LEFT JOIN BillDetails AS bd ON bd.BillId = b.Id AND bd.ServiceId =  pwod.ServiceId
WHERE pwod.IsService = 1 AND b.[Active] = 1