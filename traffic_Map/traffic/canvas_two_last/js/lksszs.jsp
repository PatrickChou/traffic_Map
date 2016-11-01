<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../public/head.jsp"%>
<!-- 插件css -->
<link href="<%=request.getContextPath()%>/public/assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
<link href="<%=request.getContextPath()%>/public/assets/pages/css/lksszs.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/public/assets/pages/js/lksszs.js" type="text/javascript"></script>
<script src="<%=request.getContextPath()%>/public/assets/js/crossroads_bg.js" type="text/javascript"></script>
<script type="application/javascript">
	function getContext() {
		return "<%=request.getContextPath()%>";
	}
</script>

<div class="page-header-fixed page-sidebar-closed-hide-logo">
	<!-- 导航开始 -->
	<jsp:include page="../public/nav.jsp" flush="true">
		<jsp:param name="title" value="路口实时指数" />
	</jsp:include>
	<!-- 导航结束-->
	<nav class="pagenav">当前位置:&nbsp;路口拥堵指数&gt;路口实时指数</nav>
	<!-- BEGIN CONTAINER -->
	<div class="wrapper p20 bg-white" ng-controller="lksszsCtrl">
		<div class="container-fluid">
			<div class="page-content">
				<!-- BEGIN PAGE BASE CONTENT -->
				<div class="row">
					<div class="w100 tc fc h220">
						<div class="col-md-3">
						<div class="searchroad bg-blue2 border-blue pb20 h220">
								<div class="font36 fontbold" style="font-size:30px!important;">{{CROSSNAME}}</div>
								<div class="font24 fontbold">{{CROSSID}}</div>
								<form action="" class="tc fc">
									<div class="input-group w90 mt30 fc">
										<input type="text" class="form-control input-lg col-md-5" placeholder="请输入您要搜索的路口名称或编号" ng-model="searchValue" id="input-write"/>
										<span class="input-group-btn">
											<button class="btn default btn-lg" type="button" ng-click="searchChange()" id="searchButton">
												<i class="fa fa-search"></i>
											</button>
										</span>
										<ul id="input-search" class="mt30 fc">
											<li ng-repeat="item in lksszsSs" ng-click="valueUpdate($event)"><a href="" id="{{item.CROSSID}}">{{item.CROSSNAME}}</a></li>
										</ul>
									</div>
								</form>
							</div>
						</div>
						<div class="col-md-9">
						<div class="portlet light bordered ptb0">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject font-dark sbold uppercase">路口评价指标</span>
                                    </div>
                                </div>
                                <div class="portlet-body form">
		                             <div class="searchroad bg-white">
		                             <div class="w100">
										<div class="col-md-4">
											<div class="mycircle bg-yellow-casablanca p35 mt25 fl">
												<i class="fa fa-pie-chart fa-4x"></i>
											</div>
											<div class="fl font-blue-steel pl10 p50 tl">
												<span class="font14 font-grey-gallery">当前指数:<span class="fontcolor1">{{CROSSINDEX}}</span></span><br>
												<span class="font14 font-grey-gallery">路口等级:<span class="fontcolor1">{{jamLevel}}</span></span>
											</div>
										</div>
										<div class="col-md-4">
											<div class="mycircle bg-green-jungle p35 mt25 fl">
												<i class="iconfont icon-12 icon-3x"></i>
											</div>
											<div class="fl font-blue-steel pl10 p40">
												<span class="font30 fontbold">{{grade}}</span><span class="fontbold">h</span><br>
												<span class="font14 font-grey-gallery">拥堵持续时间</span>
											</div>
										</div>
										<div class="col-md-4">
											<div class="mycircle bg-blue2 p35 mt25 fl">
												<i class="iconfont icon-11 icon-3x"></i>
											</div>
											<div class="fl font-blue-steel pl10 p40">
												<span class="font30 fontbold">{{avg}}</span><span class="fontbold">km/h</span><br>
												<span class="font14 font-grey-gallery">路网平均速度</span>
											</div>
										</div>
										</div>
									</div>
                                </div>
                            </div>
						</div>
					</div>
					<div class="clearfix"></div>
					<div class="w100 tc fc h520">
						<div class="col-md-4 h520">
							<div class="portlet light bordered ptb0">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject font-dark sbold uppercase">路口示意图</span>
                                    </div>
                                </div>
                                <div class="portlet-body form h470" id="crossMap">
路口图
                                </div>
                            </div>
						</div>
						<div class="col-md-4 h530 lkborder p10">
							<div class="tabbable tabbable-tabdrop ">
                            	<ul class="nav nav-pills mb0"><li class="dropdown pull-right tabdrop hide"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-angle-down"></i> <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>
                                    <li class=""><a href="" id="lkqxBotton">路口级饱和度曲线图</a></li>
                                	<li class=""><a href="" id="lkzzBotton">车道级饱和度柱状图</a></li>
                           		</ul>
                                <div class="tab-content border-top">
                                	<div class="tab-pane active h470" style="width:600px;height:470px;overflow: hidden" id="lkqx">
										<div id="lksszsBtn" class="ax_default icon normal" style="position: absolute;left: 550px;top: 15px;width: 24px;height: 20px;cursor:pointer;">
											<img id="u3158_img" class="img" src="<%=request.getContextPath()%>/public/assets/img/u1886.png" />
											<div id="u3159" class="text" style="display: none; visibility: hidden">
												<p id="cache2"><span style="font-family: &quot;微软雅黑 Regular&quot;, 微软雅黑;" id="cache3"></span></p>
											</div>
										</div>
										<div id="u3160" class="ax_default icon normal" style="cursor:pointer;position: absolute;left: 585px;top: 15px;width: 24px;height: 20px;" onclick="javascript:method1('sample_1')">
											<img id="u3160_img" class="img" src="/trafficIndex_web/public/assets/img/u1888.png">
											<!-- Unnamed () -->
											<div id="u3161" class="text" style="display: none; visibility: hidden">
												<p id="cache4"><span style="font-family: &quot;微软雅黑 Regular&quot;, 微软雅黑;" id="cache5"></span></p>
											</div>
										</div>
										<div class="tab-pane active h470" style="width:600px;height:470px;" id="lkqxTb">
											图表1
										</div>
										<div class="tab-pane active h470" style="width:600px;height:470px;overflow-y: auto" id="lkqxBg">
											<table class="table table-striped table-bordered table-hover order-column" id="sample_1">
												<thead>
												<tr class="bg-blue2 font-white">
													<th style="text-align:center;">时间</th>
													<th style="text-align:center;">指数</th>
													<th style="text-align:center;">预测</th>
												</tr>
												</thead>
												<tbody>
												<tr ng-repeat="item in lksszsData">
													<td>{{item.XSSJ}}</td>
													<td>{{item.CROSSINDEX}}</td>
													<td>{{item.PREINDEX}}</td>
												</tr>
												</tbody>
											</table>
										</div>
                                	</div>
                                	<div class="tab-pane h470" id="lkzz" style="width:600px;height:400px;">
                                       图表2						
                                	</div>
                                	<div class="lkssTime" style="height:70px;width:600px;background:#fff;display:none;">
                                		<a href="" id="next">&lt;</a>
                                		<div class="timeLine">
									   	<ul id="dates">
									  		<li><a href="">20:05</a></li>
											<li><a href="">20:06</a></li>
											<li><a href="">20:07</a></li>
											<li><a href="">20:08</a></li>
											<li><a href="">20:09</a></li>
											<li><a href="">20:10</a></li>
											<li><a href="">20:11</a></li>
									        <li><a href="">20:12</a></li>
									  		<li><a href="">20:05</a></li>
											<li><a href="">20:06</a></li>
											<li><a href="">20:07</a></li>
											<li><a href="">20:08</a></li>
											<li><a href="">20:09</a></li>
											<li><a href="">20:10</a></li>
											<li><a href="">20:11</a></li>
									        <li><a href="">20:12</a></li>
									   </ul>
									   </div>
									   <a href="" id="prev">&gt;</a>
                                	</div>
                                </div>
                                
                        	</div>
						</div>
						<div class="col-md-4 h520">
							<div class="portlet light bordered ptb0">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject font-dark sbold uppercase">路口信号配时方案</span>
                                    </div>
                                </div>
                                <div class="portlet-body form h470" style="overflow-y: auto;">
									<div class="w100 bg-default h140 clearfix">
										<div class="w100 tc font20 fontbold mt10 clearfix">
											<div class="col-md-4 font-blue-steel">{{QSSJ}}:00</div>
											<div class="col-md-4 font-blue-steel">{{XWS}}</div>
										</div>
										<div class="w100 tc mt10 clearfix">
											<div class="col-md-4 font-dark">起始时间</div>
											<div class="col-md-4 font-dark">相位数</div>
										</div>
										<div class="w100 tc font20 fontbold mt10 clearfix">
											<div class="col-md-4 font-blue-steel">{{ZQ}}S</div>
											<div class="col-md-4 font-blue-steel">{{LD}}S</div>
											<div class="col-md-4 font-blue-steel">{{XSFX}}</div>
										</div>
										<div class="w100 tc mt10 clearfix">
											<div class="col-md-4 font-dark">周期</div>
											<div class="col-md-4 font-dark">最大绿灯时间</div>
											<div class="col-md-4 font-dark">行驶方向</div>
										</div>
									</div>	
									<table class="table table-striped table-hover table-bordered dataTable no-footer tc" id="sample_1">
										<thead>
											<tr class="bg-blue2 font-white">
												<th class="tc">相位名称</th>
												<th class="tc">行驶方向</th>
												<th class="tc">绿灯时间</th>
												<th class="tc">过度时间</th>
											</tr>
										</thead>
										<tbody>
											<tr ng-repeat="item in lkxhpz">
												<td>相位{{item.PHASENO}}</td>
												<td>{{item.PHASEDIRECTION}}</td>
												<td>{{item.PHASELENGTH}} S</td>
												<td>{{item.YLZD1}} S</td>
											</tr>
										</tbody>
									</table>	
                                </div>
                            </div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
				<!-- END PAGE BASE CONTENT -->
			</div>
		</div>
	</div>
	<!-- END CONTAINER -->
	<%@include file="../public/javascript.jsp"%>

</div>
