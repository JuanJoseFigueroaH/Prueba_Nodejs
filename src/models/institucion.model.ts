import mongoose,{Schema} from 'mongoose';
const institucionSchema = new Schema({
    municipio: {type: Schema.Types.ObjectId, ref:'municipio'},
    nombre:{type:String,maxlength:50,unique:true,required:true},
    descripcion: {type:String,maxlength:255},
    createdAt:{type:Date,default:Date.now}
});
const institucionModel = mongoose.model('institucion',institucionSchema);
export default institucionModel;