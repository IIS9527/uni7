function main() {
    // 参数设置 = main.html
    // 使用说明 = intr.html
    // 定时任务 = timer.html
    // 其他 = other.html
    ui.layout("参数设置", "main.html");
    ui.layout("使用说明", "intr.html");

    var r = ui.hasFloatViewPermission();
    ui.logd("是否有浮窗权限:" + r)
    if (!r) {
        return ;
    }


    ui.showCtrlWindow();
    //展示浮窗
    //回主页按钮

    ui.run(1000, function () {

        ui.removeCtrlView("main_page_ctrl")
        ui.removeCtrlView("log_close_ctrl")
        ui.removeCtrlView("log_window_ctrl")



        //脚本启停按钮
        // ui.removeCtrlView("script_status_ctrl")
        // ui.removeCtrlView("system_power_ctrl")
        // ui.removeAllCtrlView();
        // ui.removeCtrlView("system_power_ctrl")
        // ui.addCtrlView("tag", "res/a.png", 32, 32, 1, function (v) {
        //     //启动脚本
        //     ui.isScriptRunning()? ui.stopTask():ui.start();
        // })


    })
    // ui.addCtrlView("tag", "res/a.png", 32, 32, 0, function (v) {
    //
    //
    //     ui.showLogWindow();
    //     ui.toast("开启悬浮窗")
    // })
    // ui.removeAllCtrlView()

    ui.logd("显示消息")
    //3秒后在UI线程消失掉
    // ui.getHandler().postDelayed(function () {
    //     ui.closeCtrlWindow();
    // }, 3000);

    ui.registeH5Function("getVersion", function () {
        return "v " + JSON.parse(readIECFileAsString("update.json")).version
    })

    ui.registeH5Function("activeSelf",function (){
        return activeSelf(0,10000)
    })

    ui.registeH5Function("startApp",function (pkgName){
        utils.openApp(pkgName)
        return activeSelf(0,10000)
    })


}

main();