alter VIEW vwKardex
as

SELECT
		ipp.[Date]
		,ippt.Name AS [Type]

		,ippd.Quantity AS QuantityIn
		,ippd.Cost as CostIn
		,CAST((ippd.Quantity * ippd.Cost) AS DECIMAL) AS CostTotalIn

		,0 QuantityOut
		,cast (0 AS decimal) AS  CostOut
		,cast (0 AS decimal) AS CostTotalOut

		,ippd.CostAVG
		,ippd.Stocks
		,cast ((ippd.Stocks * ippd.CostAVG) AS decimal) AS CostPromOut
		,ippd.ProductId
		,ipp.AreaId
		,ipp.Reference
		,ipp.Id,
		ipp.CreateAt
	FROM InPutProductDetails AS ippd
	JOIN InPutProducts AS ipp ON ipp.Id = ippd.InPutProductId
	JOIN Products AS p ON p.Id = ippd.ProductId
	JOIN InPutProductTypes AS ippt ON ippt.Id = ipp.TypeId
	WHERE ipp.StateId = 1
	
	UNION ALL

	SELECT  
		ipp.[Date]
		,ippt.Name AS [Type]

		,0 QuantityIn
		,cast (0 AS decimal) AS CostIn
		,cast (0 AS decimal) AS CostTotalIn

		,ippd.Quantity AS QuantityOut
		,ippd.CostAVG AS CostOut
		,CAST((ippd.Quantity * ippd.CostAVG) AS DECIMAL) AS CostTotalOut

		,ippd.CostAVG
		,ippd.Stocks
		,cast ((ippd.Stocks * ippd.CostAVG) AS decimal) AS CostPromOut

		,ippd.ProductId
		,ipp.AreaId
		,ipp.Reference
		,ipp.Id,
		ipp.CreateAt
	FROM OutPutProductDetails AS ippd
	JOIN OutPutProducts AS ipp ON ipp.Id = ippd.OutPutProductId
	JOIN Products AS p ON p.Id = ippd.ProductId
	JOIN OutPutProductTypes AS ippt ON ippt.Id = ipp.TypeId
	WHERE ipp.StateId = 1