"ui";
"use strict";
/*http://api.bilibili.com/audio/music-service-c/s?keyword=关键词&page=页数&search_type=下面类型
search_type
  menus 歌单
  musician 音乐人
  music 音乐*/

var hasSearch = [];

ui.layout(
  <drawer h="*" w="*" bg="#E3FFFF">
    <vertical h="*" w="*">
      <horizontal w="*">
        <button w="100" id="inputButton" text="轰炸b站"/>
        <input id="inputKey" w="*" hint="输入信息"/>
      </horizontal>
      <list id="list">
        <vertical w="*">
          <img src="{{this.cover}}" h="80" w="80"/>
          <text text="题目:{{this.title}}"/>
          <text text="名字:{{this.up_name}}"/>
          <text text="播放数:{{this.play_count}}"/>
          <text text="评论数:{{this.review_count}}"/>
          <text text="id:{{this.id}}"/>
        </vertical>
      </list>
    </vertical>
  </drawer>
);

function checkInput(inputSearch){//搜索第一类
  http.get(inputSearch, {}, function(res, err){
    if(err){return alert("Error:连接出错(不要慌)", "请查看当前网络是否正常,\n并重新刷新几次\n如果不行请联系作者\n" +err)}
    var bilibiliSearch = res.body.json().data;
    hasSearch.push(new Date().getTime());
    for(let bilibiliSearchPage = 2; bilibiliSearchPage <= bilibiliSearch.num_pages; ++bilibiliSearchPage){
      if(hasSearch < 1){break;}
      
      http.get(inputSearch + "&page=" + bilibiliSearchPage, {}, function(res, err){
        bilibiliSearch.result.push.apply(bilibiliSearch.result, res.body.json().data.result);
        ui.run(()=>{
          ui.list.setDataSource(bilibiliSearch.result);
        });
      });
      sleep(5000);
    }
    hasSearch--;
  });
}

function checkInput2(inputSearch){//搜索第二类未完工
  const biliSearch = threads.start(function(){
    http.get(inputSearch, {}, function(res, err){
      if(err){return alert("Error:连接出错(不要慌)", "请查看当前网络是否正常,\n并重新刷新几次\n如果不行请联系作者\n" +err)}
      var bilibiliSearch = res.body.json().data;
      bilibiliSearch.result.push({
        type: loader,
        title: "点击加载下一页"
      });
    });    
  });
  biliSearch.interrupt();
}

ui.inputButton.click(()=>{//激活搜索
  if(ui.inputKey.getText() == ""){return;}
  checkInput("http://api.bilibili.com/audio/music-service-c/s?keyword=" + encodeURIComponent(ui.inputKey.getText()));
});

ui.list.on("item_click", item=>{//下载选择kbps
  var bilibiliPlay = {}, bilibiliPlayNum = [];
  item.play_url_list.forEach(val=>{
    bilibiliPlay[parseInt(val.quality)] = val.url;
    bilibiliPlayNum.push(parseInt(val.quality));
  });
  var biliDownloadNum = Math.max.apply(null, bilibiliPlayNum);
  http.get(bilibiliPlay[biliDownloadNum], {}, function(res, err){
    if(err){return alert("Error:连接出错(不要慌)", "请查看当前网络是否正常,\n并重新刷新几次\n如果不行请联系作者\n" +err)}
    files.createWithDirs("/sdcard/OneJay/Temp/bili/");
    var biliMP3 = "/sdcard/OneJay/Temp/bili/bili_" + biliDownloadNum + "_" + item.id + ".mp3";
    files.writeBytes(biliMP3, res.body.bytes());
    media.playMusic(biliMP3, 1, false);
    bilibiliPlay = null, bilibiliPlayNum = null, biliMP3 = null;
  });
});




