let hello: string = "hello world";

// 类型别名
type Add = (x: number, y: number) => number;

let add: Add = (a, b) => a + b;

// 混合接口 定义类库
interface Lib {
  (): void; //首先lib是一个函数,我们假设它没有返回值也没有参数
  version: string;
  dosomething(): void;
}

// let lib: Lib = (() => {}) as Lib; //使用类型断言就不会再报错说缺少Lib中的什么了,但是这样会暴露出来一个 全局变量Lib 于是使用函数封装一下
// lib.version = "1.0.0";
// lib.dosomething();

function getlib() {
  let lib: Lib = (() => {}) as Lib;
  lib.version = "1.0.0";
  lib.dosomething = () => {};
  return lib;
} //封装成一个函数返回lib就不会存在暴露变量的问题了这样就行了

// 然后就可以创建多个实例

let lib1 = getlib();
lib1();
// lib1.version = "1.1.0"
lib1.dosomething();
let lib2 = getlib();

// TS中定义函数有4种类型
// 第一种 function定义
function add1(x: number, y: number) {
  return x + y;
}

// 第二种  通过变量定义一个函数
let add2: (x: number, y: number) => number;

// 第三种使用type 类型别名定义,最简单方便的一种
type add3 = (x: number, y: number) => number;

// 第四种使用接口定义
interface add4 {
  (x: number, y: number): number;
}

function add5(a: number, b = 1, c: number, d = 2) {
  return a + b + c + d;
}
add5(1, undefined, 2); //必选参数之前传入undefined 来获取默认值   必选参数之后的默认值可以不传

// 剩余参数
function add6(a: number, ...rest: number[]) {
  return;
  a +
    rest.reduce((pro, cur) => {
      return pro + cur;
    });
}
add6(1, 2, 3, 4, 5);

// 函数重载  增强函数的复用性灵活性可多用性  对多种可能性的参数进行封装,由于ts是自动从上向下检测的,所以将最可能的那个类型放到最上面

function add7(...rest: number[]): number;
function add7(...rest: string[]): string;
function add7(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === "string") {
    return rest.join("");
  }
  if (typeof first === "number") {
    return rest.reduce((pre, cur) => pre + cur);
  }
}

console.log(add7(1, 2, 3, 4)); //underfiend
// console.log(add7("a", "b", "c")); //abc

// 类  继承和 成员修饰符

// public  共有成员 ,
// private  私有成员   既不能被继承也不能再类之外使用
// protected 受保护成员 只能在类或者是子类中访问 ,不能再实例中访问
// static  静态成员  只能在基类和派生类中调用,不能通过实例调用
class Dog {
  // private constructor(name:string){
  //   this.name=name
  // };
  // protected constructor(name:string){
  //   this.name=name
  // };  //在构造函数中加protected  只能在类声明中访问不能被实例化  相当于声明了一个基类
  public constructor(name: string) {
    this.name = name;
  }
  static food: string = "foods"; //静态成员
  name: string; //name属性在实例上,而不在原型上,原型上只有方法
  doSomething(name: string) {
    console.log("旺旺", name);
  }
  protected dothings() {
    console.log("摇尾巴");
  }
}
console.log(Dog.prototype); //原型里面只有构造器和方法

let dog = new Dog("旺财");
console.log(dog); //实例中只有name
// console.log(dog.dothings); //属性 dothings 受保护,只能在类 Dog 及其子类中访问

//类的继承  使用的是extends

class wang extends Dog {
  constructor(name: string, public color: string) {
    super(name); //派生类的构造函数必须包含 "super" 调用。;  访问派生类的构造函数中的this前,必须调用 super
    this.color = color;
    this.dothings();
  }
  // color:string;  应在构造函数中添加了public  这里可以省略了,这样代码更简洁一些
  giveColor(color: string) {
    console.log("给你点颜色瞧瞧", color);
  }
}
let hua = new wang("春华", "五颜六色");

console.log(hua);

// 抽象类和多态
//抽象类   abstract   抽象类无法被实例 只能被继承
abstract class Animol {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  // abstract eat() //抽象方法不能够实例化
}

class Cat extends Animol {
  constructor(name: string, set: string) {
    super(name);
    this.set = set;
  }
  set: string;
  eat() {}
}

// let cat=new Animol()    //抽象类无法被实例 只能被继承

let cat = new Cat("喵喵", "men");

//链式调用  返回的this既可以是子类也可以是父类
class WorkFlow {
  sleep1() {
    return this;
  }
  sleep2() {
    return this;
  }
}

new WorkFlow().sleep1().sleep2();

class Mywork extends WorkFlow {
  next() {
    return this;
  }
}

new Mywork().sleep2().sleep1().sleep2().next();

//多态  抽象类可以实现多态

abstract class Shagua {
  eat() {
    console.log("eat");
  }
  abstract sleep(): void;
}

class Dashuagua extends Shagua {
  constructor() {
    super();
  }
  sleep() {
    console.log("大傻瓜睡觉了");
  }
}
class Xiaoshagua extends Shagua {
  constructor() {
    super();
  }
  sleep() {
    console.log("小傻瓜睡觉了");
  }
}

let xiao = new Xiaoshagua();
let da = new Dashuagua();

let shagua = [xiao, da];
shagua.forEach((i) => {
  i.sleep();
});
