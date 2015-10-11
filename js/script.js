$(document).ready(function() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	var raf;

	// Paddle
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
	};

	// Ball
	var Ball = function(x, y, vx, vy, r, color) {
	  var self = this;
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.vy = vy;
	  this.radius = r;
	  this.color = color;
	  this.draw = function() {
	  	ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.beginPath();
	    ctx.arc(self.x, self.y, r, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.fillStyle = color;
	    ctx.fill();
	  }
	};

	function ballMovement() {
	  pingPong.draw();
	  pingPong.x += pingPong.vx;
	  pingPong.y += pingPong.vy;
	  if (pingPong.y == (canvas.height - 5) || pingPong.y == 5) {
	  	pingPong.vy = pingPong.vy * -1;
	  	pingPong.y += pingPong.vy;
	  }
	  raf = window.requestAnimationFrame(ballMovement);
	}

	// This creates the paddles and the ball with their
	// respective attributes
	var left = new Paddle(10, 0, 20, 150, 'red'),
			right = new Paddle(1170, 0, 20, 150, 'green'),
			pingPong = new Ball(100, 100, 1, 5, 15, 'black');
	left.draw();
	right.draw();
	pingPong.draw();
	ballMovement();
});