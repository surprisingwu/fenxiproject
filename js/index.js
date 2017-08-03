/**
 * Created by 巫运廷 on 2017/7/11.
 */
//定义三个全局变量，用来接收。用户所选择的时间区间
var wholeVariateYear = "";
var wholeVariateTime = "";
// var wholeVariateMonth = "";
//模拟返回的数据对应的   字段和颜色
var dataColor = [
    {
        color: "#E8704E",
        background: "backgroundColor_activity"
    },
    {
        color: "#24BDB6",
        background: "backgroundColor_everyday"
    },
    {
        color: "#7C77B9 ",
        background: "backgroundColor_common"
    },
    {
        color: "#5EC8E7",
        background: "backgroundColor_NC"
    }
]
//定义一个全局的数组，所有的状态。一个变量用来记录当前的显示的状态
var globalState = {
    szxmid: [
        {
            name: "收支项目",
            value: "szxmid"
        },
        {
            name: "部门",
            value: "fydeptid"
        },
        {
            name: "人员",
            value: "jkbxr"
        },
        {
            name: "单据类型",
            value: "djlx"
        }],
    fydeptid: [
        {
            name: "部门",
            value: "fydeptid"
        }, {
            name: "收支项目",
            value: "szxmid"
        },
        {
            name: "人员",
            value: "jkbxr"
        },
        {
            name: "单据类型",
            value: "djlx"
        }],
    jkbxr: [
        {
            name: "人员",
            value: "jkbxr"
        }, {
            name: "收支项目",
            value: "szxmid"
        },
        {
            name: "部门",
            value: "fydeptid"
        },
        {
            name: "单据类型",
            value: "djlx"
        }],
    djlx: [
        {
            name: "单据类型",
            value: "djlx"
        }, {
            name: "收支项目",
            value: "szxmid"
        },
        {
            name: "部门",
            value: "fydeptid"
        },
        {
            name: "人员",
            value: "jkbxr"
        }],
}
//用来保存当前的维度，来确定层级的顺序
var activeState = "szxmid";
//每次点击 +1
var currentIndex = 0;
//一个对象用来保存，当前层级的主键和参数
var currentStateObj = {};
summerready = function () {
    //头部搜索，返回，取消的逻辑
    aboutInputHandler();
    //点击查询按钮的一些逻辑
    $(".checkOperation").on("click", function () {
        $("#photoShow").hide();
        $("#checkPage").show();
    })
    //点击查询状态下的箭头
    $("#checkArrow").on("click", function () {
        $("#photoShow").show();
        $("#checkPage").hide();
    })
    //维度和时间区间。 回调里面调数据，来展示用户选择的维度或区间内的数据
    $(function () {
        var weidu = [
            "人员", "部门", "默认收支项目", "单据类型", "收支项目"]
        $.scrEvent({
            data: weidu,
            evEle: '#weiduInput',
            title: '选择维度',
            defValue: "默认收支项目",
            afterAction: function (data) {
                //根据选择的不同，维度进行调取后台拿相应的数据
                switch (data) {
                    case "人员":
                        activeState = "jkbxr";
                        //@todo 拿到当前的状态，可以调取后台获取相应的数据进行渲染。如果设置时间，则获取相应的时间区间。
                        var data = {
                            "code": "SUCCESS",
                            "datas": [
                                {
                                    "dept_name": null,
                                    "dims_name": "郭晓天",
                                    "dims_pk": "1001ZZ10000000000Q8J",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "122002"
                                },
                                {
                                    "dept_name": null,
                                    "dims_name": "zyq",
                                    "dims_pk": "1001ZZ10000000001E5N",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "9141"
                                },
                                {
                                    "dept_name": null,
                                    "dims_name": "丁雪华",
                                    "dims_pk": "1001F4100000000006BG",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "375"
                                }
                            ],
                            "msg": "SUCCESS"
                        }
                        checkWeiduInit(data);
                        drawEhart(data);
                        break;
                    case "部门":
                        activeState = "fydeptid";
                        var data = {
                            "code": "SUCCESS",
                            "datas": [
                                {
                                    "dept_name": null,
                                    "dims_name": "科技部",
                                    "dims_pk": "1001F4100000000002GM",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "131518"
                                }
                            ],
                            "msg": "SUCCESS"
                        }
                        checkWeiduInit(data)
                        drawEhart(data);
                        break;
                    case  "单据类型":
                        activeState = "djlx";
                        var data = {
                            "code": "SUCCESS",
                            "datas": [
                                {
                                    "dept_name": null,
                                    "dims_name": "差旅费报销单",
                                    "dims_pk": "2641",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "263036"
                                }
                            ],
                            "msg": "SUCCESS"
                        }
                        checkWeiduInit(data)
                        drawEhart(data)
                        break;
                    default:
                        var data = {
                            "code": "SUCCESS",
                            "datas": [
                                {
                                    "dept_name": null,
                                    "dims_name": "差旅费收支项",
                                    "dims_pk": "1001F4100000000006D6",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "621"
                                },
                                {
                                    "dept_name": null,
                                    "dims_name": "通讯费",
                                    "dims_pk": "1001D210000000003H1M",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "4000"
                                },
                                {
                                    "dept_name": null,
                                    "dims_name": "固定资产收支大项",
                                    "dims_pk": "1001ZZ10000000003679",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "5141"
                                },
                                {
                                    "dept_name": null,
                                    "dims_name": "差旅费",
                                    "dims_pk": "1001F4100000000006D2",
                                    "djbh": null,
                                    "djlx": null,
                                    "djlxname": null,
                                    "djrq": null,
                                    "jkbxr": null,
                                    "jkbxr_name": null,
                                    "org_name": null,
                                    "pk_dept": null,
                                    "pk_org": null,
                                    "szxm_name": null,
                                    "szxmid": null,
                                    "total": "121756"
                                }
                            ],
                            "msg": "SUCCESS"
                        }
                       checkWeiduInit(data)
                        drawEhart(data)
                }
            }
        });
        $.dateSelector({
            evEle: '.checkIconWraper',
            startYear: '2015',
            endYear: '2022',
            timeBoo: false,
            title: "选择时间区间",
            afterAction: function (d1, d2) {
                wholeVariateYear = d1;
                //第二个参数不区分是季度还是月份。
                wholeVariateTime = d2;
                //@todo 这里根据时间区间，去后台那数据。在不再进行选择时。后面的维度查询都基于此进行查询的。
            }
        });
    })

    var data = {
        "code": "SUCCESS",
        "datas": [
            {
                "dept_name": null,
                "dims_name": "差旅费收支项",
                "dims_pk": "1001F4100000000006D6",
                "djbh": null,
                "djlx": null,
                "djlxname": null,
                "djrq": null,
                "jkbxr": null,
                "jkbxr_name": null,
                "org_name": null,
                "pk_dept": null,
                "pk_org": null,
                "szxm_name": null,
                "szxmid": null,
                "total": "621"
            },
            {
                "dept_name": null,
                "dims_name": "通讯费",
                "dims_pk": "1001D210000000003H1M",
                "djbh": null,
                "djlx": null,
                "djlxname": null,
                "djrq": null,
                "jkbxr": null,
                "jkbxr_name": null,
                "org_name": null,
                "pk_dept": null,
                "pk_org": null,
                "szxm_name": null,
                "szxmid": null,
                "total": "4000"
            },
            {
                "dept_name": null,
                "dims_name": "固定资产收支大项",
                "dims_pk": "1001ZZ10000000003679",
                "djbh": null,
                "djlx": null,
                "djlxname": null,
                "djrq": null,
                "jkbxr": null,
                "jkbxr_name": null,
                "org_name": null,
                "pk_dept": null,
                "pk_org": null,
                "szxm_name": null,
                "szxmid": null,
                "total": "5141"
            },
            {
                "dept_name": null,
                "dims_name": "差旅费",
                "dims_pk": "1001F4100000000006D2",
                "djbh": null,
                "djlx": null,
                "djlxname": null,
                "djrq": null,
                "jkbxr": null,
                "jkbxr_name": null,
                "org_name": null,
                "pk_dept": null,
                "pk_org": null,
                "szxm_name": null,
                "szxmid": null,
                "total": "121756"
            }
        ],
        "msg": "SUCCESS"
    }
    $("#myProject").data("nav0",JSON.stringify(data));
    //图标初始化
    var myChart = echarts.init(document.getElementById('main'));
    //第一次调用，默认显示的维度是收支项目
    drawEhart(data)
    $(".navWraper").on("click","li",function () {
        var currentLiIndex = $(this).index();
        var currentLiNum = currentLiIndex/2;
        if (currentLiNum === currentIndex) {
            return;
        }
        $("~li",this).remove();
        var data = JSON.parse($(this).data("nav"+currentLiNum));
        $(this).addClass("navActive");
        currentIndex--;
        drawEhart(data);
    })
    function drawEhart(data, dataMesg) {
        var data = data.datas
        if (data.length === 0 || data === null) {
            return
        }
        //这里肯定要先判断是数组还是单个对象。数组对应完整的图表。单个的代表具体的某一项。
        //在调方法时，构造出相应的数组
        myChart.clean;
        $("#listWraper").html("")
        var dataArr = [];
        var totalMoney = 0;
        var colorArr = [];
        data.forEach(function (item, index) {
            var obj = {
                value: item.total,
                name: item.dims_name
            };
            totalMoney += Number(item.total);
            dataArr.push(obj)
            colorArr.push(dataColor[index].color);
        })
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            title: {
                text: "￥" + totalMoney,
                subtext: "总支出",
                textStyle: {
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
                    name: '我的项目',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            formatter: function (params) {
                                return Math.round(params.percent / 1) + "%";
                            },
                            //formatter: '{d}%',
                            position: 'inside',
                            textStyle: {
                                fontSize: '10',
                                fontWeight: 'bold'
                            }
                        },
                        emphasis: {
                            show: false,
                            // formatter: '{d}%',
                            formatter: function (params) {
                                return Math.round(params.percent / 1) + "%";
                            },
                            position: "center",
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: dataArr
                }
            ]
        }
        myChart.setOption(option);
        renderList(data, totalMoney);
        listBindEvent();
    }

//渲染图表下对应的列表  首先需要对应的颜色，数据  可以对后台返回的数据进行遍历，插入dom树后做处理。
    function renderList(data, total) {
        //@todo  data是否需要校验   为空，根据后台返回的数据格式来定
        var htmlStr = "";
        var $listWraper = $("#listWraper");
        data.forEach(function (item, index) {
            htmlStr += '<li class="listItem" name="' + item.dims_pk + '">'
                + '<span class="circleContainer ' + dataColor[index].background + '">'
                + '</span>'
                + '<span class="detailMesg">'
                + item.dims_name
                + '</span>'
                + '<span class="percentageContainer">'
                + Math.round(item.total / total * 100 / 1) + "%"
                + '</span>'
                + '<span class="moneyContainer">￥' + item.total
                + '</span>'
                + '<i class="arrowContainer"></i>'
                + '</li>'
        })
        $listWraper.append(htmlStr);
    }

    function listBindEvent() {
        //点击列表的每一项，渲染相应的图表和数据
        $("#listWraper li").on("click", function () {
            if (currentIndex === 3) {
                window.location.href = "html/listspage.html";
            }
            var tempKey = globalState[activeState];
            //获取相应的主键
            currentStateObj[tempKey[currentIndex].value] = $(this).attr("name");
            //每点击一次，层级加一
            currentIndex++;
            var currentSate = tempKey[currentIndex].value;
            currentStateObj[currentSate] = "all";
            //@todo  如果设置时间，还要获取时间，发送请求，拿到相应的数据。
            var newData = {
                "code": "SUCCESS",
                "datas": [
                    {
                        "dept_name": null,
                        "dims_name": "差旅费收支项",
                        "dims_pk": "1001F4100000000006D6",
                        "djbh": null,
                        "djlx": null,
                        "djlxname": null,
                        "djrq": null,
                        "jkbxr": null,
                        "jkbxr_name": null,
                        "org_name": null,
                        "pk_dept": null,
                        "pk_org": null,
                        "szxm_name": null,
                        "szxmid": null,
                        "total": "621"
                    },
                    {
                        "dept_name": null,
                        "dims_name": "通讯费",
                        "dims_pk": "1001D210000000003H1M",
                        "djbh": null,
                        "djlx": null,
                        "djlxname": null,
                        "djrq": null,
                        "jkbxr": null,
                        "jkbxr_name": null,
                        "org_name": null,
                        "pk_dept": null,
                        "pk_org": null,
                        "szxm_name": null,
                        "szxmid": null,
                        "total": "4000"
                    },
                    {
                        "dept_name": null,
                        "dims_name": "固定资产收支大项",
                        "dims_pk": "1001ZZ10000000003679",
                        "djbh": null,
                        "djlx": null,
                        "djlxname": null,
                        "djrq": null,
                        "jkbxr": null,
                        "jkbxr_name": null,
                        "org_name": null,
                        "pk_dept": null,
                        "pk_org": null,
                        "szxm_name": null,
                        "szxmid": null,
                        "total": "5141"
                    },
                    {
                        "dept_name": null,
                        "dims_name": "差旅费",
                        "dims_pk": "1001F4100000000006D2",
                        "djbh": null,
                        "djlx": null,
                        "djlxname": null,
                        "djrq": null,
                        "jkbxr": null,
                        "jkbxr_name": null,
                        "org_name": null,
                        "pk_dept": null,
                        "pk_org": null,
                        "szxm_name": null,
                        "szxmid": null,
                        "total": "121756"
                    }
                ],
                "msg": "SUCCESS"
            }
            var _text = $(".detailMesg", this).text();
            var htmlStr = ' <li class="navArrow" id="navArrow"></li>\
                <li class="navItem" id="nav_' + currentIndex + '">' + _text + '</li>'
            $(".navWraper").append(htmlStr);
            $("#nav_" + currentIndex).data("nav"+currentIndex,JSON.stringify(newData))
            $("#nav_" + currentIndex).siblings().removeClass("navActive");
            $("#nav_" + currentIndex).addClass("navActive");
            drawEhart(newData);
        })
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
                "params": {
                    "transtype": "exit_back"
                }
            };
            summer.callService("SummerService.gotoNative", pamn, false);
        }
    }

//保留一位小数
    function translate_1(number, n) {
        n = n ? parseInt(n) : 0;
        if (n <= 0) return Math.round(number);
        number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
        return number;
    }

    function aboutInputHandler() {
//input获取焦点的时候，移动动画和显示取消按钮
        $(".searchBlock .searchInput").on("focus", function () {
            $(".turnBackLastPage").hide();
            $(".searchBlock").animate({
                left: "-35px"
            })
            $(".cancelBtn").show();
        })
//input 失去焦点的时候
        $(".searchBlock .searchInput").on("blur", function () {
            $(".searchBlock").animate({
                left: "0"
            })
            $(".cancelBtn").hide();
            $(".turnBackLastPage").show();
        })
        //点击删除的iocn，删除input里面的内容
        $(".searchBlock .delateIcon").on("click", function () {
            $(".searchBlock .searchInput").val("");
        })
        //点击搜索按钮，进行搜索
        //监听input的keyup事件，实时查询
        $(".searchBlock .searchInput").on("keyup", function () {
            var inputValue = $(".searchBlock .searchInput").val().trim();
            if (inputValue === "") {
                return;
            }
            //todo  调后台进行查询

        })
        //点击取消按钮   初始化
        $(".cancelBtn").on("click", function () {
            $(".cancelBtn").hide();
            $(".searchBlock").animate({
                left: "0"
            })
            $(".turnBackLastPage").show();
        })
        //点击返回按钮，返回上一个页面
    }
    function checkWeiduInit(data) {
        var $myProject = $("#myProject");
        $myProject.removeData("nav0")
        $myProject.data("nav0",JSON.stringify(data));
        currentIndex = 0;
        if ($(".navWraper>li").length >1){
            $("#myProject~li").remove();
            $myProject.addClass("navActive");
        }
    }
}
