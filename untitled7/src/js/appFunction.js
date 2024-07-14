function check10Time(videoName, dieTime,type) {
    let node1 = null;
    videoName = videoName + ''
    let onLineTime = new Date().getMinutes();
    let state =0;
    // 按照设定时长
//     1696199317079
    while (true) {
        //检查弹出窗

        node1=  textMatch("恭喜获得|看视频立即领取|新人限时专享").getOneNodeInfo(2000);
        if (node1) {click(clickable(true).drawingOrder(0).depth(19).index(4))}

        node1 = textMatch("直播已结束").getOneNodeInfo(2000)
        if (node1) {videoDieOut = true}

        node1 = textMatch("暂不开启|暂不使用").getOneNodeInfo(1000)
        if  (node1) {node1.click();}

        node1 = textMatch("放弃优惠").getOneNodeInfo(1000)
        if  (node1) {node1.click();}

        node1 =  textMatch("升级版本").getOneNodeInfo(1000)
        if (node1) {desc("关闭").drawingOrder(1).getOneNodeInfo(2000).click()}

        node1 = descMatch(".*在线观众").getOneNodeInfo(5000)
        if (node1 && waitExistNode(text(videoName), 5000)) {
            Working = true;
            checkTimes = 0;
            setFixedViewText("版本号："+ui.getConfig("version")+"\n"+"抖音昵称:" + ui.getConfig("personName") + "  机器编码:" + ui.getConfig("deviceNickName")
                + " 直播名称:" + ui.getConfig("videoName") + " 时长:" + (new Date().getMinutes() - onLineTime) + "分钟")
            //可以在这反馈给服务端一些东西
            logi("任务倒计时" + "" + Math.trunc(ui.getConfig("time") / 60000 - new Date().getTime() / 60000) + "分钟");
            if (stopWork) {
                loge("连接服务器错误");
            }
            if ((type == 2 && dieTime -150*1000 < new Date().getTime() && state == 0) ){
                chancelConcern(videoName)
                state = 1;
            }
        }

        // 不在直播间了

        else {

            clickPoint(550 + random(-10, 10), 150 + random(-10, 10))

            sleep(1000);

            if (descMatch(".*在线观众").getOneNodeInfo(5000) && waitExistNode(text(videoName), 10000)) {
                Working = true;
                checkTimes = 0;
                setFixedViewText("版本号："+ui.getConfig("version")+"\n"+"抖音昵称:" + ui.getConfig("personName") + "  机器编码:" + ui.getConfig("deviceNickName")
                    + " 直播名称:" + ui.getConfig("videoName") + " 时长:" + (new Date().getMinutes() - onLineTime) + "分钟")
                //可以在这反馈给服务端一些东西
              logi("任务倒计时" + "" + Math.trunc(ui.getConfig("time") / 60000 - new Date().getTime() / 60000) + "分钟");
                if (stopWork) {
                    loge("连接服务器错误");
                }
                continue;
            }
            checkTimes = checkTimes+1;
            if (checkTimes%4 === 0 ) {
                console.log("不在直播间了")
                return false;
            }
        }
    }
}



//检查来到直播间 旧
// function checkCome(personName,videoName){
//
//     personName = personName + ''
//
//     videoName = videoName+''
//
//     personName = changeSpecialChar(personName)
//
//     let j = 3
//     for (; j <= 6; j++) {
//         // centerswipUp();
//         // rSwipe.rndSwipe(240, 1400, 10, 300,30,100,500)
//
//         // if (ui.isAgentMode()) {
//         //
//             centerswipUp();
//             // logi("滑动直播间");
//         //
//         // }
//         // if (ui.isAccMode()) {
//
//             // rSwipe.rndSwipe(device.getScreenWidth()/2,device.getScreenHeight()/2,device.getScreenWidth()/2,1)
//
//             // multiTouch(moveUp, null, null, 30000);
//
//         // }
//         //弹窗检测
//         sleep(2000);
//         thread.execAsync(function() {
//             let fangqiyouhui = textMatch("放弃优惠").getOneNodeInfo(1000)
//             if (fangqiyouhui) {
//                 fangqiyouhui.click();
//             }
//
//             let node = textMatch("开心收下").getOneNodeInfo(1000)
//             if (node) {
//                 clickPoint(device.getScreenWidth() / 2, device.getScreenHeight() / 2)
//             }
//
//             let zanbukaiqi = textMatch("暂不开启|暂不使用").getOneNodeInfo(1000)
//             if (zanbukaiqi) {
//                 zanbukaiqi.click();
//             }
//
//             let shengJiBanBen = textMatch("升级版本").getOneNodeInfo(1000)
//             if (shengJiBanBen) {
//                 desc("关闭").drawingOrder(1).getOneNodeInfo(2000).click()
//             }
//             })
//         sleep(2000);
//
//          let onLinePeople = descMatch(".*在线观众").getOneNodeInfo(10000)
//
//          sleep(1000);
//
//          if (onLinePeople && parseInt(onLinePeople.text) < 200) {
//
//             // console.log("进入两百人以下直播间")
//             if (textMatch(".*" + personName + " 来了").getOneNodeInfo(30000)) {
//                 // console.log("判定到直播间，执行返回指定直播间")
//                 sleep(4000+random(-1000, 500));
//                 for (; j > 0; j--) {
//                     centerswipDown();
//                     sleep(4000 + random(-1000, 500));
//                 }
//
//                 if (textMatch(".*" + personName + " 来了").getOneNodeInfo(30000) && text(videoName).getOneNodeInfo(10000)) {
//                     console.log("找到指定直播间")
//                     return true;
//                 }
//                 else {
//
//                    return false;
//
//                 }
//
//             }
//         else {
//                 loge("200人不活跃");
//                     break;
//                             // closeAppXiFaTo(null, parseInt(ui.getConfig("appId") + ''))
//                 // exit();
//             }
//             // console.log("现在判断某某来了")
//
//             // loge("没找到指定直播间")
//             // return false;
//         }
//         else if(onLinePeople){
//
//             if (textMatch(".*" + personName + " 来了").getOneNodeInfo(10000)) {
//                 // console.log("判定到直播间，执行返回指定直播间")
//                 for (; j > 0; j--) {
//                     // centerswipDown();
//                     // rSwipe.rndSwipe(190, 450, 390, 1800)
//                     // if (ui.isAgentMode()) {
//                     //     centerswipDown();
//                     // }
//                     // if (ui.isAccMode()) {
//                     //     multiTouch(moveDown, null, null, 3000);
//                     centerswipDown();
//                     //     // rSwipe.rndSwipe(device.getScreenWidth()/2,device.getScreenHeight()/2,device.getScreenWidth()/2,device.getScreenHeight()-10)
//                     //
//                     // }
//                     sleep(5000 + random(-1000, 1000));
//                 }
//                 if (textMatch(".*" + personName + " 来了").getOneNodeInfo(30000) && text(videoName).getOneNodeInfo(10000)) {
//                     // console.log("找到指定直播间")
//                     // screenshot()
//
//                     return true;
//                 }
//                 else {
//                     return false;
//                 }
//         }
//
//         sleep(2000);
//     }
// }
//     for (; j > 0; j--) {
//         // centerswipDown();
//         // rSwipe.rndSwipe(190, 450, 390, 1800)
//         // if (ui.isAgentMode()) {
//             centerswipDown();
//         // }
//         // if (ui.isAccMode()) {
//         //     multiTouch(moveDown, null, null, 3000);
//         //     // rSwipe.rndSwipe(device.getScreenWidth()/2,device.getScreenHeight()/2,device.getScreenWidth()/2,device.getScreenHeight()-10)
//         //
//         // }
//             let fangqiyouhui = textMatch("放弃优惠").getOneNodeInfo(1000)
//             if  (fangqiyouhui) {
//                 fangqiyouhui.click();
//             }
//         sleep(5000 + random(-1000, 1000));
//     }
//     if (textMatch(".*" + personName + " 来了").getOneNodeInfo(10000) && text(videoName).getOneNodeInfo(10000)) {
//         return true;
//     }
//     loge("下滑五次找不到200人以下直播间或不显示人数");
//     return false;
//
// }
//检查来到直播间

function checkCome(personName,videoName){

    personName = personName + ''

    videoName = videoName+''

    personName = changeSpecialChar(personName)

    let j = 1

    for (; j <= 1; j++) {
        if (centerswipUp()) {
            //弹窗检测
            sleep(2000);
            thread.execAsync(function() {
                let t = textMatch("放弃优惠").getOneNodeInfo(1000)
                if (t) {
                    t.click();
                }

               t = textMatch("开心收下").getOneNodeInfo(1000)
                if (t) {
                    clickPoint(device.getScreenWidth() / 2, device.getScreenHeight() / 2)
                }

                t = textMatch("暂不开启|暂不使用").getOneNodeInfo(1000)
                if (t) {
                    t.click();
                }

                t = textMatch("升级版本").getOneNodeInfo(1000)
                if (t) {
                    desc("关闭").drawingOrder(1).getOneNodeInfo(2000).click()
                }
            })

        }
        else {
            centerswipUp()
        }
        sleep(random(3000,4000));
    }
    for (; j >= 0; j--) {
        centerswipDown();
        if(textMatch(".*" + personName + " 来了").getOneNodeInfo(15000) && text(videoName).getOneNodeInfo(15000)) {
            return true;
        }
        sleep(3000);
    }
    return false;
}
//取消关注函数
function  chancelConcern(videoName){
    videoName = videoName+''
    //点击头像
    // let node5= id("com.ss.android.article.video:id/bc").drawingOrder(1).depth(17).index(1).getOneNodeInfo(2000)
    ui.closeLogWindow();
    let node5 =  text(videoName).getOneNodeInfo(10000);
    if (node5) {
        node5.click();
        sleep(4000);
        let node6 = text("取消关注").getOneNodeInfo(3000)
        if (node6) {
            node6.click();
            sleep(4000)
            let node7 = text("确定").getOneNodeInfo(3000)
            sleep(4000);
            if (node7) {
                node7.click();
                sleep(1000);
                back();
            } else {
                loge("取消关注失败");
                return false
            }
        } else {   loge("取消关注失败");
            return false
        }
    } else {
        loge("取消关注失败");
        return false

    }
  ui.showLogWindow();
}






// function
// var result = agentEvent.fastScreenshot("/sdcard/a.jpg");
// toast("result:"+result);
//* 爱探险的朵拉 来了
//
// console.log(textMatch(".*" + "爱探险的朵拉" + " 来了").getOneNodeInfo(300))
// con
//
// function checkCome(personName, videoName) {
//
//     personName = personName + ''
//
//     videoName = videoName + ''
//
//     for (let j = 1; j <= 6; j++) {
//         // centerswipUp();
//         // rSwipe.rndSwipe(240, 1400, 10, 300,30,100,500)
//
//
//         if (ui.isAgentMode()) {
//             centerswipUp();
//         }
//         if (ui.isAccMode()) {
//             multiTouch(touchUp, null, null, 30000);
//         }
//
//
//         sleep(1000);
//
//         let onLinePeople = descMatch(".*在线观众").getOneNodeInfo(10000)
//         sleep(3000);
//         if (onLinePeople && onLinePeople.text < 200) {
//
//             console.log("进入两百人以下直播间")
//             if (textMatch(".*" + personName + " 来了").getOneNodeInfo(30000)) {
//                 console.log("判定到直播间，执行返回指定直播间")
//                 for (; j > 0; j--) {
//                     // centerswipDown();
//                     // rSwipe.rndSwipe(190, 450, 390, 1800)
//                     if (ui.isAgentMode()) {
//                         centerswipDown();
//                     }
//                     if (ui.isAccMode()) {
//                         multiTouch(touchDown, null, null, 30000);
//                     }
//
//
//                     sleep(5000 + random(-1000, 1000));
//
//                 }
//             } else {
//                 loge("200人不活跃，停止脚本");
//                 closeAppXiFaTo(null, parseInt(ui.getConfig("appId") + ''))
//                 exit();
//             }
//             sleep(2000)
//             // console.log("现在判断某某来了")
//             if (textMatch(".*" + personName + " 来了").getOneNodeInfo(30000) && text(videoName).getOneNodeInfo(10000)) {
//                 // console.log("找到指定直播间")
//                 screenshot()
//                 return true;
//             }
//             loge("没找到指定直播间")
//             return false;
//         }
//         sleep(5000);
//     }
//
//     loge("下滑五次找不到200人以下直播间，或不显示人数，退出尝试");
//
//     return false;
//
// }sole.log(text("* "+"爱探险的朵拉"+" 来了").getOneNodeInfo(30000))