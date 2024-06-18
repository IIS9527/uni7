//打开方式1 不点击关注
function fanqie1(personName, videoName, dieTime) {
    personName = personName + ''
    videoName  = videoName + ''

    thread.execAsync(function() {
     let is_gard=  textMatch("恭喜获得|看视频立即领取").getOneNodeInfo(2000);
     if (is_gard) {
         click(clickable(true).drawingOrder(0).depth(19).index(4))
    }})

    //判断是否在指定直播间，和显示某某来了
    let node = waitExistNode(textMatch(".*" + personName + ".*"), 15000);
    //是在指定直播间且显示某某来了  每十秒判断是不是还在指定直播间
    if (node) {
        if (has(textMatch(".*"+videoName+".*"))) {

            // console.log("进入直播间")
            //先截图
            screenshot()
            check10Time(videoName, dieTime);
        }
    }
    //没有显示某某来了也不确定进入指定直播间
    else {
        // 情况1 直播间链接过期或者直播间找不到我来了
        // console.log("找不到直播间或某某来了重新尝试")
        if (has(textMatch(".*s后进入下场直播.*")) && has(textMatch(videoName))) {
            toast("直播结束");
            console.log("直播结束")
            return false;
        }
        //情况2 上下滑动操作 确认进入指定直播间操作  进入指定直播间
        if (checkCome(personName, videoName)) {
            screenshot();
            //每十秒判断在指定直播间
            check10Time(videoName, dieTime)
            //结束退出
            return true;
        }
        else  {//方式一进入无法找到进入方式二
            // logd("切换方式二");
            // fanqie2(personName, videoName, dieTime)
            closeAppXiFaTo(projectAppInfo.fanqie.pkgName,null)
            utils.openApp(PKGName)
            let m =  {
                "show":true,
                "x": 0,
                "y": device.getScreenHeight()*10/40,
                "w": device.getScreenWidth()/2,
                "h": device.getScreenHeight()/2,
                "textSize": 14,
            }
            setLogViewSizeEx(m);
            loge("账号不活跃停止运行账号不活跃停止运行账号不活跃停止运行");
            loge("找不到对应直播间，或其他未知错误,下面执行关闭app操作");
            ui.showLogWindow();
            sleep(1000);
            exit();
        }
        //操作失败，找不到对应直播间
        loge("找不到直播间，未知错误")
    }
    //不在指定直播间
}




//打开方式2 点击关注
function fanqie2(personName, videoName,time) {
    personName = personName+''
    videoName = videoName + ''
    // console.log(personName,videoName,time)
    thread.execAsync(function() {
        let is_gard=  textMatch("恭喜获得|看视频立即领取|新人限时专享").getOneNodeInfo(4000);
        if (is_gard) {

            click(clickable(true).drawingOrder(0).depth(19).index(4))
        }})


    sleep(1000);

    //点击关注
    let node = text("关注").getOneNodeInfo(7000);
    if (node) {
        node.click();
        sleep(1000);
    } else {
        console.log("找不到关注按钮，或已关注")
    }
    //获取直播人名称
    if (!waitExistNode(text(videoName),5000)) {
        logd("无法获取直播人姓名,判定不在指定直播间");
        return false;
    }
    sleep(1000);
    let result = back();
    if (result) {
        sleep(2000);
        if (textMatch(".*在线观众.*").getOneNodeInfo(2000)) {
            back();
            sleep(2000)
        }

    } else {
        toast("失败");
    }
    /*
    *
    * 找直播标签  各个app不一样的地方
    *
    *
    * */
    ui.closeLogWindow();
    //找到点击直播标签
    // let node3 = text("直播").getOneNodeInfo(2000)
       let node3 = text("我的").getOneNodeInfo(2000)
    if (node3) {
        node3.click()
        sleep(2000 + random(-100, 1000));
    } else {

        console.log("无点击直播节点");

    }

    // rSwipe.rndSwipe(190, 450, 390, 1800)
    // multiTouch(null, null, null, 30000);

    sleep(3000 + random(-20, 20));

    //点击刚刚关注的人
    for (let i = 0; i < 4; i++) {
        let node6 = text(videoName).getOneNodeInfo(2000)
        if (node6) { //找到点击直播间
            clickPoint(node6.bounds.center().x + random(-5, 5), node6.bounds.center().y + random(10, 20))
            sleep(3000 + random(-20, 20));
            break;
        }
        //向左滑动
        let selectors = getNodeInfo( text("直播中"),1000);
        // console.log(selectors.length)
            selectors = selectors[selectors.length-2]
        swipeToPoint (selectors.bounds.center().x,selectors.bounds.center().y, 1, selectors.bounds.center().y, 1000);
        sleep(500);

    }

    ui.showLogWindow();


    if (text(videoName).getOneNodeInfo(10000)&&textMatch(".*" + personName + " 来了").getOneNodeInfo(30000)) {

        screenshot()

        check10Time(videoName, time,2)

        //结束退出

    }

     else {
        //取消关注
        chancelConcern(videoName)
        closeAppXiFaTo(getRunningPkg(),null)
        //回到主页
        utils.openApp(PKGName)
        let m =  {
            "show":true,
            "x": 0,
            "y": device.getScreenWidth()*10/40,
            "w": device.getScreenWidth()/2,
            "h": device.getScreenHeight()/2,
            "textSize": 14,
        }
        setLogViewSizeEx(m);
        loge("账号不活跃停止运行账号不活跃停止运行账号不活跃停止运行");
        ui.showLogWindow();
        exit();
    }


    // fanqie1(personName,videoName,time-150*1000)

    //执行完毕 取消关注


    return true;


}

//取消关注函数
function fanqieChancleConcern(videoName) {


    /*
    *
    * 每个 app头像控件不一样
    * 旧版番茄 clz("android.widget.ImageView").id("com.xs.fm:id/l2").drawingOrder(3).depth(20).index(1)
    *
    *
    * */
    //点击头像
    let node5 = text(videoName).getOneNodeInfo(2000)

    if (node5) {
        node5.click();
        sleep(3000);
        let node6 = text("取消关注").getOneNodeInfo(3000)
        if (node6) {
            node6.click();
            sleep(4000)
            let node7 = text("确定").getOneNodeInfo(3000)
            sleep(500);
            if (node7) {
                node7.click();
                sleep(1000);
                back();
            } else {
                logd("取消关注失败");
                return false
            }
        } else {
            logd("取消关注失败");
            return false
        }
    } else {
        logd("取消关注失败");
        return false

    }

}