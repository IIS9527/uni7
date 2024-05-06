
function getPersonInfo(url) {
    //todo 操 这里是什么bug  传参进来不行 只能再定义一个字符串传入才行
    //  url = " "+url
    let followRedirects = false;
    let ignoreContentType = true;
    let ignoreHttpErrors = true;
    let header = {
        "Accept": "charset=utf-8",
        'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Cache-Control': 'max-age=0',
        "Content-Type":"application/json; charset=utf-8",
        'Sec-Ch-Ua':'"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.43'

    };

    let params = {
        "url": url,
        "method": "GET",
        "header": header,
        "followRedirects":followRedirects,
        "ignoreHttpErrors":ignoreHttpErrors
    };

    let x = http.request(params);
    // console.log(x.body)
    if (!x) {
        loge("主页解析失败");
      return null
    }
    // 使用正则

    let str = x.body.match(/sec_uid=(\S*)&amp;/)[1] ;
    // 使用
     url = "https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid="+str+"&from_ssr=1"
     header=  {
        "Accept": "charset=utf-8",
        'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Cache-Control': 'max-age=0',
        "Content-Type":"application/json; charset=utf-8",
        'Sec-Ch-Ua':'"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.43'
    };
     params = {
        "url": url,
        "method": "GET",
        "header": header,
        "followRedirects":followRedirects
    };
      x =   http.request(params)
      str = x.body.match(/"nickname":"([\s\S]*)","signature"/)[1]
      return str



    // if (x) {
    //     logd("header=" + x.header);
    //     logd("cookie=" + x.cookie);
    //     logd("statusCode=" + x.statusCode);
    //     logd("statusMessage=" + x.statusMessage);
    //     logd("charset=" + x.charset);
    //     logd("contentType=" + x.contentType);
    //     logd("body=" + x.body);
    // } else {
    //     loge("无结果");
    // }



}

//获取服务端任务
function getTask(){
//更新最新版

//     sleep(2000);


    // let roomIdTime = ui.getConfig("roomIdTime")+''
    //
    // if (roomIdTime != null && parseInt(roomIdTime)+1000*60*10 > time() ) {//清空上次的roomId
    //     ui.saveConfig("roomId","0");
    // }

    let p = {
        cardNo:ui.getConfig("cardNo")+'',
        deviceNickName: ui.getConfig("deviceNickName")+'',
        time: new Date().getTime(),
        deviceId: device.tcDeviceId()+''+ui.getConfig("deviceNickName"),
        personName: ui.getConfig("personName")+'',
        mid:' ',
        roomId:ui.getConfig("roomId")+'',
        id:ui.getConfig("taskId")+'',
        ecVersion:acEvent.version()+''
    };




    p.mid = utils.dataMd5(p.cardNo+p.personName+p.time+p.deviceId+p.deviceNickName+"sb1314520sbNB$HHHH")




    let gAddress =null
    if (erroTimes %3 ===0 ) {
        gAddress = GlobAddress
    }else if (erroTimes %3 ===1) {
        gAddress = GlobAddress1
    }else if (erroTimes %3 ===2) {
        gAddress = GlobAddress2
    }
    let severAddress = gAddress+ "/Task/getTask";


   try{

       let assignment = http.httpGet(severAddress,p,5000, null)

       if (!assignment) {

           loge("网络错误");

           erroTimes=erroTimes+1;

           if (erroTimes%4 === 0) {

               loge("网络错误");

           }
           return false ;
       }

       let msg = JSON.parse(assignment)["msg"]

       if (!msg) {
           loge(msg);
           return false;}
       else if(msg === "暂无任务"){
           logi("暂无任务");
           erroTimes=0
           return false;
       }

       assignment = JSON.parse(assignment)["data"]

       // loge(3);

       // if ( msg !== utils.dataMd5(''+assignment["videoName"] +assignment["roomId"]+ assignment["sid"]+"sb1314520sbNB$")){
       //     loge("连接错误");
       //     return false;
       // }

       // loge(4);
       if (!(parseFloat(assignment["sid"])+20*1000>new Date().getTime())){
           loge("连接服务器失败");
           erroTimes=erroTimes+1;
           return  false;

       }
       // loge(5);
           // assignment = encodeDecoder.aesDecrypt(assignment,"sb1314520sbNB$")
           /*
           * 
           * 校验服务器发送的信息 mid
           * 
           * */

           if (!assignment["roomId"] || !assignment["time"] || !assignment["videoName"] ) {
               // loge(6);
               return false;
           }

               ui.saveConfig("roomId",assignment["roomId"])

               let  address = "https://webcast-open.douyin.com/open/webcast/reflow/?webcast_app_id="+ui.getConfig("appId")+"&room_id="+assignment["roomId"];

               ui.saveConfig("roomAddress",address)

               //任务时间戳
               ui.saveConfig("time",assignment["time"])

               ui.saveConfig("videoName",assignment["videoName"])




               ui.saveConfig("taskId",assignment["id"])

               if (!assignment["videoNameXiGua"]) {
                   ui.saveConfig("videoNameXiGua","")
               }
               else {
                   ui.saveConfig("videoNameXiGua",assignment["videoNameXiGua"])
               }

               if (!assignment["videoNameTouTiao"]) {
                   ui.saveConfig("videoNameTouTiao","")
               }
               else {
                   ui.saveConfig("videoNameTouTiao",assignment["videoNameTouTiao"])
               }

               erroTimes = 0

               // ui.saveConfig("roomIdTime",time()+'');
          
              return  true;
   }
   catch (e){
       loge("连接服务器出错");
       erroTimes= erroTimes+1;

       if (erroTimes%4 === 0) {
           loge(e);
       }

       return false;
   }

}

//发送运行脚本状态
function heartbeat(tid){
        
    let  time    = new Date().getTime().toString()

    let p = {
        "cardNo":ui.getConfig("cardNo")+'',
        "deviceId":device.tcDeviceId()+''+ui.getConfig("deviceNickName"),
        "roomId":ui.getConfig("roomId")+'',
        "taskState":Working,
        "time":time,
        "videoDieOut":videoDieOut,
        "id":ui.getConfig("taskId")+'',
    };

    let gAddress =null
    if (erroTimes %3 ===0 ) {
          gAddress = GlobAddress
    }else if (erroTimes %3 ===1) {
          gAddress = GlobAddress1
    }else if (erroTimes %3 ===2) {
          gAddress = GlobAddress2
    }
    let  address  = gAddress+"/Task/checkState?mid="+ utils.dataMd5(p.cardNo+p.deviceId+p.roomId+p.time+p.videoDieOut+p.taskState+p.id+"sb1314520sbNB$");

    try{

        let assignment = http.postJSON(address,p,1000*5,null)
        
        // console.log(assignment)


        //设直播间状态为在线
        videoDieOut = false;


        if (assignment) {

         assignment  =  JSON.parse(assignment)
            erroTimes = 0
            if (assignment["code"] === 400) {

                thread.cancelInterval(tid);

                logi("任务结束");
            }



        }
        else {

            erroTimes=erroTimes+1;
            loge("服务器连接失败错误次数：",erroTimes)
            console.log(assignment)
            if ( erroTimes%4===0 && !stopWork  ) {

                stopWork =true;

                loge("服务器多次连接错误，退出脚本");

                thread.cancelInterval(tid)

                back();
                sleep(1000)
                back();
                sleep(1000)
                home();

                closeAppXiFaTo(null,ui.getConfig("appId"));

            }

        }
    }
    catch (e){
    erroTimes=erroTimes+1;
    console.log("服务器校验失败")
        if (erroTimes%4===0 && !stopWork ) {
          loge("服务器多次连接错误，退出脚本");

            stopWork =true;

            thread.cancelInterval(tid)

            back();
            sleep(1000)
            back();
            sleep(1000)
            home();

            closeAppXiFaTo(null,ui.getConfig("appId"));

        }

    }
}
function  login(){

    let p = {
        "cardNo":ui.getConfig("cardNo")+'',
        "password":ui.getConfig("password")+'',
        "deviceId":device.tcDeviceId()+''+ui.getConfig("deviceNickName"),
        "time":time(),
        "mid":''
    };

    p.mid=utils.dataMd5(p.cardNo+p.password+p.deviceId+p.time+"sb1122sb");

    let address = GlobAddress+"/loginJiaoBen"

    let assignment = http.httpGet(address,p,1000*3,null)

    // console.log(assignment)
    if (assignment !=null && JSON.parse(assignment)["code"]=== 200  ) {
        // console.log(JSON.stringify(JSON.parse(assignment)))
        return true;

    }


    return false;

}

function  changeSpecialChar(str){
    let  changeStr = ''

    for (let i = 0; i < str.length; i++) {
        if (str[i] === '$'  ) {
             changeStr = changeStr+ '\$'
        }
        else if (str[i] === '!') {
            changeStr = changeStr +'\!'
        }
        else if (str[i] === '@') {
            changeStr = changeStr +'\@'
        }

        else if (str[i] === '&') {
            changeStr = changeStr +'\&'
        }
        else if (str[i] === '#') {
            changeStr = changeStr +'\#'
        }
       else {
            changeStr = changeStr + str[i]
        }

    }
    return changeStr;
}




// function websocketConnect() {
//     let result = [];
//     //新建一个ws连接
//     var ws = http.newWebsocket("ws://192.168.1.76:8081/websocket/device/call?deviceNo=111", null, 2);
//     // 设置type=1的时候链接参数
//     ws.setCallTimeout(5);
//     ws.setReadTimeout(5);
//     ws.setWriteTimeout(5);
//     //心跳检测
//     ws.setPingInterval(1)
//
//     //设置type=2的时候心跳检测时间
//     ws.setConnectionLostTimeout(5)
//     //设置连接打开的时候监听器
//     ws.onOpen(function(ws1, code, msg) {
//         logi("onOpen code " + code + "  msg:" + msg);
//     })
//     //设置有文本信息监听器
//     ws.onText(function(ws1, text) {
//         logi(" onText " + text);
//     })
//     //设置关闭时候的监听器
//     ws.onClose(function(ws1, code, reason) {
//         logi(" onClose  " + code + "  reason : " + reason + " remote:");
//     })
//     ws.onError(function(ws1, msg) {
//         logi(" onError  " + msg);
//         result[0] = "error";
//     })
//     // bytes 是 java的bytes数组 对象
//     ws.onBinary(function(ws1, bytes) {
//         //转成java的
//         logi(" onBinary  " + new java.lang.String(bytes));
//     })
//
//     //每3000 发送一次文本心跳数据
//     ws.startHeartBeat(function () {
//         return null;
//     }, function () {
//         return new Date().toISOString();
//     }, 3000, true);
//
//
//     ws.startHeartBeat(function () {
//         return new java.lang.String("testXXX").getBytes();
//     }, function () {
//         return null;
//     }, 3000, true);
//
//     //停止发送心跳
//     //ws.stopHeartBeat()
//
//     //开始连接   阻塞的
//     let r = ws.connect(10000);
//     //设置自动重连
//     ws.setAutoReconnect(true);
//     logd("connect {} rr = {}", result[0], r);
//
//     while (true) {
//         logd("isconnect " + ws.isConnected());
//         sleep(1000)
//         if (ws.isConnected()) {
//             b = ws.sendText("new Date-" + new Date())
//             logd("send =" + b);
//             sleep(1000)
//             // java的字符串转字节
//             ws.sendBinary(new java.lang.String("test").getBytes());
//         } else {
//             //重置链接
//             //                let reset = ws.reset();
//             //                logd("reset {}",reset)
//             //                if (reset) {
//             //                    logd("开始重连...");
//             //                    let rc = ws.connect(10000);
//             //                    logd("重连--"+rc);
//             //                }
//         }
//     }
//     logd("isClosed " + ws.isClosed())
//     sleep(1000)
//     //关闭连接
//     ws.close();
// }
/////////////////////////////////////////////////////////////////////////////////////////
// let ret = http.requestEx({
//     url: "https://v.douyin.com/epabcWA/",
//     followRedirects: false
// })
// if (ret) {
//     logd(ret.header.Location);
//     let sec_id = getMiddleText(ret.header.Location, "sec_uid=", "&did")
//     logd(sec_id);
//     let uid = getMiddleText(ret.header.Location, "user/", "?")
//     logd(uid);
// }
//
// function getMiddleText(str, start, end, retain) {
//     if (!str || !start || !end) return ""
//     let a = str.indexOf(start)
//     if (a !== -1) {
//         let e = 0
//         a += start.length;
//         e = str.indexOf(end, a);
//         if (e > a) {
//             return retain ? str.substring(a - start.length, e + end.length) : str.substring(a, e)
//         }
//     }
//     return ""
// }
