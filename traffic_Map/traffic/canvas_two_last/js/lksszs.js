(function(){
	var lkqxBotton = $("#lkqxBotton");
	var lkzzBotton = $("#lkzzBotton");
	var lkqx = $("#lkqx");
	var lkzz = $("#lkzz");
	var lkssTime = $(".lkssTime");
	var searchButton = $("#searchButton");
	var inputSearch = $("#input-search");
	var inputWrite = $("#input-write");
	var timeNext = $("#next");
	var timePrev = $("#prev");
	var datesUl = $("#dates");
	var step = 0;
	var datesUlLeft = null;	
	timeNext.click(function(){
		step-=120;
		if($("#dates").css("right") > "0px"){
			timeNext.hide();
		}
		if(step < 0){
			timePrev.show();
		}	
		datesUl.stop().animate({"left":step+"px"});
	});	
	timePrev.click(function(){
		step+=120;
		if($("#dates").css("right") === "0px"){
			timeNext.show();
		}
		if(step >= 0){
			timePrev.hide();
			timeNext.show();
		}		
		datesUl.stop().animate({"left":step+"px"});
	});
	$("#dates li").on("click",function(event){
		console.log(event.target);
		$(event.target).css({"color":"red","font-size":"20px","line-height":"60px"});
		$(event.target).closest("li").siblings().find("a").css({"color":"#337ab7","font-size":"16px","line-height":"60px"});
	});
	lkqxBotton.click(function(){
		lkqxBotton.css({"background":"#3498DB","color":"#fff"});
		lkzzBotton.css({"background":"#fff","color":"#333"});
		lkqx.show();
		lkzz.hide();
		lkssTime.hide();
	});
	lkzzBotton.click(function(){
		lkzzBotton.css({"background":"#3498DB","color":"#fff"});
		lkqxBotton.css({"background":"#fff","color":"#333"});
		lkzz.show();
		lkssTime.show();
		lkqx.hide();
	});
	searchButton.click(function(){
		inputSearch.show();
	});
	$("#input-search").click(function(){
		inputSearch.hide();
	});
	inputWrite.blur(function(){ 
		inputSearch.hide();
	}); 
	function getVale(){
		document.querySelector('#searchButton').addEventListener('click', function(e){
		    document.querySelector('#input-search').classList.add('show');
		    e.stopPropagation();
		}, false);
		document.querySelector('#input-search').addEventListener('click', function(e){
		    e.stopPropagation();
		}, false);
		document.addEventListener('click', function(){
		    document.querySelector('#input-search').classList.remove('show');
		}, false);
	}
	//getVale();
})();

var TableDatatablesScroller = function (name) {
	var initTable1 = function () {
		$(name).dataTable({
			"ajax": "testdata",
			"columns": [
				{ "data": "pm" },
				{ "data": "lk" },
				{ "data": "yddj" },
				{ "data": "ydzs" }
			],
			"paging":   false,
			"searching": false,
			"info":false,
			"scrollY":190,
			dom: 'lfrtipB',
			buttons: [
				{
					extend: 'excel',
					text: '导出excel',
					className: 'btn blue-steel'

				}
			],
			"lengthChange": false
		});
	};
	return {
		//main function to initiate the module
		init: function () {
			if (!jQuery().dataTable) {
				return;
			}
			initTable1();
		}
	};
};

function clickFun(button,div1,div2){
	var clickButton = $(button);
	var chart = $(div1);
	var list = $(div2);
	var flag = 0;
	clickButton.click(function(){
		flag++;
		if(flag%2==0){
			chart.show();
			list.hide();
		}else{
			chart.hide();
			list.show();
		}
	});
}
clickFun("#lksszsBtn","#lkqxTb","#lkqxBg");
function getDatalkBhQx(data) {
	// 路段实时流量统计图
    option = {
		legend: {
            data:['饱和指数','预测指数']
        },
        xAxis: {
            name:"时间",
            type: 'category',
            data: data.map(function(item){
            	return item.XSSJ;
            }),
            axisLabel: {
                formatter: function (value, idx) {
                     return value;
                },
        		interval : 38
            },
            splitLine: {
                show: false
            },
            boundaryGap: false
        },
        yAxis: {
            name:'饱和度(S)',
            type:"value"
        },
        series: [
        {
            name: '饱和指数',
            type: 'line',
            data: data.map(function(item){
            	return item.CROSSINDEX;
            }),
            showSymbol:false

        },{
            name: '预测指数',
            type: 'line',
            data: data.map(function(item){
            	return item.PREINDEX;
            }),
            showSymbol:false

        }],
        dataZoom:[
              {
              	type: 'slider',
  				show: true,
  				xAxisIndex: [0],
  				start: 0,
  				end: 100
  			}
  		]
        ,
        tooltip: {
            trigger: 'axis',
//            formatter: function (params) {
//                return "时间: " + params[0].name + "<br />" + "速度: " + params[0].value + " km/h";
//            },
            axisPointer: {
                animation: false
            }
        }
    };
}

function getDataZz(data){
	//console.log(data);
	option = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	    	left: '0',
	        right: '0',
	        bottom: '0',
	        containLabel: true,
	        width:"auto",
	        borderWidth:"0"
	    },
	    xAxis : {
            type : 'category',
            data : [data[0],data[1],data[2],data[3]],
	    },
	    yAxis : [
	        {
	            type : 'value',
	            splitLine:false
	        }
	    ],
	    series : [
	        {
	            name:'指数',
	            type:'bar',
	            data:[2,4,8,9],
	        	itemStyle:{
	        		normal:{
	        			color:function(params){
	        				if(params.data >=0 && params.data <= 2) {
	        					return "#01C14B";
	        				}else if (params.data <= 4){
	        					return "#01FE01";
	        				}else if (params.data <= 6){
	        					return "#FEFE02";
	        				}else if (params.data <= 8){
	        					return "#FE9B01";
	        				}else if (params.data <= 10){
	        					return "#FE0000";
	        				}
	        			}
	        		}
	        	}
	        },
	        {
	            name:'指数',
	            type:'bar',
	            data:[2,4,8,9],
	        	itemStyle:{
	        		normal:{
	        			color:function(params){
	        				if(params.data >=0 && params.data <= 2) {
	        					return "#01C14B";
	        				}else if (params.data <= 4){
	        					return "#01FE01";
	        				}else if (params.data <= 6){
	        					return "#FEFE02";
	        				}else if (params.data <= 8){
	        					return "#FE9B01";
	        				}else if (params.data <= 10){
	        					return "#FE0000";
	        				}
	        			}
	        		}
	        	}
	        }
	    ]
	};
}

var idTmr;
function  getExplorer() {
	var explorer = window.navigator.userAgent ;
	//ie
	if (explorer.indexOf("MSIE") >= 0) {
		return 'ie';
	}
	//firefox
	else if (explorer.indexOf("Firefox") >= 0) {
		return 'Firefox';
	}
	//Chrome
	else if(explorer.indexOf("Chrome") >= 0){
		return 'Chrome';
	}
	//Opera
	else if(explorer.indexOf("Opera") >= 0){
		return 'Opera';
	}
	//Safari
	else if(explorer.indexOf("Safari") >= 0){
		return 'Safari';
	}
}
function method1(tableid) {//整个表格拷贝到EXCEL中
	if(getExplorer()=='ie')
	{
		var curTbl = document.getElementById(tableid);
		var oXL = new ActiveXObject("Excel.Application");

		//创建AX对象excel
		var oWB = oXL.Workbooks.Add();
		//获取workbook对象
		var xlsheet = oWB.Worksheets(1);
		//激活当前sheet
		var sel = document.body.createTextRange();
		sel.moveToElementText(curTbl);
		//把表格中的内容移到TextRange中
		sel.select;
		//全选TextRange中内容
		sel.execCommand("Copy");
		//复制TextRange中内容
		xlsheet.Paste();
		//粘贴到活动的EXCEL中
		oXL.Visible = true;
		//设置excel可见属性

		try {
			var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
		} catch (e) {
			print("Nested catch caught " + e);
		} finally {
			oWB.SaveAs(fname);

			oWB.Close(savechanges = false);
			//xls.visible = false;
			oXL.Quit();
			oXL = null;
			//结束excel进程，退出完成
			//window.setInterval("Cleanup();",1);
			idTmr = window.setInterval("Cleanup();", 1);

		}

	}
	else
	{
		tableToExcel(tableid)
	}
}
function Cleanup() {
	window.clearInterval(idTmr);
	CollectGarbage();
}
var tableToExcel = (function() {
	var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
		format = function(s, c) {
			return s.replace(/{(\w+)}/g,
				function(m, p) { return c[p]; }) }
	return function(table, name) {
		if (!table.nodeType) table = document.getElementById(table)
		var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
		window.location.href = uri + base64(format(template, ctx))
	}
})();
/*
 $(document).ready(function() {
 var n = {"1":[1,100,1],"2":[0,5,2],"3":[0,55,3],"4":[0,8,4]};
 var w = {"1":[0,1,1],"2":[1,6,2],"3":[2,334,3],"4":[3,77,4]};
 var s = {"1":[0,109,1],"2":[1,88,2],"3":[2,2,3],"4":[3,66,4]};
 var e = {"1":[0,10,1],"2":[1,99,2],"3":[2,1,3],"4":[3,4,4],"5":[4,66,5]};
 createIS(1,{"road":[3,3,3,3]},"cross",800,n,w,s,e);
 });*/


