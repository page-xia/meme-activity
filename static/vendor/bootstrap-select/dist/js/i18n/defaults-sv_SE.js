!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],function(e){return t(e)}):"object"==typeof module&&module.exports?module.exports=t(require("jquery")):t(e.jQuery)}(this,function(e){!function(e){e.fn.selectpicker.defaults={noneSelectedText:"Inget valt",noneResultsText:"Inget sökresultat matchar {0}",countSelectedText:function(e){return 1===e?"{0} alternativ valt":"{0} alternativ valda"},maxOptionsText:function(){return["Gräns uppnåd (max {n} alternativ)","Gräns uppnåd (max {n} gruppalternativ)"]},selectAllText:"Markera alla",deselectAllText:"Avmarkera alla",multipleSeparator:", "}}(e)});