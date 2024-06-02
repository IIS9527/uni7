package com.plugin.fKnEUgFCfX;

import android.content.Context;
import android.os.Build;
import android.os.PowerManager;

import java.util.logging.Logger;

public class PluginClz {



    public PluginClz(Context context){
        System.out.println("--- "+context);
    }

    public String test(){
           System.out.println("--- test method");
           return "我是测试方法";
    }
//    PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//        Logger.i(TAG,"isIgnoringBatteryOptimizations = " + pm.isIgnoringBatteryOptimizations(getPackageName()));
////返回true未被优化，后台不会断网
//        if(!pm.isIgnoringBatteryOptimizations(getPackageName())){
//            startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS));
//        }
//    }



}
