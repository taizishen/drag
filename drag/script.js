function drag(){
	var ox = 0;	// 鼠标按下时拖放对象X坐标值
	var oy = 0; // 鼠标按下时拖放对象Y坐标值
	var mx = 0; // 鼠标按下时鼠标指针X坐标值
	var my = 0; // 鼠标按下时鼠标指针Y坐标值
	
	var object = null;                          // 事件所发生的目标对象
	
	/**
	 * 定义事件对象标准化函数
	 */
	function e(event) {
		if(!event) {    // 兼容IE浏览器
			event = window.event;
			event.target = event.srcElement;
			event.layerX = event.offsetX;
			event.layerY = event.offsetY;
		}
		event.mx = event.pageX || event.clientX + document.body.scrollLeft; // 计算鼠标指针X轴距离
		event.my = event.pageY || event.clientY + document.body.scrollTop;  // 计算鼠标指针Y轴距离
		return event;   // 返回标准化的事件对象
	}
	
	/**
	 * 鼠标事件处理
	 * 按下鼠标，则开始事件的处理
	 */
	document.onmousedown = function(event) {
		event = e(event);
		object = event.target;
		if(object.className == "title") {
			ox = parseInt(object.parentNode.offsetLeft);
			oy = parseInt(object.parentNode.offsetTop); 
			mx = event.mx;
			my = event.my;
			
			document.onmousemove = move;
			document.onmouseup = stop;
		}
	}
	
	/**
	 * 鼠标移动处理函数
	 */
	function move(event) {
		event = e(event);
		object.parentNode.style.left = ox + event.mx - mx + "px";
		object.parentNode.style.top = oy + event.my - my + "px";
	}
	
	/**
	 * 松开鼠标处理函数
	 */
	function stop(event) {
		event = e(event);
		ox = parseInt(object.parentNode.offsetLeft);
		oy = parseInt(object.parentNode.offsetTop);
		mx = event.mx;
		my = event.my;
		object = document.onmousemove = document.onmouseup = null;  // 释放所有操作对象
	}

}drag()