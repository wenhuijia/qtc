
// //微信判断
if(!isWeiXin()){//非微信增加搜索框及导航高度
    $('.searchBox').addClass("searchNotWeb");
    $('.searchBox').css("top","0");
};
//保存车辆数据
    var carData;
    $.ajax({
        type: "post",
        url: baseUrl + "product/getProductList",
        data: JSON.stringify({}),
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        success: function (data) {
            if(data.returnCode=="200"){
                carData = data.list;
                brandListSave()
            };
        },
        error: function (result) {

        }
    });
//标签选择发送数据
var carQueryData = {
    "startRow": 1, //第几页开始
    "brandOrCarLevel":"",//搜索
    "brand": "", //品牌
    "defaultSort": "", //排序
    "ndownPaymentStart": "", //首付
    "ndownPaymentEnd": "",
    "nmonthlyPaymentStart": "", //月供
    "nmonthlyPaymentEnd": "",
    "priceStart": "", //车价Start
    "priceEnd": "",
    "downPaymentRatio": "", //首付比例 发送给后台时拼接在此后 10%首付-0%首付
    "downPaymentRatioList": {
        "zeropayments": "", //0首付 
        "fivepayments": "", //5%首付 
    },
    "newCarShelf": "", //新车上架
    "carRaisingWorryFree": "", //养车无忧
    "monthlySupplyDrop": "", //月供直降
    "newEnergy": "", //新能源
    "carLevel": "", //车型  carLevel=SUV-中型车-紧凑型车，你用-拼接成字符串过来 
    //以下字段不传  拼接在priceStart后面
    "carLevelList": {
        "minCar": "", //微小型车
        "smallCar": "", //紧凑型
        "middleCar": "", //中型车
        "middleLargeCar": "", //中大型车
        "suvCar": "", //SUV
        "mpvCar": "", //MPV
        "runCar": "", //跑车
    }

};
//标签选择页面渲染数据
var carRenderData = {
    "startRow": 1, //第几页开始
    "brand": "", //品牌
    "brandOrCarLevel":"",//搜索
    "defaultSort": "", //排序
    "ndownPayment": "", //首付
    "nmonthlyPayment": "", //月供
    "price": "", //车价Start
    "zeropayments": "", //0首付 
    "fivepayments": "", //5%首付 
    "newCarShelf": "", //新车上架
    "carRaisingWorryFree": "", //养车无忧
    "monthlySupplyDrop": "", //月供直降
    "newEnergy": "", //新能源
    "minCar": "", //微小型车
    "smallCar": "", //紧凑型
    "middleCar": "", //中型车
    "middleLargeCar": "", //中大型车
    "suvCar": "", //SUV
    "mpvCar": "", //MPV
    "runCar": "", //跑车
};
//城市定位
    $.ajax({
        type: "get",
        // url: "https://api.map.baidu.com/location/ip",
        data: {
            "ak": "yATeUDEdPpgbeIkch6hthTDMaaKLYr4F",
        },

        // }),
        contentType: "application/json; charset=utf-8",
        dataType: 'JSONP',
        success: function (data) {
            var city = data.content.address_detail.city;
            if (city.length > 6) {
                $('.searchBox .search').css("width", "3.5rem")
            } else if (city.length > 9) {
                $('.searchBox .search').css("width", "2rem")
            };
            $('.city p').text(city);
            $('.currentCityText').text(city);
        },
        error: function (result) {
            $('.city p').text("定位失败");
        }
    });
//城市选择
    $('.city').on('click', function () {
        $('.titleName').text("选择门店城市").addClass("cityShop");
        $('.TopGoBackNav').removeClass("hide");
        $('.bigBox').addClass("hide");
        $('.cityPositonBox').removeClass("hide");
        $('.navTitle li').removeClass("isShow");
        $('.navTitle li p').removeClass("nav-selected");
        $('.navTitle li i').removeClass("arrows_selected");
        $("body").css("overflow", "auto");
        $.ajax({
            type: "get",
            url: baseUrl + "area/selectHotCityList",
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            success: function (data) {
                // console.log("aa",data)
                if(data.returnCode == "200"){
                    var cityList = data.result;
                    // console.log(cityList)
                    var cityListHtml = "";
                    cityList.forEach(function(v,i){
                        cityListHtml += "<li><p>"+v.city+"</p></li>";
                    });
                    cityListHtml = cityListHtml + "<li><p style='height:0;visibility:hidden;'></p></li><li><p style='height:0;visibility:hidden;'></p></li>";
                    $('.cityList_ul').html(cityListHtml);
                };
            }
        });
    });
    //城市选择点击
    $('.cityList_ul').on('click',"li", function () {
        $('.city p').text($(this).find("p").text());
        $('.currentCityText').text($(this).find("p").text());
        goBackFun();
    });
//首页轮播图
    $.ajax({
        type: "get",
        url: baseUrl + "product/selectIndexBanner",
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        success: function (data) {
            if(data.returnCode=="200"){
                var imgList = data.result;
                //拼接轮播图
                var bannerHtml = "";
                imgList.forEach(function(v,i){                           
                    bannerHtml += "<div class='mui-slider-item'><a href='javascript:void(0);'><img src='"+jumpUrl+v.bannerImage+"'></a></div>";
                });
                if(imgList.length>1){
                    //多张图时 所最后一张图加在最上面  mui要求
                    bannerHtml = "<div class='mui-slider-item mui-slider-item-duplicate'><a href='javascript:void(0);'><img src='"+jumpUrl+imgList[imgList.length-1].bannerImage+"'></a></div>" + bannerHtml;
                    //多张图时 所第一张图加在最下面  mui要求
                    bannerHtml = bannerHtml + "<div class='mui-slider-item mui-slider-item-duplicate'><a href='javascript:void(0);'><img src='"+baseUrl+imgList[0].bannerImage+"'></a></div>";
                    $('.mui-slider-group').html(bannerHtml);
                }else{ //只有一张图时直接添加图片
                    $('.bannerBox').html("<img style='height:4.18rem;' src='"+jumpUrl+imgList[0].bannerImage+"'>")
                };
                //处理图片轮播下面的小圆点问题  mui未提供动态显示圆点方法
                var dotHmtl = "";
                if(imgList.length>1){
                    for(var i=0 ;i<imgList.length-1; i++){
                        dotHmtl+="<div class='mui-indicator'></div>";
                    };
                    dotHmtl = "<div class='mui-indicator mui-active'></div>" + dotHmtl;
                    $(".mui-slider-indicator").html(dotHmtl);
                };
            };
        },
        error: function (result) {
        }
    });
// 保存车辆信息

//搜索
    $(".search input").on('keypress', function(e) {
        var keycode = e.keyCode;
        //获取搜索框的值
        var searchContent = $(this).val();
        if (keycode == '13') {
            e.preventDefault();
            //请求搜索接口
            if (searchContent == '') {
                mui.toast('请输入搜索内容',{ duration:3000, type:'div' }) 
            } else {
                for (var key in carQueryData) {//清空
                    carQueryData[key] = "";
                };
                for (var key in carRenderData) {//清空
                    carRenderData[key] = "";
                };
                carQueryData.brandOrCarLevel = searchContent;
                carRenderData.brandOrCarLevel = searchContent;
                selectedLaberRender();
                queryCarList();
            };
        }
    });
//默认排序
$('.defaultSort').on('click', function () {
    navSelectChangeThisCss(this, ".selecteList", [".selecteList_month", ".selecteList_downPayment"], [".monthlyInstallment", ".downPayment"]);
});
$('.selecteList_ul li').on('click', function () {
    carQueryData.defaultSort = $(this).attr("data-defaultSort");
    $('.selecteList').slideUp(100);
    $(this).find("p").addClass("selected");
    $(this).find("i").addClass("selectedGo");
    $(this).siblings().find("p").removeClass("selected");
    $(this).siblings().find("i").removeClass("selectedGo");
    $('.defaultSort p').text($(this).find("p").text());
    clickCssChange();
    queryCarList();
});
// 首付
$('.downPayment').on('click', function () {
    navSelectChangeThisCss(this, ".selecteList_downPayment", [".selecteList_month", ".selecteList_month"], [".monthlyInstallment", ".defaultSort"]);
});
$('.ndownPayment_ul li').on('click', function () {
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
    setTimeout(function () {
        clickCssChange();
    }, 100);
    var newData = $(this).attr("data-ndownPayment");
    carQueryData.ndownPaymentStart = newData.split("_")[0];
    carQueryData.ndownPaymentEnd = newData.split("_")[1];
    if (carQueryData.ndownPaymentEnd == "60000") {
        carQueryData.ndownPaymentEnd = "";
    };
    if (carQueryData.ndownPaymentStart == "0") {
        carQueryData.ndownPaymentStart = "";
    };
    carRenderData.ndownPayment = "首付" + $(this).text();
    var formNum = Number(carQueryData.ndownPaymentStart) / 10000;
    var toNum = Number(carQueryData.ndownPaymentEnd) / 10000;
    if (toNum == 0) {
        toNum = 6;
    };
    sliderRange1.update({
        from: formNum,
        to: toNum,
    });
    moveSliderRange1(formNum, toNum);
    selectedLaberRender();
    queryCarList();
});
//确定
$('.confirmButton1').on('click', function () {
    clickCssChange();
    carQueryData.ndownPaymentStart = $('.bxsh').attr("data-leftNum");
    carQueryData.ndownPaymentEnd = $('.bxsh').attr("data-rightNum");
    // selectedLaberRender();
    if ($('.bxsh').text() == "不限首付") {
        carRenderData.ndownPayment = $('.bxsh').text();
        $('.ndownPayment_noLimit').addClass("selected");
        $('.ndownPayment_noLimit').siblings().removeClass("selected");
    } else {
        carRenderData.ndownPayment = "首付" + $('.bxsh').text();
    };
    selectedLaberRender();
    queryCarList();
});

// 月供
$('.monthlyInstallment').on('click', function () {
    navSelectChangeThisCss(this, ".selecteList_month", [".selecteList_downPayment", ".selecteList"], [".downPayment", ".defaultSort"]);
});
$('.nmonthlyPayment_ul li').on('click', function () {
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
    setTimeout(function () {
        clickCssChange();
    }, 100);
    var newData = $(this).attr("data-nmonthlyPayment");
    carQueryData.nmonthlyPaymentStart = newData.split("_")[0];
    carQueryData.nmonthlyPaymentEnd = newData.split("_")[1];
    carRenderData.nmonthlyPayment = "月供" + $(this).text();
    if (carQueryData.nmonthlyPaymentEnd == "6000") {
        carQueryData.nmonthlyPaymentEnd = "";
    };
    if (carQueryData.nmonthlyPaymentStart == "0") {
        carQueryData.nmonthlyPaymentStart = "";
    };
    var formNum = Number(carQueryData.nmonthlyPaymentStart);
    var toNum = Number(carQueryData.nmonthlyPaymentEnd);
    if (toNum == 0) {
        toNum = 6000;
    }
    sliderRange2.update({
        from: formNum,
        to: toNum,
    });
    moveSliderRange2(formNum, toNum);
    selectedLaberRender();
    queryCarList();
});
//确定
$('.confirmButton2').on('click', function () {
    clickCssChange();
    carQueryData.nmonthlyPaymentStart = $('.bxyc').attr("data-leftNum");
    carQueryData.nmonthlyPaymentEnd = $('.bxyc').attr("data-rightNum");
    if ($('.bxyc').text() == "不限月供") {
        carRenderData.nmonthlyPayment = $('.bxyc').text();
    } else {
        carRenderData.nmonthlyPayment = "月供" + $('.bxyc').text();
    };
    selectedLaberRender();
    queryCarList();
});
//更多筛选 
$('.filtrate').on('click', function () {
    // intervalPrice(".range_3",0,60);
    $('.titleName').text("更多筛选").addClass("moreSelect");;
    $('.TopGoBackNav').removeClass("hide");
    $('.bigBox').addClass("hide");
    $('.moreScreeningBox').removeClass("hide");
    $('.navTitle li').removeClass("isShow");
    $('.navTitle li p').removeClass("nav-selected");
    $('.navTitle li i').removeClass("arrows_selected");
    $("body").css("overflow", "auto");
});

//特殊服务
$('.specialService li').on('click', function () {
    if ($(this).hasClass("selected")) { //不选中
        $(this).removeClass("selected");
    } else {
        $(this).addClass("selected");
    }
});
//车型
$('.carType_ul li').on('click', function () {
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
    } else {
        $(this).addClass("selected");
    }
});
//查看车源点击
$('.viewButton').on('click', function () {
    //自定义滑动价
    carQueryData.priceStart = $('.bxcj').attr("data-leftNum");
    carQueryData.priceEnd = $('.bxcj').attr("data-rightNum");
    if ($('.bxcj').text() == "不限车价") {
        carRenderData.price = $('.bxcj').text();
    } else {
        carRenderData.price = "车价" + $('.bxcj').text();
    };
    //保存特殊服务
    carRenderData.downPaymentRatio = "";
    carQueryData.downPaymentRatioList = {};
    $('.specialService li').each(function (i, v) {
        if ($(v).hasClass('selected')) {
            if ($(v).attr("data-service") == "0首付") {
                carRenderData.zeropayments = $(v).attr("data-service");
                carQueryData.downPaymentRatioList.zeropayments = "0%首付";
            } else if ($(v).attr("data-service") == "5%首付") {
                carRenderData.fivepayments = $(v).attr("data-service");
                carQueryData.downPaymentRatioList.fivepayments = $(v).attr("data-service");
            } else if ($(v).attr("data-service") == "新车上架") {
                carRenderData.newCarShelf = $(v).attr("data-service");
                carQueryData.newCarShelf = $(v).attr("data-service");
            } else if ($(v).attr("data-service") == "养车无忧") {
                carRenderData.carRaisingWorryFree = $(v).attr("data-service");
                carQueryData.carRaisingWorryFree = $(v).attr("data-service");
            } else if ($(v).attr("data-service") == "月供直降") {
                carRenderData.monthlySupplyDrop = $(v).attr("data-service");
                carQueryData.monthlySupplyDrop = $(v).attr("data-service");
            } else if ($(v).attr("data-service") == "新能源") {
                carRenderData.newEnergy = $(v).attr("data-service");
                carQueryData.newEnergy = $(v).attr("data-service");
            };
        };

    });
    //保存车型
    carRenderData.carLevel = "";
    carQueryData.carLevelList = {};
    $('.carType_ul li').each(function (i, v) {
        if ($(v).hasClass('selected')) {
            if ($(this).attr("data-carType") == "微小型车") {
                carQueryData.carLevelList.minCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "紧凑型") {
                carQueryData.carLevelList.smallCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "中型车") {
                carQueryData.carLevelList.middleCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "中大型车") {
                carQueryData.carLevelList.middleLargeCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "SUV") {
                carQueryData.carLevelList.suvCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "MPV") {
                carQueryData.carLevelList.mpvCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "跑车") {
                carQueryData.carLevelList.runCar = $(this).attr("data-carType");
            };


            if ($(this).attr("data-carType") == "微小型车") {
                carRenderData.minCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "紧凑型") {
                carRenderData.smallCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "中型车") {
                carRenderData.middleCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "中大型车") {
                carRenderData.middleLargeCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "SUV") {
                carRenderData.suvCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "MPV") {
                carRenderData.mpvCar = $(this).attr("data-carType");
            } else if ($(this).attr("data-carType") == "跑车") {
                carRenderData.runCar = $(this).attr("data-carType");
            };
        };
    });
    //返回
    $('.TopGoBackNav').addClass("hide");
    $('.bigBox').removeClass("hide");
    $('.moreScreeningBox').addClass("hide");
    $('.mui-content').addClass("hide");
    clickCssChange();
    selectedLaberRender();
    queryCarList();
});
// 筛选重置
$('.resetButton').on('click', function () {
    //查询数据清空
    for (var key in carQueryData) {
        carQueryData[key] = "";
    };
    //标签数据清空
    for (var key in carRenderData) {
        carQueryData[key] = "";
    };
    $('.specialService li').removeClass("selected");
    $('.carType_ul li').removeClass("selected");
    sliderRange3.update({
        min: 0,
        max: 60,
        from: 0,
        to: 60,
        step: 1
    });
    moveSliderRange3(0, 60);
});

// 顶部返回
$('.navBar i').on('click', function () {
    goBackFun();
});
//浏览器返回判断
    goBackPage();
    function goBackPage() {
        var counter = 0;//默认  非自定义
        if (window.history && window.history.pushState) {
            $(window).on('popstate', function () {
                if(!$('.TopGoBackNav').hasClass("hide")){//
                    window.history.pushState('forward', null, '#');
                    window.history.forward(1);
                    //跟点顶部返回效果一致
                    goBackFun();
                }else{
                    history.back();
                }
            });
        }
        window.history.pushState('forward', null, '#'); //在IE中必须得有这两行  
        window.history.forward(1);
    }

// 标签重置
$('.selectLabel_ul').on('click', ".reset", function () {
    for (var key in carQueryData) {
        carQueryData[key] = "";
    };
    for (var key in carRenderData) {
        carRenderData[key] = "";
    };
    selectedLaberRender();
    queryCarList();
});
//删除单个标签
$('.selectLabel_ul').on('click', "li", function () {
    for (var key in carRenderData) {
        if ($(this).text() == carRenderData[key]) {
            carRenderData[key] = "";
        };
    };
    for (var key in carRenderData) {
        if ($(this).text() == carRenderData[key]) {
            carRenderData[key] = "";
        };
    };
    //发送数据重构
    for (var key in carQueryData) {
        if ($(this).attr("data-name") == "ndownPayment") { //首付数据
            carQueryData.ndownPaymentStart = "";
            carQueryData.ndownPaymentEnd = "";
        } else if ($(this).attr("data-name") == "nmonthlyPayment") { //月供
            carQueryData.nmonthlyPaymentStart = "";
            carQueryData.nmonthlyPaymentEnd = "";
        } else if ($(this).attr("data-name") == "price") { //车价
            carQueryData.priceStart = "";
            carQueryData.priceEnd = "";
        } else if ($(this).attr("data-name") == "zeropayments") { //0%首付
            carQueryData.downPaymentRatioList.zeropayments = "";
        } else if ($(this).attr("data-name") == "fivepayments") { //5%首付
            carQueryData.downPaymentRatioList.fivepayments = "";
        } else if ($(this).attr("data-name") == "minCar") { //微小型车
            carQueryData.carLevelList.minCar = "";
        } else if ($(this).attr("data-name") == "smallCar") { //紧凑型
            carQueryData.carLevelList.smallCar = "";
        } else if ($(this).attr("data-name") == "middleCar") { //中型车
            carQueryData.carLevelList.middleCar = "";
        } else if ($(this).attr("data-name") == "middleLargeCar") { //中大型车
            carQueryData.carLevelList.middleLargeCar = "";
        } else if ($(this).attr("data-name") == "suvCar") { //SUV
            carQueryData.carLevelList.suvCar = "";
        } else if ($(this).attr("data-name") == "mpvCar") { //MPV
            carQueryData.carLevelList.mpvCar = "";
        } else if ($(this).attr("data-name") == "runCar") { //跑车
            carQueryData.carLevelList.runCar = "";
        } else if ($(this).attr("data-name") == key) {
            carQueryData[key] = "";
        }
    };
    selectedLaberRender();
    queryCarList();
});
//品牌
$('.brand').on('click', function () {
    $('.titleName').text("选择品牌").addClass("carBrand");;
    $('.TopGoBackNav').removeClass("hide");
    $('.bigBox').addClass("hide");
    $('.mui-content').removeClass("hide");
    $('.navTitle li').removeClass("isShow");
    $('.navTitle li p').removeClass("nav-selected");
    $('.navTitle li i').removeClass("arrows_selected");
})
//解决显示问题
setTimeout(function () {
    $('.mui-content').addClass("hide")
}, 100);

//页面滚动事件：
$(window).on('scroll', function () {
    var searchBoxHeight = $('.searchBox').height();
    var hasIsShow = $('.navTitle li').hasClass("isShow");
    if ($(window).scrollTop() > 1) {
        $('.searchBox').addClass("changeSearchCss");
    } else {
        if (!hasIsShow) {
            $('.searchBox').removeClass("changeSearchCss");
        }
    };
    if ($(window).scrollTop() >= 170) {
        $('.navBigBox').addClass("navBigBoxChange");
        if(!isWeiXin()){
            $('.navBigBox').addClass("navNotWeb");
        };
        $('.selectLabel').css("margin-top", "1.1rem")
    } else {
        if (!hasIsShow) {
            $('.navBigBox').removeClass("navBigBoxChange");
            $('.navBigBox').removeClass("navNotWeb");

        };
        $('.selectLabel').css("margin-top", "0");
    }
});
//遮罩层点击事件
$('.shade').on('click', function () {
    $(this).addClass("hide");
    clickCssChange();
});
//首付滑动
$(".range_1").ionRangeSlider({
    min: 0, //最小值 
    max: 6, //最大值 
    from: 0, //默认从哪个值开始选
    to: 6, //默认选到哪个值
    type: 'double', //设置类型
    step: 1,
    prefix: "", //设置数值前缀
    postfix: "元", //设置数值后缀
    prettify: true,
    hasGrid: true,
    onChange: function (data) {
        moveSliderRange1(data.from, data.to);
    },
});
var sliderRange1 = $(".range_1").data("ionRangeSlider");

function moveSliderRange1(leftNum, rightNum) {
    if (leftNum >= 0 && rightNum <= 5) {
        $('.bxsh').text(leftNum + '-' + rightNum + '万');
        $('.bxsh').attr("data-leftNum", leftNum * 10000);
        $('.bxsh').attr("data-rightNum", rightNum * 10000);
    } else if (leftNum == 6 && rightNum == 6) {
        $('.bxsh').text('5万以上');
        $('.bxsh').attr("data-leftNum", 50000);
        $('.bxsh').attr("data-rightNum", "");
    } else if (leftNum > 0 && leftNum < 5 && rightNum > 5) {
        $('.bxsh').text(leftNum + '万以上');
        $('.bxsh').attr("data-leftNum", leftNum);
        $('.bxsh').attr("data-rightNum", "");
    } else if (leftNum >= 50 && rightNum > 5) {
        $('.bxsh').text('5万以上');
        $('.bxsh').attr("data-leftNum", "50000");
        $('.bxsh').attr("data-rightNum", "");
    } else if (leftNum == 0 && rightNum > 5) {
        $('.bxsh').text("不限车价");
        $('.bxsh').attr("data-leftNum", "0");
        $('.bxsh').attr("data-rightNum", "");
    }
}
//月供滑动
$(".range_2").ionRangeSlider({
    min: 0, //最小值 
    max: 6000, //最大值 
    from: 0, //默认从哪个值开始选
    to: 6000, //默认选到哪个值
    type: 'double', //设置类型
    step: 1,
    prefix: "", //设置数值前缀
    postfix: "元", //设置数值后缀
    prettify: true,
    hasGrid: true,
    onChange: function (data) {
        moveSliderRange2(data.from, data.to);
    },
});
var sliderRange2 = $(".range_2").data("ionRangeSlider");

function moveSliderRange2(leftNum, rightNum) {
    if (leftNum >= 0 && rightNum <= 5000) {
        $('.bxyc').text(leftNum + '-' + rightNum + '元');
        $('.bxyc').attr("data-leftNum", leftNum);
        $('.bxyc').attr("data-rightNum", rightNum);
    } else if (leftNum == 6000 && rightNum == 6000) {
        $('.bxyc').text('5000元以上');
        $('.bxyc').attr("data-leftNum", 5000);
        $('.bxyc').attr("data-rightNum", "");
    } else if (leftNum > 0 && leftNum < 5000 && rightNum > 5000) {
        $('.bxyc').text(leftNum + '元以上');
        $('.bxyc').attr("data-leftNum", leftNum);
        $('.bxyc').attr("data-rightNum", "");
    } else if (leftNum >= 5000 && rightNum > 5000) {
        $('.bxyc').text('5000元以上');
        $('.bxyc').attr("data-leftNum", "5000");
        $('.bxyc').attr("data-rightNum", "");
    } else if (leftNum == 0 && rightNum > 5000) {
        $('.bxyc').text("不限月供");
        $('.bxyc').attr("data-leftNum", "0");
        $('.bxyc').attr("data-rightNum", "");
    }
}
//更多选择滑动
$(".range_3").ionRangeSlider({
    min: 0, //最小值 
    max: 60, //最大值 
    from: 0, //默认从哪个值开始选
    to: 60, //默认选到哪个值
    type: 'double', //设置类型
    step: 1,
    prefix: "", //设置数值前缀
    postfix: "元", //设置数值后缀
    prettify: true,
    hasGrid: true,
    onChange: function (data) {
        moveSliderRange3(data.from, data.to);
    },
});
var sliderRange3 = $(".range_3").data("ionRangeSlider");

function moveSliderRange3(leftNum, rightNum) {
    if (leftNum >= 0 && rightNum <= 50) {
        $('.bxcj').text(leftNum + '-' + rightNum + '万');
        $('.bxcj').attr("data-leftNum", leftNum * 10000);
        $('.bxcj').attr("data-rightNum", rightNum * 10000);
    } else if (leftNum == 60 && rightNum == 60) {
        $('.bxcj').text('50万以上');
        $('.bxcj').attr("data-leftNum", 500000);
        $('.bxcj').attr("data-rightNum", "");
    } else if (leftNum > 0 && leftNum < 50 && rightNum > 50) {
        $('.bxcj').text(leftNum + '万以上');
        $('.bxcj').attr("data-leftNum", leftNum * 10000);
        $('.bxcj').attr("data-rightNum", "");
    } else if (leftNum >= 50 && rightNum > 50) {
        $('.bxcj').text('50万以上');
        $('.bxcj').attr("data-leftNum", "500000");
        $('.bxcj').attr("data-rightNum", "");
    } else if (leftNum == 0 && rightNum > 50) {
        $('.bxcj').text("不限车价");
        $('.bxcj').attr("data-leftNum", "0");
        $('.bxcj').attr("data-rightNum", "");
    }
};
// 自定义函数封装
//导航条切换
function navSelectChangeThisCss(thisClick, showSelect, showList, thisAddClass) {
    $(thisClick).siblings().find("p").removeClass("nav-selected"); //颜色
    $(thisClick).siblings().find("i").removeClass("arrows_selected"); //三角箭头
    if ($(thisClick).hasClass("isShow")) { //不显示
        $('.navBigBox').removeClass("navBigBoxChange");
        $('.navBigBox').removeClass("navNotWeb");
        $('.searchBox').removeClass("changeSearchCss");
        $('.bannerBox').removeClass("hide");
        $(thisClick).removeClass("isShow");
        $('.shade').addClass("hide"); //遮罩层
        $(showSelect).slideUp(100);
        $(thisClick).find("p").removeClass("nav-selected");
        $(thisClick).find("i").removeClass("arrows_selected");
        $("body").css("overflow", "auto");
    } else { //显示
        $('.navBigBox').addClass("navBigBoxChange");
        if(!isWeiXin()){
            $('.navBigBox').addClass("navNotWeb");
        };
        $('.searchBox').addClass("changeSearchCss");
        $('.bannerBox').addClass("hide");
        $(thisClick).addClass("isShow");
        $('.shade').removeClass("hide");
        $(showSelect).slideDown(100);
        $(thisClick).find("p").addClass("nav-selected");
        $(thisClick).find("i").addClass("arrows_selected");
        $("body").css("overflow", "hidden");
    };
    showList.forEach(function (v, i) {
        $(v).slideUp(0);
    });
    thisAddClass.forEach(function (v, i) {
        $(v).removeClass("isShow");
    });
};
//点击遮罩层、排序选择调用
function clickCssChange() {
    $('.searchBox').removeClass("changeSearchCss");
    $('.bannerBox').removeClass("hide");
    $('.shade').addClass("hide");
    $('.navTitle li').removeClass("isShow");
    $(".navTitle li").find("p").removeClass("nav-selected");
    $(".navTitle li").find("i").removeClass("arrows_selected");
    $(".selectClass").slideUp(100);
    $('.navBigBox').removeClass("navBigBoxChange");
    $('.navBigBox').removeClass("navNotWeb");
    $("body").css("overflow", "auto");
};
// 标签选择text渲染
selectedLaberRender();
function selectedLaberRender() {
    var selectedHtml = "";
    for (var key in carRenderData) {
        if (carRenderData[key] && key != "startRow") {
            selectedHtml += "<li class='' data-name='" + key + "'><p>" + carRenderData[key] + "</p><i></i></li>";
        };
    };
    if (selectedHtml) {
        selectedHtml += "<li class='reset'><i></i><p>重置</p></li>";
    };
    $('.selectLabel_ul').html(selectedHtml);
}
//车辆列表查询
queryCarList();
function queryCarList() {
    //加载提示
    if (!navigator.onLine) {
        $('.carListBox').html("<p class='carLoading'>网络不正常，请稍后再试!</p>");
        return false;
    } else {
        $('.carListBox').html("<p class='carLoading'>加载中...</p>");
    };
    //carQueryData.carLevel 拼接
    carQueryData.carLevel = "";
    for (var key in carQueryData.carLevelList) {
        if (carQueryData.carLevelList[key]) {
            carQueryData.carLevel += "-" + carQueryData.carLevelList[key];
        }
    };
    if (carQueryData.carLevel[0] == "-") {
        var aa = carQueryData.carLevel.slice(1);
        carQueryData.carLevel = aa;
    };
    //首付比例拼接
    carQueryData.downPaymentRatio = "";
    for (var key in carQueryData.downPaymentRatioList) {
        if (carQueryData.downPaymentRatioList[key]) {
            carQueryData.downPaymentRatio += "-" + carQueryData.downPaymentRatioList[key];
        }
    };
    if (carQueryData.downPaymentRatio[0] == "-") {
        var aa = carQueryData.downPaymentRatio.slice(1);
        carQueryData.downPaymentRatio = aa;
    };
    var newData = {};
    for (var key in carQueryData) {
        if (carQueryData[key] && key != "carLevelList" && key != "downPaymentRatioList") {
            newData[key] = carQueryData[key];
        };
    };
    console.log("newData", newData)
    console.log("carRenderData", carRenderData);
    // _______________________________

    // return false;
    $.ajax({
        type: "post",
        url: baseUrl + "product/getProductList",
        data: JSON.stringify(newData),
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        success: function (data) {
            var carlistData = data.list;
            
            console.log(data)
            carlistData.forEach(function (v, i) {
                v.image = jumpUrl + v.image;
                // v.image = v.image;
            });
            if (data.returnCode == "200") {
                var carListHtml = template("carList", carlistData);
                $('.carListBox').html(carListHtml);
            };
        },
        error: function (result) {}
    });
};
//车辆列表点击
$('.carListBox').on('click',"li", function () {
    if(!navigator.onLine){
        mui.toast('暂无网络信号，请检查您的网络！',{ duration:3000, type:'div' });
        return false;
    };
    var carModelIdVal = $(this).attr("data-carModelIdVal");
    var productIdVal = $(this).attr("data-productIdVal");
    var fullUrl = "page2.html?carModelIdVal="+carModelIdVal +"&productIdVal="+productIdVal;
    if(isWeiXin()||equipment()=="IOS"){
        location.href = fullUrl;
    }else if(equipment() == "Android"){
     //如果是Android,调用原生方法将数据传递过去
      window.NativeMethod.startCarDetailActivity(fullUrl);//调用安卓方法
    };
});
//顶部返回
function goBackFun(){
    $('.TopGoBackNav').addClass("hide");
    $('.bigBox').removeClass("hide");
    $('.moreScreeningBox').addClass("hide");
    $('.mui-content').addClass("hide");
    $('.cityPositonBox').addClass("hide");
};