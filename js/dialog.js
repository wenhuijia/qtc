
/*自定义弹窗
 * _text     弹窗中内容,可为文字，可以是html代码,可为空
 * lfBtn     左面按钮方法,在方法中加入document.getElementById("alertDisplay").remove();
 * lfBtnText 左面按钮中文字,
 * rtBtn     右面按钮方法 ,在方法中加入document.getElementById("alertDisplay").remove();
 * rtBtnText 右面按钮中文字
 * 如果填写_text以后的参数，当前参数前面的参数为必填，可以为''
 * 调用方法myAlert('内容','左按钮方法名',"左按钮文字","右按钮方法名","右按钮文字");
*/
function myAlert(_text,Btn,BtnText){
	if(!_text){
		_text="该车牌号不存在或填写错误";
	}
	var alertText='<div id="alertDisplay"  style="width:100%;height:100%;">'
		alertText+='<div onclick="myClose()" style="position:fixed;top:0;left:0;z-index:100000;width:100%;height:100%;background:rgba(190,190,190,0.6);"></div>'
			
		alertText+='<div style="position:fixed;z-index:100001;top:50%;left:50%;margin-left:-130px;width:245px;border-radius:8px;background:#fff;color:#222">'
				alertText+='<div style="padding:10px;height:40px;line-height:40px;text-align:center;font-size:13px;">'
					alertText+=_text
				alertText+='</div>'
				alertText+='<div style="height:40px;line-height:40px;border-top:1px solid #ddd;font-size:15px;">'
						if(typeof(eval(Btn))=="function"){
							alertText+='<div style="width:100%;height:20px;line-height:20px;border-bottom-left-radius:8px;border-bottom-right-radius:8px;background:#fff;color:#1C78FE;text-align:center;" onclick=\''+Btn+'()\'>'+(BtnText?BtnText:"我知道了")+'</div>'
						}else{
							alertText+='<div style="width:100%;border-bottom-left-radius:8px;border-bottom-right-radius:8px;background:#fff;color:#1C78FE;text-align:center;" onclick="myClose()">我知道了</div>'
						}
				alertText+='</div>'
			alertText+='</div>'
		alertText+='</div>'
	$("html").append(alertText);
}
function myClose(){
	document.getElementById("alertDisplay").remove();
}
/*提示框
 * _text：可为文本，可以直接写HTML，建议写文本
 * _top：距离页面顶部的距离，不填默认为50%*/
function promptBox(_text,_top){
	_top=(_top?_top:'50%');
	 var html='<div class="custom_prompt_box" style="position:absolute;z-index:1000000;background: #D8D8D8;border-radius: 15px;height:32px;line-height:22px;padding:5px 10px;text-align:center; color:#000;font-size:16px;top:'+_top+';left:50%;margin-left:-68px">'+_text+'</div>';
	 $("html").append(html);
	 setTimeout(function(){
			$(".custom_prompt_box").remove();
		},3000);
}