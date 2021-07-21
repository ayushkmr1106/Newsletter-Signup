const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/4ed5b172c6";

    const options = {
        method : "POST",
        auth : "ayush:0bc3c3667ae536c1b7a5794edfa9bd42-us6"
    }

    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200) {
            console.log(response.statusCode);
            res.sendFile(__dirname + '/success.html');
        }
        else {
            res.sendFile(__dirname + '/failure.html');
        }
        // response.on("data", function(data) {
        //     console.log(JSON.parse(data));
        // })
    })
    
    // console.log(firstName, lastName, email);
    // res.send("<h1>Success</h1>")
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running at port 3000.")
});

// Api
// 0bc3c3667ae536c1b7a5794edfa9bd42-us6
// Unique Id
// 4ed5b172c6