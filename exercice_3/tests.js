
var fs = require('fs');
var longuestPath = require('./solution');

const withFileContent = (_file, _block) => {
    fs.readFile(`${__dirname}/fixtures/${_file}`, (err, data) => {
        if (err) throw err; 
        _block(data.toString());
    });
}

const test = (_name, _size, _expected, _data) => {
    const hrstart = process.hrtime();
    actual = longuestPath(_size, _data);
    const hrend = process.hrtime(hrstart);
    if (`${actual}` !== `${_expected}`) {
        console.log(`${(_name + ' ').padEnd(25, '.').slice(0, 25)} FAILED\n    got '${actual}' expected '${_expected}'`);
    } else {
        console.log(`${(_name + ' ').padEnd(25, '.').slice(0, 25)} SUCCESS in %d`, hrend[0] + hrend[1] / 1000000000);
    }
}

test("1x1", 1, 1, [[0]]);
test("2x2", 2, 0, [[1,2],[3,0]]);
test("3x3", 3, 0, [[5,6,7],[3,8,1],[2,4,0]]);
test("4x4", 4, 0, [[4,13,0,2],[14,15,8,9],[7,10,5,11],[12,6,1,3]]);
test("5x5", 5, 0, [[19,9,16,15,21],[8,23,10,2,12],[0,4,17,3,1],[14,11,5,13,7],[6,24,20,22,18]]);
test("6x6", 6, 0, [[30,24,21,25,32,20],[10,5,29,28,11,4],[1,35,16,18,23,17],[34,6,31,14,33,13],[3,0,9,8,26,19],[15,22,27,12,7,2]]);
test("7x7", 7, 0, [[21,31,43,34,2,33,41],[25,18,13,35,30,0,23],[47,14,19,36,37,3,9],[17,22,46,32,48,20,8],[39,40,28,44,15,38,29],[7,5,10,11,4,27,1],[24,26,42,12,16,45,6]]);
test("8x8", 8, 0, [[38,2,30,58,35,59,24,18],[0,8,62,5,16,29,43,11],[14,52,26,60,49,57,7,37],[39,63,48,3,4,34,23,51],[36,19,32,13,41,25,20,15],[46,55,53,31,27,6,45,54],[21,44,33,12,42,1,61,47],[17,40,56,10,50,9,22,28]]);


withFileContent("file_100x100.txt", (data) => {
    var arr = data.split('\n');
    var map = [];
    for (var y = 0; y < 100; ++y) {
        map[y] = [];
        for (var x = 0; x < 100; ++x) {
            map[y][x] = arr[y*100+x];
        }    
    }
    test("100x100", 100, 0, map);
});

withFileContent("file_2500x2500.txt", (data) => {
    var arr = data.split('\n');
    var map = [];
    for (var y = 0; y < 100; ++y) {
        map[y] = [];
        for (var x = 0; x < 100; ++x) {
            map[y][x] = arr[y*100+x];
        }    
    }
    test("2500x2500", 2500, 0, map);
});
