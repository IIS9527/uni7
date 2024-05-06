//开启任务主线程 执行服务端发来的
function mainTaskThread(){

    let roomAddress    = ui.getConfig("roomAddress")+''
    //time 是时间戳
    let time       = ui.getConfig("time")+''
    //1 方式1 2 方式2
    let type   =  ui.getConfig("openType")+''

    let personName = ui.getConfig("personName")+''

    let videoName = ui.getConfig("videoName")+''
    // logd("ss"+videoName)

    let videoNameXiGua = ui.getConfig("videoNameXiGua");

    let appId =parseInt( ui.getConfig("appId") +'');

    let  videoNameTouTiao = ui.getConfig("videoNameTouTiao") + ''

    let tid =thread.execAsync(function() {

        // logd(videoName);

        // 随机休息几秒 尽量 不让脚本同时进入直播间

        sleep(random(1000,20000));

        if (type == 3|| type == 1 ) {

            //提前打开app直播间

            if (appId == projectAppInfo.xigua.app_id) {

                ui.closeLogWindow();
                sleep(1000)

                utils.openApp(projectAppInfo.xigua.pkgName)

                sleep(2000);

                clickAllow()

                sleep(10000);

                // 去除弹窗
                    let t = textMatch("送我一个小心心吧 ").getOneNodeInfo(2000)

                    if (t) {

                        clickPoint(device.getScreenWidth()/2,device.getScreenHeight()/2)

                    }

                    let zanbukaiqi = textMatch(".*暂不开启.*").getOneNodeInfo(2000)

                    if (zanbukaiqi) {

                        zanbukaiqi.click();

                    }
                    sleep(1000);
                //去除弹窗线程
                let tid =  thread.execAsync(function() {

                    let fangqiyouhui = textMatch(".*放弃优惠.*").getOneNodeInfo(1000)

                        if  (fangqiyouhui) {

                            fangqiyouhui.click();

                        }})

                sleep(8000);

                thread.cancelThread(tid)

                let close= desc("关闭").getOneNodeInfo(3000)
                    if (close) {
                        close.click();
                    }

                let node2 = clz("android.widget.ImageView").idMatch("com.ss.android.article.video:id/y.").drawingOrder(1).index(0).getOneNodeInfo(10000)

                if (node2) {

                    node2.click();

                    sleep(5000 + random(-100, 1000));

                } else {

                    console.log("标签展开页");

                }

                sleep(4000);

                let node3 = text("直播").getOneNodeInfo(10000)

                if (node3) {

                    node3.click();

                    sleep(4000);

                }

                clickPoint(device.getScreenWidth()/2, device.getScreenHeight()/2)

                sleep(5000);

                let node4 = text("点击进入直播间").getOneNodeInfo(10000)

                if (node4) {

                    node4.click();
                    let fangqiyouhui = textMatch(".*放弃优惠.*").getOneNodeInfo(10000)
                    if  (fangqiyouhui) {
                            fangqiyouhui.click();
                    }

                    sleep(20000);
                }
                sleep(3000);

                for (let i = 0; i < 5; i++) {

                    back();

                    sleep(3000)

                    if (text("首页").getOneNodeInfo(2000)) {
                        break;
                    }

                }

                sleep(3000)

                ui.showLogWindow();

                sleep(8000);

            }

            if (appId == projectAppInfo.fanqie.app_id) {

                ui.closeLogWindow();

                utils.openApp(projectAppInfo.fanqie.pkgName)

                sleep(3000);

                clickAllow()


                sleep(2000);

                let node3 = text("直播").getOneNodeInfo(10000)

                if (node3) {

                    node3.click()

                }

                sleep(3000);

                clickPoint(device.getScreenWidth() / 2, device.getScreenHeight() / 2)

                sleep(3000);

                let node4 = text("点击进入直播间").getOneNodeInfo(10000)

                if (node4) {

                    node4.click()
                        let 残忍离开 = textMatch(".*残忍离开.*").getOneNodeInfo(10000)
                        if  (残忍离开) {
                            残忍离开.click();
                        }

                    sleep(15000);

                }

                back();
                sleep(5000);
                ui.showLogWindow();

                sleep(8000);

            }
        }

        else if (type == 4){
            if (appId == projectAppInfo.xigua.app_id) {

                ui.closeLogWindow();

                sleep(1000);

                utils.openApp(projectAppInfo.xigua.pkgName)

                sleep(3000);

                clickAllow()

                sleep(3000);

                thread.execAsync(function () {

                    let t = textMatch("送我一个小心心吧 ").getOneNodeInfo(2000)

                    if (t) {
                        clickPoint(device.getScreenWidth() / 2, device.getScreenHeight() / 2)
                    }
                    let fangqiyouhui = textMatch(".*放弃优惠.*").getOneNodeInfo(4000)

                    if (fangqiyouhui) {
                            fangqiyouhui.click();
                    }
                    let zanbukaiqi = textMatch(".*暂不开启.*").getOneNodeInfo(4000)
                    if (zanbukaiqi) {
                        zanbukaiqi.click();
                    }
                })
                sleep(10000);
            }
            else if (appId == projectAppInfo.toutiao.app_id) {

                ui.closeLogWindow();

                sleep(1000);

                utils.openApp(projectAppInfo.toutiao.pkgName)
                sleep(5000);

                clickAllow()

                sleep(5000);

                thread.execAsync(function () {

                    let t = textMatch("送我一个小心心吧 ").getOneNodeInfo(2000)

                    if (t) {
                        clickPoint(device.getScreenWidth() / 2, device.getScreenHeight() / 2)
                    }
                    let zanbukaiqi = textMatch(".*暂不开启.*").getOneNodeInfo(2000)
                    if (zanbukaiqi) {
                        zanbukaiqi.click();
                    }
                })
                    let fangqiyouhui = textMatch(".*放弃优惠.*").getOneNodeInfo(4000)

                    if (fangqiyouhui) {
                        fangqiyouhui.click();
                    }
                sleep(10000);

            }
        }
        else if(type == 6) {
            //西瓜方式5
            if (appId == projectAppInfo.xigua.app_id) {
                let brand = device.getBrand();
                toast(brand);
                if (brand == "HuaWei"|| brand == "Huawei") {
                    xiGuaStartThread6_HuaWei(videoNameXiGua,videoName)
                }
                else {
                    xiGuaStartThread6(videoNameXiGua,videoName)
                }
            }

            //头条方式5
            if (appId == projectAppInfo.toutiao.app_id) {

                touTiaoThread6(videoName)

            }
        }
        else  if (type == 7) {

            //头条方式6
            if (appId == projectAppInfo.toutiao.app_id) {

                if (videoNameTouTiao != null || videoNameTouTiao != "") {
                    touTiaoThread7(videoNameTouTiao)
                }

            }
        }

        if (type == 1 || type == 2 || type == 5) {
        let openVia1 = openVia(roomAddress)
        if (!openVia1) {
            return false;
        }
         }
        else if (type == 3 || type == 4 ) {
              myCome =null
           thread.execAsync(function () {
               myCome = textMatch(".*" + changeSpecialChar(personName) + " 来了").getOneNodeInfo(40000)
            })
        openApp(ui.getConfig("appId")+'')
        }




        if (projectAppInfo.xigua.app_id === appId &&  (text(videoName).getOneNodeInfo(10000)   || waitExistActivity(projectAppInfo.xigua.activity,5000) || waitExistActivity(projectAppInfo.xigua.activityOld,5000) )){

            // videoName = videoNode.text
            if (type == 1 || type == 3 || type ==5 || type == 4 || type == 6) {
                console.log("西瓜1，3")
                xiguacheck(personName,videoName,time)

            }

           else if ( type == 2 ) {

                console.log("西瓜2")
                xigua2(personName,videoName,time)

            }
        }
        else if (projectAppInfo.fanqie.app_id === appId &&  (text(videoName).getOneNodeInfo(10000) || waitExistActivity(projectAppInfo.fanqie.activity,10000)) ){

            if (type == 1 || type == 3 || type ==5 || type == 4) {
                console.log("番茄1，3")
                fanqie1(personName,videoName,time)

            }

           else if ( type == 2 ) {
                fanqie2(personName,videoName,time)
                console.log("番茄2")
            }

        }
        else if (projectAppInfo.toutiao.app_id === appId && (text(videoName).getOneNodeInfo(10000)  || waitExistActivity(projectAppInfo.toutiao.activity,10000))) {

            if (type == 1 || type == 3 || type == 5 || type == 4 || type==6 ) {
                console.log("头条1,3,6,7")
                sleep(3000);
                toutiao1(personName,videoName,time)
            }
            else if (type == 7) {
                sleep(3000);
                touTiaoThread7_1(personName,videoName,time,videoNameTouTiao)
            }

            // if (type == 2) {
            //     toutiao2(personName,videoName,time)
            // }

        }
        else {

            logd("sss"+ getRunningPkg(),getRunningActivity())

            console.log("打开app错误")

        }

    });

    //线程三 关闭app线程 监听任务线程 如果任务线程结束 关闭相应app
    // let closeApp = closeAppThread(tid,pagName);

    // console.log( agentEvent.sleepScreen())
    // console.log(  agentEvent.lightScreen())

    return tid

}




function  clickAllow(){
    let checkOpen = text("允许").getOneNodeInfo(5000);
    if (checkOpen) {
        console.log("点击允许");
        checkOpen.clickCenter()
        sleep(1000);
        checkOpen = text("允许").getOneNodeInfo(1000);
        if (checkOpen) {
            checkOpen.click();
            console.log("点击允许2");
        }
    }
}
