// 1. Написать функцию, которая будет проверять целостность данных в Merkle дереве.
// 2. Покрыть функцию тестами.
// 3. Сделать так, чтобы функцию можно было использовать как в браузере, так и в node_hash.js.

const shajs = require('sha.js');
const sha256 = require('sha256');

// rootHash — hash корневого элемента;
// total — общее количество элементов в списке;
// range — диапазон элементов списка, представленный в дереве: [a, b) от a включительно до b не включительно;
// tree — Merkle дерево.


// Include  JSON files
// const data = JSON.stringify(require('./data/range'), null, 4);
const data = JSON.stringify(require('./data/fully-balanced'), null, 4);
// const data = JSON.stringify(require('./data/single-node'), null, 4);

var json = JSON.parse(data)

/*
console.log("range_start: ", json.range_start);
console.log("range_end: ", json.range_end);
console.log("total: ", json.total);
console.log(json.tree.left.left.left);
console.log(json.tree.left.left.right);
console.log(json.tree.left.right.left);
console.log(json.tree.left.right.right);
console.log(json.tree.right.left.left);
console.log(json.tree.right.left.right);
console.log(json.tree.right.right.left);
console.log(json.tree.right.right.right);
console.log("root_hash: ", json.root_hash);
*/

function sha(value1, value2){
    // return node_hash = shajs('sha256').update(shajs('sha256').update(value1).digest('hex') + shajs('sha256').update(value2).digest('hex')).digest('hex');    
    // return node_hash = sha256(sha256(value1)+sha256(value2));
    return node_hash = sha256(sha256(value1.toString())+sha256(value2.toString()));
}

var root = json.tree;
var level = 0;
var level_max = 0;

// function checkIntegrity(rootHash, total, range_start, range_end, tree){
function checkIntegrity(root) {
    level++;

    if (root.left && !root.node_hash) {
        root.left = checkIntegrity(root.left);
    }

    if (root.right && !root.node_hash) {
        root.right = checkIntegrity(root.right);
    }

    // if (root.right.node_hash && root.left.node_hash){
    //     root.node_hash = sha(root.right.node_hash, root.left.node_hash);
    // }
    
    if ((root.right && root.right.node_hash) && (root.left && root.left.node_hash)){
        root.node_hash = sha(root.right.node_hash, root.left.node_hash);   
        return root;     
    }

    // Конец ветки
    if (!root.left && !root.right && root.val) {
        
        // Определение глубины дерева
        if (level_max <= level){
            level_max = level;
        }
        level = 0;
        
        var node_hash = sha(root.val[0], root.val[1]);        
        root.node_hash = node_hash;
        // console.dir(root);
        return root;
    }
    
    if (root.left && root.right){
        // console.dir(root.left);
        // console.dir(root.right); 
        // console.dir(root);
    }

    if (root){
        console.log(root);
    }
               
}

checkIntegrity(root);

console.log(JSON.stringify(root, null, 4));
console.log("\nlevel max: ", level_max);
console.log("my hash:   ", root.node_hash);
console.log("root_hash: ", json.root_hash);

// console.log(sha256('1'));
// console.log(sha256('2'));

// console.log("Add: ",sha256(sha256('1') + sha256('2')));

// console.log(sha256(1));