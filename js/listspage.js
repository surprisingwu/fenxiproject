
var dataArr = [
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
    {
        type: "差旅费报销",
        time:"2016 04 16  21：08",
        name:"王晶",
        totalMoney: "700.00"
    },
]
summerready = function(){
    $(".turnBackLastPage").on("click",function () {
        window.location.href = "../index.html"
    })
    //初始化控件
    $(function () {
        var listview = UM.listview("#listview_wrap");
//        listview.on("pullDown", function (sender) {
//            sender.refresh();
//        });
        listview.on("pullUp", function (sender) {
            // pageIndex++;
            // callservice(pageIndex)
            sender.refresh();
        });
        listview.on("itemDelete", function (sender, args) {
        });
        listview.on("itemClick", function (sender, args) {
        });
        listview.on("itemSwipeLeft", function (sender, args) {
            sender.showItemMenu(args.$target);
        });
        listview.on("tapHold", function () {
        });
    });
    //渲染模拟的数据
    var arrText = doT.template($("#listTemplate").text());
    $("#listContainer").html(arrText(dataArr));
}
