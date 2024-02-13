const Course = require('../models/Course')
const {multipeMongooseToObject, mongooseToObject} = require('../../until/mongoose')
class NewController {
    async index(req,res){
        // Get all data from model
        let data = await Course.find({});
        data = multipeMongooseToObject(data)
        // console.log(data);
        // Return api 
        // res.json(data)
       
        // Render view
        res.render('news/index',{
            items : data,
            title : "Hello"
        });
    }
    async show(req,res){
        const slug = req.params.slug
        // let data = await Course.findOne({ id: slug });
        let data = await Course.findById(slug);
        data = mongooseToObject(data)
        console.log(data);

        res.render('news/show',{
            item : data,
            title : slug
        });
    }

    create(req,res,next){
        res.render('news/create',{
            
        });
    }
    async edit(req,res){
        const slug = req.params.slug
        // let data = await Course.findOne({ id: slug });
        let data = await Course.findById(slug);
        // Chuyen sang doi tuong
        data = mongooseToObject(data)
        res.render('news/edit',{
            item : data
        });
    }
    async store(req, res){
        // Lay du lieu tu form
        // Get: req.query
        // Post: req.body
        const data = req.body;
        // Tra ve data de kiem tra
        // res.json(data)

        // Tien hanh xu ly
        const course = new Course(data);
        course.save();

        // Tra ve data de kiem tra
        res.redirect('/news')
    }
    async update(req, res){
        // Lay du lieu tu url
        const slug = req.params.slug
        console.log('slug',slug);

        // Lay du lieu tu form
        // Get: req.query
        // Post: req.body
        const data = req.body;
        
        // Tra ve data de kiem tra
        // res.json(data)

        // Xu ly
        await Course.updateOne({ _id: slug }, {
            name: data.name
        }).then( function(res){
            console.log('res',res);
        }).catch( function(err){
            console.log('err',err);
        });

        // Tra ve data de kiem tra
        // res.json(data)
        res.redirect('/news')
    }
    async destroy(req, res){
        // Lay du lieu tu url
        const slug = req.params.slug
        console.log('slug',slug);

        // Lay du lieu tu form
        // Get: req.query
        // Post: req.body
        const data = req.body;
        
        // Tra ve data de kiem tra
        // res.json(data)

        // Xu ly
        await Course.deleteOne( { _id: slug } ).then( function(res){
            console.log('res',res);
        }).catch( function(err){
            console.log('err',err);
        });

        // Tra ve data de kiem tra
        // res.json(data)
        res.redirect('/news')
    }
}
module.exports = new NewController;