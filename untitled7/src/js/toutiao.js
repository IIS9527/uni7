//打开方式1 不点击关注
function toutiao1(personName, videoName, dieTime) {
    personName = personName + ''
    personName = changeSpecialChar(personName)
    videoName  = videoName + ''
    console.log(videoName,personName);

    //判断是否在指定直播间，和显示某某来了

    //是在指定直播间且显示某某来了  每十秒判断是不是还在指定直播间
    if (myCome || textMatch(".*" + personName + " 来了").getOneNodeInfo(15000)) {
            console.log("用户进入指定直播间")
            //先截图
            screenshot()
            comeBreakTimes = 0;
            check10Time(videoName, dieTime)

    }
    //没有显示某某来了也不确定进入指定直播间
    else {
        // 情况1 直播间链接过期或者直播间找不到我来了
        console.log("找不到直播间或某某来了重新尝试")
        if (has(textMatch(".*s后进入下场直播.*")) && has(textMatch(videoName))) {
            toast("直播结束");
            console.log("直播结束")
            return false;
        }
        //情况2 上下滑动操作 确认进入指定直播间操作  进入指定直播间
        if (checkCome(personName, videoName)) {

            screenshot();
            //每十秒判断在指定直播间
            comeBreakTimes = 0;
            check10Time(videoName, dieTime)
            //结束退出
            return true
        }
        else {

                // xigua2(nickName,videoName,dieTime)
                //回到主页
                closeAppXiFaTo(projectAppInfo.toutiao.pkgName,null)

                //增加错误次数
                comeBreakTimes++;

                if (comeBreakTimes%5 === 0) {

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
                    console.log("找不到对应直播间，或其他未知错误,下面执行关闭app操作");
                    ui.showLogWindow();
                    sleep(2000);
                    exit();

        }
        }
        //操作失败，找不到对应直播间
        loge("找不到直播间，未知错误")
    }
    //不在指定直播间

}

function toutiao2(personName, videoName, dieTime){
    personName = personName+''
    videoName = videoName +''
    sleep(3000);
    //获取直播人名称

    if (!text(videoName).getOneNodeInfo(3000))  {
        logd("无法获取直播人姓名,判定不在指定直播间");
        return false ;
    }

    //点击关注
    let node=  text("关注").getOneNodeInfo(7000);
    if (node) {
        node.click();
        sleep(2000);

    } else {
        console.log("找不到关注按钮，或已关注")
    }

    //每十秒判断
    check10Time(videoName,time-150*1000)
    //取消关注
    chancleConcern(videoName)



}


function touTiaoThread6(videoName){

    ui.closeLogWindow();

    utils.openApp(projectAppInfo.toutiao.pkgName)

    sleep(3000);
    clickAllow()
    // if (!utils.openApp(projectAppInfo.toutiao.pkgName)) {
    //     if (!utils.openAppByName("今日头条")) {
    //         let map={
    //             "uri":"snssdk141://"
    //         };
    //         utils.openActivity(map);
    //         sleep(2000);
    //     }
    // }

    sleep(6000)
    let selector1 = pkg("com.ss.android.article.news").id("com.ss.android.article.news:id/fgu").getOneNodeInfo(5000);
    if (selector1) {
       selector1.click();
    }

    let selector2 =  clickable(true).pkg("com.ss.android.article.news").id("com.ss.android.article.news:id/cz")
    inputText(selector2,videoName)
    sleep(3000);

    let selector3 = text("搜索").getOneNodeInfo(5000)
    if (selector3) {
        selector3.click();
    }
    sleep(3000);

    let selector4 = text("用户").getOneNodeInfo(5000)
    let result = swipeToPoint(selector4.bounds.center().x, selector4.bounds.center().y, 10, selector4.bounds.center().y, 500);
    sleep(1000);
        result= swipeToPoint(selector4.bounds.center().x, selector4.bounds.center().y, 60, selector4.bounds.center().y, 500);
    if (result) {
        toast("滑动成功");
    } else {
        toast("滑动失败");
    }
    sleep(3000)
    let selector5 = text("直播").drawingOrder(2).getOneNodeInfo(5000)
    if (selector5) {
        selector5.click();
    }
    sleep(3000)
    let selector6 =  descMatch(".*"+videoName+".*正在直播").getOneNodeInfo(5000)
    if (selector6) {
        selector6.clickCenter()
    }

}


function touTiaoThread7(videoNameTouTiao){


    if (videoNameTouTiao == null || videoNameTouTiao === '' ) {
        loge("头条作品id未填写或填写错误")
        return false;
    }
    let map={
        "uri":"snssdk143://"
    };

    utils.openActivity(map);

    sleep(3000);

    clickAllow()

    sleep(6000);

    map={
        "uri":"snssdk143://awemevideo?group_id="+videoNameTouTiao,
    };

    utils.openActivity(map);

    sleep(15000)

    for (let i = 0; i < 4; i++) {

    let selector2 = descMatch(".*头像.*").drawingOrder(1).getOneNodeInfo(6000)
    if(selector2){
        click( descMatch(".*头像.*").drawingOrder(1))
        sleep(5000);
    if ( !descMatch(".*在线观众").getOneNodeInfo(20000)) {
        sleep(2000);
        back();
        sleep(10000)
    }
    else {
        break;
    }
    }
    }
}

function touTiaoThread7_1(personName,videoName,dieTime,videoNameTouTiao){

    personName = personName + ''
    videoName  = videoName + ''
    // console.log(videoName,personName);

    //判断是否在指定直播间，和显示某某来了

    //是在指定直播间且显示某某来了  每十秒判断是不是还在指定直播间

    if (waitExistNode(textMatch(".*" + personName + ".*"), 15000)) {
        if (has(text(videoName))) {
            console.log("用户进入指定直播间")
            //先截图
            screenshot();
            comeBreakTimes=0;
            check10Time(videoName, dieTime)
            return true;
        }
    }
    //没有显示某某来了也不确定进入指定直播间
    else {
        // 情况1 直播间链接过期或者直播间找不到我来了
        console.log("找不到直播间或某某来了重新尝试")
        if (has(textMatch(".*s后进入下场直播.*")) && has(textMatch(videoName))) {
            toast("直播结束");
            console.log("直播结束")
            return false;
        }
        //情况2 上下滑动操作 确认进入指定直播间操作  进入指定直播间
        if (checkCome(personName, videoName)) {
            console.log("用户进入指定直播间")
            //先截图
            screenshot()
            comeBreakTimes=0
            //每十秒判断在指定直播间
            check10Time(videoName, dieTime)
            //结束退出
            return true
        }
        else {

            //返回作品页
            back();
            sleep(1000);
            back();
            sleep(1000);
            back();
            sleep(1000);

            let map={
                "uri":"snssdk143://awemevideo?group_id="+videoNameTouTiao,
            };

            utils.openActivity(map);

            sleep(15000)

            for (let i = 0; i < 4; i++) {

                let selector2 = descMatch(".*头像.*").drawingOrder(1).getOneNodeInfo(6000)
                if(selector2){
                    click( descMatch(".*头像.*").drawingOrder(1))
                    sleep(5000);
                    if ( !descMatch(".*在线观众").getOneNodeInfo(20000)) {
                        sleep(2000);
                        back();
                        sleep(10000)
                    }
                    else {
                        break;
                    }
                }
            }

            let node = waitExistNode(textMatch(".*" + personName + ".*"), 10000);

            //是在指定直播间且显示某某来了  每十秒判断是不是还在指定直播间
            if (node) {
                if (has(text(videoName))) {
                    console.log("用户进入指定直播间")
                    //先截图
                    screenshot()
                    comeBreakTimes=0;
                    check10Time(videoName, dieTime)
                }
            }
            else {
                if (checkCome(personName, videoName)) {
                    console.log("用户进入指定直播间")
                    //先截图
                    screenshot();
                    comeBreakTimes=0;
                    //每十秒判断在指定直播间
                    check10Time(videoName, dieTime)
                    //结束退出
                    return true
                }
                else {

                    //回到主页
                    closeAppXiFaTo(projectAppInfo.toutiao.pkgName,null)
                    //增加错误次数
                    comeBreakTimes++;
                    if (comeBreakTimes%5 === 0) {

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
                        console.log("找不到对应直播间，或其他未知错误,下面执行关闭app操作");
                        ui.showLogWindow();
                        sleep(2000);
                        exit();
                        }
                }
            }
        }
        //操作失败，找不到对应直播间
        loge("找不到直播间，未知错误")
    }
    //不在指定直播间
}
