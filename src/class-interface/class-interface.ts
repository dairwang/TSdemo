//class和interface

//接口只能约束类的公有成员
interface Human {
  name: string;
  eat(): void;
}

// 类继承接口使用 implement 关键字

class Dair implements Human {
  constructor(name: string) {
    this.name = name;
  }
  name: string;
  //   private  name:string;  //属性name在类型 Dair 中是私有属性,但在类型 Human 中不是
  eat() {}
}
// 类继承接口使用 extends
interface Man extends Dair {
  name: string;
  eat(): void;
}

let man: Man = {
  name: "大卫",
  eat() {},
};

// 接口与接口的继承
interface child {
  cry(): void;
}

interface Boy extends Man, child {
  name: string;
  eat(): void;
  cry(): void;
}

let boy: Boy = {
  name: "山山",
  eat() {
    console.log("吃零食");
  },
  cry() {
    console.log("浪费粮食被打哭浪费粮食被打哭浪费粮食被打哭");
  },
};
console.log(boy, boy.eat(), boy.cry());

// ts中一个重要的概念,泛型  <T>
function log<T>(value: T): T {
  console.log(value);
  return value;
}

log(["a", "b", "c"]);

// type Log = <T>(value: T) => T;
// let myLog: Log = log;
//泛型接口
// 泛型标识放到log后面表示整个接口都受到了泛型约束
interface Log<T = string> {
  (value: T): T;
}

// let myLog:Log<string> =log   //这里用的时候指定泛型的类型 或者是通过接口定义的时候直接指定
let myLog: Log = log;
myLog("1");

// 泛型类
class Lag<T> {
  run(value: T) {
    console.log(value);
    return value;
  }
}

let lag = new Lag<string>();
lag.run("1");
let lag2 = new Lag<number>();
lag2.run(1);
//泛型函数
function CeratArry<T>(length: number, value: T): Array<T> {
  let resul: T[] = [];
  for (let i = 0; i < length; i++) {
    resul[i] = value;
  }
  return resul;
}

let arry = CeratArry(3, "X");
console.log("泛型函数", arry);

// 类型检查,泛型T继承接口
interface Length {
  length: number;
}

function leg<T extends Length>(value: T): T {
  console.log(value, value.length); //没有定义length会
  return value;
}

leg("abgx");
leg({ length: 1 });
leg([1]);

// ts的类型保护机制

//1)类型推断

//2)类型兼容性
// 当一个类型Y可以被赋值给另一个类型X时，可以说类型X兼容类型Y
// 1.接口
// 成员少的可以兼容成员多的
// 2.函数
// 1）个数
//     多的可以兼容少的
//                   固有参数 剩余参数 可选参数
// 可选参数 不兼容 不兼容
// 剩余参数 兼容 兼容
// 固有参数 兼容 兼容
// 2）参数类型
// 多的可以兼容少的
// 3）函数返回值
// 少的可以兼容多的
// 4）函数重载
// 目标函数参数个数多于或者等于源函数参数个数
// 3.枚举
// 数字和枚举可以相互兼容，枚举与枚举间不兼容
enum Frult {
  Apple,
  Bonane,
}
enum Color {
  Res,
  yellow,
}

let frult: Frult.Apple = 3; //兼容
let no: number = Frult.Apple;
// let color:Color.yellow=Frult.Apple   //不兼容 不能将Frult.Apple 分配给类型 Color.yellow
// 4.类
// 类的构造函数和静态成员不参与比较，当类中有私有成员时，两个类不兼容，类与子类可以
// 5.泛型
// 1）泛型接口
// 在两个泛型参数只有类型不相同时，只有在泛型参数使用时才影响
// 2）泛型函数

//类型保护机制
//1) 自定义的类型保护机制
class Java {
  helloJave() {
    console.log("hellow Java");
  }
}

class JavaScript {
  helloJavascript() {
    console.log("hellow JavaScript");
  }
}
//ts中的类型保护机制   as 断言
//typeof、instanceof、in  和这三种

// 高级类型 TS的交叉类型用 & 连接
interface Doginterface {
  run(): void;
  type: string;
}

interface Catinterface {
  jump(): void;
}

// 交叉类型用 & 符号连接  变量 pet 就同时拥有这两个类型中的方法  必须都同时拥有  取两个类型的并集
let pet: Doginterface & Catinterface = {
  type: "animal",
  jump() {},
  run() {},
};

//高级类型 联合类型 是用 | 连接 取的是联合类型中的交集

//高级类型 索引类型
let obj = {
  a: 1,
  b: 2,
  c: 3,
};

// function getValue(obj: any, keys: string[]) {
//   return keys.map((key) => obj[key]);
// }

//通过索引类型和泛型约束 改造函数 getValue
//使keys数组中的项为对象中key

function getValue<T, K extends keyof T>(obj: T, keys: K[]) {
  return keys.map((key) => obj[key]);
}
console.log(getValue(obj, ["a", "b", "c"]));
// console.log(getValue(obj, ["e", "f", "c"]));  //不能将类型“"e"”分配给类型“"a" | "b" | "c"”。

//keyOf T    索引类型查询  返回类型是联合类型
interface Obj {
  a: number;
  b: string;
}

let obj1: keyof Obj; //keyof 返回的是一个联合类型

// T[K]  索引访问操作符

let value: Obj["a"];

//高级类型 映射类型
interface obj2 {
  a: string;
  b: string;
  c: string;
}
//同态的映射类型
//讲obj2中的参数变为只读
type readonlyobj = Readonly<obj2>;
// 可选
type Partialobj = Partial<obj2>;
//抽取
type Pickobj = Pick<obj2, "a" | "b">;

//不同态  Record将已知类型obj 添加给 成员
type Recordobj = Record<"x" | "y", obj2>;

// 高级类型 条件类型
// T extends U ? X : Y  由条件表达式所决定的类型  如果类型T可以被赋值给U那么结果类型就是X类型  类似于三元表达式
// 条件类型使语言有了不唯一性同时也增加了灵活性
