// videoName = "Jay音乐💫"
//
// id("com.ss.android.article.video:id/hx").getOneNodeInfo(2000).clickCenter();
// sleep(2000)
// let selectors = id("com.ss.android.article.video:id/gr");
// let result = inputText(selectors, videoName);
// sleep(1000);
//
//
// if (result) {
//     text("搜索").getOneNodeInfo(5000).click();
// } else {
//     let selector = id("com.ss.android.article.video:id/hx").getOneNodeInfo(2000).clickCenter();
//     sleep(2000)
//     let selectors = id("com.ss.android.article.video:id/gr");
//     let result = inputText(selectors, videoName);
//     sleep(1000);
//     text("搜索").getOneNodeInfo(5000).click();
// }
//
//
// sleep(2000);
// text("直播").getOneNodeInfo(2000).click()
// sleep(2000);
// for (let i = 0; i < 3; i++) {
//     let selector = id("com.ss.android.article.video:id/g_").text(videoName).getOneNodeInfo(5000);
//     if (selector) {
//         selector.click()
//         break;
//     }
//
//
// }
// let selector =longClickable(false).text("享獸·就獸·神獸").getOneNodeInfo(5000);
//
// if (selector) {
//     selector.click()
//
// }
// let selector = longClickable(false).text("可可队长").getOneNodeInfo(5000);
//
// if (selector) {
//     click(longClickable(false).text("可可队长"))
//     console.log("s")
// }


// loge(isServiceOk());


// utils.openApp('com.xs.fm')
// sleep(1000);
// let checkOpen = text("允许").getOneNodeInfo(5000);
// if (checkOpen) {
//     console.log("点击允许");
//     checkOpen.clickCenter()
//     sleep(1000);
//     checkOpen = text("允许").getOneNodeInfo(1000);
//     if (checkOpen) {
//         checkOpen.click();
//         console.log(checkOpen.text)
//         console.log("点击允许2");
//     }
// }

var myCome= null
myCome =null
thread.execAsync(function () {
    myCome = textMatch("易点云测")})
sleep(10000)
console.log(myCome);