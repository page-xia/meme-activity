function getList(t){ajaxReq({url:"/sas/survey/list"}).then(function(e){showList(e.data,t)})}function getAllList(){$(".data-container").html("");try{showList(JSON.parse(localStorage.cacheQuestion))}catch(t){}getList("append")}function showList(t,e){t.situation=situation,t.forEach(function(t){t.dataStringify=JSON.stringify(t)});var a=$(parseTmpl({id:"question-list",data:{data:t}}));$(".data-container")[e||"html"](a),setTimeout(function(){initDatePicker(a.find(".input-daterange input"))})}function getQuestionDetail(){var t=$(this),e=JSON.parse(t.closest("tr").attr("data-stringify")),a=e.questions||e.url;return this.value&&!a&&this.checked?ajaxReq({url:"/sas/survey/detail",data:{survey_id:this.value}}).then(function(e){t.closest("tr").attr({"data-stringify":JSON.stringify(e.data)}).next("tr").find("[data-update]").prop("disabled",!1)}):(t.closest("tr").next("tr").find("[data-update]").prop("disabled",!1),$.Deferred().resolve())}function closeEditPanel(){$(".modify-questions-block").removeClass("active"),setTimeout(function(){$(".modify-questions-block").replaceWith(window.editPanelCache)},400)}function fillInputs(t){setTimeout(function(){$('[name="questionTitle"]').val(t.title);var e=$(".option-container input");t.options.forEach(function(t){e.filter('[data-tag-id = "'+t.tag_id+'"]').val(t.value).attr("data-option-id",t.option_id)})})}function previewIframe(t){this.dom=$(parseTmpl(t)),this.show=function(t){return this.bindEvent(),$("body").append(this.dom),t.call(this),this},this.destory=function(){return this.dom.off().remove(),this},this.bindEvent=function(){var t=this;this.dom.on("click","[data-destory]",function(){t.destory()})}}var titleList=[],situation={1:"首页",2:"商品详情页",3:"订单列表页",4:"评论列表页"};$(function(){getAllList(),setTimeout(function(){window.editPanelCache=$(".modify-questions-block").clone().wrap("<div>").parent().html()})}),$("body").on("click","[data-update]",function(){var t=$(this).closest("tr").prev(),e=t.find("[data-bonus]:checked");if(e.length&&!$('[name="'+e.val()+'"]').val().length)return alert("选择奖励之后，必须填写优惠券的ID或者蜜豆数量！"),void t.find('[name="'+e.val()+'"]').focus();var a=t.find('[name="needUpdate"]:checked'),i=[];return a.length?(t.each(function(t,e){var a=JSON.parse(e.getAttribute("data-stringify"));delete a.rule_id,delete a.point_amount,a=$.extend(a,$(e).find("input").serializeObject()),i.push(a)}),void(confirm("保存后问卷将投放给用户，更新的内容可能会影响用户答题和已有问卷的结果统计，是否确认保存？")&&ajaxReq({type:"post",url:"/sas/survey/multiSave",data:{data:JSON.stringify(i)}}).then(function(){alert("保存成功"),localStorage.removeItem("cacheQuestion"),getAllList()}))):void alert("请至少勾选一项！")}),$("body").on("click","[data-delete-id]",function(){var t=$(this);if(t.hasClass("disabled"))return void tipsShow("问卷开放时不可删除");if(confirm("确定要删除么？")){var e=this.getAttribute("data-delete-id");if(e)ajaxReq({url:"/sas/survey/delete",data:{survey_id:Number(e)}}).then(function(){alert("删除成功"),getAllList()});else{var a=$(this).closest("tr");a.add(a.next("tr")).remove()}}}),$("body").on("change",'[name="priority"]',function(){/^\d+$/.test(this.value-0)||(alert("只能输入不小于0的数字！"),this.value=0,this.focus())}),$("body").on("click",'[name="is_active"]',function(){var t=this.getAttribute("data-id"),e=$(this);ajaxReq({url:"/sas/survey/setStatus",data:{survey_id:Number(t),is_active:this.value},resetCallback:function(){e.closest("form").find('[name="is_active"][value="0"]')[0].checked=!0}}).then(function(){getAllList()})}),$("body").on("change",'[name="needUpdate"]',getQuestionDetail),$("body").on("click",".modify-config",function(){var t=$(this);if(t.hasClass("disabled"))return void tipsShow("问卷开放时不可修改设置");var e=t.closest("tr").find('[name="needUpdate"]').prop("checked",!0).change().end().find(".editable");e.removeClass("save-edit").find("[data-bonus]:checked").change(),t.closest("tr").next("tr").find('[name="is_active"]').prop("disabled",!0)}),$("body").on("click",".edit-questions",function(){var t=$(this),e=t.closest("tr"),a=e.find('[name="active_to"]').val();if(t.hasClass("disabled"))return a&&new Date(a)<new Date?void tipsShow("问卷已结束，请切换到关闭状态再进行编辑！"):void tipsShow("问卷处于分发时段时不可编辑问题");if(confirm("问卷已结束，您的操作将会影响问卷收集的数据，请谨慎编辑题目选项！必要时可通过增减题目避免数据混乱！确定要继续编辑吗？")){var i=e.find('[name="needUpdate"]').prop("checked",!0)[0];getQuestionDetail.call(i).then(function(){var t=JSON.parse(e.attr("data-stringify"));return t.url?($('[name="questionFrom"]').closest('[data-toggle="tab"]').addClass("hide").end().filter('[value="link"]').click().closest('[data-toggle="tab"]').removeClass("hide"),void $('[type="url"][name="url"]').val(t.url)):($('[name="questionFrom"]').filter('[value="link"]').closest('[data-toggle="tab"]').addClass("hide"),$('[name="questionSummaryTitle"]').val(t.title).keyup(),$('[name="questionSummaryIntro"]').val(t.description).keyup(),void createQuestionPreviewItem(t.questions))}).then(function(){$(".modify-questions-block").data("tr",e).addClass("active")})}}),$("body").on("click","[data-update-question]",function(){var t=$(".modify-questions-block").data("tr"),e=validateUrl("save");if(e){var a="";if($.isPlainObject(e))a=[e];else if(a=[getQuestionnaireDataAndValidate.call(this)],!a[0])return;if(confirm("您的操作将会影响问卷收集的数据，确认要保存么？")){a=[$.extend(JSON.parse(t.attr("data-stringify")),a[0])],a.situation=situation,a.forEach(function(t){t.dataStringify=JSON.stringify(t)});var i=$(parseTmpl({id:"question-list",data:{data:a}})).find('[name="needUpdate"]').prop("checked",!0).end();initDatePicker(i.find(".input-daterange input")),t.next("tr").remove().end().replaceWith(i.find("[data-update]").prop("disabled",!1).end()),closeEditPanel()}}}),$("body").on("click",".close-panel",function(){closeEditPanel()}),$("body").on("click","[data-edit-question-item]",function(){var t=$(this);$('[data-role="saveEditQuestion"]').data("li",t.closest("li")),$('[data-role="saveEditQuestion"]').show();var e=JSON.parse(t.closest("li").attr("data-stringify"));$('[name="is_required"]').prop("checked",!1).filter('[value="'+e.is_required+'"]').prop("checked",!0),e.attribute_id&&"0"!=e.attribute_id?($(".related-or-not")[0].checked=!0,getRelatedDataAndShowList(fillInputs,e)):($(".related-or-not")[0].checked=!1,$("[data-tmpl-id]").prop("disabled",!0),setTimeout(function(){$('[data-tmpl-id][value="'+e.type+'"]').prop("disabled",!1).click(),$('[name="questionTitle"]').val(e.title)}),"3"==e.type||setTimeout(function(){createItem({tags:e.options})}))}),$("body").on("click",'[data-role="saveEditQuestion"]',function(){var t=validateAndGetQuestionData.call(this);if(t){var e=($(this).hide(),$('[data-role="saveEditQuestion"]').data("li"));t.question_id=JSON.parse(e.attr("data-stringify")).question_id,createQuestionPreviewItem(t,function(t){e.replaceWith(parseTmpl({id:"question-preview-tmpl",data:{data:t}}))})}});var pageUrl="/special/questionnaire/index.html",previewHost={localhost:"http://m.cn.memebox.com/m","qapc.cn.memebox.com":"http://qapc.cn.m.memebox.com/m","qaappsasadmin.cn.memebox.com":"http://qaapp.cn.m.memebox.com/m","preprod.cn.memebox.com":"http://preprod.cn.m.memebox.com/m","preprodsasadmin.cn.memebox.com":"http://preprod.cn.m.memebox.com/m",other:"http://m.cn.memebox.com/m"};$("body").on("click","[data-preview-questionnaire]",function(){var t=$(this),e=t.closest("tr"),a=e.find('[name="needUpdate"]').prop("checked",!0)[0];getQuestionDetail.call(a).then(function(){var a=JSON.parse(e.attr("data-stringify")),i="";i=a.url||(previewHost[location.hostname]||previewHost.other)+pageUrl+"?"+$.param({preview:!0})+"#"+encodeURIComponent(t.closest("tr").attr("data-stringify"));new previewIframe({id:t.attr("data-preview-questionnaire"),data:{}}).show(function(){var t=this.dom.find("iframe")[0];t.src=i})})}),$("body").on("change","[data-bonus]",function(){var t=$(this);this.checked?(t.closest("td").find("[data-bonus]").not(this).prop("checked",!1),t.closest("td").find(this.getAttribute("data-bonus")).prop("readonly",!1).attr("placeholder",this.getAttribute("data-placeholder")).attr("name",this.value).focus()):t.closest("td").find(this.getAttribute("data-bonus")).prop("readonly",!0).attr("placeholder","").attr("name","").val("")}).on("click","[data-bonus]",function(t){t.preventDefault();var e=this;setTimeout(function(){e.checked=!e.checked,$(e).change()})}),$("body").on("change",".bonus-detail",function(){var t=this;/^\+?[1-9]\d*$/.test(this.value-0)||(alert("只能输入大于0的数字！"),this.value="",setTimeout(function(){t.focus()}))});