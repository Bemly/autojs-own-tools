'use strict';

console.show();
log(Date.now());
//不要直接在函数的原型上定义 函数名.prototype = 字面量;
//这样会直接打破原型链，应使用 函数名.prototype.属性 = 字面量;
print("\n\
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain");
//自定义错误消息
print("\n\
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error");
//数学内置函数
print("\n\
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math");
//按位操作符 -常用于二进制
print("\n\
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators");
//for..of和in和forEach的区别
//for..in通过索引来遍历，所以会遍历原型
//forEach从0开始遍历数组
{
  //闭包
  //5-->a-->5 + b-->return[5 + b]-->add5
  //20-->a-->20 + b-->return[20 + b]-->add20
  //6-->b-->5 + 6-->return 11
  //20-->b-->20 + 7-->return 27
  function makeAdder(a){
    return function(b){
      return a + b;
    }
  }
  let add5 = makeAdder(5);
  let add20 = makeAdder(20);
  let equ11 = add5(6);
  let equ27 = add20(7);
  console.log(equ11);
  console.log(equ27);
  let arr = [equ11,equ27];
  console.log(Math.max.apply(this,arr));
  makeAdder = null;
  {//复习prototype原型
    function Car() {}
    let car1 = new Car();
    let car2 = new Car();
    console.log(car1.color);    //undefined
    Car.prototype.color = "original color";
    console.log(car1.color);    // original color
    car1.color = 'black';
    console.log(car1.color);   // black
    console.log(car1.__proto__.color); //original color
    console.log(car2.__proto__.color); //original color
    console.log(car1.color);  // black
    console.log(car2.color); //original color
  }
}

//es6接触
console.log.apply(function (a) {return a}, [1,2]);
console.log.call(function (a) {return a},54,64);
console.log(646,6151);
//var fun = (a,b, ...args) => {
//  console.log(a);
//  console.log(b);
//  console.log(args);
//}
//fun(1,646,285,738,1);
//es6的多项传参，autojs不支持

//generator--走走停停
//function* genFun(a){
//  alert(a);
//  let 参数 = yield 58;
//  alert(b);
//}
//console.log(genFun.next(1));//弹出1,对象{value:58,done:false}
//console.log(genFun.next(2));//弹出2,对象{value:undefined,done:true}
//autojs不支持

//let objk = [2,86,8,4];
//let numberhu = [...objk];
//深拷贝新运算符 autojs无解

//promise回调入门
{
//callback缺点一览
//setTimeout(语句,延迟);
  Car = (callback) => {
    setTimeout(() => {
      callback && callback();//隐式返回
    },100);//二层访问
  };
  var num = 1;
  Object.defineProperty(this,"CarNum",{
    get : function(){
      return this.num++;//返回本体后本体加一，800后加一是9
    },
    configurable : true//全局读写
  });
  Car(() => {//100
    console.log(CarNum);
    return Car(() => {//200
      console.log(CarNum);
      return Car(() => {//300
        console.log(CarNum);
        return Car(() => {//400
          console.log(CarNum);
          return Car(() => {//500
            console.log(CarNum);
            return Car(() => {//600
              console.log(CarNum);
              return Car(() => {//700
                console.log(CarNum);
                return Car(() => {//800
                  console.log(CarNum);
                  setTimeout(() => {num = null;},1000);
                  Car = null;//默认关闭
                  delete CarNum;//全局读写开启
                  //&&的作用，阻止空回调不报错
                });
              });
            });
          });
        });
      });
    });
  });
}
{//setTimeout与clearTimeout
  let Car = setTimeout(() => {num = 10},100);
  clearTimeout(Car);//延迟删除不会执行和返回
  Car = setTimeout(() => {num = 10},1200);//在global中
  setTimeout(() => {
    console.log(num);
  },900);
  setTimeout(() => {
    console.log(num);
    delete Car;
  },1400);
}
{//promise
    const CarPro = new Promise((right,error) => {
      right("awa");
      error(Error("好嗨哟"));
    });
  CarPro
    .then(data => console.log(data))
    .catch(data => console.log(data));
//promise.all
//promise.race
}
log(encodeURI("https://minecraft-zh.gamepedia.com/! @ # $& * ( ) = : / ; ? + '附加包"));
log("％"=="%");
//来源:http://es6.ruanyifeng.com
this.log = console.log;//适配装置
let $, i, _;
console.time(_);
console.log("蓝莓小果冻bemky_");
console.timeEnd(_);
console.time($);
(function(蓝,冻,小,果,莓){return ((冻,果,莓,小,蓝)=>{if($=>$)(b=>{(e=>{(m=>{(function(l,小){(y=>{(a=>{(莓=>{(function(){(i=>{eval((w=>{(j=>{(k=>{log(b+e+m+l+y+'bemly_')})(蓝)})(冻)})('果'));})('小')})(果)})(e)})(蓝,'莓',冻,'蓝')})(小)})('果',蓝,'冻',莓)})('小')})('莓')})(冻,莓,蓝,冻,小)})('蓝','果','小','莓','冻')})('冻','小','莓','果','小');
console.timeEnd($);
openConsole();
console.time(i);
(function(\u84dd,\u51bb,\u5c0f,\u679c,\u8393){return ((\u51bb,\u679c,\u8393,\u5c0f,\u84dd)=>{if($=>$)(b=>{(e=>{(m=>{(function(l,\u5c0f){(y=>{(a=>{(\u8393=>{(function(){(i=>{eval((w=>{(j=>{(k=>{log(b+e+m+l+y+'bemly_')})(\u84dd)})(\u51bb)})('\u679c'))})('\u5c0f')})(\u679c)})(e)})(\u84dd,'\u8393',\u51bb,'\u84dd')})(\u5c0f)})('\u679c',\u84dd,'\u51bb',\u8393)})('\u5c0f')})('\u8393')})(\u51bb,\u8393,\u84dd,\u51bb,\u5c0f)})('\u84dd','\u679c','\u5c0f','\u8393','\u51bb')})('\u51bb','\u5c0f','\u8393','\u679c','\u5c0f');
console.timeEnd(i);
//(function(蓝,冻,小,果,莓){return((冻,果,莓,小,蓝)=>{if($=>$)(b=>{(e=>{(m=>{(function(l,小){(y=>{(a=>{(莓=>{(function(){(i=>{global["\x65\x76\x61\x6c"]((w=>{(j=>{(k=>{log(b+e+m+l+y+'bemly_')})(蓝)})(冻)})('果'))})('小')})(果)})(e)})(蓝,'莓',冻,'蓝')})(小)})('果',蓝,'冻',莓)})('小')})('莓')})(冻,莓,蓝,冻,小)})('蓝','果','小','莓','冻')})('冻','小','莓','果','小');
//;(function(\u84dd,\u51bb,\u5c0f,\u679c,\u8393){return((\u51bb,\u679c,\u8393,\u5c0f,\u84dd)=>{if($=>$)(b=>{(e=>{(m=>{(function(l,\u5c0f){(y=>{(a=>{(\u8393=>{(function(){(i=>{eval((w=>{(j=>{(k=>{log(b+e+m+l+y+'bemly_')})(\u84dd)})(\u51bb)})('\u679c'))})('\u5c0f')})(\u679c)})(e)})(\u84dd,'\u8393',\u51bb,'\u84dd')})(\u5c0f)})('\u679c',\u84dd,'\u51bb',\u8393)})('\u5c0f')})('\u8393')})(\u51bb,\u8393,\u84dd,\u51bb,\u5c0f)})('\u84dd','\u679c','\u5c0f','\u8393','\u51bb')})('\u51bb','\u5c0f','\u8393','\u679c','\u5c0f');;
//;eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3(d,f,g,h,n){7((f,h,n,g,d)=>{8($=>$)(b=>{(e=>{(m=>{(3(l,c){(5=>{(a=>{(n=>{(3(){(i=>{9((o=>{(j=>{(k=>{p(b+e+m+l+5+\'q\')})(d)})(f)})(\'\\1\'))})(\'\\0\')})(h)})(e)})(d,\'\\2\',f,\'\\6\')})(c)})(\'\\1\',d,\'\\4\',n)})(\'\\0\')})(\'\\2\')})(f,n,d,f,g)})(\'\\6\',\'\\1\',\'\\0\',\'\\2\',\'\\4\')})(\'\\4\',\'\\0\',\'\\2\',\'\\1\',\'\\0\');',27,27,'u5c0f|u679c|u8393|function|u51bb|y|u84dd|return|if|eval|||||||||||||||w|log|bemly_'.split('|'),0,{}));
var __encode ='sojson.com', _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(this);var __Ox4bd5f=["\x68\x65\x6C\x6C\x6F","\x6C\x6F\x67"];console[__Ox4bd5f[0x1]](__Ox4bd5f[0x0])
for(var num = 1; num <= 1; num++){
  setTimeout(function(){log(num)},0);
}
var h = 0;
while(h <= 100){
//  log("hi");
  h++;
}
if (true) let x = 1;
if (true) {let x = 1};
//奇妙autojshhh
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

//autojs能使用部分的赋值解构
let [a, b, c] = [1, 2, 3];
this.log = console.log;
log("hi");
let baz;
({ foo: baz } = { foo: 'aaa', bar: 'bbb' });
//不建议的做法
let { foo: baz2 } = { foo: 'aaa', bar: 'bbb' };
log(baz); // "aaa"
log("foo" in this); // error: foo is not defined
function add([x, y]){
 return x + y;
}
log(add([1, 2])); // 3
let x3A = 1;
let y = 2;
[x3A, y] = [y, x3A];//快速交换
//默认值也可以使用解构来指定，autojs函数常用

//Symbol
log(Symbol["hi"] === Symbol["hi"]);
log(Symbol("hi") === Symbol("hi"));
//gbd，唯一标识符在遍历中有用

//es6 String新方法
let v = " heje  ";
log(v.trim());//去头去尾的简便方法
//判断是否是整数，false表示非法数字和非0浮点数
log(Number.isInteger(25.0));
//数值的精度超过这个限度，第54位及后面的位就会被丢弃

//concat 数组最好的安全克隆合并方法//下面对象转数组
let arrayLike = { '0': 'a', '1': 'b', '2': 'c', length: 3 }; 
// ES5的写法 
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c'] 
log(arr1);
/**********
属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。

（1）for...in

for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)

Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

（3）Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

（4）Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)

Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

首先遍历所有数值键，按照数值升序排列。
其次遍历所有字符串键，按照加入时间升序排列。
最后遍历所有 Symbol 键，按照加入时间升序排列。
**********///选自阮一峰的es6入门
//assign合并对象
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
log(target);//赋值在第一个参数上

//对于原型来说，请拒绝__proto__
//使用更加安全的Object.create();
//Object.setPrototypeOf(对象, 原型对象);
//与Object.getPrototypeOf(对象);//读取原型
log(Object.getPrototypeOf(target));

var moha = [];
//log(Array.from(target));
for(let oh in target) {
  moha.push(target[oh]);
  moha.push(oh);
}
//autojs不支持键控集
//const sss = new Map();
//moha.forEach(sss=>moha.add(sss));


