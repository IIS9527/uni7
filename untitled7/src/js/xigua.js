
function xigua2(nickName,videoName,time){
    let node1 =null;
    videoName = videoName+''
    nickName = nickName +''

    thread.execAsync(function() {
        let t = textMatch("送我一个小心心吧 ").getOneNodeInfo(2000)
        if (t) {clickPoint(device.getScreenWidth()/2,device.getScreenHeight()/2)}

        t = textMatch(".*暂不开启.*").getOneNodeInfo(1000)
        if (t) {t.click();}

        t = textMatch(".*放弃优惠.*").getOneNodeInfo(1000)
        if  (t) {t.click();}
    })
    sleep(2000);

    //获取直播人名称
    if (!text(videoName).getOneNodeInfo(9000))  {logd("无法获取直播人姓名,判定不在指定直播间");return false;}

    node1=  text("关注").getOneNodeInfo(5000);
    if (node1) {node1.click();sleep(1000);}
    else {logi("找不到关注按钮，或已关注");}
    sleep(2000);
    for (let i = 0; i < 5; i++) {
        back();
        sleep(3000)
        if (text("首页").getOneNodeInfo(2000)) {break;}
    }
   //点击选项界面
    sleep(2000)
    //  旧版 选项控件 clz("android.widget.ImageView").id("com.ss.android.article.video:id/yd").drawingOrder(1).index(0)
    //  新版 选项控件 let node2 =   clz("android.widget.ImageView").id("com.ss.android.article.video:id/ye").drawingOrder(1).index(0).getOneNodeInfo(1000)
    node1 = clz("android.widget.ImageView").idMatch("com.ss.android.article.video:id/y.").drawingOrder(1).index(0).getOneNodeInfo(1000)
     if (node1) {node1.click();sleep(3000+random(-100,1000));}
     else {console.log("标签展开页");}
   //点击直播选项
    ui.closeLogWindow();
    sleep(3000);
    node1 =  text("直播").getOneNodeInfo(10000)
    if (node1) {node1.click()}
    else {console.log("无点击直播节点");}

    sleep(3000+random(-100,1000));
    // 模拟手势滑动 刷新直播列表 2次
    //   rnd_Swipe(400,1200,450,1550,30,100,500)
    // centerswipDown();
    // rSwipe.rndSwipe(999, 690, 990, 1600)
    // multiTouch(touchDown, null, null, 30000);

    node1 = text("直播").getOneNodeInfo(10000)
    if (node1) {node1.click()}
    else {console.log("无点击直播节点");}

    sleep(3000+random(-20,20));
    // centerswipDown();
    // rSwipe.rndSwipe(999, 690, 990, 1600)
    // multiTouch(touchDown, null, null, 30000);
    // sleep(3000+random(-20,20));
    node1 = text("直播发现").getOneNodeInfo(1000)
    if (node1) {node1.click();sleep(2000);}
    //点击刚刚关注的人
    for (let i = 0; i < 4; i++) {
        node1 = text(videoName).getOneNodeInfo(2000)
        sleep(2000)
        if (node1) { //找到点击直播间
            clickPoint(node1.bounds.center().x + random(-5, 5), node1.bounds.center().y + random(10, 20))
            sleep(3000 + random(-20, 20));
            break;
        }
        if (i===3) {
            closeAppXiFaTo(projectAppInfo.xigua.pkgName,null)
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
            ui.showLogWindow();
            exit();
        }

        //向左滑动
        let selectors = getNodeInfo( text("直播中"),1000);
        if (selectors) {
            if (selectors.length >4 ) {
                selectors = selectors[selectors.length-2]
                swipeToPoint (selectors.bounds.center().x,selectors.bounds.center().y, 1, selectors.bounds.center().y, 1000);
            }
        }
        else{

            loge("未找到列表，账号不活跃")

            closeAppXiFaTo(projectAppInfo.xigua.pkgName,null)

            utils.openApp(PKGName)

            let m =  {
                "show":true,
                "x": 0,
                "y": device.getScreenHeight()*10/40,
                "w": device.getScreenWidth()/2,
                "h": device.getScreenHeight()/2,
                "textSize": 14

            }

            setLogViewSizeEx(m);

            loge("账号不活跃停止运行账号不活跃停止运行账号不活跃停止运行");

            ui.showLogWindow();

            exit();
        }
    }


    ui.showLogWindow();
    // xiguacheck(nickName,videoName,time);
    sleep(1000);


    if (text(videoName).getOneNodeInfo(10000)&&textMatch(".*" + nickName + " 来了").getOneNodeInfo(30000)) {

        screenshot()

        check10Time(videoName,time,2)

    }
    else {

        //取消关注
        chancelConcern(videoName)
        //回到主页
        closeAppXiFaTo(projectAppInfo.xigua.pkgName,null)

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
        ui.showLogWindow();

        exit();
    }
    return true;

}


//方式1进入直播间
function xiguacheck(nickName,videoName,dieTime){
     let node1 = null;
     nickName = nickName+''
     videoName = videoName+''
     thread.execAsync(
function() {
            let t = textMatch("送我一个小心心吧 ").getOneNodeInfo(2000)
            if (t) {clickPoint(device.getScreenWidth()/2,device.getScreenHeight()/2)}
            t = textMatch(".*暂不开启.*").getOneNodeInfo(1000)
            if (t) {t.click();}
            t = textMatch("放弃优惠").getOneNodeInfo(1000)
            if (t) {fangqiyouhui.click();}
            if (has(text(videoName)) && has(textMatch(".*后进入下场直播.*"))) {
                toast("直播结束");
                loge("直播结束");
                videoDieOut = true
                ui.showLogWindow();
            }
     })
    if (myCome || textMatch(".*" + changeSpecialChar(nickName) + " 来了").getOneNodeInfo(15000)) {
            //先截图
            screenshot()
            comeBreakTimes =0;
            check10Time(videoName,dieTime)
    }
    //找不到 来了 控件 说明没有进入指定直播间
    else {
        //直播间链接过期或者直播间找不到我来了
        console.log("找不到直播间,重新尝试")
        //上下滑动操作确认进入指定直播间
        if (checkCome(nickName,videoName)){
            screenshot();
            comeBreakTimes =0;
            check10Time(videoName,dieTime)
            //结束退出
        }
        else {
            // xigua2(nickName,videoName,dieTime)
            //回到主页
            closeAppXiFaTo(projectAppInfo.xigua.pkgName,null)
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
                exit();
            }
        }
    }
}


function xiGuaStartThread6(videoNameXiGua,videoName){
    let node1 =null;
    ui.closeLogWindow();
    utils.openApp(projectAppInfo.xigua.pkgName)
    sleep(3000);
    clickAllow()
    sleep(5000);
    node1 = textMatch("送我一个小心心吧 ").getOneNodeInfo(2000)
    if (node1) {clickPoint(device.getScreenWidth() / 2, device.getScreenHeight() / 2)}

    node1 = textMatch(".*暂不开启.*").getOneNodeInfo(2000)
    if (node1) {node1.click();}

    node1 = textMatch("放弃优惠").getOneNodeInfo(1000)
    if (node1) {node1.click();
    }
    node1 = id("com.ss.android.article.video:id/hx").getOneNodeInfo(3000);
    if (node1) {node1.clickCenter();}

    sleep(2000)
    let selectors = id("com.ss.android.article.video:id/gr");
    let result = (videoNameXiGua == "" || videoNameXiGua == null ) ? inputText(selectors, videoName) :inputText(selectors,videoNameXiGua);
    sleep(1000);

    if (result) {
        text("搜索").getOneNodeInfo(5000).click();
    } else {
        id("com.ss.android.article.video:id/hx").getOneNodeInfo(2000).clickCenter();
        sleep(2000)
        let selectors = id("com.ss.android.article.video:id/gr");
        videoNameXiGua == ""? inputText(selectors, videoName) :inputText(selectors,videoNameXiGua);
        sleep(1000);
        text("搜索").getOneNodeInfo(5000).click();
    }
    sleep(2000);
    text("直播").getOneNodeInfo(2000).click()
    sleep(2000);
    for (let i = 0; i < 3; i++) {
        node1 = longClickable(false).text(videoName).getOneNodeInfo(5000);
        if (node1) {
           node1 =  text(videoName).getNodeInfo(3000);
           node1[node1.length -1].click()
           break;
        }
        centerswipUp();
        if (i == 2) {
              clickPoint(device.getScreenWidth()/2,device.getScreenHeight()/3)
        }
        sleep(3000);
    }

}

function xiGuaStartThread6_HuaWei(videoNameXiGua,videoName){
    let node1 =null;
    ui.closeLogWindow();
    utils.openApp(projectAppInfo.xigua.pkgName)
    sleep(3000);
    clickAllow()
    sleep(4000);

    node1 = textMatch("送我一个小心心吧 ").getOneNodeInfo(2000)
    if (node1) {clickPoint(device.getScreenWidth() / 2, device.getScreenHeight() / 2)}

    node1 = textMatch(".*暂不开启.*").getOneNodeInfo(2000)
    if (node1) {node1.click();}

    node1 = textMatch("放弃优惠").getOneNodeInfo(1000)
    if (node1) {node1.click();}

    node1=  desc("编辑频道").getOneNodeInfo(6000)
    if (node1) {node1.click();}
    sleep(3000);

    node1= text("直播").getOneNodeInfo(6000);
    if (node1) {click(text("直播"))}

    let w = device.getScreenWidth();
    let h = device.getScreenHeight();

    clickPoint(w/2,h/2)
    node1= descMatch(".*在线观众").getOneNodeInfo(5000)
    if (!node1) {clickPoint(w/2,h/2)}
    else {
        sleep(10000);
        back();
        sleep(3000);
    }
    node1 = id("com.ss.android.article.video:id/hx").getOneNodeInfo(5000);
    if (node1) {node1.clickCenter();}

    sleep(3000)
    let selector5 = id("com.ss.android.article.video:id/gr");
    let result = videoNameXiGua == ""? inputText(selector5, videoName) :inputText(selector5,videoNameXiGua);
    sleep(1000);
    if (result) {text("搜索").getOneNodeInfo(5000).click();}
    sleep(3000);
    text("直播").getOneNodeInfo(2000).click()
    sleep(3000);
    node1 = longClickable(false).text(videoName).getOneNodeInfo(5000);
    if (node1) {click(longClickable(false).text(videoName));}
    else {clickPoint(w/2,h/3)}
}



