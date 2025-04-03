var express = require("express")
const mongoose = require('mongoose');
var app = express()
 
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/myproject', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
    });

    const UserSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        email: String,
        password: String,
      });

      const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const newUser = new User({ first_name, last_name, email, password });
    await newUser.save();
    console.log("User registered successfully")
    res.json({ statusCode: 200, message: "User registered successfully! You can log In now" });
  } catch (error) {
    console.log("User registration failed")
    res.status(500).json({ message: "Error registering user" });
  }
});

    // 2. Define your schema and model
    // const ProjectSchema = new mongoose.Schema({
    // title: String,
    // image: String,
    // link: String,
    // description: String,
    // });
    // const Project = mongoose.model('Project', ProjectSchema);
    // // 3. REST API route
    // app.get('/api/projects', async (req, res) => {
    // const projects = await Project.find({});
    // res.json({ statusCode: 200, data: projects, message: 'Success' });
    // });
 
    // const sampleProject = new Project({
    //     title: "Movie 4",
    //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmsr9gWAv1u1IC06ELEx0J6wzzwoSLymxpQDLaXS-mw_f-jLu117R9EpOFtjYaX3rbdKt9DA",
    //     link: "About movie 4 4",
    //     description: "Demo description about movie 4"
    //     });
    //     sampleProject.save().then(() => console.log("Sample project saved!"));
        
 
app.get("/addTwoNumbers",(req,res) => {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var result = addNumbers(number1,number2)
    res.json({statusCode: 200, data: result, message:"Success"})
})
 

var port = process.env.port || 3000;
 
app.listen(port,()=>{
    console.log("App running at http://localhost:"+port)
})
 