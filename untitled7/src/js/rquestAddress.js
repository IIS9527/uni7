
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
}

//获取服务端任务
function getTask(){
    let p = {
        cardNo:ui.getConfig("cardNo")+'',
        deviceNickName: ui.getConfig("deviceNickName")+'',
        time: new Date().getTime(),
        deviceId: device.tcDeviceId()+''+ui.getConfig("deviceNickName"),
        personName: ui.getConfig("personName")+'',
        mid:'',
        roomId:ui.getConfig("roomId")+'',
        id:ui.getConfig("taskId")+'',
        ecVersion:acEvent.version()+''
    };
    p.mid = utils.dataMd5(p.cardNo+p.personName+p.time+p.deviceId+p.deviceNickName+"sb1314520sbNB$HHHHH")
    let severAddress = GlobAddress+ "/Task/getTask";
    try{
       let assignment = http.httpGet(severAddress,p,5000, null)
       if (!assignment) {
           loge("返回为null");
           erroTimes=erroTimes+1;
           return false ;
       }
       let msg = JSON.parse(assignment)["msg"]
       if (!msg) {loge(msg);return false;}
       else if(msg === "暂无任务"){
           logi("暂无任务");
           erroTimes=0
           return false;
       }
       assignment = JSON.parse(assignment)["data"]
       if (!(parseFloat(assignment["sid"])+20*1000>new Date().getTime())){
           loge("连接服务器失败");
           erroTimes=erroTimes+1;
           return  false;

       }
       if (!assignment["roomId"] || !assignment["time"] || !assignment["videoName"] ) {
           loge("字段解析出错");
           return false;
       }
       ui.saveConfig("roomId",assignment["roomId"])
       let  address = "https://webcast-open.douyin.com/open/webcast/reflow/?webcast_app_id="+ui.getConfig("appId")+"&room_id="+assignment["roomId"];
       ui.saveConfig("roomAddress",address)
       //任务时间戳
       ui.saveConfig("time",assignment["time"])
       ui.saveConfig("videoName",assignment["videoName"])
       ui.saveConfig("taskId",assignment["id"])
       if (!assignment["videoNameXiGua"]) {ui.saveConfig("videoNameXiGua","")}
       else {ui.saveConfig("videoNameXiGua",assignment["videoNameXiGua"])}
       if (!assignment["videoNameTouTiao"]) {ui.saveConfig("videoNameTouTiao","")}
       else {ui.saveConfig("videoNameTouTiao",assignment["videoNameTouTiao"])}
       erroTimes = 0
       return  true;
   }
   catch (e){
       loge("连接服务器出错");
       erroTimes= erroTimes+1;
       if (erroTimes%4 === 0) {loge(e);}
       return false;
   }
}

//发送运行脚本状态
function heartbeat(tid){
    let p = {
        "cardNo":ui.getConfig("cardNo")+'',
        "deviceId":device.tcDeviceId()+''+ui.getConfig("deviceNickName"),
        "roomId":ui.getConfig("roomId")+'',
        "taskState":Working,
        "time":new Date().getTime().toString(),
        "videoDieOut":videoDieOut,
        "id":ui.getConfig("taskId")+'',
    };
    let  address  = GlobAddress+"/Task/checkState?mid="+ utils.dataMd5(p.cardNo+p.deviceId+p.roomId+p.time+p.videoDieOut+p.taskState+p.id+"sb1314520sbNB$");
    try{
        let assignment = http.postJSON(address,p,1000*5,null)
        //假设直播间状态为在线
        videoDieOut = false;
        if (assignment) {
            assignment=JSON.parse(assignment);
            erroTimes= 0
            if (assignment["code"] === 400) {thread.cancelInterval(tid);logi("任务结束");}
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
    if (assignment !=null && JSON.parse(assignment)["code"]=== 200  ) {return true;}
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
