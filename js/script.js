$(document).ready(function() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	var addE = document.addEventListener;
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
	var pingPong;
	var scorer;
	var leftWins = 0;
  var rightWins = 0;
  var animUp = null;
	var animDown = null;
	var rightAnimUp = null;
	var rightAnimDown = null;
	var stopl=1;
	var stopr=1;
	var audioRight = new Audio('sounds/right-bounce.mp3');
	var audioLeft = new Audio('sounds/left-bounce.mp3');

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

	// Trail effect for the ping pong
	function trailEffect() {
		ctx.fillStyle = 'rgba(30,78,152,0.3)';
    ctx.fillRect(30, 0, 940, canvas.height);
	};

	// Ball movement function; also checks for the collision for the paddes and keeps score
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
	  // Left front paddle && left back paddle && left paddle bottom point && left paddle top point
	  else if (pingPong.x <= (left.x + 34) && pingPong.x >= (left.x + 24) && pingPong.y < (left.y + left.height) && pingPong.y > left.y) {;
	  	pingPong.vx = pingPong.vx * -1;
	  	pingPong.x += pingPong.vx;
	  	audioLeft.play();
	  }
	  // Right front && right back && right paddle bottom && right paddle top
	  else if (pingPong.x >= (right.x - 14) && pingPong.x <= (right.x - 4) && pingPong.y < (right.y + right.height) && pingPong.y > right.y) {;
	  	pingPong.vx = pingPong.vx * -1;
	  	pingPong.x += pingPong.vx;
	  	audioRight.play();
	  }
	  // Tally for the right player score
	  else if (pingPong.x < -20) {
	  	rightWins++;
	  	console.log(rightWins);
	  	$('#right-score').html(rightWins);
	  	if (rightWins == 5) {
	  		swal({   
	  			title: "Congrats!",   
	  			text: "Green Player Wins!",   
	  			imageUrl: "images/right-wins.gif" });
	  	}
	  	return;
	  }
	  // Tally for the left player score
	  else if (pingPong.x > canvas.width) {
	  	leftWins++;
	  	console.log(leftWins);
	  	$('#left-score').html(leftWins);
	  	if (leftWins == 5) {
				swal({   
	  			title: "Congrats!",   
	  			text: "Red Player Wins!",   
	  			imageUrl: "images/left-wins.gif" });	  	
			}
	  	return;
	  }
	  raf(ballMovement);
	};

	// Create paddles
	var left = new Paddle(10, 225, 20, 150, 'rgba(200, 39, 27, 1)');
	var right = new Paddle(970, 225, 20, 150, 'rgba(0, 115, 29, 1)');

	// Begins the game and creates the ball 
	var begin = function() {
		randomVX = Math.random() < 0.5 ? -10 : 10;
		randomVY = Math.random() * (6 - 7) + 6

		$('#left-score').html(0);
		$('#right-score').html(0);

		pingPong = new Ball(500, 300, randomVX, randomVY, 15, 'rgba(255,255,255, 1)');
		rightWins = 0;
		leftWins = 0;
		left.draw();
		right.draw();
		ballMovement();
	};

	var serve = function() {
		randomVX = Math.random() < 0.5 ? -10 : 10;
		randomVY = Math.random() * (6 - 7) + 6

		pingPong = new Ball(500, 300, randomVX, randomVY, 15, 'rgba(255,255,255, 1)');
		left.draw();
		right.draw();
		ballMovement();
	}

	// Moves left paddle down
	var paddleMovementDown = function() {
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		if (left.y < canvas.height-150 && stopl != 0) { 
			left.y += 10;
			raf(paddleMovementDown);
		}
	}

	// Moves right paddele down
	var rightPaddleDown = function() {
		ctx.clearRect(970, 0, 30, canvas.height);
		right.draw();
		if (right.y < canvas.height-150 && stopr != 0) {
			right.y += 10;
			raf(rightPaddleDown);
		};
	}

	// Moves left paddle up
	var paddleMovementUp = function() {
		console.log(stop);
		ctx.clearRect(0, 0, 30, canvas.height);
		left.draw();
		if (left.y > 0 && stopl != 0) { 
			left.y -= 10;
		 	raf(paddleMovementUp);
		}
	}

	// Moves right paddle up
	var rightPaddleUp = function() {
		ctx.clearRect(970, 0, 30, canvas.height);
		right.draw();
		if (right.y > 0 && stopr !=0) { 
			right.y -= 10;
			raf(rightPaddleUp);	
		}
	}

	// Keydown function that calls paddleMovement()
	addE('keydown', function(e) {
		stopl=1;
		stopr=1;
		// W
		if (e.keyCode == 87 && !animUp) { 
				 paddleMovementUp();
				animeUp = 'pressed';
			}
		// S
		if (e.keyCode == 83 && !animDown) { 
				paddleMovementDown();
				animeDown = 'pressed';
			}
		// Up arrow
		if (e.keyCode == 38 && !rightAnimUp) {
			rightPaddleUp();
			rightAnimUp = 'pressed';
		}
		// Down arrow
		if (e.keyCode == 40 && !rightAnimDown) {
			rightPaddleDown();
			rightAnimDown = 'pressed';
		}
	});


	// // Keyup function that stops paddles from moving;
	addE('keyup', function(e) {
		// W
		if (e.keyCode == 87) {
			stopl=0;
			animUp = null;
		}
		// S
		if (e.keyCode == 83) {
			stopl = 0;
			animDown = null;
		}
		// Up arrow
		if (e.keyCode == 38) {
			stopr = 0;
			rightAnimUp = null;
		}
		// Down arrow
		if (e.keyCode == 40) {
			stopr = 0;
			rightAnimDown = null;
		}
	});

	// start button
	$('#start').on('click', function() {
		begin();
	});

	// serve button
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
});