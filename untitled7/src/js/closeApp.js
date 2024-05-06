function closeAPP(pkgName) {


    pkgName=pkgName+''


    back();

    sleep(2000)


    if (isAgentMode()) {

        if (shell.stopApp(pkgName)) {
         return true;
        }
        else {




        }

    }


    utils.openActivity({
        "action": "android.settings.APPLICATION_DETAILS_SETTINGS",
        "uri": "package:" + pkgName
    });
    // utils.openActivity()
    // console.log(pkgName)
    // console.log(getRunningPkg(),"开始执行关闭app操作")
    // try {
    //     importClass(android.content.Intent);
    //     importClass(android.net.Uri)
    //     //let pkgName = getRunningPkg().toString();
    //     let intent = new Intent();
    //     intent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
    //     let uri = Uri.parse("package:" + pkgName);
    //     intent.setData(uri);
    //     intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    //     context.startActivity(intent);
    // } catch (e) {
    //     loge(e)
    // }
    sleep(8000)
   let is_sure=  textMatch("结束进程|结束运行|强行停止|强行结束|强制停止|强制结束");

    // let is_sure = textMatch(".*强.*|.*停.*|.*结.*|.*行.*").getOneNodeInfo(1000).click();
    let issure = is_sure.getOneNodeInfo(6000);
    sleep(2000);

    if ( issure ) {
        let resl = clickRandom(is_sure);
        sleep(2000)
        logi(resl + "");
        click(clickable(true).textMatch(".*确.*|.*定.*|强制停止|结束进程|结束运行|强行停止"));
        sleep(2000);
        home();
        sleep(2000);
        back();
        console.log("关闭成功")
    } else {
        loge(pkgName + "应用不能被正常关闭或不在后台运行,关闭应用失败");
        back();
    }

}

function closeAppXiFaTo(pkgName,appId){
    appId = appId+''
    console.log(appId)
    if (pkgName === projectAppInfo.xigua.pkgName || pkgName === projectAppInfo.toutiao.pkgName || pkgName === projectAppInfo.fanqie.pkgName) {
        closeAPP(pkgName)
        return true;
    }
    else if (projectAppInfo.xigua.app_id == appId) {
        closeAPP(projectAppInfo.xigua.pkgName)
        return true;
    }
    else if (projectAppInfo.toutiao.app_id == appId) {
        closeAPP(projectAppInfo.toutiao.pkgName)
        return true;
    }
    else if (projectAppInfo.fanqie.app_id == appId) {
        closeAPP(projectAppInfo.fanqie.pkgName)
        return true;
    }

    loge("执行关闭app失败");

}


