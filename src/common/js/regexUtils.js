/*
i	执行对大小写不敏感的匹配。   m	执行多行匹配。
g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。

[abc]	查找方括号之间的任何字符。          [a-z]  查找任何从小写 a 到小写 z 的字符。
[^abc]	查找任何不在方括号之间的字符。       [A-Z]  查找任何从大写 A 到大写 Z 的字符。
[0-9]	查找任何从 0 至 9 的数字。          [A-z]  查找任何从大写 A 到小写 z 的字符。
[adgk]	查找给定集合内的任何字符。           [^adgk]  查找给定集合外的任何字符。
(red|blue|green)	查找任何指定的选项。

.	查找单个字符，除了换行和行结束符。
\w	查找单词字符。(a-z、A-Z、0-9，以及下划线, 包含 _ (下划线) 字符。)
\W	查找非单词字符。
\0	查找 NULL 字符。    \n	查找换行符。
\d	查找数字。          \f	查找换页符。
\D	查找非数字字符。     \r	查找回车符。
\s	查找空白字符。       \t	查找制表符。
\S	查找非空白字符。     \v	查找垂直制表符。
\b	匹配单词边界。       \B	匹配非单词边界。
\xxx	查找以八进制数 xxx 规定的字符。   \xdd	查找以十六进制数 dd 规定的字符。
\uxxxx	查找以十六进制数 xxxx 规定的 Unicode 字符。

n+  匹配任何包含至少一个 n 的字符串。   n*  匹配任何包含零个或多个 n 的字符串。
n?  匹配任何包含零个或一个 n 的字符串。
n{X}   匹配包含 X 个 n 的序列的字符串。 n{X,}  X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。
n{X,Y} X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。
n$	匹配任何结尾为 n 的字符串。     ^n	 匹配任何开头为 n 的字符串。
?=n	匹配任何其后紧接指定字符串 n 的字符串。   ?!n	匹配任何其后没有紧接指定字符串 n 的字符串。
*/

const regexUtils = {
    allNum (str) { // 匹配所有数字 0 正负数 小数
        return /^(-|\+)?\d+(.\d+)?$/.test(str)
    },
    positiveInt (str) { // 非零正整数
        return /^[1-9]\d*$/.test(str)
    },
    negativeInt (str) { // 非零负整数
        return /^-[1-9]\d*$/.test(str)
    },
    notPositiveInt (str) { // 0或负数
        return /^-[1-9]\d*|0$/.test(str)
    },
    notNegativeInt (str) { // 非负整数
        return /^\d+$/.test(str)
    },
    floatNum (str) { // 是否是浮点数
        return /^(-?\d+)(.\d+)?$/.test(str)
    },
    positiveFloatNum (str) { // 正浮点数
        return /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/.test(str)
    },
    negativeFloatNum (str) { // 负浮点数
        return /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/.test(str)
    },
    numDigit (str, n) { // n位数字的正整数
        return new RegExp('^\\d{' + n + '}$').test(str)
    },
    numLeastBits (str, n) { // 至少n为数字
        return new RegExp('^\\d{' + n + ',' + '}$').test(str)
    },
    numBetweenBits (str, n, m) { // 数字位数介于n-m之间包含
        return new RegExp('^\\d{' + n + ',' + m + '}$').test(str)
    },
    firstNotZero (str) { // 开头不是0的数字
        return /^[1-9][0-9]*$/.test(str)
    },
    decimalDigit (str, n) { // 判断有几位小数
        return new RegExp('^([1-9][0-9]*)+(.[0-9]{' + n + '}){1}$').test(str)
    },
    decimalLeastDigit (str, n) { // 判断有至少几位小数
        return new RegExp('^([1-9][0-9]*)+(.[0-9]{' + n + ',' + '}){1}$').test(str)
    },
    ifChinaLetter (str) { // 是否为汉字
        return /^[\u4e00-\u9fa5]{0,}$/.test(str)
    },
    engAndNum (str) { // 英文或数字
        return /^[A-Za-z0-9]+$/.test(str)
    },
    lengthLimit (str, n, m) { // 字符长度为n-m之间
        return new RegExp('^.{' + n + ',' + m + '}$').test(str)
    },
    engAll (str) { // 26英文字母不区分大小写
        return /^[A-Za-z]+$/.test(str)
    },
    smallEng (str) { // 小写英文字母
        return /^[a-z]+$/.test(str)
    },
    bigEng (str) { // 大写英文字母
        return /^[A-Z]+$/.test(str)
    },
    emailRule (str) { // 邮箱验证
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*$/.test(str)
    },
    phoneRule (str) { // 手机号验证
        return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str)
    },
    idCardRule (str) { // 身份证验证 15-18位
        return /^\d{15}|\d{18}$/.test(str)
    },
    qqRule (str) { // qq号验证（腾讯QQ号从10000开）
        return /[1-9][0-9]{4,}/.test(str)
    },
    postCodeRule (str) { // 邮政验证（中国邮政编码为6位数字）
        return /[1-9]\d{5}(?!\d)/.test(str)
    },
}

export {
    regexUtils
}
