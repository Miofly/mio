// 基础类型
let hello : string = 'hello 123'
let count: number = 10;
let isDone: boolean = false;
let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3]; // Array<number>泛型语法

// Enum 类型
// 使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。
// TypeScript 支持数字的和基于字符串的枚举。
// 1.数字枚举
enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST,
}

let dir: Direction = Direction.NORTH;
// 默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。
// 换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3。
// 上面的枚举示例代码经过编译后会生成以下代码：
/*
"use strict";
var Direction;
(function (Direction) {
    Direction[(Direction["NORTH"] = 0)] = "NORTH";
    Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
    Direction[(Direction["EAST"] = 2)] = "EAST";
    Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
*/

// 2.字符串枚举
// 在 TypeScript 2.4 版本，允许我们使用字符串枚举。
// 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
enum Direction {
    NORTH1 = "NORTH1",
    SOUTH1 = "SOUTH1",
    EAST1 = "EAST1",
    WEST1 = "WEST1",
}
// 以上代码对于的 ES5 代码如下：
/*
"use strict";
var Direction;
(function (Direction) {
    Direction["NORTH1"] = "NORTH1";
    Direction["SOUTH1"] = "SOUTH1";
    Direction["EAST1"] = "EAST1";
    Direction["WEST1"] = "WEST1";
})(Direction || (Direction = {}));
*/

// 3.异构枚举
// 异构枚举的成员值是数字和字符串的混合：
enum Enum {
    A,
    B,
    C = "C",
    D = "D",
    E = 8,
    F,
}
// 以上代码对于的 ES5 代码如下：
/*
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
*/

