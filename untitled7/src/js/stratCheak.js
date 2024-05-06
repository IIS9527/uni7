//初始化模块
function startIntIt(){


    //保活？？
    // daemonEnv(true);
    //保持唤醒
    importClass(android.os.PowerManager)
    device.keepAwake(PowerManager.SCREEN_DIM_WAKE_LOCK|PowerManager.ACQUIRE_CAUSES_WAKEUP);
    device.keepScreenOn();
    if (daemonEnv(true)) {
        logi("启动守护自动化环境")
    } else {
        loge("启动守护自动化环境失败");
    }
    setSaveLog(true,"/sdcard/aaa/",1024*1024)



    let result = setFetchNodeMode(2, false, true, "bfs");
    logi("result1:" + result);

    // 运行模式
    if ( ui.isAccMode()) {
        // console.log("无障碍模式")
        toast("无障碍模式")
    }

    if ( ui.isAgentMode()) {
        console.log("代理模式")
        toast("代理模式")
    }

    //判断参数
    let cardNo =ui.getConfig("cardNo")+'';
    if (!cardNo) {
        console.log("请输入账号")
        toast("请输入账号")
        return false
    }ui.saveConfig("cardNo",cardNo)

    let password =ui.getConfig("password")+'';
    if (!password) {
        console.log("请输入密码")
        toast("请输入密码")
        return false
    } ui.saveConfig("password",password)

    let personAddress =ui.getConfig("personAddress")+'';
    if (!personAddress) {
        console.log("请输入个人链接")
        toast("请输入个人链接")
        return false
    }
    else {
        ui.saveConfig("personAddress",personAddress)
        let personName =   getPersonInfo(personAddress)
        if (!personName) {
            console.log("个人链接解析错误")
            toast("请输入个人链接")
            return false
        }else {
            ui.saveConfig("personName",personName)
        }
    }

    let appId =ui.getConfig("appId")+'';
    if (!appId) {
        console.log("请选择app")
        toast("请选择app")
        return false
    }ui.saveConfig("appId",appId)

    let  openType =ui.getConfig("openType")+'';
    if (!openType) {
        console.log("请选择执行方式1或2")
        toast("请选择执行方式1或2")
        return false;
    }
    ui.saveConfig("openType",openType)

    if (!isServiceOk()) {
        toast("请检查是否开启运行模式环境")
        return false;
    }

    autoRequestScreenCapture();


    // if (ui.isAgentMode()) {
    //     toast("代理模式启动")
    // }

    //打开电池优化申请 判断是否加入白名单
    importClass(android.os.PowerManager);
    // importClass(android.Settings)
    var pm =  context.getSystemService(context.POWER_SERVICE);
    if (!pm.isIgnoringBatteryOptimizations(PKGName)) {
        importClass(android.content.Intent);
        importClass(android.net.Uri)
        console.log(getRunningPkg())
        var intent = new Intent();
        intent.setAction("android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS");
        intent.setData(Uri.parse("package:"+PKGName))
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        try {
            context.startActivity(intent);
            sleep(2000);
           let s= textMatch("无限制|允许|立即开始").getOneNodeInfo(2000);

            if (s) {
                clickPoint(s.bounds.center().x,s.bounds.center().y)
            }
            toast("请开启忽略电池优化");


        } catch (e) {
            loge(e)
        }
    }
    sleep(10000);
    if (pm.isIgnoringBatteryOptimizations(PKGName)) {
         toast("开启忽略电池优化")

    }


    //悬浮窗权限
    let p = floaty.requestFloatViewPermission(10000)

    if (!p) {
        toast("没有浮窗权限，终止执行");
        return false;
    }
    //
    if (!getRunningActivity()|| !getRunningPkg()) {
        console.log( ui.startEnv())
    }

    let w = device.getScreenWidth();
    let h = device.getScreenHeight();
    // console.log(w,h,)



    sleep(100);
    showLogWindow();
    let m =  {
        "show":true,
        "x": 0,
        "y": h*7/40,
        "w": (w/3*2)-5,
        "h": h/2,
        "textSize": 16,
    }

    //
    sleep(1000);
    setLogViewSizeEx(m);

    let  m2 =  {
        "show":true,
        "textSize":10,
        "x": 0,
        "y": h*7/40,
        "w": (w/2)-5,
        "h": h/16
    }

    setLogFixedViewEx(m2);

    setFixedViewText("版本号："+ui.getConfig("version")+"\n"+"抖音昵称:"+ui.getConfig("personName")+"  机器编码："+ui.getConfig("deviceNickName")+" 直播名称"+ui.getConfig("videoName")+" 时长:还未进入直播间")

    setFetchNodeMode(1,true,true,"nfs")

    if (home()) {
        back();
        sleep(200);
        back();
        sleep(200);
        back();
        sleep(200);
        back();
        sleep(200);
        back();
    }

    return true;

}


