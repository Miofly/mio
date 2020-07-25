# 初始化
`npm init -y` 生成 package.json 文件 
tsc --init

### ts 初始化
`tsc --init` 生成 `tsconfig.json` 文件

`tsc ./src/index.ts` 把 ts 文件翻译成 js 文件

#### 数据类型
`let decLiteral: number = 6;`<br>
`let name: string = "Runoob";`<br>
`let flag: boolean = true;`<br>
`let arr: number[] = [1, 2]; let arr: Array<number> = [1, 2];`

元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。<br>
`let x: [string, number]; `<br>
`x = ['Runoob', 1]; // 运行正常 `<br>
`x = [1, 'Runoob']; // 报错 `<br>
`console.log(x[0]); // 输出 Runoob` 

枚举类型用于定义数值集合。<br>
`enum Color {Red, Green, Blue};`<br>
`let c: Color = Color.Blue;`<br>
`console.log(c); // 输出 2`<br>

用于标识方法返回值的类型，表示该方法没有返回值。<br>
`function hello(): void { alert("Hello Runoob"); }`

`// 函数定义`<br>
`function greet():string { return "Hello World" } // 返回一个字符串`<br>
`function add(x: number, y: number): number {return x + y;}`

可选参数和默认参数(？代表可选参数)

`function buildName(firstName: string, lastName?: string) {`<br>
    `if (lastName) return firstName + " " + lastName;`<br>
    `else return firstName;`<br>
`}`
 
`let result1 = buildName("Bob");  // 正确`<br>
`let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了`<br>
`let result3 = buildName("Bob", "Adams");  // 正确`

默认参数<br>
`function calculate_discount(price:number,rate:number = 0.50) {}`  

剩余参数<br>
`function addNumbers(...nums:number[])  addNumbers(10,10,10,10,10)`
