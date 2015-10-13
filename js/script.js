$(document).ready(function() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	var addE = document.addEventListener;

	// Paddle constructor
	var Paddle = function(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.draw = function() {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, width, this.height);
		}
	};

	// Ball constructor
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
	  // bottom || top
	  if (pingPong.y >= (canvas.height - 5) || pingPong.y <= 5) {
	  	pingPong.vy = pingPong.vy * -1;
	  	pingPong.y += pingPong.vy;
	  }
	  // collision detection line intersection
	  else if(pingPong.x <= (left.x + 34) && pingPong.x >= (left.x + 30) && pingPong.y < (left.y + left.height) && pingPong.y > left.y) {;
	  	pingPong.vx = pingPong.vx * -1;
	  	pingPong.x += pingPong.vx;
	  };
	  // left || right
	  // else if (pingPong.x <= (left.x + 30) || pingPong.x >= (canvas.width - 34)) {
	  // 	pingPong.vx = pingPong.vx * -1;
	  // 	pingPong.x += pingPong.vx;
	  // }
	  requestAnimationFrame(ballMovement);
	}

	// Currently this function only moves the left paddle down.  Fix this shit up, bitch!
	var paddleMovement = function() {
		var speed = 10;

		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		left.y += speed
		requestAnimationFrame(paddleMovement);
	}

	// Currently this function only stops the left paddle from moving down
	var stopMovement = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		left.y -= 10;
		requestAnimationFrame(stopMovement);
	}

	// Keydown function that calls paddleMovement()
	addE('keydown', function(e) {
		if (e.keyCode == 83) {
			paddleMovement();
		}
	});

	// Keyup function that calls stopMovement();
	addE('keyup', function(e) {
		if (e.keyCode == 83) {
			stopMovement();
		}
	})

	// This creates the paddles and the ball with their
	// respective attributes
	var left = new Paddle(10, 0, 20, 150, 'red'),
			right = new Paddle(970, 0, 20, 150, 'green'),
			pingPong = new Ball(300, 100, -10, 10, 15, 'rgba(0,0,0,1)');
	left.draw();
	right.draw();
	ballMovement();

	// addE('keydown', function(e) {
	// 	if (e.keyCode == 87) {
	// 		ctx.clearRect(0, 0, 30, canvas.height);
	// 		left.y -= 24;
	// 		left.draw();
	// 	}
	// 	else if (e.keyCode == 83) {
	// 		ctx.clearRect(0, 0, 30, canvas.height);
	// 		left.y += 24;
	// 		left.draw();
	// 	} 
	// })
});