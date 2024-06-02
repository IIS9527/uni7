/**
 * 常用JS变量:
 * agentEvent = 代理模式下自动点击模块
 * acEvent= 无障碍模式下自动点击模块
 * device = 设备信息模块
 * file = 文件处理模块
 * http = HTTP网络请求模块
 * shell = shell命令模块
 * thread= 多线程模块
 * image = 图色查找模块
 * utils= 工具类模块
 * global = 全局快捷方式模块
 * 常用java变量：
 *  context : Android的Context对象
 *  javaLoader : java的类加载器对象
 * 导入Java类或者包：
 *  importClass(类名) = 导入java类
 *      例如: importClass(java.io.File) 导入java的 File 类
 *  importPackage(包名) =导入java包名下的所有类
 *      例如: importPackage(java.util) 导入java.util下的类
 *
 */



// APP_ID
// 头条6822
// 番茄 6106
// 西瓜247160
var projectAppInfo= {
    "xigua":{"app_id":247160 ,"pkgName":"com.ss.android.article.video" ,"activity":"com.ixigua.feature.live.livelite.LiveLiteActivity","activityOld":"com.ixigua.openliveplugin.live.LivePlayerActivity"},
    "toutiao":{"app_id":6822,"pkgName":"com.ss.android.article.news","activity":"com.bytedance.android.openlive.plugin.LivePlayerActivity"},
    "fanqie":{"app_id":6106,"pkgName":"com.xs.fm","activity":"com.dragon.read.plugin.live.LivePlayerActivity"}
}


var Working = false;

var stopWork = false;

var videoDieOut = false;

var erroTimes = 0

var myCome = null  // xx来了
// const GlobAddress=  "http://192.168.0.100:8999"
// const GlobAddress1=  "http://192.168.0.100:8999"
// const GlobAddress2=  "http://192.168.0.100:8999"
// const GlobAddress=  "http://kpidc.top:8999"
const GlobAddress=  "https://work.spbigidc.net:9100"
const GlobAddress1=  "https://work.spbigidc.net:9100"
// const GlobAddress1=  "http://23.224.174.155:8999"
const GlobAddress2=  "https://work.spbigidc.net:9100"
// const GlobAddress2=  "http://nb.keep-work.com"

var checkTimes = 1
//jin ru zhi bo jian chu cuo ci shu
var comeBreakTimes=0

const PKGName = "Cn.kuwo.player"

// const GlobAddress = "http://192.168.137.1:8999"

function main() {

    if (!login()) {
        toast("账密错误");
        exit();
    }


    //初始化设置
    if (!startIntIt()) {
       toast("初始化错误");
       exit();
    }

    console.log("初始化完成")
    // console.log(ui.getConfig("personName"),ui.getConfig("openType"),ui.getConfig("time"))

while(true) {

    //获取请求服务器，获取任务
    logi("运行中...")



    if (getTask()) {

        //刷新悬浮窗
        //回到主页函数
        home();
        setFixedViewText("版本号："+ui.getConfig("version")+"\n"+"抖音昵称:"+ui.getConfig("personName")+"  机器编码："+ui.getConfig("deviceNickName")+" 直播名称"+ui.getConfig("videoName")+" 时长:还未进入直播间")
        videoDieOut = false;
        stopWork = false;
        Working = false;
        erroTimes =0;


        console.log("获取请求成功,开始执行主任务")

        if (!isServiceOk()) {
            if (activeSelf(0,10000)+'' === "激活成功") {
                agentEvent.execShellCommandEx("am force-stop   com.ss.android.article.video ")
                agentEvent.execShellCommandEx("am force-stop   com.ss.android.article.news ")
                agentEvent.execShellCommandEx("am force-stop   com.xs.fm ")
            }
        }
    }
    else {

        logi("等待服务器发送任务");

        sleep(15000);

        continue;

    }

    //线程一 主任务app 执行脚本
    let tidMain = mainTaskThread();

    //进入任务 主线程每十秒返回任务执行情况
    sleep(1000);
    while (true) {
        if (!thread.isCancelled(tidMain)) {
                heartbeat(tidMain)
        }
        else {
            Working = false;
            console.log("主任务关闭，等待服务器发送任务")
            back();
            sleep(1000)
            back();
            sleep(1000)
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


            sleep(4000);
            closeAppXiFaTo(null,ui.getConfig("appId"))
            sleep(2000)
            ui.showLogWindow();
            sleep(1000);
            thread.stopAll();  //取消所有正在运行的线程

            break;

        }

        sleep(10000)

    }
    sleep(5000)
}
}
main();
