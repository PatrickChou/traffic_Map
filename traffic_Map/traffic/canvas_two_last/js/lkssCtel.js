/* JavaScript content from scripts/console/controllers/loginCtrl.js in folder common */
define([ "./../controllers/controllers" ],function(controllers) {"use strict";controllers
		.controller("lksszsCtrl",["$scope","$state","$localStorage","$interval","lksszsService",
		    function($scope, $state, $localStorage,$interval, lksszsService) {
				 /**
			     *  因为不同于IFrame（IFrame有id,window.open()与IFrame的父子窗口的模式不同）,
			     *  所以当是通过window.open()方法打开一个新窗口使, 必须有一个新窗口的对象
			     *  当然必须先让子窗口弹出来, 才能调用子窗口中的变量, 否则抛出异常
			     */
				/*var OpenWindow;
				$scope.runs=function(){
					  OpenWindow =window.open("assets/lmap/index.html",'height='+screen.availHeight+',width='+screen.width+',top=0,left='+screen.width);
				}
				$scope.runs()*/;
				var crsBtnClick={
					"isTime":1,//1为实时，2为档案
					"params":"cross"
				}
				lmsg.send('crsBtnClick',crsBtnClick);

				lmsg.subscribe("crsBtn",function crsBtnClick(data){
					alert((data));
					if(a == 1 && b == "cross"){

					}else if(a  == 1 && b == "road"){

					}else if(a == 2 && b == "cross"){

					}else if(a == 2 && b == "road"){

					}
				})

				var flag = 0;
				var params={};
				lksszsService.lksszsSj(params).then(function(data){
					console.log(data);
					$scope.CROSSINDEX = data.CROSSINDEX;
					$scope.CROSSNAME = data.CROSSNAME;
					$scope.CROSSID = data.CROSSID;	
					$scope.avg = data.avg;
					$scope.grade  = Math.round(data.grade*5/60);					
					var trafficIndex = $scope.CROSSINDEX;
					if (trafficIndex <= 2 && trafficIndex >= 0) {
						$scope.jamLevel = "畅通";
					} else if (trafficIndex <= 4) {   
						$scope.jamLevel = "基本畅通";
					} else if (trafficIndex <= 6) {
						$scope.jamLevel = "轻度拥堵";
					} else if (trafficIndex <= 8) {
						$scope.jamLevel = "中度拥堵";
					} else if (trafficIndex <= 10) {
						$scope.jamLevel = "严重拥堵";
					}				
					var lksszsData = data;
					$scope.$apply();
					$scope.lksszsData = lksszsData;
					if(lksszsData.length == 0 ){
						lksszsData = [
							{"TRAFFICINDEX":'',
							"AVAGESPEED":'',
							"XSSJ":''}
						];
					}
					//getDataBhQx(lksszsData);
					var lkssBh = data;
					//console.log(lkssBh);
					getDataZz(lkssBh);
					echarts.init(document.getElementById('lkzz')).setOption(option);

					var lkxhpz = {"corssId":data.CROSSID}
					lksszsService.lkXhpz(lkxhpz).then(function(data){
						$scope.LDMC = $scope.CROSSNAME;
						$scope.QSSJ = data.STARTHOUR;
						$scope.XWS = data.XWS;
						$scope.ZQ = data.ZQ;
						$scope.LD = data.LD;
						$scope.lkxhpz = data.list;
						$scope.$apply();
						console.log(data);
					});
				});

				var paramsLKBH = {};
				lksszsService.lkBh(paramsLKBH).then(function(data){
					var lkbh = data;
					$scope.lksszsData = data;
					//console.log(data);
					$scope.$apply();
					getDatalkBhQx(lkbh);
					echarts.init(document.getElementById('lkqxTb')).setOption(option);
					TableDatatablesScroller($("#sample_1"));
				});
				
					$interval(function(){
						if(flag === 0 ){
						lksszsService.lksszsSj(params).then(function(data){
							console.log(data);
							$scope.CROSSINDEX = data.CROSSINDEX;
							$scope.CROSSNAME = data.CROSSNAME;
							$scope.CROSSID = data.CROSSID;	
							$scope.avg = data.avg;
							$scope.grade  = Math.round(data.grade*5/60);					
							var trafficIndex = $scope.CROSSINDEX;
							if (trafficIndex <= 2 && trafficIndex >= 0) {
								$scope.jamLevel = "畅通";
							} else if (trafficIndex <= 4) {   
								$scope.jamLevel = "基本畅通";
							} else if (trafficIndex <= 6) {
								$scope.jamLevel = "轻度拥堵";
							} else if (trafficIndex <= 8) {
								$scope.jamLevel = "中度拥堵";
							} else if (trafficIndex <= 10) {
								$scope.jamLevel = "严重拥堵";
							}				
							var lksszsData = data;
							$scope.$apply();
							$scope.lksszsData = lksszsData;
							if(lksszsData.length == 0 ){
								lksszsData = [
									{"TRAFFICINDEX":'',
									"AVAGESPEED":'',
									"XSSJ":''}
								];
							}
							//getDataBhQx(lksszsData);
							var lkssBh = data;
							//console.log(lkssBh);
							getDataZz(lkssBh);
							echarts.init(document.getElementById('lkzz')).setOption(option);
							var lkxhpz = {"corssId":data.CROSSID}
							lksszsService.lkXhpz(lkxhpz).then(function(data){
								$scope.LDMC = $scope.CROSSNAME;
								$scope.QSSJ = data.STARTHOUR;
								$scope.XWS = data.XWS;
								$scope.ZQ = data.ZQ;
								$scope.LD = data.LD;
								$scope.lkxhpz = data.list;
								$scope.$apply();
								console.log(data);
							});
						})
					}
				},180000);											
				$scope.searchChange=function(){
					flag = 1;
					var search_value={"souSuo":$scope.searchValue};
					lksszsService.lksszsSs(search_value).then(function(data){				
						$scope.lksszsSs = data;
						$scope.$apply();
						//console.log($scope.lksszsSs);
						$scope.valueUpdate=function(event){
							var idValue = event.target.getAttribute("id");
							$scope.roadValue = event.target.textContent;
							//console.log(idValue);	
							//console.log($scope.roadValue);
							$scope.searchValue = $scope.roadValue;
							var clickValue={"crossId":idValue};
							lksszsService.lksszsSj(clickValue).then(function(data){
								console.log(data);
								$scope.CROSSINDEX = data.CROSSINDEX;
								$scope.CROSSNAME = data.CROSSNAME;
								$scope.CROSSID = data.CROSSID;	
								$scope.avg = data.avg;
								$scope.grade  = Math.round(data.grade*5/60);								
								var trafficIndex = $scope.CROSSINDEX;
								if (trafficIndex <= 2 && trafficIndex >= 0) {
									$scope.jamLevel = "畅通";
								} else if (trafficIndex <= 4) {
									$scope.jamLevel = "基本畅通";
								} else if (trafficIndex <= 6) {
									$scope.jamLevel = "轻度拥堵";
								} else if (trafficIndex <= 8) {
									$scope.jamLevel = "中度拥堵";
								} else if (trafficIndex <= 10) {
									$scope.jamLevel = "严重拥堵";
								}	
								$scope.$apply();
								var lkxhpz = {"corssId":data.CROSSID}
								lksszsService.lkXhpz(lkxhpz).then(function(data){
									$scope.LDMC = $scope.CROSSNAME;
									$scope.QSSJ = data.STARTHOUR;
									$scope.XWS = data.XWS;
									$scope.ZQ = data.ZQ;
									$scope.LD = data.LD;
									$scope.lkxhpz = data.list;
									$scope.$apply();
									console.log(data);
								});
							});
								$interval(function(){
									if(flag === 1){
									var clickValue={"crossId":$scope.CROSSID};
									lksszsService.lksszsSj(clickValue).then(function(data){
										console.log(data);
										$scope.CROSSINDEX = data.CROSSINDEX;
										$scope.CROSSNAME = data.CROSSNAME;
										$scope.CROSSID = data.CROSSID;	
										$scope.avg = data.avg;
										$scope.grade  = Math.round(data.grade*5/60);								
										var trafficIndex = $scope.CROSSINDEX;
										if (trafficIndex <= 2 && trafficIndex >= 0) {
											$scope.jamLevel = "畅通";
										} else if (trafficIndex <= 4) {
											$scope.jamLevel = "基本畅通";
										} else if (trafficIndex <= 6) {
											$scope.jamLevel = "轻度拥堵";
										} else if (trafficIndex <= 8) {
											$scope.jamLevel = "中度拥堵";
										} else if (trafficIndex <= 10) {
											$scope.jamLevel = "严重拥堵";
										}	
										$scope.$apply();
										var lkxhpz = {"corssId":data.CROSSID}
										lksszsService.lkXhpz(lkxhpz).then(function(data){
											$scope.LDMC = $scope.CROSSNAME;
											$scope.QSSJ = data.STARTHOUR;
											$scope.XWS = data.XWS;
											$scope.ZQ = data.ZQ;
											$scope.LD = data.LD;
											$scope.lkxhpz = data.list;
											$scope.$apply();
											console.log(data);
										});
									})
								}
							},180000);													
						}
					});
				}
			}
		]
	);
});
