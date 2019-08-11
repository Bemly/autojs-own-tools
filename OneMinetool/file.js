"use strict";
setInterval(()=>{},1000);

var newDir = "/sdcard/", fileType, fileName,
  fileMode = ["png|jpg|jpeg|webp"];

function fileLoader(){
  fileType =[{
    "name" : "缓慢遍历中",
    "src" : "@drawable/ic_sync_black_48dp",
    "color" : "000000",
    "colorbg" : "E4FFFF",
    "type" : NaN
  }];
  fileMain.fileType.setDataSource(fileType);
  if(newDir !== "/"){
    fileType = [{
      "name" : "返回上一级",
      "src" : "@drawable/ic_folder_black_48dp",
      "color" : "000000",
      "colorbg" : "E4FFFF",
      "type" : 0
    }];
  }else{
    fileType = [];
  }
  setTimeout(()=>{
    files.listDir(newDir).forEach(val=>{
      if(!files.isFile(files.join(newDir,val))){
        fileType.push({
          "name" : val,
          "src" : "@drawable/ic_folder_black_48dp",
          "color" : "000000",
          "colorbg" : "E4FFFF",
          "type" : 1
        });//0文件夹1指定文件
      }else if(new RegExp("\.("+fileMode[0]+")$",'i').test(val)){
        fileType.push({
          "name": val,
          "src" : "@drawable/ic_image_black_48dp",
          "color" : "E4FFFF",
          "colorbg" : "000000",
          "type" : 2
        });
      }
    });
    fileMain.fileType.setDataSource(fileType);
    fileName = [{"name" : newDir}];
    fileMain.fileLoader.setDataSource(fileName);
  },0);
}

var fileMain = floaty.rawWindow(
  <frame h="*" w="*">
    <frame>
      <View h="*" w="*" bg="#BB000000"/>
      <button h="*" w="*" margin="35 75"/>
    </frame>
    <card w="*" h="*" margin="30 70" cardCornerRadius="14" cardElevation="10">
      <vertical bg="#8FD3EA" h="*">
        <card margin="15 10 15 0" cardCornerRadius="5" cardElevation="10">
          <vertical bg="#E4FFFF" layout_gravity="center|right" gravity="center|right">
            <list id="fileLoader" marginLeft="15">
              <text text="所在路径:{{this.name}}" textColor="#000000"/>
            </list>
          </vertical>
        </card>
        <card h="*" margin="15 10 15 55" cardCornerRadius="14" cardElevation="10">
          <vertical bg="#E4FFFF">
            <list id="fileType">
              <card w="*" h="20" margin="15 3" cardCornerRadius="5" cardElevation="3" foreground="?selectableItemBackground">
                <horizontal bg="#{{this.colorbg}}">
                  <img marginRight="-10" src="{{this.src}}" tint="#{{this.color}}"/>
                  <text text="{{this.name}}" textColor="#{{this.color}}"/>
                </horizontal>
              </card>
            </list>
          </vertical>
        </card>
      </vertical>
      <horizontal w="*">
        <card w="160" id="fileReset" h="30" margin="15 13 0 15" cardCornerRadius="5" cardElevation="10" layout_gravity="bottom|left" foreground="?selectableItemBackground">
          <horizontal layout_gravity="center|center" gravity="center|center" bg="#E4FFFF">
            <img margin="-14 0" h="18" src="@drawable/ic_home_black_48dp" tint="#000000"/>
            <text text="回到储存目录" layout_gravity="center|center" textColor="#000000"/>
          </horizontal>
        </card>
        <card w="*" id="fileCancel" h="30" margin="15 13 15 15" cardCornerRadius="5" cardElevation="10" layout_gravity="bottom|left" foreground="?selectableItemBackground">
          <horizontal layout_gravity="center|center" gravity="center|center" bg="#E4FFFF">
            <img margin="-14 0" h="18" src="@drawable/ic_cancel_black_48dp" tint="#000000"/>
            <text text="取消" layout_gravity="center|center" textColor="#000000"/>
          </horizontal>
        </card>
      </horizontal>
    </card>
  </frame>
);
fileMain.setSize(-1,-1);
fileMain.setPosition(0,0);

ui.run(()=>{
  fileLoader();
  fileMain.fileReset.click(()=>{
    newDir = "/sdcard/";
    fileLoader();
  });
  fileMain.fileCancel.click(()=>{
    delete ui;
    delete fileMain;
    delete fileLoader;
    fileMain.exitOnClose();
    fileMain.close();
  });//背景
  fileMain.fileType.on("item_click",item=>{
    switch(item.type){
      case 0:
        var fileCancel = newDir.split("/");
        fileCancel.splice(-2,1);
        newDir = fileCancel.join("/");
        fileCancel = null;
        fileLoader();
        break;
      case 1:
        newDir += item.name + "/";
        fileLoader();
    }
  });
});




