// var carList = [{
//         "name": "湖南",
//     },
//     {
//         "name": "湖北",
//     },
// ];
function brandListSave() {
    var carList = [];
    var newList = [];
    // console.log("222")
    carData.forEach(function (v, i) {
        if (newList.indexOf(v.brand) == -1) {
            newList.push(v.brand);
        };
    });
    newList.forEach(function (v, i) {
        var obj = {};
        obj.name = v;
        carList.push(obj);
    });
    // console.log(carList);
    var arr = [];
    carList.forEach(function (v, i) {
        if (arr.indexOf(Pinyin.GetJP(v.name)[0]) == -1) {
            arr.push(Pinyin.GetJP(v.name)[0]);
        }

    });

    // console_log('carList',carList);//自定义打印
    // console_log('arr',arr);//自定义打印
    var newData = [];
    arr.forEach(function (v, i) {
        // console_log('v',v);//自定义打印
        var filter = carList.filter(function (v2, i2) {
            // console.log("v2",v2)
            return Pinyin.GetJP(v2.name)[0] == v;
        });
        var resItem = {};
        resItem.name = arr[i];
        resItem.list = filter;
        newData.push(resItem);
    });
    //多音字处理
    // polyphone("重庆长安汽车","c",newData);
    // polyphone("重汽","z",newData);
    // polyphone("重量","z",newData);
    // polyphone("民国","d",newData);
    function polyphone(word, letter, newData) { //汉字/字母/数据 多音字处理
        var changeWord;
        newData.forEach(function (v, i) {
            v.list.forEach(function (v2, i2) {
                if (v2.name == word) {
                    v.list.splice(i2, 1)
                    changeWord = v2;
                }
            });
        });
        newData.forEach(function (v, i) {
            if (v.name == letter) {
                v.list.push(changeWord);
            }
        });
    }

    // //字母排序	
    var compare = function (obj1, obj2) {
        var val1 = obj1.name;
        var val2 = obj2.name;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
    newData.sort(compare);
    // console.log("newData2", newData)
    var liContent = "";
    newData.forEach(function (v, i) {
        liContent += '<li data-group="' + Pinyin.GetJP(v.name).toUpperCase() +
            '" class="mui-table-view-divider mui-indexed-list-group">' + v.name.toUpperCase() + '</li>'
        v.list.forEach(function (v2, i2) {
            liContent += '<li data-value="' + Pinyin.GetJP(v2.name).toUpperCase() + '" data-tags="' + Pinyin.GetQP(v2.name)
                .toUpperCase() + '" class="mui-table-view-cell mui-indexed-list-item">' + v2.name + '</li>'
        })

    });
    $('.myBox').html(liContent);
    // 引入mui
    mui.init();
    mui.ready(function () {
        var header = document.querySelector('header.mui-bar');
        var list = document.getElementById('list');
        //calc hieght
        list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
        //create
        window.indexedList = new mui.IndexedList(list);
    });
    //点击事件
    $('.mui-indexed-list-item').on('click', function () {
        // $('.loding').show();
        var carValue = $(this).text();
        carRenderData.brand = carValue;
        carQueryData.brand = carValue;
        // 返回
        $('.TopGoBackNav').addClass("hide");
        $('.bigBox').removeClass("hide");
        $('.moreScreeningBox').addClass("hide");
        $('.mui-content').addClass("hide");
        selectedLaberRender();
        queryCarList();
    });
}