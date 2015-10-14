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
	  else if (pingPong.x >= (right.x) && pingPong.x <= (right.x + 4) && pingPong.y < (right.y + right.height) && pingPong.y > right.y) {;
	  	pingPong.vx = pingPong.vx * -1;
	  	pingPong.x += pingPong.vx;
	  }
	  else if (pingPong.x < -20) {
	  	rightWins++;
	  	console.log(rightWins);
	  	$('#right-score').html(rightWins);
	  	if (rightWins == 5) {
	  		swal({   
	  			title: "Congrats!",   
	  			text: "Right Player Wins!",   
	  			imageUrl: "images/you-win.jpg" });
	  		// alert('Right Player Wins!');
	  	}
	  	return;
	  }
	  else if (pingPong.x > canvas.width) {
	  	leftWins++;
	  	console.log(leftWins);
	  	$('#left-score').html(leftWins);
	  	if (leftWins == 5) {
				swal({   
	  			title: "Congrats!",   
	  			text: "Left Player Wins!",   
	  			imageUrl: "images/you-win.jpg" });	  	
			}
	  	return;
	  }
	  raf(ballMovement);
	};

	var left;
	var right;
	var pingPong;
	// This creates the paddles and the ball with their
	// respective attributes
	var begin = function() {
		$('#left-score').html(0);
		$('#right-score').html(0);
		left = new Paddle(10, 225, 20, 150, 'red');
		right = new Paddle(970, 225, 20, 150, 'green')
		pingPong = new Ball(500, 300, -6, -6, 15, 'rgba(0,0,0,1)');
		rightWins = 0;
		leftWins = 0;
		left.draw();
		right.draw();
		ballMovement();
	};

	var serve = function() {
		left = new Paddle(10, 225, 20, 150, 'red');
		right = new Paddle(970, 225, 20, 150, 'green')
		pingPong = new Ball(500, 300, -6, -6, 15, 'rgba(0,0,0,1)');
		left.draw();
		right.draw();
		ballMovement();
	}

	// Currently this function only moves the left paddle down.  Fix this rightPaddleDown up, bitch!
	var paddleMovementDown = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		if (left.y < canvas.height-150) left.y += 10;
		// console.log(left.y);
		raf(paddleMovementDown);
	}

	// right paddele down
	var rightPaddleDown = function() {
		ctx.clearRect(970, 0, 30, canvas.height);
		right.draw();
		if (right.y < canvas.height-150) right.y += 10
		raf(rightPaddleDown);
	}

	var paddleMovementUp = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		if (left.y > 0) left.y -= 10;
		raf(paddleMovementUp);
	}

	var rightPaddleUp = function() {
		ctx.clearRect(970, 0, 30, canvas.height);
		right.draw();
		if (right.y > 0) right.y -= 10
		raf(rightPaddleUp);	
	}

	// Currently this function only stops the left paddle from moving down
	var stopMovementLeft = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		left.y -= 10;
		// raf(stopMovement);
	}

	var animUp = null;
	var animDown = null;
	var rightAnimUp = null;
	var rightAnimDown = null;
	// Keydown function that calls paddleMovement()
	addE('keydown', function(e) {
		if (e.keyCode == 87 && !animUp) { 
				paddleMovementUp();
				animeUp = 'pressed'
			}
		if (e.keyCode == 83 && !animDown) { 
				paddleMovementDown();
				animeDown = 'pressed'
			}
		if (e.keyCode == 38 && !rightAnimUp) {
			rightAnimUp = raf(rightPaddleUp);
		}
		if (e.keyCode == 40 && !rightAnimDown) {
			rightAnimDown = raf(rightPaddleDown);
		}
	});

	// // Keyup function that calls stopMovement();
	addE('keyup', function(e) {
		if (e.keyCode == 87) {
			stopMovementLeft();
			// window.webkitCancelRequestAnimationFrame(animUp);
			animUp = null;
		}
		if (e.keyCode == 83) {
			// stopMovement();
			// window.webkitCancelRequestAnimationFrame(animDown);
			animDown = null;
		}
		if (e.keyCode == 38) {
			// stopMovement();
			// window.webkitCancelRequestAnimationFrame(animUp);
			rightAnimUp = null;
		}
		if (e.keyCode == 40) {
			// stopMovement();
			// window.webkitCancelRequestAnimationFrame(animDown);
			rightAnimDown = null;
		}
	})

	// start button
	$('#start').on('click', function() {
		begin();
	});

	$('#serve').on('click', function() {
		if (rightWins > 0 && rightWins < 5) {
			serve();
		}
		else if (leftWins > 0 && leftWins < 5) {
			serve();
		}
		else {
			swal("Start A New Game")
		}
	})

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