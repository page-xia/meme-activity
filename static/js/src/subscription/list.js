template.config("openTag","${"),template.config("closeTag","}"),$.ajaxSetup({cache:!1}),$(document).ready(function(){function t(t,n,e){0!=e&&$("#pagination-container").pagination({dataSource:new Array(parseInt(e)),pageSize:t,showGoInput:!0,showGoButton:!0,pageNumber:n||1,afterPageOnClick:function(t,n){a(n.trim())},afterPreviousOnClick:function(t,n){a(n.trim())},afterNextOnClick:function(t,n){a(n.trim())},afterGoButtonOnClick:function(t,n){var e=n.trim();""!=e&&a(e)},callback:function(){}})}function a(a){var e={filter:{sku:$("form.search").find("input[name=sku]").val(),starttime:$("form.search").find("input[name=starttime]").val(),endtime:$("form.search").find("input[name=endtime]").val()},sort:$("form.search").find("select[name=sort]").val(),page:a,pageSize:n},i=JSON.stringify(e);$.ajax({type:"post",url:"/api/internal/sas/subscription/view",data:i,dataType:"json",success:function(a){if(1==a.code){var e=a.data,i=a.pageCount,r=a.page,o=template("subscription-list-tmpl",{subscriptionData:e});$(".subscription").html(o),"1"==a.page&&t(n,r,i*n)}},error:function(){console.log("出现异常")}})}var n=10,e="1";$("form.search").on("blur","input",function(){$(this).val($.trim($(this).val()))}),$(".appList").on("click",".searchBtn",function(){a(e)}),a(e),$(".search input[name=starttime]").datetimepicker({format:"Y/m/d H:i"}),$(".search input[name=endtime]").datetimepicker({format:"Y/m/d H:i"})});