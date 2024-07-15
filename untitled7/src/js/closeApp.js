function closeAPP(pkgName) {
    pkgName=pkgName+''
    back();
    sleep(2000)
    if (isAgentMode()) {
        if (shell.stopApp(pkgName)) {
            return true;
        } else {
            loge("agent model shell.stopApp close app false");
            return false;
        }
    }
    utils.openActivity({
        "action": "android.settings.APPLICATION_DETAILS_SETTINGS",
        "uri": "package:" + pkgName
    });
    sleep(8000)
    let is_sure=  textMatch("结束进程|结束运行|强行停止|强行结束|强制停止|强制结束");
    sleep(2000);
    if ( is_sure.getOneNodeInfo(6000) ) {
        if (!clickRandom(is_sure)){
           loge("acc model clickRandom false;");
           return false;
        }
        sleep(3000)
        if (!click(clickable(true).textMatch(".*确.*|.*定.*|强制停止|结束进程|结束运行|强行停止"))){
           loge("acc model click false;");
           return false;
        }
        sleep(2000);
        home();
        sleep(2000);
        back();
        logi("关闭成功");
        return true;
    }
    else {
        loge(pkgName + "应用不能被正常关闭或不在后台运行,关闭应用失败");
        back();
        return false;
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


