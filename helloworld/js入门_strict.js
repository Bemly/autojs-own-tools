"use strict";

/*****************************
 *      本代码使用严格模式      *
 *  Auto.js 4.1.1 Alpha2编写  *
 *   作者 蓝莓小果冻 by bemly  *
 *****************************/
console.info(
  "=========================\n" +
  "=               本代码使用                 =\n" +
  "=    Auto.js 4.1.1 Alpha2编写    =\n" +
  "=   作者 蓝莓小果冻  by bemly  =\n" +
  "=========================\n" +
  "\nAuto.js坠新免费版下载链接：\n" +
  "https://pan.baidu.com/s/1ViZ7zNs5PXbcVPRSrMiUYA" +
  "\n密码：js6B");
console.show();
console.setPosition(device.width/5,0);
console.log(device);
console.time("标准耗时");//4.1.1新增的
//var startTime = Date.now();//时间戳计时

function a(){
  a.prototype.name = "pink";
  this.name = "blue";//this.name > a.prototype.name
}
var funA = new a();
console.log(a.prototype);
console.log(funA.__proto__);
var funB = new a();
console.log(funB.__proto__);
a.prototype.isFuck = true;
console.log(funB.__proto__);
var funC = new a();
console.log(funC.__proto__);
console.log(funA.__proto__);//证明一个原型
a.prototype.isFuck = true;
console.log("修改之前的A："+funA.name);
funA.name = "red";//修改A只变A的
console.log("修改之后的A："+funA.name);
console.log("修改之后的B："+funB.name);
console.log("修改前原型B："+funB.__proto__.name);
funA.__proto__.name = "red";
//修改A的原型相当于修改原型即所有调用构造函数的变量
console.log("修改后原型C："+funC.__proto__.name);

var arr1 = ["abc","def","ghi"];
var arr2 = new Array("a","d","c");
var a1 = "What is Fastbuilder?";
arr2[1] = "b";
var a2 = a1[2];
console.log(a1[0,8] + a2 + a1[10,19]);
//可以使用多维数组
var arr3 = [[[[[1,"n"],[3,2],[5,6]],["哇",10]],[7,"b"]],["!",10],2,5];
var str1 = arr3.push([6,5],7);
console.log(arr3[0][0][0][0][1]+arr3[0][1][1]+arr3[0][0][1][0]+arr3[1][0]);
arr3 = null;a1 = null;a2 = null;
str1 = null;//js在堆内存的专属垃圾回收
var arrToObj = {};
arr1.forEach(function(value,index,obj){//通过forEach遍历数组转为普通对象
  arrToObj["name_"+(index+1)+":"] = value;
  console.log("导入"+obj[index]+"中......");
});
//生成x-y之间的随机数
//Math.round(Math.random()*(y-x)+x)
//事例：console.log("随机数:"+Math.round(Math.random()*(Math.PI*3-1)+1));
console.log("随机显示："+arrToObj["name_"+Math.round(Math.random()*(3-1)+1)+":"]);
var $v$ = "这里有好多钱";
console.log($v$);
console.log("我要这些"+$v$[5]);//可拆分String
$v$ = null;arr1 = null;arr2 = null;
var objToJSON = JSON.stringify(arrToObj);
//JSON.stringify可以将对象或数组转换为其他语言可认的JSON文件
var JSONToObj = JSON.parse(objToJSON);//parse即可反之
console.log("JSONToObj类型:"+typeof JSONToObj+"\nobjToJSON类型:"+typeof objToJSON+"\narrToObj类型:"+typeof arrToObj);
console.log(JSONToObj);
console.log(arrToObj);
var endTime = Date.now();//完结撒花emm
//console.warn("耗时:" + (endTime - startTime) + "毫秒");
console.timeEnd("标准耗时");

js_min:{
  console.time("压缩耗时");function a(){a.prototype.name="pink";this.name = "blue";}var funA=new a();var funB=new a();a.prototype.isFuck=true;var funC=new a();a.prototype.isFuck=true;funA.name="red";funA.__proto__.name="red";var arr1=["abc","def","ghi"];var arr2=new Array("a","d","c");var a1="What is Fastbuilder?";arr2[1]="b";var a2=a1[2];var arr3=[[[[[1,"n"],[3,2],[5,6]],["哇",10]],[7,"b"]],["!",10],2,5];var str1=arr3.push([6,5],7);var arrToObj={};arr1.forEach(function(value,index,obj){arrToObj[index+1]=value;});var $v$="这里有好多钱";var objToJSON=JSON.stringify(arrToObj);var JSONToObj=JSON.parse(objToJSON);console.timeEnd("压缩耗时");
}
