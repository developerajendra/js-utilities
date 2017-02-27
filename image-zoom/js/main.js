$(document).ready(function(){

	var imageWidth = 0;
	var imageHeight = 0;

	//Now the mousemove function
	$(".zoom").mousemove(function(e){
		//When the user hovers on the image, the script will first calculate
		//the native dimensions if they don't exist. Only after the native dimensions
		//are available, the script will show the zoomed version.
		if(!imageWidth && !imageHeight)
		{
			//This will create a new image object with the same image as that in .small
			//We cannot directly get the dimensions from .small because of the 
			//width specified to 200px in the html. To get the actual dimensions we have
			//created this image object.
			var image_object = new Image();
			image_object.src = $(".small").attr("src");
			
			//This code is wrapped in the .load function which is important.
			//width and height of the object would return 0 if accessed before 
			//the image gets loaded.
			imageWidth = image_object.width;
			imageHeight = image_object.height;
		}
		else
		{
			//x/y coordinates of the mouse
			//This is the position of .magnify with respect to the document.
			var magnify_offset = $(this).offset();
			//We will deduct the positions of .magnify from the mouse positions with
			//respect to the document to get the mouse positions with respect to the 
			//container(.magnify)
			var moveX = e.pageX - magnify_offset.left;
			var moveY = e.pageY - magnify_offset.top;

			 
			
			//Finally the code to fade out the glass if the mouse is outside the container
			if(moveX < $(this).width() && moveY < $(this).height() && moveX > 0 && moveY > 0)
			{
				$(".large").fadeIn(100);

				//The background position of .large will be changed according to the position
				//of the mouse over the .small image. So we will get the ratio of the pixel
				//under the mouse pointer with respect to the image and use that to position the 
				//large image inside the magnifying glass
				var positionX = Math.round(moveX/$(".small").width()*imageWidth - $(".large").width()/2)*-1;
				var positionY = Math.round(moveY/$(".small").height()*imageHeight - $(".large").height()/2)*-1;
				var bgp = positionX + "px " + positionY + "px";
				
				//Time to move the magnifying glass with the mouse
				var left = moveX - $(".large").width()/2;
				var top = moveY - $(".large").height()/2;
				//Now the glass moves with the mouse
				//The logic is to deduct half of the glass's width and height from the 
				//mouse coordinates to place it with its center at the mouse coordinates
				
				//If you hover on the image now, you should see the magnifying glass in action
				$(".large").css({left: left, top: top, backgroundPosition: bgp});
			 
			}
			else
			{
				$(".large").fadeOut(100);
			}
			 
				
		}
	})
})