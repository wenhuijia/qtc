//  rem问题处理
 document.getElementsByTagName("html")[0].style.fontSize = 100*window.screen.width / 750 + 'px';
 // 判断android与ios
 function equipment(){
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1|| u.indexOf('android') > -1){
       return 'Android';
    }
    if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)|| u.indexOf('iOS') > -1){
       return 'IOS';
    }
 };
// 是否是微信
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
       return true;
    }else{
       return false;
    }
 }
 // 判断android与ios
 function equipment(){
    var u = navigator.userAgent;
    if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1|| u.indexOf('android') > -1){
       return 'Android';
    };
    if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)|| u.indexOf('iOS') > -1){
       return 'IOS';
    };
 };
 //公共测试环境路径
 var jumpUrl = "http://sitwxbqjrcar.bqjr.cn:9001/"; //测试环境
 // var jumpUrl = "http://prdwxbqjrcar.bqjr.cn/bqtd/"; //生产环境
 //  var jumpUrl = "http://10.81.2.203:8088/"; //开发环境
 var baseUrl = jumpUrl+"rcbms/";//图片地址不带 rcbms/  要用jumpUrl;
 
    