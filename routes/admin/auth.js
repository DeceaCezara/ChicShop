const express=require("express");
const {check,validationResult}=require("express-validator"); ///extract just the check function


const usersRepo=require("../../repositories/users");
const signupTemplate=require("../../views/admin/auth/signup");
const signinTemplate=require("../../views/admin/auth/signin");
const {requireEmail,requirePassword,requireValidEmail,requireValidPassword}=require("./validators")

const router=express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({req}));
});
  
router.post(
  '/signup',
  [
    requireEmail,
    requirePassword
  ], async (req, res) => {
    const errors=validationResult(req);
    console.log(errors);
    
    if(!errors.isEmpty()){
        return res.send(signupTemplate({req,errors}));
    }


    const { email, password, passwordConfirmation } = req.body;
  
    // Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });
  
    // Store the id of that user inside the users cookie
    req.session.userId = user.id;
  
    res.redirect('/admin/products');
});
  
router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});
  
router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
});
  
router.post('/signin',[
    requireValidEmail,
    requireValidPassword
  ], async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.send(signinTemplate({errors}));
    }

    const { email} = req.body;
  
    const user = await usersRepo.getOneBy({ email });
  
  
    req.session.userId = user.id;
  
    res.redirect('/admin/products');
});

module.exports=router;