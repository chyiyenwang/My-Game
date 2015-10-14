$(document).ready(function() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	var addE = document.addEventListener;
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame
	var scorer;
	var leftWins = 0;
  var rightWins = 0;

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
		ctx.fillStyle = 'rgba(30,78,152,0.3)';
    ctx.fillRect(30, 0, 940, canvas.height);
	}

	function ballMovement() {
		var bottomWall = canvas.height - 5;
		var topWall = 5;

		trailEffect();
	  pingPong.draw();
	  pingPong.x += pingPong.vx;
	  pingPong.y += pingPong.vy;
	  // bottom || top
	  if (pingPong.y >= bottomWall || pingPong.y <= topWall) {
	  	pingPong.vy = pingPong.vy * -1;
	  	pingPong.y += pingPong.vy;
	  }
	  // google collision detection line intersection
	  // this bounces ball currently but very poorly
	  // Left front paddle && left back paddle && left paddle bottom point && left paddle top point
	  else if (pingPong.x <= (left.x + 34) && pingPong.x >= (left.x + 30) && pingPong.y < (left.y + left.height) && pingPong.y > left.y) {;
	  	pingPong.vx = pingPong.vx * -1;
	  	pingPong.x += pingPong.vx;
	  }
	  else if (pingPong.x < -20) {
	  	scorer = 'Right';
	  	rightWins++;
	  	console.log(rightWins);
	  	if (rightWins == 5) {
	  		alert('Right Player Wins!');
	  	}
	  	return;
	  }
	  else if (pingPong.x > canvas.width) {
	  	scorer = 'Left';
	  	leftWins++;
	  	console.log(leftWins);
	  	if (leftWins == 5) {
	  		alert('Left Player Wins!');
	  	}
	  	return;
	  }
	  // else if(pingPong.x < )
	  // left || right
	  // else if (pingPong.x <= (left.x + 30) || pingPong.x >= (canvas.width - 34)) {
	  // 	pingPong.vx = pingPong.vx * -1;
	  // 	pingPong.x += pingPong.vx;
	  // }
	  raf(ballMovement);
	};

	var left;
	var right;
	var pingPong;
	// This creates the paddles and the ball with their
	// respective attributes
	var init = function() {
		left = new Paddle(10, 225, 20, 150, 'red');
		right = new Paddle(970, 225, 20, 150, 'green')
		pingPong = new Ball(500, 300, -6, -6, 15, 'rgba(0,0,0,1)');
		left.draw();
		right.draw();
		ballMovement();
	};

	// Currently this function only moves the left paddle down.  Fix this shit up, bitch!
	var paddleMovementDown = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		if (left.y < canvas.height-150) left.y += 10;
		console.log(left.y);
		raf(paddleMovementDown);
	}

	// right paddele down
	var shit = function() {
		ctx.clearRect(970, 0, 30, canvas.height);
		right.draw();
		right.y += 10
		raf(shit);
	}

	var paddleMovementUp = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		if (left.y > 0) left.y -= 10;
		raf(paddleMovementUp);
	}

	// Currently this function only stops the left paddle from moving down
	var stopMovement = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		left.y -= 10;
		// raf(stopMovement);
	}

	var animUp = null;
	var animDown = null;
	// Keydown function that calls paddleMovement()
	addE('keydown', function(e) {
		if (e.keyCode == 87 && !animUp) { 
				animUp = raf(paddleMovementUp);
			}
		if (e.keyCode == 83 && !animDown) { 
				animDown = raf(paddleMovementDown);
			}
		if (e.keyCode == 40) {
			shit();
		}
	});

	// // Keyup function that calls stopMovement();
	addE('keyup', function(e) {
		if (e.keyCode == 87) {
			// stopMovement();
			// window.webkitCancelRequestAnimationFrame(animUp);
			animUp = null;
		}
		if (e.keyCode == 83) {
			// stopMovement();
			console.log('keyup');
			// window.webkitCancelRequestAnimationFrame(animDown);
			animDown = null;
		}
	})

	// start button
	$('button').on('click', function() {
		init();
	});

	// // addE('keydown', function(e) {
	// // 	if (e.keyCode == 87) {
	// // 		ctx.clearRect(0, 0, 30, canvas.height);
	// // 		left.y -= 24;
	// // 		left.draw();
	// // 	}
	// // 	else if (e.keyCode == 83) {
	// // 		ctx.clearRect(0, 0, 30, canvas.height);
	// // 		left.y += 24;
	// // 		left.draw();
	// // 	} 
	// // })

});