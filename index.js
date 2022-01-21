(function () {
    function Circle(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    Circle.prototype = {
        draw: function () {
            c.fillStyle = this.color;
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, 2 * 3.14159, false);
            c.fill();
            c.closePath();
        },
        update: function () {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if (
                this.x + this.radius >= canvas.width ||
                this.x - this.radius <= 0
            )
                this.velocity.x = -this.velocity.x;
            if (
                this.y + this.radius >= canvas.height ||
                this.y - this.radius <= 0
            )
                this.velocity.y = -this.velocity.y;
            if (
                distance(mouse.x, mouse.y, this.x, this.y) <=
                100
            ) {
                const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
                this.velocity.x = 1 - Math.cos(angle);
                this.velocity.y = 1 - Math.sin(angle);
            }
            this.draw();
        }
    };
    const canvas = document.createElement("canvas");
    const c = canvas.getContext("2d");
    const mouse = { x: undefined, y: undefined };
    const circles = [];
    function randomFromRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    function randomIntFromRange(min, max) {
        return Math.floor(randomFromRange(min, max));
    }
    function distance(x1, y1, x2, y2) {
        return Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
        );
    }
    function mouseEvents(event) {
        if (event.type === "mouseout") {
            mouse.x = undefined;
            mouse.y = undefined;
        } else {
            mouse.x = event.pageX;
            mouse.y = event.pageY;
        }
    }
    function onResize() {
        circles.length = 0;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        for (let index = 0; index < 100; index++) {
            const radius = randomFromRange(1, 5);
            const x = randomIntFromRange(radius, canvas.width - radius);
            const y = randomIntFromRange(radius, canvas.height - radius);
            const velocity = { x: randomFromRange(-1, 1), y: randomFromRange(-1, 1) };
            circles.push(new Circle(x, y, radius, ["red", "green", "blue"][randomIntFromRange(0, 3)], velocity));
        }
    }
    function animate() {
        window.requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        for (let index = 0; index < circles.length; index++) {
            const eachCircle = circles[index];
            eachCircle.update();
        }
    }
    window.addEventListener("resize", onResize, false);
    window.addEventListener("mouseover", mouseEvents, false);
    window.addEventListener("mousemove", mouseEvents, false);
    window.addEventListener("mouseout", mouseEvents, false);
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    onResize();
    animate();
}).call(window);