function  centerswipDown(){
    let w = device.getScreenWidth()/2
    let h = device.getScreenHeight()
    let result1 = swipeToPoint( w, h/2+random(-60,-30), w, h-5, 500+random(-40,10));
    // let result1 = drag(w, h/2, w, h, 1000)
    if (result1) {
        return true;

    } else {

        console.log("滑动失败");
        return  false;
    }
}

function  centerswipUp(){

    let w = device.getScreenWidth()/2

    let h = device.getScreenHeight()

    let result1 = swipeToPoint(w, h/2+random(25,30),w , 1, 500+random(-40,10));

    if (result1) {

        return true;

    } else {
        toast("滑动失败");
         return false;
    }
}
// logi(centerswipUp())