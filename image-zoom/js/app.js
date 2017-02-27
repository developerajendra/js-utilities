(function(){

	var zoom  = document.getElementsByClassName("zoom")[0];
	var imageWidth = 0;
	var imageHeight = 0;

		zoom.onmousemove = function(e){

		if(!imageWidth && !imageHeight){

			var image = zoom.getElementsByTagName("img")[0]
			var imageSource = image.getAttribute("src");

			var imageObject = new Image();

			imageObject.setAttribute("src",imageSource);
			
			//Get the image width
			imageWidth  = imageObject.width;
			imageHeight = imageObject.height;

			//set Large UI
			var large = document.getElementsByClassName("large")[0];
			 large.style.backgroundImage = "url(" + imageSource + ")";

		}else{

			//Get mouse pozitions
			var moveX = e.pageX - this.offsetLeft;
			var moveY = e.pageY - this.offsetTop;

			//Get large and small image
			var large = document.getElementsByClassName("large")[0];
			var small = document.getElementsByClassName("small")[0];


			if(moveX < this.clientWidth && moveY < this.clientHeight && moveX > 0 && moveY > 0 ){
				large.style.display = "block";

				var positionX = Math.round(moveX/small.clientWidth * imageWidth - large.clientWidth/2)*-1;
				var positionY = Math.round(moveY/small.clientHeight * imageHeight - large.clientHeight/2)*-1;
				var bgp = positionX + "px " + positionY + "px";
 
				var left = moveX - large.clientWidth / 2;
				var top =  moveY - large.clientHeight / 2;

				large.style.left = left + "px";
				large.style.top = top + "px";
				large.style.backgroundPosition = bgp;

				 
			}else{
				large.style.display = "none";
			}
		}
		

	}

})()