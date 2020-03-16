var express = require("express");
var router = express.Router();
var { User } = require("../models/user.model");


//Get all
router.get("/", async (req, res) => {
    let users = await User.find(function (error, response) {
        if (error) {
            res.send(error);
        } else {
            res.send(response);
        }
    });
});

//Add
router.post("/add", async (req, res) => {
    if (req.body) {
        var data = req.body;
    } else {
        return res.status(404).send("Request parameters are null");
    }

    try {
        const user = new User();
        const latestUser = await User.find()
            .sort({ _id: -1 })
            .limit(1);
        if (!latestUser.id == null) {
            user.id = 1;
        } else {
            user.id = latestUser[0].id + 1;
        }
        user.email = data.email;
        user.password = data.password;

        const result = await user.save();
        if (result) {
            res.status(200).send({
                message: "User Added Successfully",
                userId: result.id
            });
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.put("/update", async (req, res) => {
    if (req.body) {
        var data = req.body;
    } else {
        return res.status(404).send("Request parameters are null");
    }

    try {

        var user = await User.find({ email: data.email });
        if (!this.user) {
            return res.status(404).send({ message: 'no record found' });
        }
        else {
            user.email = data.email;
            user.password = data.password;
            const result = await user.save();

        }

    }
    catch (error) {
        return res.status(400).send(error.message);
    }

});

module.exports = router;


