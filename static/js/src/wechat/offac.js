!function(){function t(){if(""==m.msg){var t=confirm("本次发布将在24小时后对所有用户生效，是否确认发布？");return t?1:0}return alert("发布失败!原因："+m.msg),0}function e(t){for(var e=0;e<t.item.length;e++){var s=new Date(1e3*t.item[e].update_time);s=s.getFullYear()+"年"+(s.getMonth()+1)+"月"+s.getDate()+"日";for(var n=0;n<t.item[e].content.news_item.length;n++)t.item[e].content.news_item[n].time=s,t.item[e].content.news_item[n].media_id=t.item[e].media_id}return t}function s(){var t=[];items=0,unchosen=0;var e=$("#offac-setting .menu-item");e.each(function(){var e={},s=$(this).find(".menu-type option:selected").val(),n=$(this).find(".act").text(),a=$(this).find(".act").attr("data");if($(this).find("input").val())var i=$(this).find("input").val();else"menu-item grey"!=$(this).attr("class")&&($(this).css("border","1px solid red"),console.log("wrong"),unchosen++);if("menu-item grey"==$(this).attr("class")?e.status="off":(e.status="on",items++),0!=$(this).find(".menu-item-lv2").length){e.name=i,e.sub_button=[];var l=$(this).find(".menu-item-lv2");l.each(function(){var t={};t.status="menu-item-lv2 grey"==$(this).attr("class")?"off":"on";var s=$(this).find(".menu-type option:selected").val(),n=$(this).find(".act").text(),a=$(this).find(".act").attr("data"),i=$(this).find("input").val();2==s?(t.type="media_id",t.media_id=a,t.media_title=n):1==s?(t.type="view",t.url=n):(t.type="",t.url="",t.key="",t.media_id="",t.media_title=""),i&&0!=s&&""!=$($(this).find(".act.lv2")).text()||(console.log("wrong3"),$(this).css("border","1px solid red"),unchosen++),t.name=i,t.sub_button=[],e.sub_button.push(t)}),t.push(e)}else 2==s?(e.type="media_id",e.media_id=a,e.media_title=n):1==s?(e.type="view",e.url=n):(e.type="",e.url="",e.key="",e.media_id="",e.media_title=""),e.name=i,e.sub_button=[],t.push(e),"menu-item grey"!=$(this).attr("class")&&(0==s||""==$($(this).find(".act.lv1")).text())&&(unchosen++,$(this).css("border","1px solid red"),console.log("wrong2"))}),m.msg=unchosen>0?"存在菜单内容填写不全哦！":items>3?"开启的主菜单个数超过3个啦！":"";var s={};s.button=t,s=JSON.stringify(s),console.log(s,"this");var n=t.filter(function(t){return"on"==t.status});return n.forEach(function(t){t.sub_button&&(t.sub_button=t.sub_button.filter(function(t){return"on"==t.status}),t.sub_button.forEach(function(t){delete t.status,delete t.media_title})),delete t.status,delete t.media_title}),u.button=n,u=JSON.stringify(u),console.log(u,"that"),s}function n(){var t;$("#offac-setting .menu-item")&&(t=$("#offac-setting .menu-item")),t.each(function(t){$(this).find(".type").html(t+1)})}function a(t){t.sortable({handle:".type",onUpdate:function(){n()}})}function i(t){for(var e=0;e<t.length;e++)if($("#offac-setting").append($(".add-menu").html()),a($("#offac-setting")),"off"==t[e].status&&($(".menu-item:last").addClass("grey").removeClass("norm"),$(".menu-item:last .pause.lv1").addClass("open").html("开启")),n(),$(".menu-item:last .name.lv1 input").val(t[e].name),t[e].sub_button.length>0){$(".menu-item:last .menu-type.lv1").css("display","none");for(var s=0;s<t[e].sub_button.length;s++)$(".cover:last").sortable().append($(".add-menu-lv2").html()),$(".menu-item-lv2:last .name.lv2 input").val(t[e].sub_button[s].name),"view"==t[e].sub_button[s].type?($(".menu-item-lv2:last .menu-type.lv2").val(1),$(".menu-item-lv2:last .act.lv2").html(t[e].sub_button[s].url)):"media_id"==t[e].sub_button[s].type?($(".menu-item-lv2:last .menu-type.lv2").val(2),$(".menu-item-lv2:last .act.lv2").html(t[e].sub_button[s].media_title),$(".menu-item-lv2:last .act.lv2").attr("data",t[e].sub_button[s].media_id)):$(".menu-item-lv2:last .menu-type.lv2").val(0),"off"==t[e].sub_button[s].status&&($(".menu-item-lv2:last").addClass("grey"),$(".menu-item-lv2:last .fa-pause").removeClass("fa-pause").addClass("fa-play"))}else"view"==t[e].type?($(".menu-item:last .menu-type.lv1").val(1),$(".menu-item:last .act.lv1").html(t[e].url)):"media_id"==t[e].type?($(".menu-item:last .menu-type.lv1").val(2),$(".menu-item:last .act.lv1").html(t[e].media_title),$(".menu-item:last .act.lv1").attr("data",t[e].media_id)):$(".menu-item:last .menu-type.lv1").val(0)}var l,o,c,m={},u={},r=new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/),d=!0,f=Handlebars.compile($("#material-tpl").html());$(window).bind("beforeunload",function(){return d?void 0:"您对菜单进行的修改尚未保存发布，确定要离开此页面吗"}),$("#offac-setting").on("change",function(){d=!1}),$("#add-new").on("click",function(){$(".menu-item").length>=5?$("#add-new").css("background-color","#e0e0e0"):4==$(".menu-item").length?($("#add-new").css("background-color","#e0e0e0"),$("#offac-setting").append($(".add-menu").html()),a($("#offac-setting")),n()):($("#offac-setting").append($(".add-menu").html()),a($("#offac-setting")),n())}),$("#offac-setting").on("click",".add-new-lv2",function(){$(this).closest("div").find(".menu-type.lv1").css("display","none"),$(this).closest("div").find(".act.lv1").html(""),$(this).parent().siblings("div").children(".menu-item-lv2").length>=5?alert("二级菜单上限为5个"):($(this).parent().siblings("div").append($(".add-menu-lv2").html()),$(this).parent().siblings("div").sortable())}),$("#offac-setting").on("click",".del-menu .delete",function(){confirm("确认删除该菜单吗？")&&($(this).closest("div").remove(),$("#add-new").css("background-color","#5cb85c"),n())}),$("#offac-setting").on("click",".del-menu .delete-lv2",function(){confirm("确认删除该菜单吗？")&&(0==$($(this).closest("div").siblings()).length&&($(this).parents(".menu-item").find(".menu-type.lv1").css("display","inline-block").val(0),$(this).parents(".menu-item").find(".act").html("")),$(this).closest("div").remove())}),$("#offac-setting").on("change",".menu-type",function(){1==this.value?($(this).closest("div").append($(".add-url").html()),$("#wrapper").css("display","block"),$("#url").css("display","block")):2==this.value?($(this).closest("div").append(f(o)),$("#wrapper").css("display","block"),$("#material").css("display","block")):$(this).parent().siblings(".act").html("")}),$("#offac-setting").on("click","#access",function(){var t=$(this).siblings("input").val();r.test(t)?($("#error").html(""),$(this).parents("#url").siblings(".act").html(t),$("#wrapper").css("display","none"),$(this).parent("#url").remove()):$("#error").html("格式错误！")}),$("#offac-setting").on("click",".ma-all",function(){$(this).addClass("chosen"),$(this).siblings().removeClass("chosen")}),$("#offac-setting").on("click","#ma-access",function(){$(this).siblings("#materials").find(".ma-all.chosen .ma-title")?($(this).closest("#material").siblings(".act").html($(this).siblings("#materials").find(".ma-all.chosen .ma-title").html()),$(this).closest("#material").siblings(".act").attr("data",$(this).siblings("#materials").find(".ma-all.chosen .ma-title").attr("data")),$(this).closest("#material").remove(),$("#wrapper").css("display","none")):alert("请选择素材")}),$("#offac-setting").on("click","#ma-cancel",function(){$(this).closest("#material").siblings(".req").find(".menu-type").val(0),$(this).closest("#material").remove(),$("#wrapper").css("display","none")}),$("#offac-setting").on("click","#close-material",function(){$(this).closest("#material").siblings(".req").find(".menu-type").val(0),$(this).closest("#material").remove(),$("#wrapper").css("display","none")}),$("#offac-setting").on("click","#close",function(){$("#wrapper").css("display","none"),$(this).parent("#url").siblings(".req").find(".menu-type").val(0),$(this).parent("#url").remove()}),$("#offac-setting").on("click","#cancel",function(){$("#wrapper").css("display","none"),$(this).parent("#url").siblings(".req").find(".menu-type").val(0),$(this).parent("#url").remove()}),$("#offac-setting").on("click",".pause.lv1",function(){$(this).toggleClass("open"),"pause lv1 open"!=$(this).attr("class")?($(this).html("暂停"),$(this).closest("div").insertAfter("#offac-setting .menu-item.norm:last"),$(this).closest("div").addClass("norm"),$(this).closest("div").removeClass("grey"),n()):($(this).html("开启"),$(this).closest("div").addClass("grey"),$(this).closest("div").removeClass("norm"),$(this).closest("div").appendTo("#offac-setting"),n())}),$("#offac-setting").on("click",".pause-lv2",function(){$(this).toggleClass("fa-pause"),$(this).toggleClass("fa-play"),$(this).closest("div").toggleClass("grey"),"pause-lv2 fa fa-play"==$(this).attr("class")&&$(this).closest("div").appendTo($(this).parents(".cover"))}),$(".shut-down").on("click",function(){$(this).toggleClass("reopen"),$(this).html("shut-down reopen"==$(this).attr("class")?"重新开启":"停用")}),$("#save-menu").on("click",function(){var e=s(),n=t();console.log(JSON.stringify(u),"post data to wechat"),1==n&&$.ajax({url:"/api/wechat/offac/update",type:"post",dataType:"json",data:{id:1,setting:e,psetting:u},success:function(t){alert(t.msg),1==t.code&&(location.reload(),d=!0)}})}),$.ajax({url:"/api/wechat/offac",type:"get",dataType:"json",data:{id:1},success:function(t){console.log(t,"my settings"),c=t.data,c=JSON.parse(c),i(c.button)}}),$.ajax({url:"/api/wechat/offac/getmenu",type:"get",dataType:"json",success:function(t){console.log(t,"menu list")}}),$.ajax({url:"/api/wechat/offac/materialCount",type:"get",dataType:"json",success:function(t){console.log(t),l=t.data.news_count,console.log(l),$.ajax({url:"/api/wechat/offac/material",type:"get",dataType:"json",data:{type:"news",pageSize:l||"20"},success:function(t){t.data&&(o=t.data,o=e(o),console.log(o))}})}})}();