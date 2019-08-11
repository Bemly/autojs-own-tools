"ui";
"use strict";
//判断最新版
if(!["time"] in console){
  let error_old = "请升级autojs至4.1.1\n" +
    "坠新免费版下载链接：\n" +
    "https://pan.baidu.com/s/1ViZ7zNs5PXbcVPRSrMiUYA\n" +
    "密码:js6B";
  alert("需升级autojs",error_old)
  //.then(()=>{exit();});//下次跳转网址
  console.error(error_old);
  toast(error_old);
  delete error_old;
}
//本地储存
var floatStorage = storages.create("bemly_mainTofloat");
var fileStorage = storages.create("bemly_mainTofile");

var mainMenu = {//更改悬浮窗
  "h" : 50,
  "w" : 50,
  "alpha" : 0.9,
  "radius" : 22,
  "border" : {width : 4, color: "#99E4FFFF"},
  "src" : "file://res/bemly.jpg",
  "bg" : false
};
var floatColor = ["F8AB80","E4FFFF","FF806D","4DFF9E"];
var SetterColor = floatColor[random(0,1)];
var float_set = [mainMenu,floatColor,SetterColor];
//0悬浮窗修改1功能颜色2随机颜色

//ui界面
ui.statusBarColor("#8FD3EA");//导航栏颜色
ui.layout(
  <drawer id="drawer" bg="#E3FFFF">
    <frame>
      <frame id="global" margin="12 60 12 50"><!--滑动-->   
      </frame>
      <frame id="background"><!--覆盖表层-->
        <vertical><!--上部-->
          <button id="set" h="60" w="*" bg="#E48FD3EA" layout_gravity="top|center"/>
          <frame h="*"><!--左右横条-->
            <button h="*" w="12" bg="#CC8FD3EA" layout_gravity="center|left"/>
            <button h="*" w="12" bg="#CC8FD3EA" layout_gravity="center|right"/>
          </frame>
        </vertical><!--下部音乐-->
        <horizontal h="60" w="*" layout_gravity="top|center" gravity="center">
          <img h="45" radius="18" borderWidth="4" borderColor="#EEFFFF" src="file://res/bemly.jpg"/>
          <img h="40" src="file://res/title.png"/>
        </horizontal>
        <!--<tabs id="tabs" margin="12 50" h="{{h}}" w="*" layout_gravity="bottom|center"/>-->
        <button id="music" h="50" w="*" bg="#F38FD3EA" text="关机按钮" textColor="black" gravity="center" layout_gravity="bottom|center"/>
      </frame>
    </frame><!--左滑动-->
    <frame layout_gravity="left" h="*" w="*">
      <vertical>
        <button id="set" h="*" w="*" bg="#008FD3EA"/>
      </vertical>
      <card w="*" h="*" bg="#E28FD3EA" cardCornerRadius="0" cardElevation="0">
        <list id="selectView">
          <vertical w="*">
            <card w="*" h="40" alpha="0.6" margin="15 10" cardCornerRadius="10" cardElevation="5" foreground="?selectableItemBackground">
              <horizontal bg="#CCFF7779">
                <img h="30" margin="10 4 -10 -1" src="{{this.icon}}" tint="#F05051"/>
                <text text="{{this.title}}" margin="2 4 0 -1" textColor="#F05051" textSize="20"/>
              </horizontal>
            </card>
          </vertical>
        </list>
      </card>
    </frame><!--右滑动个性化设置-->
    <frame layout_gravity="right" bg="#E3FFFF" w="*">
      <vertical>
        <button id="set" h="*" w="*" bg="#E48FD3EA"/>
      </vertical>
      <card w="*" h="*" margin="10 10 10 100" cardCornerRadius="20" cardElevation="10" foreground="?selectableItemBackground">
        <View bg="#BDB9FF" h="*" w="*" />
        <scroll gravity="top|left">
          <vertical margin="10">
            <text textColor="#595176" text="悬浮窗图标更改："/>
            <img layout_gravity="top|center" margin="5" h="{{mainMenu.h}}" w="{{mainMenu.w}}" alpha="{{mainMenu.alpha}}"
              radius="{{mainMenu.radius}}" borderWidth="{{mainMenu.border.width}}"
              borderColor="{{mainMenu.border.color}}" src="{{mainMenu.src}}"/>
            <grid id="setMainMenu" margin="10 0"spanCount="2" layout_gravity="top|center" margin="5">
              <card h="30" w="*" margin="5 7" cardCornerRadius="8" cardElevation="6" foreground="?selectableItemBackground">
                <View bg="#595176" h="*" w="*" />
                <text gravity="center" text="{{this.text}}" textColor="#BDB9FF"/>
              </card>
              
              
              
              
              
              
              
              
            </grid>
          </vertical>
        </scroll>
      </card>
      <card w="*" h="80" margin="10" layout_gravity="bottom|center" gravity="center" cardCornerRadius="20" cardElevation="10">
        <View bg="#4DFF9E" h="*" w="*" />
        <horizontal h="60" w="*" layout_gravity="top|center" gravity="center">
          <img h="45" marginRight="-10" radius="18" borderWidth="6" borderColor="#48D384" src="file://res/bemly.jpg"/>
          <vertical marginTop="-3">
            <img h="30" src="file://res/title.png"/>
            <text marginTop="-10" text="自定义设置模块" textColor="#349A60" layout_gravity="top|center" gravity="top|center"/>
          </vertical>
        </horizontal>
      </card>
    </frame>
  </drawer>
);

ui.setMainMenu.setDataSource([{
  "text" : "修改图标大小",
  "onClick" : ()=>{}
},{
  "text" : "修改图标图片",
  "onClick" : ()=>{//chooseNaiveFileManager("*/*")
    dialogs.build({
      title : "打开方式",
      titleColor : "#595176",
      content : "选择你适合的文件管理器来访问图片\n悬浮窗访问速度慢,多次打开易卡顿\n原生兼容性差",
      contentColor : "#BDB9FF",
      positive : "悬浮窗管理器",
      positiveColor : "#595176",
      negative : "原生管理器",
      negativeColor : "#595176",    
      neutral : "取消",
      neutralColor : "#595176",
      buttonRippleColor : "#BDB9FF"
    }).on("positive", ()=>{
      const cleanFloatOfFile = new Promise(function(resolve, reject){
        global.cleanFloatOfFileNum = NaN;
        engines.all().forEach((val,ind)=>{
          if(val.source.toString().split("/").slice(-1)[0] === "file.js"){
            global.cleanFloatOfFileNum = ind;
          }
        });
        setTimeout(()=>{
          if(cleanFloatOfFileNum === NaN){
            cleanFloatOfFileNum = null;
            return resolve();
          }else{
            dialogs.build({
              title : "反复点击",
              titleColor : "#595176",
              content : "检测到悬浮窗文件管理器已在运行\n是否重新启动该管理器",
              contentColor : "#BDB9FF",
              positive : "确定",
              positiveColor : "#595176",    
              neutral : "取消",
              neutralColor : "#595176",
              buttonRippleColor : "#BDB9FF",
              cancelable : false
            }).on("positive", ()=>{
              engines.all()[cleanFloatOfFileNum].forceStop();
              cleanFloatOfFileNum = null;
              return resolve();
            }).on("neutral", ()=>{
              toast("Error:进程占用过多无法打开");
              cleanFloatOfFileNum = null;
            }).show();
          }
        }, 0);
      });
      cleanFloatOfFile.then(()=>engines.execScriptFile("./file.js"));
    }).on("negative", ()=>{
      chooseNaiveFileManager("image/*");
    }).show();
  }
},{
  "text" : "修改边框大小",
  "onClick" : ()=>{}
},{
  "text" : "修改边框颜色",
  "onClick" : ()=>{}
},{
  "text" : "修改图标透明度",
  "onClick" : ()=>{}
},{
  "text" : "修改图标圆角",
  "onClick" : ()=>{}
}]);
ui.selectView.setDataSource([{
  "title" : "首页",
  "icon" : "@drawable/ic_account_balance_black_48dp",
  "onClick" : ()=>indexView.loader()
},{
  "title" : "音乐",
  "icon" : "@drawable/ic_audiotrack_black_48dp",
  "onClick" : ()=>musicView.loader()
}]);

ui.selectView.on("item_click", item=>{
  item.onClick && item.onClick();
  ui.drawer.closeDrawers();
});

ui.setMainMenu.on("item_click", item=>{
  item.onClick && item.onClick();
});

function chooseView(inflate, code){
  ui.global.removeAllViews();
  ui.global.addView(inflate, new android.widget.FrameLayout.LayoutParams(-1, -1));
  code();
}

var indexView = {
  ui : ui.inflate(
    <vertical>
      
        <text text="咕咕咕" textColor="#DF9A73" textSize="25" gravity="center"/>
        <text text="爽" textColor="#DF9A73" textSize="20" gravity="center"/>
        
      
    </vertical>
  ),
  code : function(){},
  loader : function(){chooseView(this.ui, this.code)}
};
indexView.loader();

var musicView = {
  ui : ui.inflate(
    <frame>
    <viewpager id="musicView">
      <scroll>
        <vertical>
          <card w="*" h="180" margin="30 15" cardCornerRadius="20" cardElevation="10" foreground="?selectableItemBackground">
            <View bg="#F8AB80" h="*" w="*" />
            <vertical gravity="center">
              <img h="70" w="70" radius="18" borderWidth="4" borderColor="#DF9A73" src="file://res/bemly.jpg"/>
              <text text="模板" textColor="#DF9A73" textSize="25" gravity="center"/>
              <text text="点击标题获取权限" textColor="#DF9A73" textSize="20" gravity="center"/>
            </vertical>
          </card>
          <card w="*" h="180" margin="30 15" cardCornerRadius="20" cardElevation="10" foreground="?selectableItemBackground">
            <View bg="#F8AB80" h="*" w="*" />
            <vertical gravity="center">
              <img h="70" w="70" radius="18" borderWidth="4" borderColor="#DF9A73" src="file://res/bemly.jpg"/>
              <text text="悬浮窗" textColor="#DF9A73" textSize="25" gravity="center"/>
              <text text="点击本卡片即可" textColor="#DF9A73" textSize="20" gravity="center"/>
            </vertical>
          </card>
        </vertical>
      </scroll>
      <scroll>
      </scroll>
    </viewpager>
    <tabs id="tabs" h="3" w="*" layout_gravity="bottom|center"/>
    </frame>
  ),
  code : function(){
     ui.tabs.setupWithViewPager(ui.musicView);
  },
  loader : function(){chooseView(this.ui, this.code)}
};

//打开自带文件管理器并输出绝对路径
function uriToFile(uri){
  //参考 : https://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
  let r = null,
    cursor, column_index, selection = null,
    selectionArgs = null,
    isKitKat = android.os.Build.VERSION.SDK_INT >= 19,
    docs;
  if(uri.getScheme().equalsIgnoreCase("content")){
    if(isKitKat && android.provider.DocumentsContract.isDocumentUri(activity, uri)){
      if(String(uri.getAuthority()) == "com.android.externalstorage.documents"){
        docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
        if(docs[0] == "primary"){
          return android.os.Environment.getExternalStorageDirectory() + "/" + docs[1];
        }
      }else if(String(uri.getAuthority()) == "com.android.providers.downloads.documents"){
        uri = android.content.ContentUris.withAppendedId(
          android.net.Uri.parse("content://downloads/public_downloads"),
          parseInt(android.provider.DocumentsContract.getDocumentId(uri))
        );
      }else if(String(uri.getAuthority()) == "com.android.providers.media.documents"){
        docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
        if(docs[0] == "image"){
          uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
        }else if(docs[0] == "video"){
          uri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
        }else if(docs[0] == "audio"){
          uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
        }
        selection = "_id=?";
        selectionArgs = [docs[1]];
      }
    }
    try{
      cursor = activity.getContentResolver().query(uri, ["_data"], selection, selectionArgs, null);
      if(cursor && cursor.moveToFirst()) {
        r = String(cursor.getString(cursor.getColumnIndexOrThrow("_data")));
      }
    }catch(e){
      log(e);
    }
    if(cursor){
      cursor.close();
    }
    return r;
  }else if(uri.getScheme().equalsIgnoreCase("file")){
    return String(uri.getPath());
  }
  return null;
}

function chooseNaiveFileManager(MIMEType,callback){
  let naiveFileManager = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
  naiveFileManager.setType(MIMEType);
  RIcallback.startActivityForResult(naiveFileManager,(resultCode,data)=>{
    if(resultCode != activity.RESULT_OK){return};
    let naiveFilePath = uriToFile(data.getData());
  });
}

var RIcallback = {
  intentCallback: {},
  init: function(){
    activity.getEventEmitter().on("activity_result",(requestCode,resultCode,data)=>{
      this.onActivityResult(requestCode,resultCode,data);
    });
  },
  startActivityForResult: function(intent,callback){
    for(var waitCallback = 0;waitCallback < 65536;waitCallback++){
      if(!(waitCallback in this.intentCallback)){break};
    }
    if(waitCallback >= 65536){
      toast("启动自带文件管理器失败：同时请求的Intent过多");
      return;
    }
    this.intentCallback[waitCallback] = callback;
    activity.startActivityForResult(intent,waitCallback);
  },
  onActivityResult: function(requestCode,resultCode,data){
    let callbackFileData = this.intentCallback[requestCode];
      if(!callbackFileData){return};
      delete this.intentCallback[requestCode];
      callbackFileData(resultCode,data);
  }
};
RIcallback.init();

//无障碍
var autoMode = () => {
  switch(auto.rootInActiveWindow){
    case null:
      confirm("无障碍模式",
        "本功能需要开启无障碍模式来稳定运行\n" +
        "之后请手动确认启用该模式")
      .then((isSuccess) => {
        if(isSuccess){
          toast("找到本软件名并设置即可！");
          auto();
        }else{
          alert("无障碍未启用","需要的时候点击\n可再次获取权限");
        }
      });
      break;
    default:
      alert("无障碍已启用","再戳我小心把你的资源全部没收了！\n哼唧凸(>皿<)凸");
  }
};


/*ui.music.click(()=>{
  log(closeDrawers in ui.drawer);
});
ui.set.on("click", ()=>{
  autoMode();
});
ui.emitter.on("pause", ()=>{
  toast("感谢使用工具箱");
});
ui.clearStorage.on("click", ()=>{
  //Storage.clear();
  //toast("ok");
});
ui.floatRun.on("click", ()=>{
  //engines.execScriptFile("./file.js")
  //toast("ok");
});
ui.putStorage.click(()=>{
  chooseNaiveFileManager();
  //fileStorage.put("float_set",float_set);
  //toast("ok");
});*/








