const express = require("express");
const app = express();
const port = 3000;

app.get("/test", (req, res) => {
    try {
        res.send("test");
    } catch (err) {
        res.send("发生错误");
    }

});


app.get("/", (req, res) => {
    try {
        throw new Error("这是一个错误");
        res.send("hello world");
    } catch (err) {
        res.send("发生错误:" + err.message);
    }


});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
