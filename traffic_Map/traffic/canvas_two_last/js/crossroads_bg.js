
// example
// 画布ID，【北，西，南，东】车道数【=0时车道不存在，为T型路口】
// XSFX 行驶方向 0:直行 1：左转 2：右转 3:直行加左转 4:直行加右转 5:左转加右转 6:直行加左转加右转
// [行驶方向，车辆数量，箭头颜色]1：红色，2：橙色，3：黄色，4：浅绿色，5：绿色
// 车道数横向是从左往右，纵向是自上而下排序
// 图片命名【方向+行驶方向+颜色】
// var n = {'1':[1,100,1],'2':[0,5,2],'3':[0,55,3],'4':[0,8,4]};
// var w = {'1':[0,1,1],'2':[1,6,2],'3':[2,334,3],'4':[3,77,4]};
// var s = {'1':[0,109,1],'2':[1,88,2],'3':[2,2,3],'4':[3,66,4]};
// var e = {'1':[0,10,1],'2':[1,99,2],'3':[2,1,3],'4':[3,4,4],'5':[4,66,5]};	
// 索引顺序，车道数量{n,w,s,e}[=0时，为T型路口]，div面板ID，面板宽度[最小480]，车道信息[n,w,s,e]
//	createIS(1,{'road':[0,3,3,3]},'cross',800,n,w,s,e);
function createIS(index_,car_roads,cross_id,w,n_info,w_info,s_info,e_info){
	// 绿化带宽度
	 var green_tree_width = 10;
 
	// 平均车道的宽，用于确认中心十字路口的宽高25
	var max_one_width = car_road_width(car_roads,w,green_tree_width);
	// 一个方向单向的路面宽度150
	var half_width = direction_width_half(w,green_tree_width);
	// 人行道的高度
	var people_road_height = 25;
	//  车道和人行道中间的空白
	var people_road_height_vs_car_road_middle = 10;
	// 图片高度
	var car_direction_arrow_image_h = 40;
	// 图片宽度
	var img_w = 18;
	// 文字的高度
	var t_h_ = (half_width-people_road_height-people_road_height_vs_car_road_middle*3-car_direction_arrow_image_h);
	// 四个圆角美化边框宽度
	var beautiful_border = 10;
	
		
	$("#"+cross_id).append("<div id=\"i_s_"+index_+"\" style=\"width:"+w+"px; height:"+w+"px; position:relative;float:left;margin:5px;background:url(img/1.png); font-size:12px; \"></div>");
		
		
	/////////////////////////////////////////// 北
	// 北方向右边车道数量
	var n_car_road = car_roads['road'][0];
	if(n_car_road > 0){
		// 上面 左边车道
		$("#i_s_"+index_).append("<div id=\"i_s_top_left_n_"+index_+"\" style=\"width:"+half_width+"px; height:"+half_width+"px; left:"+half_width+"px; position:absolute;\"></div>");
		// 上面 左边车道上
		$("#i_s_top_left_n_"+index_).append("<div id=\"i_n_c_"+index_+"\" style=\"width:"+half_width+"px; height:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; left:0px; position:absolute;\"></div>");
		
		// 北方向单一车道宽度
		var n_one_road_width = half_width/n_car_road;
		for(var n_c_r=0;n_c_r<n_car_road;n_c_r++){
		    // 一个车道
			$("#i_n_c_"+index_).append("<div id=\"i_n_c_r_"+index_+"road_"+n_c_r+"\" style=\"width:"+(n_one_road_width-1)+"px; height:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-left:1px solid #FFFFFF;left:"+(n_one_road_width*n_c_r)+"px; position:absolute; background:url(img/3.png);\"></div>");
			// 车道显示指数数量
			$("#i_n_c_r_"+index_+"road_"+n_c_r).append("<div id=\"i_n_c_t_"+index_+"road_"+n_c_r+"\"  style=\"width:"+n_one_road_width+"px; height:"+t_h_+"px; left:0px; position:absolute; color:#FFFFFF;\"></div>");
			// 指数文本
			$("#i_n_c_t_"+index_+"road_"+n_c_r).append("<div style=\"width:"+n_one_road_width+"px;text-align: center; height:20px;  position:absolute; color:#FFFFFF;bottom:0;\">"+n_info[n_c_r+1][1]+"</div>");
			// 间隔
			$("#i_n_c_r_"+index_+"road_"+n_c_r).append("<div style=\"width:"+n_one_road_width+"px; height:"+people_road_height_vs_car_road_middle+"px; top:"+t_h_+"px; position:absolute;\"></div>");
			// 车道方向图片DIV
			$("#i_n_c_r_"+index_+"road_"+n_c_r).append("<div id=\"i_n_c_img_"+index_+"road_"+n_c_r+"\" style=\"width:"+n_one_road_width+"px; height:"+car_direction_arrow_image_h+"px; top:"+(t_h_+people_road_height_vs_car_road_middle)+"px; position:absolute; \"></div>");
			// 车道方向图片
			$("#i_n_c_img_"+index_+"road_"+n_c_r).append("<img src=\"img/n"+n_info[n_c_r+1][0]+n_info[n_c_r+1][2]+".png\" height=\""+car_direction_arrow_image_h+"\" style=\"width:"+n_one_road_width+"px;text-align: center; \" />");
			// 间隔
			$("#i_n_c_r_"+index_+"road_"+n_c_r).append("<div style=\"width:"+n_one_road_width+"px; height:"+(people_road_height_vs_car_road_middle-1)+"px; top:"+(half_width-people_road_height-people_road_height_vs_car_road_middle*2)+"px;position:absolute;border-bottom:1px solid #FFFFFF;\"></div>");
		}
		
			// 上面 左边车道中
		   $("#i_s_top_left_n_"+index_).append("<div style=\"width:"+half_width+"px; height:"+(people_road_height_vs_car_road_middle)+"px; left:0px; top:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		   // 上面 左边车道下
		   $("#i_s_top_left_n_"+index_).append("<div style=\"width:"+half_width+"px; height:"+people_road_height+"px; left:0px; top:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2.png);\"></div>");
		 
		  
		 // 上面_中 绿化带
		 $("#i_s_"+index_).append("<div id=\"i_s_top_middle_"+index_+"\"  style=\"width:"+green_tree_width+"px; height:"+half_width+"px; left:"+(half_width*2)+"px; position:absolute; background:url(img/5.png);\"></div>");
		 // 上面_右
		 $("#i_s_"+index_).append("<div id=\"i_s_top_right_"+index_+"\"  style=\"width:"+half_width+"px; height:"+half_width+"px; left:"+(half_width*2+green_tree_width)+"px; position:absolute;\"></div>");
		 for(var n_c_r=0;n_c_r<n_car_road;n_c_r++){
			 $("#i_s_top_right_"+index_).append("<div style=\"width:"+(n_one_road_width-1)+"px; height:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-right:1px solid #FFFFFF;left:"+(n_one_road_width*n_c_r)+"px; position:absolute; background:url(img/3.png);\"></div>");
		 }
		  // 车道和人行道中间的空白
		  $("#i_s_top_right_"+index_).append("<div style=\"width:"+half_width+"px; height:"+people_road_height_vs_car_road_middle+"px; left:0px; top:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		  // 人行道白线
		  $("#i_s_top_right_"+index_).append("<div style=\"width:"+half_width+"px; height:"+people_road_height+"px; left:0px; top:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2.png);\"></div>");	 
	}
		 
		 /////////////////////////////////////////// 南
		 // 北方向右边车道数量
		var s_car_road = car_roads['road'][2];
		if(s_car_road > 0){
		// 下面 左边车道
		$("#i_s_"+index_).append("<div id=\"i_s_bottom_left_s_"+index_+"\" style=\"width:"+half_width+"px; height:"+half_width+"px; left:"+(half_width*2+green_tree_width)+"px; position:absolute; bottom:0px;\"></div>");
		// 上面 左边车道上
		$("#i_s_bottom_left_s_"+index_).append("<div id=\"i_s_c_"+index_+"\" style=\"width:"+half_width+"px; height:"+(half_width)+"px; left:0px; position:absolute;\"></div>");
		
		// 北方向单一车道宽度
		var s_one_road_width = half_width/s_car_road;
		for(var s_c_r=0;s_c_r<s_car_road;s_c_r++){
		    // 一个车道
			$("#i_s_c_"+index_).append("<div id=\"i_s_c_r_"+index_+"road_"+s_c_r+"\" style=\"width:"+(s_one_road_width-1)+"px; height:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-right:1px solid #FFFFFF;left:"+(s_one_road_width*s_c_r)+"px; position:absolute; background:url(img/3.png);bottom:0px;\"></div>");
			// 车道显示指数数量
			$("#i_s_c_r_"+index_+"road_"+s_c_r).append("<div id=\"i_s_c_t_"+index_+"road_"+s_c_r+"\"  style=\"width:"+s_one_road_width+"px; height:"+t_h_+"px; left:0px;bottom:0px; position:absolute; color:#FFFFFF;\"></div>");
			// 指数文本
			$("#i_s_c_t_"+index_+"road_"+s_c_r).append("<div style=\"width:"+s_one_road_width+"px;text-align: center; height:20px; left:0px; position:absolute; color:#FFFFFF;\">"+s_info[s_c_r+1][1]+"</div>");
			// 间隔
			$("#i_s_c_r_"+index_+"road_"+s_c_r).append("<div style=\"width:"+s_one_road_width+"px; height:"+people_road_height_vs_car_road_middle+"px; bottom:"+t_h_+"px; position:absolute;\"></div>");
			// 车道方向图片DIV
			$("#i_s_c_r_"+index_+"road_"+s_c_r).append("<div id=\"i_s_c_img_"+index_+"road_"+s_c_r+"\" style=\"width:"+s_one_road_width+"px; height:"+car_direction_arrow_image_h+"px; bottom:"+(t_h_+people_road_height_vs_car_road_middle)+"px; position:absolute; \"></div>");
			// 车道方向图片
			$("#i_s_c_img_"+index_+"road_"+s_c_r).append("<img src=\"img/s"+s_info[s_c_r+1][0]+s_info[s_c_r+1][2]+".png\" height=\""+car_direction_arrow_image_h+"\" style=\"width:"+n_one_road_width+"px;text-align: center; \" />");
			// 间隔
			$("#i_s_c_r_"+index_+"road_"+s_c_r).append("<div style=\"width:"+s_one_road_width+"px; height:"+(people_road_height_vs_car_road_middle-1)+"px; bottom:"+(half_width-people_road_height-people_road_height_vs_car_road_middle*2)+"px;position:absolute;border-top:1px solid #FFFFFF;\"></div>");
		}
			// 车道和人行道中间的空白
		   $("#i_s_bottom_left_s_"+index_).append("<div style=\"width:"+half_width+"px; height:"+(people_road_height_vs_car_road_middle)+"px; left:0px; bottom:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		   // 人行道白线
		   $("#i_s_bottom_left_s_"+index_).append("<div style=\"width:"+half_width+"px; height:"+people_road_height+"px; left:0px; bottom:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2.png);\"></div>");
		   	 // 上面_中 绿化带
		 $("#i_s_"+index_).append("<div id=\"i_s_bottom_middle_"+index_+"\"  style=\"width:"+green_tree_width+"px; height:"+half_width+"px; left:"+(half_width*2)+"px; position:absolute;bottom:0px; background:url(img/5.png);\"></div>");
		 // 上面_右
		 $("#i_s_"+index_).append("<div id=\"i_s_bottom_right_"+index_+"\"  style=\"width:"+half_width+"px; height:"+half_width+"px; left:"+(half_width)+"px; bottom:0px;position:absolute;\"></div>");
		 for(var s_c_r=0;s_c_r<s_car_road;s_c_r++){
			 $("#i_s_bottom_right_"+index_).append("<div style=\"width:"+(s_one_road_width-1)+"px; height:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-left:1px solid #FFFFFF;left:"+(s_one_road_width*s_c_r)+"px; position:absolute; background:url(img/3.png);bottom:0px;\"></div>");
		 }
		  // 车道和人行道中间的空白
		  $("#i_s_bottom_right_"+index_).append("<div style=\"width:"+half_width+"px; height:"+people_road_height_vs_car_road_middle+"px; left:0px; bottom:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		  // 人行道白线
		  $("#i_s_bottom_right_"+index_).append("<div style=\"width:"+half_width+"px; height:"+people_road_height+"px; left:0px; bottom:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2.png);\"></div>");
}
		 
	
		 /////////////////////////////////////////// 西
		 // 北方向右边车道数量
		var w_car_road = car_roads['road'][1];
		 if(w_car_road > 0){
		// 下面 左边车道
		$("#i_s_"+index_).append("<div id=\"i_s_left_left_w_"+index_+"\" style=\"width:"+half_width+"px; height:"+half_width+"px; top:"+(half_width*2+green_tree_width)+"px; position:absolute; left:0px;\"></div>");
		// 上面 左边车道上
		$("#i_s_left_left_w_"+index_).append("<div id=\"i_w_c_"+index_+"\" style=\"width:"+half_width+"px; height:"+(half_width)+"px; top:"+(0)+"px; left:0px; position:absolute;\"></div>");
		
		// 北方向单一车道宽度
		var w_one_road_width = half_width/w_car_road;
		for(var w_c_r=0;w_c_r<w_car_road;w_c_r++){
		    // 一个车道
			$("#i_w_c_"+index_).append("<div id=\"i_w_c_r_"+index_+"road_"+w_c_r+"\" style=\"height:"+(w_one_road_width-1)+"px; width:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-bottom:1px solid #FFFFFF;top:"+(w_one_road_width*w_c_r)+"px; position:absolute; background:url(img/3.png);bottom:0px;\"></div>");
			// 车道显示指数数量
			$("#i_w_c_r_"+index_+"road_"+w_c_r).append("<div id=\"i_w_c_t_"+index_+"road_"+w_c_r+"\"  style=\"height:"+w_one_road_width+"px; width:"+t_h_+"px; left:0px;top:0px; position:absolute; color:#FFFFFF;\"></div>");
			// 指数文本
			$("#i_w_c_t_"+index_+"road_"+w_c_r).append("<div style=\"height:"+w_one_road_width+"px;text-align: center; height:"+w_one_road_width+"px; line-height:"+w_one_road_width+"px; right:0px; position:absolute; color:#FFFFFF;\">"+w_info[w_c_r+1][1]+"</div>");
			// 间隔
			$("#i_w_c_r_"+index_+"road_"+w_c_r).append("<div style=\"height:"+w_one_road_width+"px; width:"+people_road_height_vs_car_road_middle+"px; left:"+t_h_+"px; position:absolute;\"></div>");
			// 车道方向图片DIV
			$("#i_w_c_r_"+index_+"road_"+w_c_r).append("<div id=\"i_w_c_img_"+index_+"road_"+w_c_r+"\" style=\"height:"+w_one_road_width+"px; width:"+car_direction_arrow_image_h+"px; left:"+(t_h_+people_road_height_vs_car_road_middle)+"px; position:absolute; \"></div>");
			// 车道方向图片
			$("#i_w_c_img_"+index_+"road_"+w_c_r).append("<img src=\"img/w"+w_info[w_c_r+1][0]+w_info[w_c_r+1][2]+".png\"  width=\""+car_direction_arrow_image_h+"\" style=\"height:"+w_one_road_width+"px; line-height:"+w_one_road_width+"px;\" />");
			// 间隔
			$("#i_w_c_r_"+index_+"road_"+w_c_r).append("<div style=\"height:"+w_one_road_width+"px; width:"+(people_road_height_vs_car_road_middle-1)+"px; left:"+(half_width-people_road_height-people_road_height_vs_car_road_middle*2)+"px;position:absolute;border-right:1px solid #FFFFFF;\"></div>");
		}
			// 车道和人行道中间的空白
		   $("#i_s_left_left_w_"+index_).append("<div style=\"height:"+half_width+"px; width:"+(people_road_height_vs_car_road_middle)+"px; top:0px; left:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		   // 人行道白线
		   $("#i_s_left_left_w_"+index_).append("<div style=\"height:"+half_width+"px; width:"+people_road_height+"px; top:0px; left:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2h.png);\"></div>");
		   	 // 上面_中 绿化带
		 $("#i_s_"+index_).append("<div id=\"i_s_left_middle_"+index_+"\" style=\"height:"+green_tree_width+"px;width:"+half_width+"px; top:"+(half_width*2)+"px; position:absolute;left:0px; background:url(img/6.png);\"></div>");
		 // 上面_右
		 $("#i_s_"+index_).append("<div id=\"i_s_left_right_"+index_+"\"  style=\"width:"+half_width+"px; height:"+half_width+"px; top:"+(half_width)+"px; left:0px;position:absolute;\"></div>");
		 for(var w_c_r=0;w_c_r<w_car_road;w_c_r++){
			 $("#i_s_left_right_"+index_).append("<div style=\"height:"+(w_one_road_width-1)+"px; width:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-top:1px solid #FFFFFF;top:"+(w_one_road_width*w_c_r)+"px; position:absolute; background:url(img/3.png);bottom:0px;\"></div>");
		 }
		  // 车道和人行道中间的空白
		  $("#i_s_left_right_"+index_).append("<div style=\"height:"+half_width+"px; width:"+people_road_height_vs_car_road_middle+"px; top:0px; left:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		  // 人行道白线
		  $("#i_s_left_right_"+index_).append("<div style=\"height:"+half_width+"px; width:"+people_road_height+"px; top:0px; left:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2h.png);\"></div>");
}
		 
		  /////////////////////////////////////////// 东
		  // 北方向右边车道数量
		var e_car_road = car_roads['road'][3];
		 if(e_car_road > 0){		
		// 下面 左边车道
		$("#i_s_"+index_).append("<div id=\"i_s_right_left_e_"+index_+"\" style=\"width:"+half_width+"px; height:"+half_width+"px; top:"+(half_width)+"px; position:absolute; right:0px;\"></div>");
		// 上面 左边车道上
		$("#i_s_right_left_e_"+index_).append("<div id=\"i_e_c_"+index_+"\" style=\"width:"+half_width+"px; height:"+(half_width)+"px; top:"+(0)+"px; right:0px; position:absolute;\"></div>");
		
		// 北方向单一车道宽度
		var e_one_road_width = half_width/e_car_road;
		for(var e_c_r=0;e_c_r<e_car_road;e_c_r++){
		    // 一个车道
			$("#i_e_c_"+index_).append("<div id=\"i_e_c_r_"+index_+"road_"+e_c_r+"\" style=\"height:"+(e_one_road_width-1)+"px; width:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-top:1px solid #FFFFFF;top:"+(e_one_road_width*e_c_r)+"px; position:absolute; background:url(img/3.png);right:0px;\"></div>");
			// 车道显示指数数量
			$("#i_e_c_r_"+index_+"road_"+e_c_r).append("<div id=\"i_e_c_t_"+index_+"road_"+e_c_r+"\"  style=\"height:"+e_one_road_width+"px; width:"+t_h_+"px; right:0px;top:0px; position:absolute; color:#FFFFFF;\"></div>");
			// 指数文本
			$("#i_e_c_t_"+index_+"road_"+e_c_r).append("<div style=\"height:"+e_one_road_width+"px;text-align: center; height:"+e_one_road_width+"px; line-height:"+e_one_road_width+"px; left:0px; position:absolute; color:#FFFFFF;\">"+e_info[e_c_r+1][1]+"</div>");
			// 间隔
			$("#i_e_c_r_"+index_+"road_"+e_c_r).append("<div style=\"height:"+e_one_road_width+"px; width:"+people_road_height_vs_car_road_middle+"px; right:"+t_h_+"px; position:absolute;\"></div>");
			// 车道方向图片DIV
			$("#i_e_c_r_"+index_+"road_"+e_c_r).append("<div id=\"i_e_c_img_"+index_+"road_"+e_c_r+"\" style=\"height:"+e_one_road_width+"px; width:"+car_direction_arrow_image_h+"px; right:"+(t_h_+people_road_height_vs_car_road_middle)+"px; position:absolute; \"></div>");
			// 车道方向图片
			$("#i_e_c_img_"+index_+"road_"+e_c_r).append("<img src=\"img/e"+e_info[e_c_r+1][0]+e_info[e_c_r+1][2]+".png\"  width=\""+car_direction_arrow_image_h+"\" style=\"height:"+e_one_road_width+"px; line-height:"+e_one_road_width+"px;\" />");
			// 间隔
			$("#i_e_c_r_"+index_+"road_"+e_c_r).append("<div style=\"height:"+e_one_road_width+"px; width:"+(people_road_height_vs_car_road_middle-1)+"px; right:"+(half_width-people_road_height-people_road_height_vs_car_road_middle*2)+"px;position:absolute;border-left:1px solid #FFFFFF;\"></div>");
		}
			// 车道和人行道中间的空白
		   $("#i_s_right_left_e_"+index_).append("<div style=\"height:"+half_width+"px; width:"+(people_road_height_vs_car_road_middle)+"px; top:0px; right:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		   // 人行道白线
		   $("#i_s_right_left_e_"+index_).append("<div style=\"height:"+half_width+"px; width:"+people_road_height+"px; top:0px; right:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2h.png);\"></div>");
		   	 // 上面_中 绿化带
		 $("#i_s_"+index_).append("<div id=\"i_s_right_middle_"+index_+"\" style=\"height:"+green_tree_width+"px;width:"+half_width+"px; top:"+(half_width*2)+"px; position:absolute;right:0px; background:url(img/6.png);\"></div>");
		 // 上面_右
		 $("#i_s_"+index_).append("<div id=\"i_s_right_right_"+index_+"\"  style=\"width:"+half_width+"px; height:"+half_width+"px; top:"+(half_width*2+green_tree_width)+"px; right:0px;position:absolute;\"></div>");
		 for(var e_c_r=0;e_c_r<e_car_road;e_c_r++){
			 $("#i_s_right_right_"+index_).append("<div style=\"height:"+(e_one_road_width-1)+"px; width:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px;border-bottom:1px solid #FFFFFF;top:"+(e_one_road_width*e_c_r)+"px; position:absolute; background:url(img/3.png);right:0px;\"></div>");
		 }
		  // 车道和人行道中间的空白
		  $("#i_s_right_right_"+index_).append("<div style=\"height:"+half_width+"px; width:"+people_road_height_vs_car_road_middle+"px; top:0px; right:"+(half_width-people_road_height-people_road_height_vs_car_road_middle)+"px; position:absolute; background:url(img/3.png);\"></div>");
		  // 人行道白线
		  $("#i_s_right_right_"+index_).append("<div style=\"height:"+half_width+"px; width:"+people_road_height+"px; top:0px; right:"+(half_width-people_road_height)+"px; position:absolute; background:url(img/2h.png);\"></div>");
}

		// 十字路口中心
		$("#i_s_"+index_).append("<div style=\"width:"+(half_width*2+green_tree_width)+"px; height:"+(half_width*2+green_tree_width)+"px; top:"+(half_width)+"px; left:"+(half_width)+"px; position:absolute; background:url(img/3.png);\"></div>");
		
		
		
		// T型路口美化
		// 四个角的填充
		if(n_car_road > 0 && w_car_road > 0&& s_car_road > 0&& e_car_road > 0 ){
			
		// 左上角圆角填充
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_left"+index_+"\" style=\"width:"+(half_width)+"px; height:"+(half_width)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute;\"></div>");
			$("#i_s_b_radius_top_left"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; right:"+(0)+"px; bottom:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
			$("#i_s_b_radius_top_left"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-left:none;border-top:none;border-bottom-right-radius: 20px;\"></div>");
		// 右上角圆角填充
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_right"+index_+"\" style=\"width:"+(half_width)+"px; height:"+(half_width)+"px; top:"+(0)+"px; right:"+(0)+"px; position:absolute;\"></div>");
			$("#i_s_b_radius_top_right"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; left:"+(0)+"px; bottom:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
			$("#i_s_b_radius_top_right"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; right:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-right:none;border-top:none;border-bottom-left-radius: 20px;\"></div>");
			// 左下角圆角填充
		$("#i_s_"+index_).append("<div id=\"i_s_b_radius_bottom_left"+index_+"\" style=\"width:"+(half_width+1)+"px; height:"+(half_width)+"px; bottom:"+(0)+"px; left:"+(0)+"px; position:absolute;\"></div>");
		$("#i_s_b_radius_bottom_left"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; right:"+(0)+"px; top:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
		$("#i_s_b_radius_bottom_left"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; right:"+(0)+"px; bottom:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-left:none;border-bottom:none;border-top-right-radius: 20px;\"></div>");
		
		// 右下角圆角填充
		$("#i_s_"+index_).append("<div id=\"i_s_b_radius_bottom_right"+index_+"\" style=\"width:"+(half_width+1)+"px; height:"+(half_width)+"px; bottom:"+(0)+"px; right:"+(0)+"px; position:absolute;\"></div>");
		$("#i_s_b_radius_bottom_right"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; left:"+(0)+"px; top:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
		$("#i_s_b_radius_bottom_right"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; left:"+(0)+"px; top:"+(-1)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-right:none;border-bottom:none;border-top-left-radius: 20px;\"></div>");
		}
		// 北方无车道
		if(n_car_road == 0){
		
		$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_left_and_top_right_"+index_+"\" style=\"width:"+(w)+"px; height:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute; border-bottom:"+(beautiful_border+1)+"px solid #FFFFFF;\"></div>");
			// 左下角圆角填充
		$("#i_s_"+index_).append("<div id=\"i_s_b_radius_bottom_left"+index_+"\" style=\"width:"+(half_width+1)+"px; height:"+(half_width)+"px; bottom:"+(0)+"px; left:"+(0)+"px; position:absolute;\"></div>");
		$("#i_s_b_radius_bottom_left"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; right:"+(0)+"px; top:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
		$("#i_s_b_radius_bottom_left"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; right:"+(0)+"px; bottom:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-left:none;border-bottom:none;border-top-right-radius: 20px;\"></div>");
		
		// 右下角圆角填充
		$("#i_s_"+index_).append("<div id=\"i_s_b_radius_bottom_right"+index_+"\" style=\"width:"+(half_width+1)+"px; height:"+(half_width)+"px; bottom:"+(0)+"px; right:"+(0)+"px; position:absolute;\"></div>");
		$("#i_s_b_radius_bottom_right"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; left:"+(0)+"px; top:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
		$("#i_s_b_radius_bottom_right"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; left:"+(0)+"px; top:"+(-1)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-right:none;border-bottom:none;border-top-left-radius: 20px;\"></div>");
		}
		// 西方无车道
		if(w_car_road == 0){
		
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_left_and_bottom_left_"+index_+"\" style=\"height:"+(w)+"px; width:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute; border-right:"+(beautiful_border+1)+"px solid #FFFFFF;\"></div>");
		// 右上角圆角填充
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_right"+index_+"\" style=\"width:"+(half_width)+"px; height:"+(half_width)+"px; top:"+(0)+"px; right:"+(0)+"px; position:absolute;\"></div>");
			$("#i_s_b_radius_top_right"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; left:"+(0)+"px; bottom:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
			$("#i_s_b_radius_top_right"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; right:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-right:none;border-top:none;border-bottom-left-radius: 20px;\"></div>");
		
		// 右下角圆角填充
		$("#i_s_"+index_).append("<div id=\"i_s_b_radius_bottom_right"+index_+"\" style=\"width:"+(half_width+1)+"px; height:"+(half_width)+"px; bottom:"+(0)+"px; right:"+(0)+"px; position:absolute;\"></div>");
		$("#i_s_b_radius_bottom_right"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; left:"+(0)+"px; top:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
		$("#i_s_b_radius_bottom_right"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; left:"+(0)+"px; top:"+(-1)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-right:none;border-bottom:none;border-top-left-radius: 20px;\"></div>");
		}
		// 南方无车道
		if(s_car_road == 0){
		
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_bottom_left_and_bottom_right_"+index_+"\" style=\"width:"+(w)+"px; height:"+(half_width-beautiful_border)+"px; bottom:"+(0)+"px; left:"+(0)+"px; position:absolute; border-top:"+(beautiful_border+1)+"px solid #FFFFFF;\"></div>");
		// 左上角圆角填充
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_left"+index_+"\" style=\"width:"+(half_width)+"px; height:"+(half_width)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute;\"></div>");
			$("#i_s_b_radius_top_left"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; right:"+(0)+"px; bottom:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
			$("#i_s_b_radius_top_left"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-left:none;border-top:none;border-bottom-right-radius: 20px;\"></div>");
		// 右上角圆角填充
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_right"+index_+"\" style=\"width:"+(half_width)+"px; height:"+(half_width)+"px; top:"+(0)+"px; right:"+(0)+"px; position:absolute;\"></div>");
			$("#i_s_b_radius_top_right"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; left:"+(0)+"px; bottom:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
			$("#i_s_b_radius_top_right"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; right:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-right:none;border-top:none;border-bottom-left-radius: 20px;\"></div>");
		}
		// 东方无车道
		if(e_car_road == 0){
		
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_right_and_bottom_right_"+index_+"\" style=\"height:"+(w)+"px; width:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; right:"+(0)+"px; position:absolute; border-left:"+(beautiful_border+1)+"px solid #FFFFFF;\"></div>");
		// 左上角圆角填充
			$("#i_s_"+index_).append("<div id=\"i_s_b_radius_top_left"+index_+"\" style=\"width:"+(half_width)+"px; height:"+(half_width)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute;\"></div>");
			$("#i_s_b_radius_top_left"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; right:"+(0)+"px; bottom:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
			$("#i_s_b_radius_top_left"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; top:"+(0)+"px; left:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-left:none;border-top:none;border-bottom-right-radius: 20px;\"></div>");
			// 左下角圆角填充
		$("#i_s_"+index_).append("<div id=\"i_s_b_radius_bottom_left"+index_+"\" style=\"width:"+(half_width+1)+"px; height:"+(half_width)+"px; bottom:"+(0)+"px; left:"+(0)+"px; position:absolute;\"></div>");
		$("#i_s_b_radius_bottom_left"+index_).append("<div style=\"width:"+(beautiful_border)+"px; height:"+(beautiful_border)+"px; right:"+(0)+"px; top:"+(0)+"px; position:absolute; background:url(img/3.png);\"></div>");
		$("#i_s_b_radius_bottom_left"+index_).append("<div style=\"width:"+(half_width-beautiful_border)+"px; height:"+(half_width-beautiful_border)+"px; right:"+(0)+"px; bottom:"+(0)+"px; position:absolute; border:"+(beautiful_border+1)+"px solid #FFFFFF; border-left:none;border-bottom:none;border-top-right-radius: 20px;\"></div>");
		}
		
		// 指南针
		var n_x_y = (half_width-60)/2;
		$("#i_s_"+index_).append("<div style=\"width:60px; height:75px; top:"+(0)+"px; right:"+(n_x_y)+"px; position:absolute; background:url(img/0.png);text-align: center;\"></div>");
		
 }
 // 最多车道的宽度
 function car_road_width(car_roads,w,green_tree_width){
	var roads = Math.max.apply(null,car_roads['road']);
	var road = (w - green_tree_width)/4/roads;
	return road;
 }
 // 一个方向单向的路面宽度
 function direction_width_half(w,green_tree_width){
	var road = (w - green_tree_width)/4;
	return road;
 }
 
function strToJson(str){ 
var json = eval('(' + str + ')'); 
return json; 
} 

function getCarRoad(aa, index_){
// 车道的数量=aa['data']['1']['list'].length
var car_road_temp = "";
var cars_size = aa['data'][index_]['list'].length;
for(var a=0;a<cars_size;a++){
	 car_road_temp += "'"+aa['data'][index_]['list'][a]['roadnum']+"'"+":["+aa['data'][index_]['list'][a]['XSFX']+","+aa['data'][index_]['list'][a]['CDLL']+","+(parseInt(aa['data'][index_]['list'][a]['CROSSINDEX'])+1)+"]";
	 if(a<cars_size-1){
	 	car_road_temp +=",";
	 }

}
var car_road_temp_arr = "{"+car_road_temp+"}";
var n = strToJson(car_road_temp_arr);
return n;	
}