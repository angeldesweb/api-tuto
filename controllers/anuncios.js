const Anuncio = require('../models/Anuncio');

exports.createAnuncio = async (req,res,next) => {
    try {
        const { body } = req;
        const doc = new Anuncio(body);
        const resp = await doc.save()
        return res.status(200).send(resp);
    } catch (error) {
        next(error);
    }
}

exports.getAnuncios = async (req,res,next) => {
    let nombre = req.query.nombre ? req.query.nombre : null;
    let modo = req.query.sell ? req.query.sell : null;
    let tag = req.query.tag ? req.query.tag.split(',') : null;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let min = req.query.min ? parseInt(req.query.min) : 0;
    let max = req.query.max ? parseInt(req.query.max) : Infinity;
    let args = {};
    if(modo !== null) args = {...args,modo};
    if(tag !== null) args = {...args,tags:{$in:tag}};
    if(nombre !== null) args = {...args,nombre};
    try {
        const docs = await Anuncio.find(args)
            .where('precio').gt(min).lt(max)
            .skip(skip).limit(limit);
        if(docs.length === 0){ 
            return res.status(404).send({message:'No se encontraron registros'});
        }else if(req.view){ 
            return {rows:docs,total:docs.length};
        }else{
            return res.status(200).send({ok:true,result:{rows:docs},total:docs.length});
        }
    } catch (error) {
        next(error);
    }
}