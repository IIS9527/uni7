function websocketCilent() {
    let result = [];
    //新建一个ws连接
    var ws = http.newWebsocket("ws://192.168.1.76:8081/websocket/device/call?deviceNo=111", null, 2);
    // 设置type=1的时候链接参数
    ws.setCallTimeout(5);
    ws.setReadTimeout(5);
    ws.setWriteTimeout(5);
    //心跳检测
    ws.setPingInterval(1)

    //设置type=2的时候心跳检测时间
    ws.setConnectionLostTimeout(5)
    //设置连接打开的时候监听器
    ws.onOpen(function(ws1, code, msg) {
        logi("onOpen code " + code + "  msg:" + msg);
    })
    //设置有文本信息监听器
    ws.onText(function(ws1, text) {
        logi(" onText " + text);
    })
    //设置关闭时候的监听器
    ws.onClose(function(ws1, code, reason) {
        logi(" onClose  " + code + "  reason : " + reason + " remote:");
    })
    ws.onError(function(ws1, msg) {
        logi(" onError  " + msg);
        result[0] = "error";
    })
    // bytes 是 java的bytes数组 对象
    ws.onBinary(function(ws1, bytes) {
        //转成java的
        logi(" onBinary  " + new java.lang.String(bytes));
    })

    //每3000 发送一次文本心跳数据
    ws.startHeartBeat(function () {
        return null;
    }, function () {
        return new Date().toISOString();
    }, 3000, true);


    ws.startHeartBeat(function () {
        return new java.lang.String("testXXX").getBytes();
    }, function () {
        return null;
    }, 3000, true);

    //停止发送心跳
    //ws.stopHeartBeat()

    //开始连接   阻塞的
    let r = ws.connect(10000);
    //设置自动重连
    ws.setAutoReconnect(true);
    logd("connect {} rr = {}", result[0], r);

    while (true) {
        logd("isconnect " + ws.isConnected());
        sleep(1000)
        if (ws.isConnected()) {
            b = ws.sendText("new Date-" + new Date())
            logd("send =" + b);
            sleep(1000)
            // java的字符串转字节
            ws.sendBinary(new java.lang.String("test").getBytes());
        } else {
            //重置链接
            //                let reset = ws.reset();
            //                logd("reset {}",reset)
            //                if (reset) {
            //                    logd("开始重连...");
            //                    let rc = ws.connect(10000);
            //                    logd("重连--"+rc);
            //                }
        }
    }
    logd("isClosed " + ws.isClosed())
    sleep(1000)
    //关闭连接
    ws.close();
}