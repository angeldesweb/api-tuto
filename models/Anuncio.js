const { Schema , model } = require('mongoose');

const Anuncio = new Schema({
    titulo:{ type:String , required:true , unique:true },
    modo:{ type:Boolean , default:false }, // TRUE VENTA || FALSE COMPRA
    precio:{type:Number,required:true,min:0},
    imagen:{type:String,required:true,unique:true},
    tags:[{type:String,enum:['work','lifestyle','motor','mobile']}]
});

module.exports = model('Anuncio',Anuncio);