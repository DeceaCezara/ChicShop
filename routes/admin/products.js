const express = require('express');
const {validationResult}=require('express-validator');
const multer=require('multer');

const productsRepo=require('../../repositories/products')
const productsNewTemplate=require("../../views/admin/products/new")
const productsIndexTemplate=require('../../views/admin/products/index');
const productsEditTemplate=require('../../views/admin/products/edit');
const {requireTitle,requirePrice}=require('./validators')
const { handleErrors,requireAuth } = require('../middlewares');

const router = express.Router();
const upload=multer({storage:multer.memoryStorage()});

router.get('/admin/products', async(req, res) => {
    //Require Authentification
    if(!req.session.userId){
        return res.redirect("/signin");
    }
    const products=await productsRepo.getAll();
    res.send(productsIndexTemplate({products}));
});

router.get('/admin/products/new', (req, res) => {
    //Require Authentification
    if(!req.session.userId){
        return res.redirect("/signin");
    }
    res.send(productsNewTemplate({}))
});

router.post('/admin/products/new',upload.single('image'),[requireTitle,requirePrice],async(req,res)=>{
    
    //Require Authentification
    if(!req.session.userId){
        return res.redirect("/signin");
    }
    
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.send(productsNewTemplate({errors}));
    }

    const image=req.file.buffer.toString("base64");
    const {title,price}=req.body;
    await productsRepo.create({title,price,image});


    res.redirect('/admin/products');
});

router.get("/admin/products/:id/edit",async(req,res)=>{
    const product=await productsRepo.getOne(req.params.id);

    if(!product){
        return res.send("Product not found!!");
    }

    res.send(productsEditTemplate({product}));


});

router.post(
    '/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [requireTitle, requirePrice],
    handleErrors(productsEditTemplate, async req => {
      const product = await productsRepo.getOne(req.params.id);
      return { product };
    }),
    async (req, res) => {
      const changes = req.body;
  
      if (req.file) {
        changes.image = req.file.buffer.toString('base64');
      }
  
      try {
        await productsRepo.update(req.params.id, changes);
      } catch (err) {
        return res.send('Could not find item');
      }
  
      res.redirect('/admin/products');
    }
  );

router.post("/admin/products/:id/delete",requireAuth,async(req,res)=>{
    await productsRepo.delete(req.params.id);

    res.redirect('/admin/products/');
})
  
module.exports = router;
