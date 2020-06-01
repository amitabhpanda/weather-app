console.log('dfdsfaaaaaa');

// fetch("http://localhost:3000/weather")
// .then((response) =>response.json())
// .then(resp=>{console.log(resp)})

const searchForm=document.querySelector("form");
const search=document.querySelector("input");

const messageOne=document.querySelector("#messageOne");
const messageTwo=document.querySelector("#messageTwo")


searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    messageOne.textContent="loading.....";
    messageTwo.textContent="";
    const location = search.value;
    console.log(location);
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(response=>response.json())
    .then(response => {
        if(response.error){
            console.log(response.error);
            messageOne.textContent=response.error;
        }
        else{
            console.log(response);
            messageOne.textContent=response.msg;
            messageTwo.textContent=response.title;
        }
    })
})

//Highly important points---
/*
1.)
"DevTools failed to parse SourceMap: chrome-extension://gighmmpiobklfepjocnamgkkbiglidom/include.preload.js.map"
The above line will come like error/warning in the console.log if 
the browser extension is enabled.

Refer-https://superuser.com/questions/1523427/google-chrome-devtools-failed-to-parse-sourcemap-chrome-extension

Click on the link and it will show the extension name and then disable it.
In my case it was the adblocker causing it.

2.)
When I had remove the index.html file from the public folder so that 
the server can route to the "/" endpoint defined in the app.js file,
to return my response, what it did was go to that endpoint and simply
return json to the browser so the index.hbs file was not being read
and thus simple.js was not being called.

So I think cannot call simple.js and use the .hbs file since for .hbs
has to send res.render and thus cannot send json. So may be implement
the same kind of response in two separate files.

3.)
On including the index.html file in the public folder and visting "/",
it fetched the index.html file and ran the simple.js code in which I was
trying to fetch the "/" file again for the json response challenge and
on reaching the server it was not finding any route defined and was
instead calling the route defined for wildcard(*) and also in the logs it was 
printing the /favicon.ico as the req.url which is I think for the fetch call.


So I changed the route name to "/weather" which was actually what was done
in the video and instead of serving weather info for "/" path, I served
for the /weather path which is also logical


SO BE CAREFUL WITH THE "/" PATH.

4)
whenever in any script there is fetch call and the response is something like 
res.render then there will show this error-
"Uncaught SyntaxError: Invalid or unexpected token"

So ensure that json response is obtained.

It was the case when trying to call the "/" and it was returning index.html
or when there was no route found it was going to wildcard route handler
which was then returning res.render()

*/