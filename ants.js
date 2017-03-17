(function () {
    'use strict';

    var canvas = document.getElementById('theCanvas'),
        move = $("#move"),
        sleep = $("#sleep"),
        more = $("#more"),
        addMore = $("#addMore"),
        less = $("#less"),
        remove = $("#remove"),
        antColor = $("#antColor"),
        ctx = canvas.getContext('2d'),
        interval,
        ants = [];

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function Ant(color) {
        this.color = color || "black";
        this.left = canvas.width / 2;
        this.top = canvas.height / 2;
        this.lengthOfDirection = 0;
        this.tempLeft = 0;
        this.tempTop = 0;
    }
    Ant.prototype.checkDirection = function () {
        if (--this.lengthOfDirection < 0) {
            this.lengthOfDirection = getRandomNumber(0, 12);
            this.getNewLeft();
            this.getNewTop();
        }
    };
    Ant.prototype.getNewLeft = function () {
        this.tempLeft = getRandomNumber(-1, 1);
    };
    Ant.prototype.getNewTop = function () {
        this.tempTop = getRandomNumber(-1, 1);
    };
    Ant.prototype.checkEdge = function () {
        if (this.left < 10) {
            this.left = 10;
        }
        if (this.top < 10) {
            this.top = 10;
        }
        if (this.left > (canvas.width - 22)) {
            this.left = canvas.width - 22;
        }
        if (this.top > (canvas.height - 22)) {
            this.top = canvas.height - 22;
        }
    };
    Ant.prototype.move = function () {
        this.checkDirection();
        this.left += this.tempLeft;
        this.top += this.tempTop;
        this.checkEdge();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.left, this.top, 2, 2);
    };
    addMore.click(function () {
        var i = 0;
        for (i; i < more.val(); i++) {
            ants.push(new Ant(antColor.val()));
        }
    });
    remove.click(function () {
        var i = 0;
        for (i; i < less.val(); i++) {
            ants.pop();
        }
    });
    for (var i = 0; i < 10000; i++) {
        ants.push(new Ant());
    }
    move.click(function () {
        clearInterval(interval);
        interval = setInterval(function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ants.forEach(function (ant) {
                ant.move();
            });
        }, 200);
    });
    sleep.click(function () {
        clearInterval(interval);
    });
} ());
