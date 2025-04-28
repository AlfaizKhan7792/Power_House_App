const {  mongoose } = require("mongoose");

const PlanSchema = new mongoose.Schema({


    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },

    weight : {
        type : String,
        required : true
    },
    height : {
        type : String,
        required : true
    },
    preference : {
        type : "String",
        required : true,
        enum : ["Vagetarian" , "Non-Vagetarian" , "Vegan"]
    },
    goal : {
        type : String,
        required : true,
        enum : ['gain' , 'loose' , 'maintain']
    },
    isCompleted : {
        type : Boolean,
        required : true,
        default : false
    }

},{
    timestamps : true
})


module.exports = mongoose.model('Plan' , PlanSchema)