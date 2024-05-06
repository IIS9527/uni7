


function openVia(roomAddress){

    let Activity = {
        "chrome": "com.android.chrome/com.google.android.apps.chrome.IntentDispatcher",
        "360": "com.qihoo.browser/.BrowserActivity",
        "QQ": "com.tencent.mtt.x86/.MainActivity",
        "海豚": "com.dolphin.browser.xf/mobi.mgeek.TunnyBrowser.MainActivity",
        "欧朋": "com.oupeng.browser/com.opera.android.OperaMainActivity",
        "傲游": "com.mx.browser/.MxBrowserActivity",
        "UC": "com.UCMobile/com.uc.browser.InnerUCMobile",
        "via":"mark.via/mark.via.Shell"
    };

    let a = appoint_browser(roomAddress, "via");
    if (!a) {
     console.log("打开页面错误");
     return false;
    }

    let c=  text("确定").getOneNodeInfo(1000);
    if (c) {
        c.click()
    }

    sleep(5000);

    let node3_1=  text("直播已结束").getOneNodeInfo(5000);
    if (node3_1) {
        console.log("直播链接结束")
        videoDieOut = true
        return false;
    }

    let node3 = textMatch(".*打开看看.*").getOneNodeInfo(20000);
    if (node3) {
            node3.click();
        }
        else {
            toast("无节点");
            console.log("s无节点")
            return false;
        }

    // sleep(1000)
    let node4= text("确定").getOneNodeInfo(3000);

    if (node4) {
        node4.click();
    }

    let node5= text("允许").getOneNodeInfo(1000);
    if (node5) {
        node5.click();
    }
    else {
        toast("无需点允许");
    }

    return true;
}

//无障碍模式或代理模式下打开浏览器指定网址

appoint_browser = function (url, browser_choice) {
    importClass(android.content.Intent);
    importClass(android.net.Uri);
    let uri = Uri.parse(url);
    let intent = new Intent(Intent.ACTION_VIEW, uri);
    let browser = {
        "chrome": {//谷歌浏览器
            "pkg": "com.android.chrome",
            "Activity": "com.google.android.apps.chrome.IntentDispatcher"
        },
        "QQ": {//QQ浏览器
            "pkg": "com.tencent.mtt",
            "Activity": "com.tencent.mtt.MainActivity"
        },
        "UC": {//UC浏览器
            "pkg": "com.UCMobile",
            "Activity": "com.uc.browser.InnerUCMobile"
        },
        "360": {//360浏览器
            "pkg": "com.qihoo.browser",
            "Activity": "com.qihoo.BrowserActivity"
        },
        "dolphin": {//海豚浏览器
            "pkg": "com.dolphin.browser.xf",
            "Activity": "mobi.mgeek.TunnyBrowser.MainActivity"
        },
        "oupeng": {//欧朋浏览器
            "pkg": "com.oupeng.browser",
            "Activity": "com.opera.android.OperaMainActivity"
        },
        "mx": {//傲游浏览器
            "pkg": "com.mx.browser",
            "Activity": "com.mx.MxBrowserActivity"
        },
        "via": {//via浏览器
            "pkg": "mark.via",
            "Activity": "mark.via.Shell"
        }
    }
    intent.setClassName(browser[browser_choice]['pkg'], browser[browser_choice]['Activity']);
    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK );
    try {
        context.startActivity(intent);
        return true;
    } catch (err) {
        logd(err);
        return false;
    }
}
// utils.openApp("com.ss.android.article.video")
function openApp(appId){
    logi("打开指定app"+appId);

    if (appId == projectAppInfo.xigua.app_id) {
        let map={
            // "uri":"snssdk32://webcast_room?host=aweme&room_id="+ui.getConfig("roomId"),
            "uri":"snssdk32://webcast_room?_t=&action_type=click&enable_replay=&enter_from_merge=app_live&enter_method=app&host=aweme&room_id="+ui.getConfig("roomId")+"&",
        };
        utils.openActivity(map);
        sleep(1000);
    }

    if (appId == projectAppInfo.fanqie.app_id) {
        let map={
            "uri":"novelfm3040://live_room?_t=&enable_replay=&enter_from=app_live&enter_method=app&host=aweme&page_launch_mode=clear_top_to_first&page_router_tag=live_homepage&room_id="+ui.getConfig("roomId")+"&",
            // "uri":"novelfm3040://live_room?host=aweme&room_id="+ui.getConfig("roomId"),
        };

        utils.openActivity(map);
        sleep(1000);
    }

    if (appId == projectAppInfo.toutiao.app_id) {
        let map={
            "uri":"snssdk141://webcast_room?_t=&action_type=click&enter_from_merge=app_live&enter_method=app&host=aweme&room_id="+ui.getConfig("roomId")+"&",
            // "uri":"snssdk141://webcast_room?host=aweme&room_id="+ui.getConfig("roomId"),
        };
        utils.openActivity(map);
        sleep(1000);


    }


    let node = textMatch("确定|允许").getOneNodeInfo(1000)
    if (node) {
        node.click()
    }

}
