<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@include file="../public/head.jsp"%>
<link href="<%=request.getContextPath()%>/public/assets/pages/css/ldsszs.css" rel="stylesheet" type="text/css" />
<script src="<%=request.getContextPath()%>/public/assets/pages/js/ldsszs.js" type="text/javascript"></script>
<script type="application/javascript">
	function getContext() {
		return "<%=request.getContextPath()%>";
	}
</script>

<div class="page-header-fixed page-sidebar-closed-hide-logo" >
	<!-- 导航开始 -->
	<jsp:include page="../public/nav.jsp" flush="true">
		<jsp:param name="title" value="路段实时指数" />
	</jsp:include>
	<!-- 导航结束-->
	<nav class="pagenav">当前位置:&nbsp;路段拥堵指数&gt;路段实时指数</nav>
	<!-- BEGIN CONTAINER -->
	<div class="wrapper p20 bg-white" ng-controller="ldsszsCtrl">
		<div class="container-fluid">
			<div class="page-content">
				<!-- BEGIN PAGE BASE CONTENT -->
				<div class="row">
					<div class="w100 tc fc h220">
						<div class="col-md-3">
						<div class="searchroad bg-blue2 border-blue pb20 h220">
								<div class="font36 fontbold" style="font-size:30px!important;">{{roadName}}</div>
								<div class="font24 fontbold">{{roadid}}</div>
								<form action="" class="tc fc">
									<div class="input-group w90 mt30 fc">
										<input type="search" class="form-control input-lg col-md-5" placeholder="请输入您要搜索的路段名称或编号" id="input-write" autocomplete="off" ng-model="searchValue" />
										<span class="input-group-btn">
											<button class="btn default btn-lg" type="button" id="search-button" ng-click="searchChange()">
												<i class="fa fa-search"></i>
											</button>
										</span>
									</div>
									<ul id="input-search" class="mt30 fc">
										<li ng-repeat="item in ldsszsSs" ng-click="valueUpdate($event)"><a href="" id="{{item.ROADID}}">{{item.ROADNAME}}</a></li>
									</ul>
								</form>
							</div>
						</div>
						<div class="col-md-9">
						<div class="portlet light bordered ptb0">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject font-dark sbold uppercase">路段评价指标</span>
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
												<span class="font14 font-grey-gallery">当前指数:<span class="fontcolor1">{{trafficIndex}}</span></span><br>
												<span class="font14 font-grey-gallery">拥堵等级:<span class="fontcolor1">{{jamLevel}}</span></span>
											</div>
										</div>
										<div class="col-md-4">
											<div class="mycircle bg-green-jungle p35 mt25 fl">
												<i class="iconfont icon-12 icon-3x"></i>
											</div>
											<div class="fl font-blue-steel pl10 p40">
												<span class="font30 fontbold">{{croadTime}}</span><span class="fontbold">h</span><br>
												<span class="font14 font-grey-gallery">拥堵持续时间</span>
											</div>
										</div>
										<div class="col-md-4">
											<div class="mycircle bg-blue2 p35 mt25 fl">
												<i class="iconfont icon-11 icon-3x"></i>
											</div>
											<div class="fl font-blue-steel pl10 p40">
												<span class="font30 fontbold">{{Speed}}</span><span class="fontbold">km/h</span><br>
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
							<div class="portlet light bordered ptb0" style="height:530px;">
                                <div class="portlet-title">
                                	<div class="ax_default icon normal" style="position: absolute;left: 550px;top: 15px;width: 24px;height: 20px;cursor:pointer;">
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
                                    <div class="caption">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject font-dark sbold uppercase">路段实时指数图</span>
                                    </div>
                                </div>
                                <div class="portlet-body form h470" id="ldsszst">
图表1
                                </div>
                                <div id="ldsszsBg" class="portlet-body form h470" style="position:absolute;top:60px;left:40px;width:561px;display:none">
                                	<table class="table table-striped table-bordered table-hover order-column" id="sample_1">
										<thead>
											<tr class="bg-blue2 font-white">
												<th style="text-align:center;">时间</th>
												<th style="text-align:center;">指数</th>
												<th style="text-align:center;">预测</th>
											</tr>						
										</thead>
										<tbody>
											<tr ng-repeat="item in ldsszsData">
												<td>{{item.XSSJ}}</td>
												<td>{{item.TRAFFICINDEX}}</td>
												<td>{{item.PREINDEX}}</td>
											</tr>
										</tbody>
									</table>
                                </div>
                            </div>
						</div>
						<div class="col-md-4 h520">
							<div class="portlet light bordered ptb0" style="height:530px;">
                                <div class="portlet-title">
                                	<div id="ldsszsSdButton" class="ax_default icon normal" style="position: absolute;left: 550px;top: 15px;width: 24px;height: 20px;cursor:pointer;">
								        <img id="u3158_img" class="img" src="<%=request.getContextPath()%>/public/assets/img/u1886.png" />
								        <div id="u3159" class="text" style="display: none; visibility: hidden">
								          <p id="cache2"><span style="font-family: &quot;微软雅黑 Regular&quot;, 微软雅黑;" id="cache3"></span></p>
								        </div>
								    </div>
								    <div id="u3160" class="ax_default icon normal" style="cursor:pointer;position: absolute;left: 585px;top: 15px;width: 24px;height: 20px;" onclick="javascript:method1('sample_2')">
										<img id="u3160_img" class="img" src="/trafficIndex_web/public/assets/img/u1888.png">
										<!-- Unnamed () -->
										<div id="u3161" class="text" style="display: none; visibility: hidden">
											<p id="cache4"><span style="font-family: &quot;微软雅黑 Regular&quot;, 微软雅黑;" id="cache5"></span></p>
										</div>
									</div>
                                    <div class="caption">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject font-dark sbold uppercase">实时速度统计</span>
                                    </div>
                                </div>
                                <div class="portlet-body form h470" id="ldsssdTj">
图表2
                                </div>
                                 <div id="ldsszsSdBg" class="portlet-body form h470" style="position:absolute;top:60px;left:40px;width:561px;display:none">
                                 	<table class="table table-striped table-bordered table-hover order-column" id="sample_2">
										<thead>
											<tr class="bg-blue2 font-white">
												<th style="text-align:center;">时间</th>
												<th style="text-align:center;">速度(km/h)</th>
											</tr>											
										</thead>
										<tbody>
											<tr ng-repeat="item in ldsszsData">
												<td>{{item.XSSJ}}</td>
												<td>{{item.AVAGESPEED}}</td>
											</tr>
										</tbody>
									</table>
                                 </div>
                            </div>
						</div>
						<div class="col-md-4 h520">
							<div class="portlet light bordered ptb0" style="height:530px;">
                                <div class="portlet-title">
                                <div id="ldsszsLlButton" class="ax_default icon normal" style="position: absolute;left: 550px;top: 15px;width: 24px;height: 20px;cursor:pointer;">
							        <img id="u3158_img" class="img" src="<%=request.getContextPath()%>/public/assets/img/u1886.png" />
							        <div id="u3159" class="text" style="display: none; visibility: hidden">
							          <p id="cache2"><span style="font-family: &quot;微软雅黑 Regular&quot;, 微软雅黑;" id="cache3"></span></p>
							        </div>
							    </div>
							    <div id="u3160" class="ax_default icon normal" style="cursor:pointer;position: absolute;left: 585px;top: 15px;width: 24px;height: 20px;" onclick="javascript:method1('sample_3')">
									<img id="u3160_img" class="img" src="/trafficIndex_web/public/assets/img/u1888.png">
									<!-- Unnamed () -->
									<div id="u3161" class="text" style="display: none; visibility: hidden">
										<p id="cache4"><span style="font-family: &quot;微软雅黑 Regular&quot;, 微软雅黑;" id="cache5"></span></p>
									</div>
								</div>
                                <div class="caption">
                                    <i class="icon-settings font-dark"></i>
                                    <span class="caption-subject font-dark sbold uppercase">实时流量统计</span>
                                </div>
                                </div>
                                <div class="portlet-body form h470" id="ldsssdLl">
图表3
                                </div>
                                <div id="ldsszsLlBg" class="portlet-body form h470" style="position:absolute;top:60px;left:40px;width:561px;display:none">
                                	<table class="table table-striped table-bordered table-hover order-column" id="sample_3">
										<thead>
											<tr class="bg-blue2 font-white">
												<th style="text-align:center;">时间</th>
												<th style="text-align:center;">流量(pch/h)</th>
											</tr>											
										</thead>
										<tbody>
											<tr ng-repeat="item in ldsszsData">
												<td>{{item.XSSJ}}</td>
												<td>{{item.LL}}</td>
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

