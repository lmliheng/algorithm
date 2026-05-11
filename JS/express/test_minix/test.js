const mergeDescriptors = require("./merge_descriptors");
const source = {
    a: 1,
    b: 2,
    c: 3,
    d: 5,
};
const destination = {
    d: 4,
};
mergeDescriptors(destination, source,false);
console.log(destination);