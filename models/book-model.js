const mongoose = require("mongoose")

const schema = mongoose.Schema;

const bookSchema  = new schema(
    {
        name :{  
        type : String,
        required : true,
        },

        author:{
            type : String,
            required : true,
        },

        price:{
            type : Number,
            required : true,
        },
        description:{
            type : String,
            required : true,
            },
            publisher:{
                type : String,
                required : true,
            },



    }, {
        timestamps: true,
    })

    module.exports= mongoose.model("Book", bookSchema);
