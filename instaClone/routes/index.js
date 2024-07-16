const express = require("express");
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");
const plm = require("passport-local-mongoose");
const localStrategy = require("passport-local");
const path = require("path");
const upload = require("./multer");

const expressSession = require("express-session");
passport.use(new localStrategy(userModel.authenticate()));

var app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(express);

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "hey hey hey",
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(userRouter.deserializeUser());

app.get("/register", function (req, res, next) {
  res.render("register");
});

app.listen(3000, function (req, res) {
  res.send("done");
});

 app.post('/createuser',async function(req,res,next){
     let user = userModel.findOne({username:req.passport.session.user})
     let createduser = await new userModel({
        //  username:req.passport.session.user,
        //  email:
        //  posts:req.passport.session.user,
    });
     res.send(createduser);
 });

 router.post('/createposts',async function(req,res,next){
     let user = await userModel.findOne({username:req.passport.session.user});
     let createdpost = await new postModel({
         postText:"",
         user:

         userModel.register(userData,req.body.password)
         .then(function(){
             passport.authenticate("local")(req,res,function(){
             res.redirect("/profile");
             })
         })

     });
     user.post.push(createdpost._id);
     await user.save();
 });

module.exports = app;

app.post("/register",function(req,res,next){
    const userData = new userModel({
        username:req.body.username,
        name:req.body.name,
        email:req.body.email
    });
})

router.get("/feed", isLoggedIn, async function (req, res) {
    const posts = await postModel.find().populate("user");
    res.render("feed", { footer: true });
});
router.get("/profile", isLoggedIn, async function (req, res) {
    const user = await userModel.findOne({username:req.session.passport.user}).populate("posts");
    res.render("profile", { footer: true,user });
});
router.get("/search", isLoggedIn, function (req, res) {
  res.render("search", { footer: true });
});
router.get("/edit", function (req, res) {
  res.render("edit", { footer: true });
});
router.get("/upload", function (req, res) {
  res.render("upload", { footer: true });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return networkInterfaces(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

router.post("/upload", upload.single("image"), async function (req, res) {
  const user = await userModel.findOneAndUpdate(
    {
      username: req.session.passport.user,
    },
    { username: req.body.username, name: req.body.name, bio: req.body.bio },
    { new: true }
  );

  router.post("/upload",isLoggedIn,upload.single("image"),async function(req,res){
    const user = await userModel.findOne({ username:req.session.passport.user})
    const post = await postModel.create({
            picture:req.file.filename,
            user:user._id,
            caption: req.body.caption
        })

        user.posts.push(post._id);
        await user.save();
        res.redirect("/feed");
  });

  user.profileImage = req.file.filename;
  await user.save();
  res.redirect("/profile");
});


