const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get("/", function(req, res) {

    const day = date.getDate();

    res.render("list", {ListTitle: day, newListitems:  items});
});

app.post("/", function(req, res) {
    console.log(req.body)
 let item =  req.body.newitem;

 if (req.body.lsit === "work list ") {
    workItems.push(item);
    res.redirect("/work")
 } else {
    items.push(item);
    res.redirect("/")
 }

});

app.get("/work", (req, res) => {
    res.render("list", {ListTitle: "work list", newListitems:  workItems});
})

app.post("/work",  (req, res) => {
    let item = req.body.newitem;

    workItems.push(item);

    res.redirect("/work")
})


app.listen(process.env.PORT || 3000, function() {
    console.log("server is runing on port 3000")
});
