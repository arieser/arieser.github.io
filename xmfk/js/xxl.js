	var useImgs = [];
	for (var i = 0; i < 6 ; i++) {
		var img = new Image();
		img.src = "img/" + i + ".png";
		useImgs.push(img)
	}
	function ms(a){
				console.log(a);
		}	
		function ID (id){
			return document.getElementById(id);
		}
		function block (color,i){
			this.width = width;
			this.color = color ;
			this.down = 0;
			this.left = 0;
			this.x = i%rawNum ;
			this.xx = i%rawNum *width;
			this.display = false;
			this.y = Math.floor( i/rawNum) ;
			this.yy = Math.floor( i/rawNum) *width;
		};
		function create(ctx,block){
			if(block.display)return ;
			ctx.drawImage(useImgs[block.color], block.xx + 1  ,block.yy + 1 ,block.width -2 ,block.width - 2)	
		}
		function createXxl( ctx , arr){
			ctx.clearRect(0,0,400,600);
			for (var i = 0 ; i < arr.length ; i ++){
				var ele =arr[i];
				create(ctx , ele);
			}
		}
		
		var xxl ={
			onload : function(){
				for (var i = 0 ; i < arr.length ; i ++){
					var ele =new block(arr[i] , i);
					xxl.createAry[i] = ele;
				}
				setTimeout(function(){
					createXxl(ctx,xxl.createAry)
				},100)
			},
			isEnd : function (){
				for (var i = 0 ; i < arr.length ; i ++){
					if(xxl.createAry[i].display == false){
						removeElements(xxl.createAry[i],1);
						if (cntNum  > 0){
							cntNum = 0;
							return false;
						}
					}
				}
				return true;
			}
		};
		function willRemove(ele ,locat,hh){
			var ary = ['right','up','down','left'];
			var x = ele.x;
			var y = ele.y;
			switch (locat){
				case 'left':
					if (x > 0){
						x --;	
					}else{
						return ;
					}
					break;
				case 'right':
					if (x < rawNum - 1){
						x ++;	
					}else{
						return ;
					}
					break;
				case 'up':
					if (y > 0){
						y --;
					}else{
						return ;
					}
					break;
				case 'down':
					if (y < rol - 1){
						y ++;	
					}else{
						return ;
					}
					break;
				default:
					break;
			}
			var index = x +y * rawNum;
		if (xxl.createAry[index].display){
			return;
		}
		if(xxl.createAry[index].color == ele.color){
				if(hh){
					cntNum ++;
					return ;
				}
				if(boolNum(index)==true){		
					xxl.createAry[index].display = true;
					for(var i = 0 ;i < y; i++){
						xxl.createAry[x+i*rawNum].down++;
					}
					xxl.deleteAry.push(xxl.createAry[index]);
					for(var i = 0 ; i < ary.length ; i ++){
						willRemove(xxl.createAry[index] , ary[i]);
					}
			 	}
			}
		}
				
			
		
		
		
		function removeElements(ele,hh){
			xxl.deleteAry = [];
			var ary = ['right','up','down','left'];						 
			for(var i = 0 ; i < ary.length ; i ++){
				willRemove(ele,ary[i],hh);
			}
		}
		
		
		
		function getElementByEvent(ev){
			var x = Math.floor( (ev.pageX - canvas.offsetLeft) /width);
			var y = Math.floor( (ev.pageY - canvas.offsetTop)/width);
			if(x<rawNum){
				if (xxl.createAry[x +y * rawNum]){
					var ele = xxl.createAry[x +y * rawNum];
					return ele;
				}
			}
			return false;
		}
		function boolNum (n) {
			if (xxl.deleteAry.length==0)
				return true;
			for(var i = 0 ; i < xxl.deleteAry.length ; i ++){
				if (xxl.createAry[n]==xxl.deleteAry[i])return false;
			}
			return true;
		}
		
		function chageArr( cnt,local ){
			if(local=='down'){
				if(cnt){
					for (var i = 0 ; i < xxl.createAry.length ; i ++){
						if(xxl.createAry[i].down){
							var num =xxl.createAry[i].down;
							xxl.createAry[i].yy += num;
						}
					}
				}else{
					for (var i = xxl.createAry.length - 1 ; i >= 0 ; i --){
						if(xxl.createAry[i].down){
							var num = xxl.createAry[i].down;
							xxl.createAry[i].down = 0;
							if(xxl.createAry[i].display==false){
								var ele =  xxl.createAry[i+num*rawNum];						
								xxl.createAry[i+num*rawNum]=xxl.createAry[i];
								xxl.createAry[i] = ele;
								xxl.createAry[i+num*rawNum].y += num;
							}
						}
					}
				}
			}else{
				if(cnt){
					for (var i = 0 ; i < xxl.createAry.length ; i ++){
						if(xxl.createAry[i].left){
							var num =xxl.createAry[i].left;
							xxl.createAry[i].xx -= num;
						}
					}
				}else{
					for (var i =0 ; i < xxl.createAry.length  ; i ++){
						if(xxl.createAry[i].left){
							var num = xxl.createAry[i].left;
							xxl.createAry[i].left = 0;
							if(xxl.createAry[i].display==false){
								var ele =  xxl.createAry[i-num];						
								xxl.createAry[i-num]=xxl.createAry[i];
								xxl.createAry[i] = ele;
								xxl.createAry[i-num].x -= num;
							}
						}
					}
				}
			}
			
		}
		function dataAry (){
			var ary = [];
			for (var i = 0 ; i < rol *rawNum ; i ++){
				ary.push(Math.floor( Math.random()*10 %colorCnt));
			}
			return ary ;
		}
		function isMove(){
			var  arr = new Array();
			var m ;
			for ( var i = xxl.rawNum - 1; i >= 0 ; i -- ){
				m = 0 ;
				for ( var j = rol - 1; j >= 0 ; j --){
					if(xxl.createAry[i +j *rawNum].display == false ){
						break ;
					}else{
						m ++;
					}
				}
				if (m == rol ) {
					arr.push(i);	
				}
			}
			ms(arr);
			return  arr;
		}
	
		function leftMove (){
			var arr = isMove();
			if(arr.length >0) {
				for (var i = 0 ; i < arr.length ; i ++) {
					for ( var j = xxl.rawNum - 1; j >= arr[i] ; j --){
						for ( var l = rol - 1; l >= 0 ; l --){
							xxl.createAry[j + l *rawNum].left ++;
						}
					}
				}
			}
			xxl.rawNum-=arr.length;
		}
	
	
	
		function timeInterval (local){
			clearInterval(xxl.time);
			xxl.time =	setInterval(function(){
				xxl.cnt ++;	
				chageArr(xxl.cnt,local);
				createXxl(ctx,xxl.createAry);				
				if(xxl.cnt >= width){ 
					xxl.cnt = 0
					var num = xxl.deleteAry.length;
					xxl.code =  parseInt(code.innerHTML);
					xxl.code += num *(2 +2*Math.floor(num / 3));
					code.innerHTML = xxl.code  ;
					chageArr(xxl.cnt,local);
					if(isMove().length==0){	
						if(xxl.isEnd()){
							div.innerHTML ='您的当前分数：';
							end();
						}
						xxl.isActiveEvent = false;
						clearInterval(xxl.time);
						
					}else{
						leftMove();
						local = 'left';
					}
				}
			},10,false);
		}
		function end (){
			var imput = ID('imput');
			imput.id = 'imputClick';
			imput.innerHTML = '点击继续挑战';
			imput.addEventListener('click',function(){
				xxl.isActiveEvent = false ;
				xxl.rawNum = rawNum  ;
				xxl.onload();
				imput.id = 'imput';
				imput.innerHTML = '';
				div.innerHTML ='您的分数为：';
				code.innerHTML = '0';
			},false);
		}
		
