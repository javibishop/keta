SELECT * FROM Modules
SELECT * FROM GEN_sector
SELECT * FROM CostDrivers
SELECT * FROM GenPeriods
SELECT * fROM CostDriversConfiguration
SELECT * FROM CostDriversType
SELECT * FROM CostDrivers
SELECT * FROM CostDriversShoppingLines
SELECT * FROM GEN_sector_tipo
SELECT * FROM GEN_tipo_sector
SELECT * FROM CostDriversconfiguration
update CostDriversconfiguration set code = id
/*
Id	SectorId					ModuleId		CostDriverId			Percentage	PeriodId
3	1 (Atencion de Pacientes)	2(Procurement)	1(Production Classes)	100			61


5	12(Extracciones)			2(Procurement)	2(Activity)				90			61			-- SELECT * FROM View_CdProductionByActivity
6	12(Extracciones)			2(Procurement)	3(Expense Type)			10			61          -- SELECT * FROM View_CdShoppingBySpecificTypeOfExpenditure
*/

SELECT * FROM View_CdSectorSalesParticipation

SELECT * FROM CostDriversPayrollDirect
SELECT * FROM CostDriversActivity
SELECT * FROM [dbo].[LocalizationResources]