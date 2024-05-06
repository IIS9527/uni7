
/**
 @description 初始化截图权限
 @version
 @author
 @return      boolean:返回是否请求成功
 */
function autoRequestScreenCapture() {
    // logd("isServiceOk "+isServiceOk());
    // startEnv()
    image.setInitParam(
        {
            "action_timeout":5000,
            "auto_click_request_dialog":true
        }
    );

    let request =null
    if (isAgentMode()) {
         request = image.requestScreenCapture(10000,1);
    }
    else {
         request = image.requestScreenCapture(10000,0);
        if (!request) {
            request = image.requestScreenCapture(10000,0);
        }
    }

    // logd("申请截图结果... "+request)
    if(!request){
        loge("申请截图权限失败,检查是否开启后台弹出,悬浮框等权限")
        exit()
    }
    //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
    sleep(2000)
}

//截取当前屏幕 存入文件 发送服务器
function  screenshot(){



    sleep(1000);
     let availMen =  parseInt(device.getAvailMem());
    if ( availMen == null || 500000000>availMen  ) {
        return true;
    }

    //如果自动化服务正常
    if (!isServiceOk()) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return true;
    }

    //关闭日志弹框
    ui.closeLogWindow();

    sleep(5000)
    //  测试环境 三星S7直板 Android8 ec 6.6 2K屏 和 雷电4模拟器720分辨率
    //  要保存的图片路径
    let filePath = "/sdcard/tmp.jpg";
    // 要保存的图片的格式
    let format = "jpg";
    let result = 截图压缩(filePath, format);
    sleep(5000);
    if (result) {
        let url = GlobAddress+"/Task/screenUpload"
        uploadScreenImg(url,filePath);
    }
    sleep(2000);
    ui.showLogWindow();
    sleep(2000);
    return true;
}

/**
 *
 * 全屏截图压缩文件小于1M
 * @param filePath  文件路径全称
 * @param format   图片保存的格式
 * @returns {boolean|bool}  返回保存是否成功
 */
function 截图压缩(filePath, format) {
    if (filePath === undefined || format === undefined) {
        loge("参数错误！请检查参数");
    }



    // logd("申请截图结果... " + request)


    //申请完权限等1s再截图,否则会截不到图
    sleep(4000)

    //  最后的参数 30 是质量 根据自己需求修改 。 1080屏幕 50即可 我这里是2K屏
    // logd("分辨率为："+w+"X"+h);
    let d = image.captureScreenBitmap(format, -1, -1,-1   , -1, 10);

    sleep(7000)

    //sleep(1000);
    if (d) {
        // d = image.clipBitmap(d, 0, 0, device.getScreenWidth(), device.getScreenHeight());
        //image.saveBitmap(d, format, 100, "/sdcard/原图.jpg");//  实际应用注释掉
        //sleep(1000);
        //  最后的参数 50 是质量 根据自己需求修改 。
        let ds = image.bitmapBase64(d, format, 4);
        sleep(1000);

        //图片要回收
        image.recycle(d)
        //
        sleep(1000);
        //  倒数第二的参数 30 是质量 根据自己需求修改 。1080屏幕 50即可 我这里是2K屏

        let  result = image.saveBitmap(image.base64Bitmap(ds, 0), format, 5, filePath)

        ds = null;

        return result ;
    }else {
        loge("截图失败！");
        return false;
    }
}

function  uploadScreenImg(url,filePath){
    let  headers= {
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip",
        "User-Agent": "okhttp/3.12.1",
    }

    let file =[{
        "key": "file",
        "fileName": "tmp.png",
        "filePath": filePath
    }]
    let time = new  Date().getTime();
    let mid1 = utils.fileMd5(filePath);
    let mid2 = utils.dataMd5(''+ui.getConfig("roomId")+ui.getConfig("videoName")+device.tcDeviceId()+ui.getConfig("deviceNickName")+mid1+time+"sb1314520sbNB$")
     url=url+"?roomId="+ui.getConfig("roomId")+"&videoName="+ui.getConfig("videoName")+"&deviceId="+device.tcDeviceId()+ui.getConfig("deviceNickName")+"&time="+time+
         "&mid1="+mid1+"&mid2="+mid2;

    let params = {
        "url": url,
        "method": "post",
        "file":file
    };
    let x = http.request(params);

    // console.log(x.body)

}

