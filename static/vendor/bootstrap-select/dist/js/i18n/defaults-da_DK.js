!function(e,n){"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(e)}):"object"==typeof module&&module.exports?module.exports=n(require("jquery")):n(e.jQuery)}(this,function(e){!function(e){e.fn.selectpicker.defaults={noneSelectedText:"Intet valgt",noneResultsText:"Ingen resultater fundet {0}",countSelectedText:function(e){return 1==e?"{0} valgt":"{0} valgt"},maxOptionsText:function(e,n){return[1==e?"Begrænsning nået (max {n} valgt)":"Begrænsning nået (max {n} valgte)",1==n?"Gruppe-begrænsning nået (max {n} valgt)":"Gruppe-begrænsning nået (max {n} valgte)"]},selectAllText:"Markér alle",deselectAllText:"Afmarkér alle",multipleSeparator:", "}}(e)});