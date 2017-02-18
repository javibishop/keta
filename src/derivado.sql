USE [Costos]
GO

/****** Object:  View [dbo].[View_CMP_periodo_derivado]    Script Date: 09/10/2015 04:43:43 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[View_CMP_periodo_derivado]
AS
SELECT        CAST(YEAR(dbo.Lote_CMP.fecha_contable) AS VARCHAR) + RIGHT('00' + CAST(MONTH(dbo.Lote_CMP.fecha_contable) AS VARCHAR), 2) AS Periodo, dbo.Lote_CMP.fecha_contable AS FechaContable, 
                         dbo.Empresas.razon_social AS Empresa, dbo.Lote_CMP.codigo_sector AS SectorCodigo, dbo.Lote_CMP.nombre_sector AS SectorNombre, dbo.Lote_CMP.tipo_comprobante AS ComprobanteTipo, 
                         dbo.Lote_CMP.numero_comprobante AS ComprobanteNumero, dbo.Lote_CMP.tipo_gasto AS GastoTipo, dbo.CMP_proveedor.cuit AS ProveedorCuit, dbo.CMP_proveedor.razon_social AS ProveedorRazonSocial, 
                         dbo.CMP_articulo.codigo AS ArticuloCodigo, dbo.CMP_articulo.descripcion AS ArticuloDescripcion, dbo.CMP_tipo_articulo.descripcion AS ArticuloTipo, 
                         dbo.CMP_factores_distribucion.codigo AS FactorDistribucionCodigo, dbo.CMP_factores_distribucion.descripcion AS FactorDistribucionDescripcion, dbo.Lote_CMP.cantidad, 
                         dbo.Lote_CMP.cotizacion_divisa AS CotizacionDivisa, dbo.Lote_CMP.precio_uni AS PrecioUnitario, dbo.Lote_CMP.importe, dbo.Lote_CMP.destino, dbo.CMP_factores_distribucion.codigo, 
                         dbo.CMP_factores_distribucion.descripcion, dbo.Empresas.id AS EmpresaId
FROM            dbo.Lote_CMP INNER JOIN
                         dbo.CMP_proveedor_empresa_articulo ON dbo.Lote_CMP.proveedor_empresa_articulo_id = dbo.CMP_proveedor_empresa_articulo.id INNER JOIN
                         dbo.CMP_proveedor_empresa ON dbo.CMP_proveedor_empresa_articulo.proveedor_empresa_id = dbo.CMP_proveedor_empresa.id INNER JOIN
                         dbo.CMP_proveedor ON dbo.CMP_proveedor_empresa.proveedor_id = dbo.CMP_proveedor.id INNER JOIN
                         dbo.Empresas ON dbo.Empresas.id = dbo.CMP_proveedor_empresa.empresa_id INNER JOIN
                         dbo.CMP_articulo ON dbo.CMP_articulo.id = dbo.CMP_proveedor_empresa_articulo.articulo_id INNER JOIN
                         dbo.CMP_factores_distribucion ON dbo.CMP_factores_distribucion.id = dbo.CMP_proveedor_empresa_articulo.factor_distribucion_id INNER JOIN
                         dbo.CMP_tipo_articulo ON dbo.CMP_articulo.tipo_articulo_id = dbo.CMP_tipo_articulo.id
WHERE        (dbo.CMP_proveedor_empresa_articulo.factor_distribucion_id > 1) OR
                         (dbo.Lote_CMP.destino IS NOT NULL)

GO


