const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const schemaUser = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },

        email: {
            type: String,
            required: [true, "email is required"],
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,           
        },

        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [8, "min length: 8"],
        },
    },
    { timestamps: true }
);

schemaUser.pre("save", function(next) {
    const user = this;

    if (user.isModified("password")) {
        bcrypt
            .hash(user.password, 10)
            .then((encryptedPassword) => {
                user.password = encryptedPassword;
                next();
            })
            .catch(next);
    } else {
        next();
    }
});



module.exports = mongoose.model("User", schemaUser);


