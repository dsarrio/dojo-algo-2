
var fs = require('fs');
var maxSumOf = require('./solution');

const withFileContent = (_file, _block) => {
    fs.readFile(`${__dirname}/fixtures/${_file}`, (err, data) => {
        if (err) throw err; 
        _block(data.toString());
    });
}

const test = (_name, _data, _expected) => {
    const hrstart = process.hrtime();
    actual = maxSumOf(_data);
    const hrend = process.hrtime(hrstart);
    if (`${actual}` !== `${_expected}`) {
        console.log(`${(_name + ' ').padEnd(25, '.').slice(0, 25)} FAILED\n    got '${actual}' expected '${_expected}'`);
    } else {
        console.log(`${(_name + ' ').padEnd(25, '.').slice(0, 25)} SUCCESS in %d`, hrend[0] + hrend[1] / 1000000000);
    }
}

test("single_1", [-2], -2);
test("single_2", [0], 0);
test("single_3", [42], 42);
test("double_1", [1, 1], 2);
test("double_2", [1, -1], 1);
test("double_3", [-1, 1], 1);
test("double_4", [-1, -1], -1);
test("middle", [-2, -3, 4, -1, -2, 1, 5, -3], 7);

withFileContent("file_1M.txt", (data) => {
    data = data.split(',').map(c => +c)
    test("1M", data, 6462);
});

withFileContent("file_5M.txt", (data) => {
    data = data.split(',').map(c => +c)
    test("5M", data, 867);
});
