
var fs = require('fs');
var findIndexes = require('./solution');

const withFileContent = (_file, _block) => {
    fs.readFile(`${__dirname}/fixtures/${_file}`, (err, data) => {
        if (err) throw err; 
        _block(data.toString());
    });
}

const test = (_name, _data, _characters, _expected) => {
    const hrstart = process.hrtime();
    actual = findIndexes(_data, _characters);
    const hrend = process.hrtime(hrstart);
    if (`${actual}` !== `${_expected}`) {
        console.log(`${(_name + ' ').padEnd(25, '.').slice(0, 25)} FAILED\n    got '${actual}' expected '${_expected}'`);
    } else {
        console.log(`${(_name + ' ').padEnd(25, '.').slice(0, 25)} SUCCESS in %d`, hrend[0] + hrend[1] / 1000000000);
    }
}

test("simple_1", "PxaB3d8rNRoiEKtfmvb1w8sKNmnV",   "Pxa", [ 0,  2]);
test("simple_2", "PxaB3d8rNRoiEKtfmvb1w8sKNmnV",   "aPx", [ 0,  2]);
test("simple_3", "PxaB3d8rNRoiEKtfmvb1w8sKNmnV",   "mnV", [25, 27]);
test("simple_4", "PxaB3d8rNRoiEKtfmvb1w8sKNmnV",    "PV", [ 0, 27]);
test("simple_5", "PxaB3d8rNRoiEKtfmvb1w8sKNmnV",    "Pv", [ 0, 17]);
test("simple_6", "PxaB3d8rNRoiEKtfmvb1w8sKNmnV",     "9", [-1, -1]);
test("simple_7", "PxaB3d8rNRoiEKtfmvb1w8sKNmnV", "mmKKa", [ 2, 25]);

withFileContent("file_100.txt", (data) => {
    test("100_1", data,    "Lc4", [97, 99]);
    test("100_2", data,    "TTT", [10, 66]);
    test("100_3", data,   "TTTt", [10, 66]);
    test("100_4", data,  "TTTtt", [10, 66]);
    test("100_5", data, "TTTttt", [-1, -1]);
});

withFileContent("file_10k.txt", (data) => {
    test("10k_1", data, "kjd", [8675, 8682]);
    test("10k_2", data, "dkj", [8675, 8682]);
    test("10k_3", data, "19o", [9997, 9999]);
});

withFileContent("file_10M.txt", (data) => {
    test("10M_start", data, "#l3E", [0, 3]);
    test("10M_middle", data, "WOY85Eg5B15mjJoyHC1MD", [4999999, 5000019]);
    test("10M_end", data, "TB3MMnuX590qCNUYJ#", [9999984, 10000001]);
    test("10M_full", data, "##", [0, 10000001]);
    test("10M_full_long_pattern", data, "#IOvnB057qsfsRTFikE0i9I1Fe29jYHue9M6ARopiPmq0qB45GnNgefVDn2B6JEBQizDzG66nmOrTWGZqO8KBEn" +
                                   "gPK0HvmyTxKFooEwuXeN0VO1820BIM1UxizJAnwD5OVfLJ4l8JDqP3EUPxRhPLnKW5AY56OQ4twTSLM2DDZ5Ckq" +
                                   "Pjv3nrVjtyU14I4L3OuGFJYnZz1UVPmUHiZMvMonT1C9ekxD5eAY0V8ivh1GBwCvpvSyDsIr0FYu7ANqLBUtO8e" +
                                   "Sj3ZsEWqDSo150gStorzVk97hXw3WQ85CJ5EiXumnkSujiLhhpS7sfOdNhxmeNO1s8lDgoFCDuWzTKky3xiA9Y4" +
                                   "9Nh9R8sQIYqQQjBm8CUiP6KInNWtQQNeMXWMDTorM1YkufivCjsJxUrj5ki0njXyYuUyoNU3eEFX940g6QNLAFq" +
                                   "VQqyqtpQkHuS9U9zJ2rw7w3tlAUHSw2BPRPeHZVtAxDwBLx0YFlAkYsUZF6fWtBqFNY#", [0, 10000001]);
});

withFileContent("file_70M.txt", (data) => {
    test("70M_start", data, "#l3E", [0, 3]);
    test("70M_middle", data, "l8l4s0Ig2tSKv379SQCT6", [35000000, 35000020]);    
    test("70M_end", data, "BHgvjfN5Id#", [69999991, 70000001]);
    test("70M_full", data, "##", [0, 70000001]);
    test("70M_full_long_pattern", data, "#IOvnB057qsfsRTFikE0i9I1Fe29jYHue9M6ARopiPmq0qB45GnNgefVDn2B6JEBQizDzG66nmOrTWGZqO8KBEn" +
                                  "gPK0HvmyTxKFooEwuXeN0VO1820BIM1UxizJAnwD5OVfLJ4l8JDqP3EUPxRhPLnKW5AY56OQ4twTSLM2DDZ5Ckq" +
                                  "Pjv3nrVjtyU14I4L3OuGFJYnZz1UVPmUHiZMvMonT1C9ekxD5eAY0V8ivh1GBwCvpvSyDsIr0FYu7ANqLBUtO8e" +
                                  "Sj3ZsEWqDSo150gStorzVk97hXw3WQ85CJ5EiXumnkSujiLhhpS7sfOdNhxmeNO1s8lDgoFCDuWzTKky3xiA9Y4" +
                                  "9Nh9R8sQIYqQQjBm8CUiP6KInNWtQQNeMXWMDTorM1YkufivCjsJxUrj5ki0njXyYuUyoNU3eEFX940g6QNLAFq" +
                                  "VQqyqtpQkHuS9U9zJ2rw7w3tlAUHSw2BPRPeHZVtAxDwBLx0YFlAkYsUZF6fWtBqFNY#", [0, 70000001]);
});
