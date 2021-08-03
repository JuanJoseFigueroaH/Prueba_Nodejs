import mongoose,{Schema} from 'mongoose';
const municipalitySchema = new Schema({
    departamento: {type: Schema.Types.ObjectId, ref:'departamento'},
    nombre:{type:String,maxlength:50,unique:true,required:true},
    createdAt:{type:Date,default:Date.now}
});
const municipalityModel = mongoose.model('municipality',municipalitySchema);
export default municipalityModel;