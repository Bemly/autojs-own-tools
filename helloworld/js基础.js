"use strict";
toast(!["context"] in this);
toast(["activity"] in this);
/*
蓝莓的笔记（雾
里面有奇♂怪的东西哟
本文档建议安卓端使用mt2管理器查看，苹果端使用textcode查看，其他端使用自带或wps查看
《实践是检验真理的唯一标准》

===菜鸟笔记的补充说明===
==过气w3c获取==
try {
  if(判断) throw 字面量;
  //其他的没试过
  ...;
}catch(接收字面量的形参){
  语句;
  //异常时才会抛出信息
  ...;
 }finally{
  语句;
  //不管异常还是正常都会执行
  ...;
}
*接收变量值的形参必须是err


function fun1(){
  return !this;
}
//返回false
∵"this"指向全局对象
∴"!this"就是false
function fun2(){
  "use strict";
  return !this;
}
//返回true
∵严格模式下this为undefined
∴"!this"为true
*赋值语句返回变量的值

javascript:void(0)用来输出undefined，常用于超链接
变量名不要以 $ 作为开始标记，会与很多 JavaScript 库冲突

建议使用小写文件名
大多 Web 服务器 (Apache, Unix) 对大小写敏感： london.jpg 不能通过 London.jpg 访问。
其他 Web 服务器 (Microsoft, IIS) 对大小写不敏感： london.jpg 可以通过 London.jpg 或 london.jpg 访问

function 名字(形参){函数声明};//es5
可换作
变量 = (形参) => {函数声明};//es6
*支持函数带有默认参数 (形参 = 值)
*箭头函数就不会被提升

argument对象包含了函数调用的参数数组，
例如函数运行时不写形参直接调用
x = findMax(1, 123, 500, 115, 44, 88);
function findMax(){
  var i, max = arguments[0];
  if(arguments.length < 2){
    return max
  };
  for(i = 0; i < arguments.length; i++){
    if(arguments[i] > max){
      max = arguments[i];
    }
  }
  return max;
}

忘记闭包的含义了就看看这个
function add(){
  var counter = 0;
  function plus(){
     counter += 1;
  }
  plus();
  return counter;
}

==洗脑MDN获取==
!!!全局对象在浏览器中为window，在node中为global
块里面的函数不会提升，建议规范代码，不要花里胡哨的

箭头函数:"var/let/无声明 变量 = (形参) => {语句}"
箭头函数不会提升!!!

反对构造函数使用return覆盖掉成为"死"代码

关于原型
var a = {a:1};
var b = Object.create(a);
b.b = 2;b.c = 3;
这样赋值你可能会说，可以直接var a = b;
但是这个Object.create方法是给b赋值一个指向原型的指针
使用Object.create是这样的(自己的理解
  变量 丨 字面量  丨 ┍━━>对象0x650    
       丨         丨 │      0x648 ━━━━━┓
       丨         丨 │     b=2 c=3  指针>┧
       丨         丨 │┍━>对象0x648 <━━━┚
   b   丨 0x650 ━━━┙│     a = 1
   a   丨 0x648 ━━━━┙
     栈内存       丨       堆内存

直接赋值是这样的(自己的理解
  变量 丨 字面量  丨 ┍━━>对象0x650    
       丨         丨 │      a = 1
       丨         丨 │     b=2 c=3
       丨         丨 │┍━>对象0x648
   b   丨 0x650 ━━━┙│     a = 1
   a   丨 0x648 ━━━━┙
     栈内存       丨       堆内存

从图中我们可以看到使用Object.create是对象中有指针指向的
所以我们可以试试Object.create后修改a中的a后可以发现b中的也改变了
var a = {a:1};
var b = Object.create(a);
b.b = 2;b.c = 3;
console.log(b);//可以看到b中并没有a
a.a = 2;
console.log(b.a);//return 2
a.b = 5;
console.log(b.__proto__);//查看b中的原型可以看到a了
所以Object.create方法是将a赋值到b的原型里(大概
当a这个原型和本体都有的时候会优先选择本体哟
关于Object.create方法后this指向谁看//这里没有提醒蓝莓
允许你为创建的对象选择其原型对象
详细@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#使用_Object.create_方法

一些奇怪的东西可以不看不了解
getter用于对象中的伪属性类型，显示[Getter]
函数名不能与对象中的其他属性名重复
get的属性在调用无需()也就是说实参无法正常传入
不手动返回时会在语句加载完返回undefined,可以使用delete删除
现有对象中添加格式:Object.defineProperty(对象名,属性名,{ get : function (形参) {语句...;}});
对象中直接创建格式:{get 属性名(形参){语句...;}}
setter大多数特性一致，设置对象中的属性时set会将属性的字面量作为实参调用set中的函数
current属性是未定义的，访问它时将会返回 undefined
现有对象中添加格式:(对象名,属性名,{ set : function (形参) {语句...;}});
添加对象时会激活setter，常用于数组自动整理
对象中直接创建格式:{set 属性名(形参){语句...;}}
                       //属性名将作为之后字面量输入的变量
                       //即"对象名.属性名 = 字面量"，输入的字面量会传入形参
关于getter@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get
关于setter@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set

*****Object.defineProperty可能会使你产生困扰，他并不是只传get与set
首先第一个实参是目标对象，第二个实参是属性名，第三是目前的特性(三个必填)
其实第三实参中用{xxx:xxx,xxx:xxx}来表示，是一个对象
但是这个对象不是自定义的对象，是descriptor，有指定取值的
错误解读:Object.defineProperty(对象名,属性名,{属性名 : 字面量 , 属性名 : 字面量});
正确解读:Object.defineProperty(对象名,属性名,{特定取值 : 字面量 , 特定取值 : 字面量});
特定取值如下:
value:属性名所对的字面量
writable:为false时该字面量无法再进行更改,只读模式,填布尔值
configurable:总阀,为false时不能再value,writable,configurable等特定取值,填布尔值
enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来,填布尔值
descriptor中不能同时设置访问器
如果想用getter或setter就不能用wriable或value中的任何一个
关于Object.defineProperty@https://www.cnblogs.com/weiqu/p/5860945.html

Object.keys打印可枚举的所有属性，当是原始值时会转化为数组对象，
而不会报错//es2015即es6，报错//es5
Object.getOwnPropertyNames不管是否枚举通通打印
关于Object.keys@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

对象.forEach((对应字面量,索引,对象) => {语句...;});
//遍历对象自有的、继承的、可枚举的、非Symbol的属性

this很重要，建议看前复习this到记住原理
1.this的值取决于函数的调用方式
****全局对象在浏览器中为window，在node中为global
2.全局环境中指向全局对象
  非严格模式下以函数来调用，函数中的this默认指向全局对象
  严格模式下以函数来调用，函数中的this默认为undefined
  !!!这些仅限函数声明，箭头函数在调用时始终指向全局对象或undefined
  !!!箭头函数使用call,apply,bind等方法仍指向全局对象或undefined233
  以构造函数来调用，this就是本身函数的值
  以方法来调用，谁调用的就返回谁(通俗，见3.)
****有些浏览器在严格模式没正确实现这功能，于是错误返回了全局对象
3.想要把this的值转移到另一个环境
  可以使用call或apply方法来绑定到调用中的特定对象
  call和apply方法需要填入实参(详见//没填这个找蓝莓
    var obj = {obj : "猜猜我会以什么方式显示"};
    alert(whatsThis());//打印{obj:'猜猜我会以什么方式显示'}
      //即this指向全局对象
    alert(whatsThis.call(obj));//打印猜猜我会以什么方式显示
      //即被转移到了指定的obj对象里
    alert(whatsThis.apply(obj));//同call
      //即也被转移到了指定的obj对象里
    function whatsThis(){
      //函数声明提升
      return this.obj;
    }
****简记call,apply方式实参写谁this就是谁
4.说了两种方法，那这两种方法肯定有各自的区别咯
  call后续可以跟无限制的实参，而apply只跟两个实参
  第一个实参call,apply都是作为this使用的对象
  call第二个及以上的实参分别对应函数从0开始的所有形参
  apply第二个实参是一个数组,里面写的字面量分别对应函数从0开始的所有形参
****call,apply方式第一个实参应该跟对象，
   不是对象的会进行ToObject操作转换为对象，
   Object.prototype.toString.call(this)来获取该值
   比如实参为Number类型的1，则返回Object类型的1
5.bind方法是es5出的船新方法，
  输入(实参)正确应为对象，其他字面量跟call,apply类似
  输出是一个使用了bind方法的新(子)函数
  长使用声明赋值来获取这个新(子)函数
  这个函数中的this将被始终指定为输入(实参)中的对象
  而且不再能被新(子子)函数所更改指定，只能用未使用bind方法的
  父函数来使用bind方法，而父函数本身并不改变
****下面是一段以中文为变量的完整代码，可以彻底搞懂关系
function 一个函数(){
  return this.对象中的属性;
}
var 赋值后的bind方法 = 一个函数.bind({对象中的属性:"wdnmd"});
//声明并赋值了一个新的函数，
//输入的第一个实参作为this的对象
//但是对函数本身并不修改，所以需要赋值到一个新的变量里
//输出是一个新函数
console.log(赋值后的bind方法());
//返回wdnmd，this指向了实参写的对象
var 二次赋值后的bind方法 = 赋值后的bind方法.bind({对象中的属性:"看不见我的放弃吧"});
//我们第二次声明并将上次的新函数赋值到新变量上
//得到了一个新的函数
console.log(二次赋值后的bind方法());
//返回wdnmd，说明this仍然指向第一次调用bind方法时实参的对象上
//说明bind只能指定一次，二次或以上赋值都与第一次相同
//建议不要二次赋值bind方法输出的函数
//但是并不是表示没方法了
var 一个新赋值后的bind方法 = 一个函数.bind({对象中的属性:"rua！"});
console.log(一个新赋值后的bind方法());
//在父函数中继续使用bind方法赋值到其他函数即可解决
var 一个对象 = {对象中的属性:37, 一个函数:一个函数, 赋值后的bind方法:赋值后的bind方法, 二次赋值后的bind方法:二次赋值后的bind方法};
console.log(一个对象.一个函数(), 一个对象.赋值后的bind方法(), 一个对象.二次赋值后的bind方法());
//可以看出父函数并未更改，其他二次一次都始终指向bind方法钦定的
6.调用对象原型链中的this时，调用的哪个对象就指向哪个对象
关于this@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this

关于for..of@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of
for(声明量 of 变量){
  语句;
  ...;
}
//遍历变量，主要是对象数组函数...

** 幂的运算符
赋值运算符，假设a,b为变量，则<a 运算符= b>==<a = a 运算符 b>
为了代码减少出错的几率，请放弃==,!=，改为===,!==

关于String方法@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Text_formatting#String对象方法
其中 trim 方法可以去掉字符串开头和结尾的空白字符，常用于输入元素
字符串可以使用 ` ` 来定义字面量，此时可以直接换行
还可以使用${}来标识占位符
比如如下所示
var a = 1;
var b = 2;
alert(`小明${a + b}岁了`);

关于换行你还在对"\n" +感到苦恼吗
直接使用\n\换行还能节省一大部分"
代码换行\  字面量换行\n

(` `)auto.js没有，直接使用(" ")吧233
占位符详细跳转到//如果没有给蓝莓讲

通俗讲方法和函数的区别，
方法也是函数，只不过是官方给你写好的
//自定义函数示例
用向下取整来生成 0 到 参数-1 之间的随机数
调用：  函数名(实参);
     //Number类型
function 函数名(形参){
  return Math.floor(Math.random()*形参);
}
用四舍五入来生成 ranX_diy 到 ranY_diy 之间的随机数
调用：  函数名(实参1,实参2);
function 函数名(ranX_diy,ranY_diy){
  return Math.round(Math.random()*(ranY_diy - ranX_diy) + ranX_diy);
}

instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中
typeof操作符返回一个字符串!!!表示未经计算的操作数的类型
量.split(必需切割字面量或正则表达式,可选最大长度);//超过最大长度的内容不会输出
更多翻阅文档@https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference

symbol值能作为对象属性的标识符
var sym = Symbol("foo");
var obj = {[sym]: 1};
obj[sym];
obj[Object(sym)];
autojs运行不了，没法笔记

===彩蛋===
适用于QQ，TIM
五子棋模板
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
⭕⭕⭕⭕⭕⭕⭕⭕⭕
没符号用下面的复制
⚫黑棋等待加入
⚪白棋等待加入

象棋模板
⚫等待加入
吃掉数量：
车马象士将士象马车
口口口口口口口口口
口口炮口口口炮口口
口口口口口口口口口
兵口兵口兵口兵口兵
口口口口口口口口口
=================
口口口口口口口口口
卒口卒口卒口卒口卒
口口口口口口口口口
口口砲口口口砲口口
口口口口口口口口口
車馬相仕帅仕象馬車
⚪等待加入
吃掉数量：

===css一些新的属性值不知道===
过气w3c没有收录的可以试试MDN里搜索
css属性值@https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference#关键字索引

===auto.js的一些东西===
==文档方面==
=console控制台=
time，timeEnd方法为4.1.0新增，返回整数
打印时会在结尾加上\n
打印第一个实参为内容，其他实参作为代替值
代替值替换内容@http://man7.org/linux/man-pages/man3/printf.3.html

==研究示例方面==
=已透彻=
Object.keys当是原始值时会转化为数组对象，而不会报错
auto.js支持直接调用Android的API
对于Auto.js没有内置的函数
可以直接通过修改Android代码为JavaScript代码实现
懂我意思吧，除了js还要会别的语言(艹)

Auto.js内置了Promise，方法如下所示：
语句.then(//如果写的没删除这段话快去催他看看MDN
  (形参) => {
    语句;
    ...;
  }
);
*注意第一个语句不能用" ; "结束，会导致语法错误

回调函数大概如下图所示：
语句(量,function(形参){
  语句;
  ...;
});

bg属性:{
  ?selectableItemBackgroundBorderless 圆形
  ?selectableItemBackground 矩形
}
setClip(<形参:Onlyone>);//复制内容到剪切板
点击事件:{
  ui.元素id.on(<"click"/"long_click">,无形参的函数声明); 
                //点击/长按
  ui.元素id.on("item_click",function(形参1,形参2,形参3,形参4){
      //用于数组，形参1是数组对应的变量，
                  形参2是对应变量的索引，
                  形参3是com.stardust.autojs.core.ui.widget.JsImageView{373da6a V.ED..CL. ...P.... 306,348-504,588}
                  形参4是com.stardust.autojs.core.ui.widget.JsGridView{ae6ebd7 VFED..... ........ 0,144-1080,981 #133a2bd}
                  ...未赋值  //类似forEach前的value,index,obj
});
}
ui.主要用于input等元素.text();  //input获取用户输入的文字
ui.元素id.setDataSource(实参); //

=未搞懂=
function getText() {
java.lang.CharSequence getText()
}
*/
console.show();//不是autojs请删掉本行谢谢


{//简单模式下的this
function whatsThis(){
  return this.obj;
}
var obj = {obj : "猜猜我会以什么方式显示"};
console.log(whatsThis());
console.log(whatsThis.call(obj));
console.log(whatsThis.apply(obj));

function whatsCall(num) {
  let obj1 = Object.prototype.toString.call(this);
  let obj2 = this.obj;
  switch(num){
    case undefined:
      num = 2;
  }
  let fun = (obj) => {
    console.log(num + " 1:" + obj);
    console.log(num + " 2:" + typeof obj);
  }
  fun(obj2);
  //1 是非对象实参的情况
  //1 这里填写this返回Object类型的数字1
  //1 填写this.obj返回未赋值
  //2 是未填写实参的情况
  //2 this返回全局对象
  //2 this.obj返回全局对象中的obj变量
  //3 正常返回实参的情况
  //3 this返回实参写的对象
  //3 this.obj返回对象中的obj
  return obj1;
}
//call和apply方法第一实参应使用对象输入
//1输入前为Number类型
//会被ToObject转换为对象作为实参
var num = 1;
var fun = (def,num) => {
  console.log(num + " 3:" + def);
  console.log(num + " 4:" + typeof def);
}
fun(whatsCall.call(num,1),1);
//在node中，全局对象为global
//在浏览器中，全局对象是window
fun(whatsCall.call(),2);
fun(whatsCall.call(obj,3),3);

//垃圾回收从小事做起
num = null;
fun = null;
whatsCall = null;
obj = null;
whatsThis = null;
console.log("\n");
}


{//bind方法来确定this
 //这里是理解内容，因此我把量全部换成中文了233
 //便于李姐。。。个屁了
function 一个函数(){
  return this.对象中的常量;
}
var 赋值后的bind方法 = 一个函数.bind({对象中的常量:"wdnmd"});
//声明并赋值了一个新的函数，
//输入的第一个实参作为this的对象
//但是对函数本身并不修改，所以需要赋值到一个新的变量里
//输出是一个新函数
console.log(赋值后的bind方法());
//返回wdnmd，this指向了实参写的对象
var 二次赋值后的bind方法 = 赋值后的bind方法.bind({对象中的常量:"看不见我的放弃吧"});
//我们第二次声明并将上次的新函数赋值到新变量上
//得到了一个新的函数
console.log(二次赋值后的bind方法());
//返回wdnmd，说明this仍然指向第一次调用bind方法时实参的对象上
//说明bind只能指定一次，二次或以上赋值都与第一次相同
//建议不要二次赋值bind方法输出的函数

//但是并不是表示没方法了
var 一个新赋值后的bind方法 = 一个函数.bind({对象中的常量:"rua！"});
console.log(一个新赋值后的bind方法());
//在父函数中继续使用bind方法赋值到其他函数即可解决

var 一个对象 = {对象中的常量:37, 一个函数:一个函数, 赋值后的bind方法:赋值后的bind方法, 二次赋值后的bind方法:二次赋值后的bind方法};
console.log(一个对象.一个函数(), 一个对象.赋值后的bind方法(), 一个对象.二次赋值后的bind方法());
//可以看出父函数并未更改，其他二次一次都始终指向bind方法钦定的
}
{
var a = {a:1};
var b = Object.create(a);
b.b = 2;b.c = 3;
console.log(b);
a.a = 2;
console.log(b.a);
a.b = 5;
console.log(b.__proto__);
a = null;
b = null;
/*b = 2;
a = {
    a:1,
    b:2,
    d:function(){console.log(this.d());},
    get c(){return this.d;}};
console.log(a.c);
console.log(Object.defineProperty(a, 'sum', { get: a.c, enumerable: true, configurable: true}));
console.log(a.sum);*/
//以上是卡机代码，艹写不来，理解不了，脑袋死了，不想看这个了
//早上懂了，我把{ get: a.c, enumerable: true, configurable: true }
//中看作get属性了简直太蔡了，sum才是，这后面的对象是特定取值，详细见笔记
//不想写了233
}
var sym = Symbol("hello");
console.log(typeof sym);
//var symBox = {[sym]:1};
console.log(typeof symBox);
//包装Symbol
var arr = Object.keys("foo");
console.log(typeof typeof arr);//typeof返回字符串
console.log(arr instanceof Object);
console.log(arr instanceof Date);
console.log(arr instanceof Array);//keys以数组类型输出
//异步再见












