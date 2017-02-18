cp .\Costos.Web\index.html ..\..\Costos.Staging\index.html

Remove-Item ..\..\Costos.Staging\bin -Recurse -Force -ErrorAction SilentlyContinue
cp .\Costos.Web\bin ..\..\Costos.Staging -Recurse

Remove-Item ..\..\Costos.Staging\bower_components -Recurse -Force -ErrorAction SilentlyContinue
cp .\Costos.Web\bower_components ..\..\Costos.Staging -Recurse

Remove-Item ..\..\Costos.Staging\Content -Recurse -Force -ErrorAction SilentlyContinue
cp .\Costos.Web\Content ..\..\Costos.Staging -Recurse

Remove-Item ..\..\costos.staging\Reports -Recurse -Force -ErrorAction SilentlyContinue
cp .\Costos.Web\Reports ..\..\Costos.Staging -Recurse

Remove-Item ..\..\Costos.Staging\Scripts -Recurse -Force -ErrorAction SilentlyContinue
cp .\Costos.Web\Scripts ..\..\Costos.Staging -Recurse

Remove-Item ..\..\Costos.Staging\tpl -Recurse -Force -ErrorAction SilentlyContinue
cp .\Costos.Web\tpl ..\..\Costos.Staging -Recurse