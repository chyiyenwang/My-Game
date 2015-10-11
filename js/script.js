$(document).ready(function() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	var raf;
	var addE = document.addEventListener;

	// Paddle
	var Paddle = function(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.draw = function() {
			ctx.fillStyle = color;
			ctx.fillRect(x, this.y, width, this.height);
		}
	};

	// Ball
	var Ball = function(x, y, vx, vy, r, color) {
	  this.x = x;
	  this.y = y;
	  this.vx = vx;
	  this.vy = vy;
	  this.radius = r;
	  this.color = color;
	  this.draw = function() {
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, r, 0, Math.PI * 2, true);
	    ctx.closePath();
	    ctx.fillStyle = color;
	    ctx.fill();
	  }
	};

	function trailEffect() {
		ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(30, 0, 940, canvas.height);
	}

	function ballMovement() {
		trailEffect();
	  pingPong.draw();
	  pingPong.x += pingPong.vx;
	  pingPong.y += pingPong.vy;
	  if (pingPong.y == (canvas.height - 5) || pingPong.y == 5) {
	  	pingPong.vy = pingPong.vy * -1;
	  	pingPong.y += pingPong.vy;
	  }
	  else if (pingPong.x == (left.x + 34)) {
	  	pingPong.vx = pingPong.vx * -1;
	  	pingPong.x += pingPong.vx;
	  }
	  raf = window.requestAnimationFrame(ballMovement);
	}

	// This creates the paddles and the ball with their
	// respective attributes
	var left = new Paddle(10, 0, 20, 150, 'red'),
			right = new Paddle(970, 0, 20, 150, 'green'),
			pingPong = new Ball(300, 100, -1, 5, 15, 'rgba(0,0,0,1)');
	left.draw();
	right.draw();
	ballMovement();

	addE('keydown', function(e) {
		if (e.keyCode == 87) {
			ctx.clearRect(0, 0, 30, canvas.height);
			left.y -= 24;
			left.height = 150;
			left.draw();
			console.log(left.y);
			console.log(left.height);
		}
		else if (e.keyCode == 83) {
			ctx.clearRect(0, 0, 30, canvas.height);
			left.y += 24;
			left.height = 150;
			left.draw();
			console.log(left.y);
			console.log(left.height);
		} 
	})
});