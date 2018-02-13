var particles = (function() {
	
	var canvas, w, h, ctx;
	
	function Particle() {
		this.radius = this.minRadius + Math.random() * (this.maxRadius -  this.minRadius);
		this.x = Math.random() * w;
		this.y = Math.random() * h;
		this.speed = this.minSpeed + Math.random() * (this.maxSpeed - this.minSpeed);
		var angle = Math.random() * Math.PI * 2;
		this.dx = this.speed * Math.cos(angle);
		this.dy = this.speed * Math.sin(angle);
	}
	
	Particle.prototype.maxSpeed = 3;
	Particle.prototype.minSpeed = 1;
	Particle.prototype.color = "#93daf2";
	Particle.prototype.lineRGB = "135, 228, 255";
	Particle.prototype.minRadius = 3;
	Particle.prototype.maxRadius = 5;
	Particle.prototype.minDist = 250;
	Particle.prototype.lineWidth = 1;
	
	var list = [], num = 50;
	
	Particle.prototype.update = function() {
		if (this.x >= w || this.x <= 0)
			this.dx = -this.dx;
		if (this.y >= h || this.y <= 0)
			this.dy = -this.dy;
		if (this.x > w) 
			this.x = w;
		if (this.x < 0)
			this.x = 0;
		if (this.y > h)
			this.y = h;
		if (this.y < 0)
			this.y = 0;
		
		this.x += this.dx;
		this.y += this.dy;
	}
	
	Particle.prototype.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	
	function dist(p1, p2) {
		return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
	}
	
	function drawLine(p1, p2) {
		var d = dist(p1, p2);
		var opacity = 1 - d / Particle.prototype.minDist;
		if (opacity > 0) {
			ctx.lineWidth = Particle.prototype.lineWidth;
			ctx.strokeStyle = "rgba(" + Particle.prototype.lineRGB + "," + opacity + ")";
			ctx.beginPath();
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.closePath();
			ctx.stroke();
		}
	}
	
	return {
		init: function() {
			canvas = document.getElementById("particleCanvas");
			ctx = canvas.getContext('2d');
			w = canvas.width = window.innerWidth;
			h = canvas.height = 400;
			for (var i = 0; i < num; ++i) {
				list.push(new Particle);
			}
		},
		resize: function() {
			w = canvas.width = window.innerWidth;
			h = canvas.height = 400;
		},
		updateFrame: function() {
			if (ctx == undefined) return;
			ctx.clearRect(0, 0, w, h);
			for (var i = 0; i < list.length - 1; ++i)
				for (var j = i + 1; j < list.length; ++j) 
					drawLine(list[i],list[j]);
			for (var i in list) {
				list[i].update();
				list[i].draw();
			}
		},
	}
})();