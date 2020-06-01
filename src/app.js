const express=require('express');
const path=require('path');
const hbs=require('hbs');
const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");

const app=express();

const publicPath=path.join(__dirname, "../public");
const viewsPath=path.join(__dirname, "../templates/views");
const partialsPath=path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs");  //even if I give this before the app.use to use public folder stil when we go to home page, the server serves up index.html file present in public folder and even if we give the route in app.get it still doesnt serve that and instead serves up index.html
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(path.join(__dirname, "../public")))  //to serve up anything else in home page need to remove the  index.html file from the public folder since its a special file


app.get('/weather',(req,res) => { //app.get('') == app.get('/') both will be the root route
    //res.send("this is the home page"); //--this will be rendered only if nothing named index.html is there in public folder. So seems like it first uses middleware to fetch if any index.html there  in public folder and if not only then comes to these routes
    const address=req.query.address;
    console.log("address in app.js",address);
    if(address && address!==""){
        return geocode.geoCode(address,(error,locationDetails) => {
            if(error){
                return res.send({    //changed from render to send for fetch example
    
                    error:error,
                    name: "Amitabh",
                    title: "Weather"
                });
            }
            return forecast.callWeatherAPI(locationDetails,(error,response)=>{
                if(error){
                    return res.render("index.hbs", {
                        error: error,
                        name: "Amitabh",
                        title: "Weather"
                    })
                }
                return res.send({
                    msg: response,
                    name: "Amitabh",
                    title: "Weather"
                })
            })
        })
    }
    
    res.send({

        error:"Please provide an address",
        name: "Amitabh",
        title: "Weather"
    });
})


app.get('/help',(req,res) => {
    res.render("help.hbs",{
        msg: "Please Help Me!!",
        name: "Amitabh Panda",
        title:"Help"
    });
})

app.get("/about", (req,res) => {
    res.render("about.hbs",{
        title: "About",
        name: "Amitabh"
    })
})

app.get('*', (req,res) => {
    console.log("*", req.path);
    console.log("*", req.baseUrl);
    console.log("*", req.originalUrl);
    let msg="";
    if(req.path.startsWith("/help"))
    {
        msg="Help article not found";
    }
    else{
        msg="Page not found";
    }
    res.render("error.hbs",{
        msg,
        name: "Amitabh"
    });
})




// app.get('/about', (req,res) => {
//     res.send("about.html");
// })


app.listen(3000,()=>{
    console.log("server is up and running on port 3000");
})