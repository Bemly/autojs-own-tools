function firstDay(){
do{
  var actionbar = prompt(
        "welcome to Bemly home\n"+
         "\n输入“寒舍”浏览404界面"+
       "\n输入“粒子”查看粒子翻译"+
        "\n点击取消原地暴毙");
  var note = 0;
  if (actionbar == "\u5bd2\u820d"){
    note = 1;
    window.location.href='404.html';
  } else if (actionbar == "\u7c92\u5b50"){
    note = 2;
    alert("注意事项·广而告之\n\n为了大家的健康问题\n作者参与了护眼计划\n保障大家不会因\n过度用眼导致暴毙")
    window.location.href='index.html';
  } else if (actionbar == null){
window.location.href='https://minecraft-zh.gamepedia.com/%E5%9F%BA%E5%B2%A9%E7%89%88%E9%A2%97%E7%B2%92%E6%96%87%E6%A1%A3';
  } else if (actionbar == ""){
    alert("尊敬的客官\n请想清楚再输入好伐")
  } else {
    alert("大佬输入的\n“"+actionbar+"”\n识别失败\n请重新输入yo~");
  }
}while(note == 0);
}