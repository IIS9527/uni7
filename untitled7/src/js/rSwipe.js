// /**
//  * @author Mr_老冷 QQ1920712147
//  * @constructor
//  * @example 用法https://blog.csdn.net/mr_oldcold/article/details/115728761
//  */
// function SwipeRnd() {
//     this.step = 0.08
// }
//
// /**
//  * @author Mr_老冷 QQ1920712147
//  * @type {SwipeRnd}
//  */
//
//
// const rSwipe = new SwipeRnd()
//
// /**
//  * @author Mr_老冷 QQ1920712147
//  * @description 仿真滑动
//  * @param startX {number} 起点x
//  * @param startY {number} 起点y
//  * @param endX {number} 终点x
//  * @param endY {number} 终点y
//  * @param timeStart {number} 随机延迟1,默认50ms
//  * @param timeEnd {number} 随机延迟2,默认timeStart+50ms
//  * @param timeOut {number} 超时,默认2s
//  * @param step {number} 步进,默认0.08
//  * @return {boolean}
//  */
// SwipeRnd.prototype.rndSwipe = function (startX, startY, endX, endY,
//                                         timeStart, timeEnd, timeOut, step) {
//     timeStart = timeStart || 50
//     timeEnd = timeEnd || timeStart + 50
//     timeOut = timeOut || 2 * 1000
//     this.step = step || this.step
//     return this._gesture(this._rndSwipe(startX, startY, endX, endY), random(timeStart, timeEnd), timeOut)
// }
// /**
//  * @author Mr_老冷 QQ1920712147
//  * @description 二指仿真滑动
//  * @param startX {number} 起点x
//  * @param startY {number} 起点y
//  * @param endX {number} 终点x
//  * @param endY {number} 终点y
//  * @param timeStart {number} 随机延迟1,默认50ms
//  * @param timeEnd {number} 随机延迟2,默认timeStart+50ms
//  * @param timeOut {number} 超时,默认2s
//  * @param step {number} 步进,默认0.08
//  * @return {boolean}
//  */
// SwipeRnd.prototype.rndSwipeTwo = function (startX, startY,
//                                            endX, endY,
//                                            timeStart, timeEnd, timeOut, step) {
//     timeStart = timeStart || 50
//     timeEnd = timeEnd || timeStart + 50
//     timeOut = timeOut || 2 * 1000
//     this.step = step || this.step
//     return this._gestureTwo(this._rndSwipe(startX, startY, endX, endY), this._rndSwipe(startX, startY, endX, endY),
//         random(timeStart, timeEnd), timeOut)
// }
//
// SwipeRnd.prototype._bezier_curves = function (cp, t) {
//     let cx = 3.0 * (cp[1].x - cp[0].x),
//         bx = 3.0 * (cp[2].x - cp[1].x) - cx,
//         ax = cp[3].x - cp[0].x - cx - bx,
//         cy = 3.0 * (cp[1].y - cp[0].y),
//         by = 3.0 * (cp[2].y - cp[1].y) - cy,
//         ay = cp[3].y - cp[0].y - cy - by,
//         tSquared = t * t,
//         tCubed = tSquared * t
//     return {
//         "x": (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x,
//         "y": (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y
//     }
// }
//
// SwipeRnd.prototype._rndSwipe = function (qx, qy, zx, zy) {
//     let xxyy = [],
//         xxy = [],
//         point = [],
//         dx = [{
//             "x": random(qx-10, qx + 10),
//             "y": random(qy-30, qy + 30)
//         }, {
//             "x": random(qx -20, qx + 20),
//             "y": random(qy, qy + 80)
//         }, {
//             "x": random(qx - 70, qx + 70),
//             "y": random(qy, qy + 80)
//         },{
//             "x": random(qx - 70, qx + 70),
//             "y": random(qy, qy + 80)
//         },{
//             "x": random(zx - 70, zx + 70),
//             "y": random(zy, zy + 80),
//         }, {
//             "x": zx,
//             "y": zy
//         }]
//     for (let i = 0; i < dx.length; i++) {
//         point.push(dx[i])
//     }
//     for (let i = 0; i < 1; i += this.step) {
//         xxyy = [~~(this._bezier_curves(point, i).x), ~~(this._bezier_curves(point, i).y)]
//         xxy.push(xxyy);
//     }
//     return xxy
// }
// SwipeRnd.prototype._gesture = function (swipeList, time, time1) {
//     let touch1 = [{"action": 0, "x": swipeList[0][0], "y": swipeList[0][1], "pointer": 1, "delay": time}]
//     for (let i = 1; i < swipeList.length - 1; i++) {
//         touch1.push({"action": 2, "x": swipeList[i][0], "y": swipeList[i][1], "pointer": 1, "delay": time});
//     }
//     touch1.push({
//         "action": 1,
//         "x": swipeList[swipeList.length - 1][0],
//         "y": swipeList[swipeList.length - 1][1],
//         "pointer": 1,
//         "delay": time
//     })
//     return multiTouch(touch1, null, null, time1);
// }
// SwipeRnd.prototype._gestureTwo = function (swipeList, time, time1) {
//     let swipe = swipeList[0],
//         swipe1 = swipeList[1],
//         touch1 = [{"action": 0, "x": swipe[0][0], "y": swipe[0][1], "pointer": 1, "delay": time}],
//         touch2 = [{"action": 0, "x": swipe1[0][0], "y": swipe1[0][1], "pointer": 2, "delay": time}]
//
//     for (let i = 1; i < swipe.length - 1; i++) {
//         touch1.push({"action": 2, "x": swipe[i][0], "y": swipe[i][1], "pointer": 1, "delay": time});
//         touch2.push({"action": 2, "x": swipe1[i][0], "y": swipe1[i][1], "pointer": 2, "delay": time});
//     }
//     touch1.push({
//         "action": 1,
//         "x": swipe[swipe.length - 1][0],
//         "y": swipe[swipe.length - 1][1],
//         "pointer": 1,
//         "delay": time
//     })
//     touch2.push({
//         "action": 1,
//         "x": swipe1[swipe1.length - 1][0],
//         "y": swipe1[swipe1.length - 1][1],
//         "pointer": 2,
//         "delay": time
//     })
//     return multiTouch(touch1, touch2, null, time1);
// }
/**
 * @author Mr_老冷 QQ1920712147
 * @constructor
 * @example 用法https://blog.csdn.net/mr_oldcold/article/details/115728761
 */
function SwipeRnd() {
    this.step = 0.08
}

/**
 * @author Mr_老冷 QQ1920712147
 * @type {SwipeRnd}
 */
const rSwipe = new SwipeRnd()


/**
 * @author Mr_老冷 QQ1920712147
 * @description 仿真滑动
 * @param startX {number} 起点x
 * @param startY {number} 起点y
 * @param endX {number} 终点x
 * @param endY {number} 终点y
 * @param timeStart {number} 随机延迟1,默认50ms
 * @param timeEnd {number} 随机延迟2,默认timeStart+50ms
 * @param timeOut {number} 超时,默认2s
 * @param step {number} 步进,默认0.08
 * @return {boolean}
 */
SwipeRnd.prototype.rndSwipe = function (startX, startY, endX, endY,
                                        timeStart, timeEnd, timeOut, step) {
    timeStart = timeStart || 50
    timeEnd = timeEnd || timeStart + 50
    timeOut = timeOut || 2 * 1000
    this.step = step || this.step
    return this._gesture(this._rndSwipe(startX, startY, endX, endY), random(timeStart, timeEnd), timeOut)
}

/**
 * @author Mr_老冷 QQ1920712147
 * @description 二指仿真滑动
 * @param startX {number} 起点x
 * @param startY {number} 起点y
 * @param endX {number} 终点x
 * @param endY {number} 终点y
 * @param timeStart {number} 随机延迟1,默认50ms
 * @param timeEnd {number} 随机延迟2,默认timeStart+50ms
 * @param timeOut {number} 超时,默认2s
 * @param step {number} 步进,默认0.08
 * @return {boolean}
 */
SwipeRnd.prototype.rndSwipeTwo = function (startX, startY,
                                           endX, endY,
                                           timeStart, timeEnd, timeOut, step) {
    timeStart = timeStart || 50
    timeEnd = timeEnd || timeStart + 50
    timeOut = timeOut || 2 * 1000
    this.step = step || this.step
    return this._gestureTwo(this._rndSwipe(startX, startY, endX, endY), this._rndSwipe(startX, startY, endX, endY),
        random(timeStart, timeEnd), timeOut)
}

SwipeRnd.prototype._bezier_curves = function (cp, t) {
    let cx = 3.0 * (cp[1].x - cp[0].x),
        bx = 3.0 * (cp[2].x - cp[1].x) - cx,
        ax = cp[3].x - cp[0].x - cx - bx,
        cy = 3.0 * (cp[1].y - cp[0].y),
        by = 3.0 * (cp[2].y - cp[1].y) - cy,
        ay = cp[3].y - cp[0].y - cy - by,
        tSquared = t * t,
        tCubed = tSquared * t
    return {
        "x": (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x,
        "y": (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y
    }
}

SwipeRnd.prototype._rndSwipe = function (qx, qy, zx, zy) {
    let xxyy = [],
        xxy = [],
        point = [],
        dx = [{
            "x": random(qx, qx + 50),
            "y": random(qy, qy + 50)
        }, {
            "x": random(qx - 100, qx + 100),
            "y": random(qy, qy + 50)
        }, {
            "x": random(zx - 100, zx + 100),
            "y": random(zy, zy + 50),
        }, {
            "x": zx,
            "y": zy
        }]
    for (let i = 0; i < dx.length; i++) {
        point.push(dx[i])
    }
    for (let i = 0; i < 1; i += this.step) {
        xxyy = [~~(this._bezier_curves(point, i).x), ~~(this._bezier_curves(point, i).y)]
        xxy.push(xxyy);
    }
    return xxy
}
SwipeRnd.prototype._gesture = function (swipeList, time, time1) {
    let touch1 = [{"action": 0, "x": swipeList[0][0], "y": swipeList[0][1], "pointer": 1, "delay": time}]
    for (let i = 1; i < swipeList.length - 1; i++) {
        touch1.push({"action": 2, "x": swipeList[i][0], "y": swipeList[i][1], "pointer": 1, "delay": time});
    }
    touch1.push({
        "action": 1,
        "x": swipeList[swipeList.length - 1][0],
        "y": swipeList[swipeList.length - 1][1],
        "pointer": 1,
        "delay": time
    })
    return multiTouch(touch1, null, null, time1);
}
SwipeRnd.prototype._gestureTwo = function (swipeList, time, time1) {
    let swipe = swipeList[0],
        swipe1 = swipeList[1],
        touch1 = [{"action": 0, "x": swipe[0][0], "y": swipe[0][1], "pointer": 1, "delay": time}],
        touch2 = [{"action": 0, "x": swipe1[0][0], "y": swipe1[0][1], "pointer": 2, "delay": time}]

    for (let i = 1; i < swipe.length - 1; i++) {
        touch1.push({"action": 2, "x": swipe[i][0], "y": swipe[i][1], "pointer": 1, "delay": time});
        touch2.push({"action": 2, "x": swipe1[i][0], "y": swipe1[i][1], "pointer": 2, "delay": time});
    }

    touch1.push({
        "action": 1,
        "x": swipe[swipe.length - 1][0],
        "y": swipe[swipe.length - 1][1],
        "pointer": 1,
        "delay": time
    })
    touch2.push({
        "action": 1,
        "x": swipe1[swipe1.length - 1][0],
        "y": swipe1[swipe1.length - 1][1],
        "pointer": 2,
        "delay": time
    })
    return multiTouch(touch1, touch2, null, time1);
}

//
// var moveUp = MultiPoint
//     .get()
//     .action(0).x(w+random(-10,20)).y(1800+random(-10,20)).pointer(1).delay(2)
//     .next()
//     .action(2).x(w+random(-10,40)).y(1600+random(-10,20)).pointer(1).delay(500)
//     .next().action(2).x(w+random(-10,40)).y(1600+random(-10,20)).pointer(1).delay(500)
//     .next().action(2).x(w+random(-10,40)).y(1600+random(-10,20)).pointer(1).delay(500)
//     .next().action(2).x(w+random(-10,40)).y(1600+random(0,20)).pointer(1).delay(50)
//     .next().action(2).x(w+random(-10,40)).y(1580+random(0,20)).pointer(1).delay(0)
//     .next().action(2).x(w+random(-10,40)).y(1560+random(0,20)).pointer(1).delay(0)
//     .next().action(2).x(w+random(-10,40)).y(1540+random(0,20)).pointer(1).delay(0)
//     .next().action(2).x(w+random(-10,40)).y(1520+random(0,20)).pointer(1).delay(0)
//     .next().action(2).x(w+random(-10,40)).y(1500+random(0,20)).pointer(1).delay(0)
//     .next().action(2).x(w+random(-10,40)).y(1480+random(0,20)).pointer(1).delay(0)
//     .next().action(2).x(w+random(-10,40)).y(1460+random(0,20)).pointer(1).delay(0)
//     .next()
//     .action(2).x(w+random(-10,50)).y(1420+random(-10,20)).pointer(1).delay(0)
//     .next()
//     .action(2).x(w+random(-10,60)).y(1400+random(-10,20)).pointer(1).delay(0)
//     .next()
//     .action(2).x(w+random(-10,70)).y(1300+random(-10,20)).pointer(1).delay(0)
//     .next()
//     .action(2).x(w+random(-10,80)).y(1200+random(-10,20)).pointer(1).delay(0)
//     .next()
//     .action(1).x(w+random(-10,90)).y(800+random(-10,20)).pointer(1).delay(0);
//
//
// var moveUp = MultiPoint
//     .get().action(0).x(w+random(-10,20)).y(1800+random(-10,20)).pointer(1).delay(2)
//     .next().action(2).x(w+random(-10,40)).y(1600+random(-10,20)).pointer(1).delay(500)
//     .next().action(2).x(w+random(-10,40)).y(1600+random(-10,20)).pointer(1).delay(500)
//     .next().action(2).x(w+random(-10,40)).y(1600+random(-10,20)).pointer(1).delay(500)
//
//     .next().action(1).x(w+random(-10,90)).y(800+random(-10,20)).pointer(1).delay(0);
//

// let h = device.getScreenHeight();
// let w = device.getScreenWidth()/2;
// var moveUp = MultiPoint
//     .get().action(0).x(w+1).y(h/2).pointer(1).delay(0)
//     .next().action(2).x(w+1).y(h*3/5+random(-10,10)).pointer(1).delay(1000)
//     .next().action(1).x(w+1).y(h-random(1,10)).pointer(1).delay(100);
//
//
// var moveDown = MultiPoint
//     .get().action(0).x(w).y(h/2).pointer(1).delay(0)
//     .next().action(2).x(w).y(h*3/5+random(-10,10)).pointer(1).delay(2000)
//     .next().action(1).x(w).y(h-random(0,10)).pointer(1).delay(100);
//
// multiTouch(moveDown, null, null, 1800);

// sleep(2000);
// multiTouch(moveDown, null, null, 30000);

// var moveDown = MultiPoint
//     .get()
//     .action(0).x(w+random(-10,20)).y(790+random(0,10)).pointer(1).delay(2)
//     .next()
//     .action(2).x(w+random(-10,40)).y(810+random(0,10)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(840+random(0,10)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(850+random(0,10)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(880+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(900+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(920+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(940+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(980+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(1000+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(1050+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(1150+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,50)).y(1200+random(-10,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,60)).y(1250+random(-10,20)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,70)).y(1300+random(-10,20)).pointer(1).delay(10)
//     .next().action(2).x(w+random(-10,80)).y(1340+random(-10,20)).pointer(1).delay(10)
//     .next().action(1).x(w+random(-10,80)).y(1800+random(-10,20)).pointer(1).delay(20);



//
// var moveDown = MultiPoint
//     .get().action(0).x(w+random(-30,40)).y(h+random(-300,-200)).pointer(1).delay(2)
//     .next().action(2).x(w+random(-10,20)).y(h+random(-200,0)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(h+random(0,10)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(h+random(20,100)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(h+random(100,200)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-10,40)).y(h+random(200,300)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-30,40)).y(h+random(300,400)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-30,40)).y(h+random(400,500)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-30,40)).y(h+random(500,600)).pointer(1).delay(1)
//     .next().action(2).x(w+random(-30,40)).y(h+random(550,600)).pointer(1).delay(1)
//
//



// var moveDown = MultiPoint
//     .get()
//     .action(0).x(850+random(-10,80)).y(1090+random(0,10)).pointer(1).delay(2)
//     .next()
//     .action(2).x(800+random(-10,40)).y(1100+random(0,10)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1140+random(0,10)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1160+random(0,10)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1180+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1200+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1220+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1240+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1260+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1300+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1050+random(0,20)).pointer(1).delay(1)
//     .next().action(2).x(800+random(-10,40)).y(1150+random(0,20)).pointer(1).delay(1)
//     .next()
//     .action(2).x(810+random(-10,50)).y(1200+random(-10,20)).pointer(1).delay(1)
//     .next()
//     .action(2).x(820+random(-10,60)).y(1250+random(-10,20)).pointer(1).delay(1)
//     .next()
//     .action(2).x(830+random(-10,70)).y(1300+random(-10,20)).pointer(1).delay(10)
//     .next()
//     .action(2).x(850+random(-10,80)).y(1540+random(-10,20)).pointer(1).delay(10)
//     .next()
//     .action(1).x(850+random(-10,80)).y(1900+random(-10,20)).pointer(1).delay(20);

