$(document).ready(function() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");

	var Paddle = function(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.draw = function() {
			ctx.fillStyle = color;
			ctx.fillRect(x, y, width, height);
		}
	}

	var Ball = function(x, y, r, color){
	  this.x = x;
	  this.y = y;
	  this.radius = r;
	  this.color = color;
	  this.draw = function() {
	    ctx.beginPath();
	    ctx.arc(x, y, r, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle = color;
	    ctx.fill();
	  }
	};

	var left = new Paddle(10, 0, 20, 150, 'red'),
			right = new Paddle(1170, 0, 20, 150, 'green'),
			pingPong = new Ball(100, 100, 15, 'black');
	left.draw();
	right.draw();
	pingPong.draw();

});