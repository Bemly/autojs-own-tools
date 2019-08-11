//此js在auto.js 4.0.1下编写
//注意，此js为非严格模式！
//作者是刚入门的蓝莓小果冻bemly编写
var startTime = Date.now();
console.info(
  "=========================\n" +
  "=               本代码使用                 =\n" +
  "=           Auto.js 4.0.1 编写          =\n" +
  "=   作者 蓝莓小果冻  by bemly  =\n" +
  "=========================\n");
console.show();

//网页端js测试，auto.js不支持window对象
/*function firstDay(){
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
}*/

function $Number(){
  var $1 = true, $2 = String($1), $3 = Number($2), $4 = Number(""), $5 = Number(true + $1 * $4), $5 = Number($4 * false + $5 * 3 + $1 * true);
  alert($1 + "\n" + $2 + "\n" + $3 + "\n" + $4 + "\n" + $5);
  alert("类型事例" + "\n$1:" + typeof $1 + "\n$2:" + typeof $2 + "\n$3:" + typeof $3 + "\n$4:" + typeof $4 + "\n$5:" + typeof $5);
}

function $firstDay(){
  var $ = "656.568px";
  do {
    $1 = parseFloat($), $2 =parseInt($);
    $ = parseInt($1 * $1 - $2);
    alert($ + "px");
  } while ($ > 3);
  alert("ojbk");
}

function $demo(){
  alert(typeof null);
  alert(0 == null);
  alert(0 == +null);
}

//function for_function(){
  console.log(console);
  console.log(["time"] in console);
  for(let fuck in global){
    console.log("\n属性名：" + fuck + "\n函数：" + console[fuck]);
  }
 // for(let fuck of helloWorld){
  //  console.log("\n属性名：" + fuck + "\n函数：" + helloWorld[fuck]);
 // }
//}
  
function helloWorld(){
 var a = true, b = false;
 a = ++a + a-- - --b + b;
 b = a++ + ++b + a * ++b;
 console.log(++a + --b);
}

function $helloWorld(){
  alert(typeof null);
  alert(0 == +null);
  //null是特殊的比较，始终返回false
}

function waterFlower(){
  var a,b,c,$flower = "水仙花研究报告:\n", flower = 0, $count = 100;
  while($count < 1000){//parseInt取整数，parseFloat取浮点数
    a = parseInt($count / 100), b = parseInt($count % 100 / 10), c = $count % 10;
    if($count == a*a*a + b*b*b + c*c*c){//不知道怎么3次方emm，^好像是其他意思
      console.log($count);
      ++flower;
      $flower = $flower + "第" + flower + "株：编号" + $count + "\n";//利用+转换为字符串的特性
    }
    $count++;
  }
  alert($flower + "综上所述\n一共有" + flower + "株水仙花");
}

function waterFlower_for_min(){
  //问题：求100以内的水仙花数
  for(var a,b,c,$flower = "水仙花研究报告:\n", flower = 0, $count = 100;$count < 1000;$count++){a = parseInt($count / 100), b = parseInt($count % 100 / 10), c = $count % 10;if($count == a*a*a + b*b*b + c*c*c){console.log($count);++flower;$flower = $flower + "第" + flower + "株：编号" + $count + "\n";}}alert($flower + "综上所述\n一共有" + flower + "株水仙花");
}

function $waterFlower(){
  for (var i = 100, flower = 0, $flower = "水仙花研究报告:\n";i < 1000;++i){
    var arr = String(i).split('');//分割
    if(i == Math.pow(arr[0],3)+Math.pow(arr[1],3)+Math.pow(arr[2],3)){
      ++flower;$flower = $flower + "第" + flower + "株：编号" + i + "\n";
    }
    console.log(i);
  }
  alert($flower + "综上所述\n一共有" + flower + "株水仙花");
}

function earthStar(){
  for(var $ = 1 , _ = "";$ <= 5;$++){
    console.log(_ = _ + "*");
  }
}  

function $earthStar(){
  //问题：在控制台打印出倒三角
  for(var $ = 5 , _ = "";$ > 0;$--){
    for(var $_ = $;$_ > 0;$_--){
    _ = _ + "*";
    }
    console.log(_);
    _ = "";    
  }
}

function $$earthStar(){
  for(var $ = 1;$ <= 9;$++){
    for(var $_ = $ , _ = "";$_ <= 9;$_++){
    _ = _ + $ + "x" + $_ + "=" + ($*$_) + "\n";
    }
    console.log(_);
  }
}    
  
function $$$earthStar(){
  //问题：在控制台中打出99乘法表
  for(var a = 1;a <= 9;a++){
    for(var b = 1,c = "";b <= a;b++){
      c = c + b + "x" + a + "=" + (a*b) + " ";
    }
    console.log(c);
  }
}

function obj(){//仅auto.js运行
  初识对象:{//id
    var moha = new Object();
    moha["f$$k"] = "money我全都要";
    moha.fuck = "新一轮名单";
    delete moha["f$$k"];
    var $moha = "fuck";
    var _moha = {var:"脑壳晕没哇"};        
    moha.var = _moha.var;
    moha.new = _moha;
    console.info(typeof moha + " " + moha);
    console.log("类型:" + typeof moha.fuck + "\n名称:" + moha.fuck);
    console.log("\n类型:" + typeof moha.f$$k + "\n名称:" + moha["f$$k"]);
    console.log("\n类型:" + typeof moha[$moha] + "\n名称:" + moha[$moha]);
    //代换前需要加上类型
    console.log("\n类型:" + typeof $moha + "\n名称:" + $moha);
    //[""]和.是一家子的
    console.log("\n类型:" + typeof _moha.var + "\n名称:" + _moha.var);
    //垃圾桶内的垃圾桶内的垃圾桶......
    console.log("\n类型:" + typeof moha.var + "\n名称:" + moha.var);
    //嵌套 对象中的对象可以直接调用
    console.warn("\n类型:" + typeof moha.new + "\n名称:" + moha.new);
    console.log("\n类型:" + typeof moha.new.var + "\n名称:" + moha.new["var"]);
    console.log("\n类型:" + typeof moha.f$$k + "\n名称:" + moha.f$$k + "\n是否存在:" + (["f$$k"] in moha));
    moha["f$$k"] = "helloWorld";//检测属性，输出Boolean，用于条件
    console.log("\n类型:" + typeof moha.f$$k + "\n名称:" + moha.f$$k + "\n是否存在:" + ("f$$k" in moha));
    var $_moha = moha;//可以直接嫁接
    console.log("\n类型:" + typeof $_moha.f$$k + "\n名称:" + $_moha["f$$k"]);
    delete $_moha;
    var $_moha = {};
    $_moha["new"] = "看我还在吗";
    $_moha.new2 = "我是备胎";
    $_moha = moha;//赋值是整个代替掉，不是替换！！！
    console.log("\n类型:" + typeof moha.new + "\n名称:" + moha.new);
    console.log("\n类型:" + typeof moha.new2 + "\n名称:" + moha["new2"]);
  }
  基本数据类型和引用数据类型的区别:{
    基本数据类型:{
      console.error("基本数据类型：" +
        "Boolean String Number Undefined Null" +
        "\n*NaN是属于Number类型的" +
        "一个变量赋值之后另一个变量改变时，" +
        "该变量不会随之改变\n");
    }
    引用数据类型:{
      console.error("引用数据类型：" +
        "Object\n它会随着另一个变量的改变而改变\n");
      for(_moha.var = 1;moha.new.var < 5;_moha["var"]++){
        if(_moha["var"] == 3){
          continue 引用数据类型;//continue和break可以指定id
        }
        console.log("康我加载第" + moha.new["var"] + "次");
      }
    }
    事例:{
      var $_moha = moha;//从这里可以看出双方修改都有效
      moha.new2 = "备胎重回江湖";
      console.log("\nmoha对象:" + typeof moha.new2 + "\n名称:" + moha.new2);
      console.log("\n$_moha对象:" + typeof $_moha.new2 + "\n名称:" + $_moha.new2);
      $_moha.new2 = "大型精分现场";
      console.log("\nmoha对象:" + typeof moha.new2 + "\n名称:" + moha.new2);
      console.log("\n$_moha对象:" + typeof $_moha.new2 + "\n名称:" + $_moha.new2);
      return _moha.var;
      _moha["var"] = 8848;
    }
  }
}
    
function $__$_$_$____$$$$_$_$(){
  var moha = obj();
  console.log(moha);
}

function _obj(){
  funww();
  console.log(a);
  function funww(){
    a = {
      a:{a:{a:NaN},b:404},
      b:{b:{b:undefined}},
      c:null
    };
  }
}

function learnThis(){
  $loop();
  //前置加载组件，声明最后一个函数中的两个对象
  //在堆内存内创建两个对象，然后分别在栈内存指明地址
  var Loop = NaN;
  //在全局作用域中声明一个为NaN的Loop变量

  for(var $loop$ in _actionbar_){
    console.log(_actionbar_[$loop$]);
    //1
    //第一次通过调用对象中的函数_Index_._function_();
    //对象_Index_>>属性_function_>>函数loop>>this处于
    //函数作用域内，this等价于_Index_，然后返回对象中的Loop属性
    //2
    //与上方一样，第二次通过调用对象中的函数_index_._function_();
    //3
    //通过调用函数loop();这时this处于全局作用域
    //所在的函数已经被优先运作了，所以排在var Loop后，=NaN前
  }

  console.log("重新执行前" + _actionbar_["3"]);
  //这里的4依然指的是之前优先运行的函数，所以等价于上面的4
  
  $loop();
  //重新调用该函数
  console.log("重新执行后" + _actionbar_["3"]);
  //此处已经在"全局作用域中的Loop变量成功赋值"之后调用
  //所以会打印出已赋值的结果//暂归特性，请使用严格模式书写

  function loop(){
    return this.Loop
    console.log("通过this来返回变量为Loop的结果");
  }
  function $loop(){
    _Index_ = {
              Loop:true,
              music:"hop",
              _function_:loop
    };
    _index_ = {
              Loop:false,
              music:"hip",
              _function_:loop
    };
    _actionbar_ = {
                  1:"<=====this的多重表达=====>\n\n" + 
                    "第一个对象:" + _Index_._function_(),
                  2:"第二个对象:" + _index_._function_(),
                  3:"调用loop:" + loop()
    };//严格按照JSON格式书写
  }
}

function learnThis_min(){
  $loop();var Loop = NaN;for(var $loop$ in _actionbar_){console.log(_actionbar_[$loop$]);}console.log(_actionbar_["3"]);$loop();console.log(_actionbar_["3"]);function loop(){return this.Loop}function $loop(){_Index_ = {Loop:true,music:"hop",_function_:loop};_index_ = {Loop:false,music:"hip",_function_:loop};_actionbar_ = {1:_Index_._function_(),2:_index_._function_(),3:loop()};}
}

function hdiebdjdbje(){
  var robot = createPerson("自由男人",18,true);
  var robot2 = createPerson("自由女神像",154,false);
  console.log("isFuck = "+robot2.actionbar());
  function createPerson(name,age,isFuck){
    var robot = {
                name:name,
                age:age,
                isFuck:isFuck,
                actionbar:function title(){
                  console.log("name = "+this.name);
                  return this.isFuck;
                }
    };
    return robot;
  }
}

var endTime = Date.now();
console.warn("耗时:" + (endTime - startTime) + "毫秒");