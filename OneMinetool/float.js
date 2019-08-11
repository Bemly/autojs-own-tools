setInterval(()=>{},4000);

var isOpenIndex = false, hasRequestScreenCapture = false, isRoot = false;
var floatIndex = floaty.window(
  <card w="250" h="*" alpha="0.9" margin="10" cardCornerRadius="20" cardElevation="10">
    <View bg="#998FD3EA" h="*" w="*" />
    <vertical layout_gravity="center">
      <horizontal layout_gravity="center" gravity="center">
        <img id="floatMenu" h="25" w="25" alpha="0.9" radius="20" borderWidth="5" borderColor="#BBE3FFFF" src="file://res/bemly.jpg"/>
        <img h="40" src="file://res/title.png"/>
      </horizontal>
        <card alpha="0.7" margin="5" layout_gravity="center" cardCornerRadius="10" cardElevation="10" w="220" h="43" foreground="?selectableItemBackground">
          <View bg="#BBE3FFFF" h="*" w="*" />
          <vertical margin="5 2">
            <button id="requestScreenCapture" text="请求截取屏幕权限" h="*" style="Widget.AppCompat.Button.Borderless"/>
          </vertical>
        </card>
        <card alpha="0.7" margin="5" layout_gravity="center" cardCornerRadius="13" cardElevation="10" w="220" h="100" foreground="?selectableItemBackground">
          <View bg="#BBE3FFFF" h="*" w="*" />
          <vertical margin="5 2">
            <button id="funToCbb" text="mcfunction读写器" style="Widget.AppCompat.Button.Borderless" marginBottom="-6"/>
            <text text="是一个将函数命令转入到方块中的快捷工具" textColor="#AA000000" gravity="top|center"/>
          </vertical>
        </card>
    </vertical>
  </card>
);
floatIndex.setSize(-2,-2);//放置在屏外
floatIndex.setPosition(-device.width*2,-device.height*2);

var floatMain = floaty.window(
  <img id="floatMenu" h="50" w="50" alpha="0.9" radius="20" borderWidth="5" borderColor="#BBE3FFFF" src="file://res/bemly.jpg"/>
);
floatMain.setSize(-2,-2);
floatMain.setPosition(0,100);

var floatFunToCbbSet = floaty.rawWindow(
  <card w="220" h="150" alpha="0.8" margin="10" cardCornerRadius="20" cardElevation="10">
    <View bg="#EE8FD3EA" h="*" w="*" />
    <vertical layout_gravity="center" margin="5">
      <text id="actionbar" textColor="#BB000000" gravity="top|center" text=""/>
    </vertical>
  </card>
);
floatFunToCbbSet.setSize(-2,-2);//放置在屏外
floatFunToCbbSet.setPosition(-device.width*2,-device.height*2);
//判断
events.on("exit", function(){
  global = null;
  Object = null;
  threads.shutDownAll();
});

ui.run(()=>{//呼出主菜单
  floatMain.floatMenu.click(()=>{
    if(!isOpenIndex){
      floatIndex.setPosition(0,0);
    }else{
      floatIndex.setPosition(-device.width*2,-device.height*2);
    }
    isOpenIndex = !isOpenIndex;
  });
  floatIndex.requestScreenCapture.click(()=>{//截取屏幕
    const requestScreenCaptureThread = threads.start(function(){
      if(requestScreenCapture(true)){
        hasRequestScreenCapture = true;
        toast("请求截取屏幕成功");
      }else{
        toast("请求截取屏幕失败,请重新请求");
      }
      requestScreenCaptureThread.interrupt();
    });    
  });
  floatFunToCbbSet.actionbar.on("long_click", ()=>{
    if(isRoot){
      if(device.release >= 7){
        isRoot = false;
        toast("目前模式:安卓7以上的模拟手势点击\n点击可以切换到ROOT模拟点击\n没授予ROOT权限会无反应");
      }else{
        toast("So sorry!你的设备低于安卓7");
      }
    }else{
      isRoot = true;
      toast("目前模式:ROOT的模拟手势点击\n点击可以切换到安卓7的模拟点击\n没授予ROOT权限会无反应");
    }
  });
  floatIndex.funToCbb.click(()=>{//功能
    floatIndex.setPosition(-device.width*2,-device.height*2);
    isOpenIndex = !isOpenIndex;
    const funToCbbThread = threads.start(function(){
      if(hasRequestScreenCapture === true){
        if(device.release >= 7){//第一次判断
          isRoot = false;
          toast("目前模式:安卓7以上的模拟手势点击\n点击可以切换到ROOT模拟点击\n没授予ROOT权限会无反应");
        }else{
          isRoot = true;
          toast("目前模式:ROOT的模拟手势点击\n点击可以切换到安卓7的模拟点击\n没授予ROOT权限会无反应");
        }
        function funToCbbCheck(x, y, num){//按键调用
          if(!isRoot){
            for(let num2 = 0; num2 < num; num2++){
              press(x, y, random(100, 498));
            }
          }else{
            for(let num2 = 0; num2 < num; num2++){
              funToCbbRootAutomator.press(x, y, random(300, 498));
            }
          }
        }
        function funToCbbTextDIY(text){//diy内容
          ui.run(function(){
            floatFunToCbbSet.actionbar.setText("正在寻找按键坐标" + "\n请对准命令方块保持不动" + "\n检测是否为网易我的世界布局" + "\n检测当前是否为" + text);
          });
        }
        var funToCbbRootAutomator = new RootAutomator();//root
        events.on("exit", function(){
          funToCbbRootAutomator.exit();
        });
        var funToCbbCaptureScreen = images.captureScreen();//获取屏幕截图
        function iLC(img){
          let iLC2 = images.read(img);
          let iLC3 = images.findImage(funToCbbCaptureScreen, iLC2, {threshold: 0.2});
          iLC2.recycle();
          iLC2 = null;
          return iLC3;
        }
        floatFunToCbbSet.setPosition(0, 0);//弹出主控
        floatMain.setPosition(-device.width*2, -device.height*2);//消灭作弊行为
        funToCbbTextDIY("移动");
        const funToCbbFindNeteaseMove = iLC("./res/neteaseMoveButton.png");
        if(funToCbbFindNeteaseMove === null){
          funToCbbTextDIY("跑步");
          const funToCbbFindFastMove = iLC("./res/FastMoveButton.png");
          if(funToCbbFindFastMove === null){
            funToCbbTextDIY("蹲下");
            const funToCbbFindNeteaseDown = iLC("./res/neteaseDownButton.png");
            if(funToCbbFindNeteaseDown === null){
              //非网易
            }else{//蹲下
              funToCbbCaptureScreen = null;
            }
          }else{//跑步
            funToCbbCaptureScreen = null;
            alert("这是网易的跑步");
          }
        }else{//移动行走
          funToCbbCaptureScreen = null; 
          funToCbbCheck(funToCbbFindNeteaseMove.x, funToCbbFindNeteaseMove.y, 1);
        }   
      }else{
        toast("请先同意请求截取的权限");
      }
    });
  });
});






