const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const ScheduleSchema = new Schema({
    id:ObjectId,
    studentId: { type: Number,min:1000000 ,max: 9999999,
        required: [true, 'A mssv is required'] 
    },
    yearStudy: { type: String, default:null },
    termID: { type: String ,default:null },
    week: { type: Number, max:2 ,default:null },
    dateCreated:{
        type: Date,default: new Date().toISOString()
    },
    schedules:[
      {
        _id : false,
        thu: String,
        sang: String,
        chieu:String,
        toi:String
      
    }
    ]
  });
const Schedule = mongoose.model("Schedule",ScheduleSchema);

module.exports = Schedule;
