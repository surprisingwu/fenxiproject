/**
 * Created by 巫运廷 on 2017/7/11.
 */
summerready = function () {
    //模拟后台返回的数据
    var data = [
        {
            name:"activity",
            value:"562"
        },
        {
            name:"everyday",
            value:"232"
        },
        {
            name:"common",
            value:"154"
        },
        {
            name:"NC",
            value:"2630"
        },
    ]
    //模拟返回的数据对应的   字段和颜色
    var dataMesg = [
        {
            activity: "市场活动专项",
            color: "#E8704E",
            background: "backgroundColor_activity"
        },
        {
            everyday: "日常费用",
            color: "#24BDB6",
            background: "backgroundColor_everyday"
        },
        {
            common: "公共福利项目",
            color: "#7C77B9 ",
            background: "backgroundColor_common"
        },
        {
            NC: "凤凰科技NC咨询",
            color: "#5EC8E7",
            background: "backgroundColor_NC"
        },
    ]
    var myChart = echarts.init(document.getElementById('main'));
    //调用绘制图表，由于这里的数据都是动态的。不能写死
    drawEhart(data,dataMesg)
    //点击nav栏我的项目，   绘制总数据  绘制总列表
    $("#myProject").on("click",function () {
        //状态重置
        $("#changeNav").html("").hide().removeClass("navActive");
        $("#navArrow").hide();
        $("#myProject").addClass("navActive");
        drawEhart(data,dataMesg)
    })
    function drawEhart(data,dataMesg) {
        //这里肯定要先判断是数组还是单个对象。数组对应完整的图表。单个的代表具体的某一项。
        //在调方法时，构造出相应的数组
        myChart.clean;
        $("#listWraper").html("")
        var dataArr = [];
        var totalMoney = 0;
        var colorArr = [];
        data.forEach(function (item,index) {
            if (item.value){
                var name = (dataMesg[index][item.name])
                if (name.length>=4){
                    name = name.slice(0,4)
                }
                var obj = {
                    value: item.value,
                    name: name
                }
                colorArr.push(dataMesg[index].color)
                totalMoney =totalMoney+ Number(item.value);
                dataArr.push(obj);
            }
        })
        option ={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            title: {
                text:"￥"+totalMoney,
                subtext:"总支出",
                textStyle:{
                    fontSize: 20,
                    color: "#000000"
                },
                subtextStyle: {
                    fontSize: 12,
                    color: "#8E8E93"
                },
                top: '43%',
                left: 'center'
            },
            color: colorArr,
            series: [
                {
                    name:'我的项目',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            formatter: '{d}%',
                            position: 'inside',
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        },
                        emphasis: {
                            show: false,
                            formatter: '{d}%',
                            position: "center",
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:dataArr
                }
            ]
        }
        myChart.setOption(option);
        renderList(data,dataMesg,totalMoney)
        if (data.length >1){
            listBindEvent();
        }else {
            singleListBindEvent();
        }

    }
//渲染图表下对应的列表  首先需要对应的颜色，数据  可以对后台返回的数据进行遍历，插入dom树后做处理。
    function renderList(data,dataMesg,total){
        //@todo  data是否需要校验   为空，根据后台返回的数据格式来定
        var htmlStr = "";
        var $listWraper = $("#listWraper");
        data.forEach(function (item,index) {
            if (item.value){
                htmlStr +=   '<li class="listItem">'
                    +'<span class="circleContainer '+dataMesg[index].background+'">'
                    +'</span>'
                    +'<span class="detailMesg">'
                    + dataMesg[index][item.name]
                    +'</span>'
                    +'<span class="percentageContainer">'
                        +translate(item.value/total)
            +'</span>'
                +'<span class="moneyContainer">￥'+item.value
                +'</span>'
                +'<i class="arrowContainer"></i>'
                    +'</li>'
            }
        })
        $listWraper.append(htmlStr);
    }
    function listBindEvent() {
        //点击列表的每一项，渲染相应的图表和数据
        $("#listWraper li").on("click",function () {
            var indexNum = $(this).index();
            var dataObj = data[indexNum];
            var dataMesgObj = dataMesg[indexNum];
            var dataLi = [dataObj];
            var dataMesgLi = [dataMesgObj];
            var htmlText = "";
            var nameLi = dataLi[0].name;
            htmlText = dataMesgLi[0][nameLi];
            $("#myProject").removeClass("navActive");
            $("#navArrow").show();
            $("#changeNav").html(htmlText).show().addClass("navActive");
            drawEhart(dataLi,dataMesgLi);
        })
    }
    function singleListBindEvent() {
        $("#listWraper li").on("click",function () {
            window.location.href = "html/listspage.html";
        })
    }
}
//退出小应用的方法
function functionback() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        navigator.app.exitApp();
    }
    if (isIOS) {
        var pamn = {
            "params" : {
                "transtype" : "exit_back"
            }
        };
        summer.callService("SummerService.gotoNative", pamn, false);
    }
}
function translate(num) {
    //这里保留3位
    var num = String(num*100);
    if (num.length>=4){
        num=num.slice(0,4)
    }
    return num+"%";
}