var arr = process.argv
var code = 0;
var obj = {};
obj = require('./pets.json');
var newArray = obj;


if (arr.length < 3) {
    console.log('Usage: node pets.js [read | create | update | destroy]');
    code = 1;
    process.exit(code);
}
else if (arr[2].toUpperCase() === 'READ') {
    var num = arr[3]
    if (num === undefined) {
        console.log(obj);
    } else if (num >= obj.length || num <0){
        console.log('Usage: node pets.js read INDEX');
        code = 3;
        process.exit(code);
    } 
    else {
        console.log(obj[num]);
    }
    
}
else if (arr[2].toUpperCase() === 'CREATE'){
var newAge = parseInt(arr[3]);
var newKind = arr[4];
var newName = arr[5];
if (newAge !== undefined && newKind !== undefined && newName !== undefined) {
 var newObject = {
     age: newAge,
     kind: newKind,
     name: newName
 }
 newArray.push(newObject);
 
    const fs = require('fs');
    fs.writeFile('./pets.json', JSON.parse(newArray), err => {
        if (err) {
            console.log(err);
        }
    });
}
else {
    console.log('Usage: node pets.js create AGE KIND NAME')
}
}
else if (arr[2].toUpperCase() === 'UPDATE'){
    

}
else if (arr[2].toUpperCase() === 'DESTROY'){
console.log("test3")

}
else {
    console.log('Usage: node pets.js [read | create | update | destroy]');
    code = 2;
    process.exit(code);
}

