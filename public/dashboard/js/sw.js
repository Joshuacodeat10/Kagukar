
//SYNCHRONOUS CODE DOES NOT WORK WELL WHEN YOU'VE GOT FILES TO CACHE
//HENCE WE MAKE THE BROWSER WORK ASYNCHRONOUSLY
//Fetch via promises
fetch("http://localhost:3000/", { mode: "no-cors" })
    // best paractice to engage, check if fetch response = ok
    .then(r => { if (!r.ok) { throw (`Error: ${r.status} `) } return r; }) //check if response
    .then(res => { res.text(); console.log(res.type + " " + res.headers.get("content-type")) })
    // .then(t => console.log(t))
    .catch(err => console.log(err + " " + err.type))

//Fetch with async/await
// async function readFile(url){
//     let response = await fetch("http://localhost:3000/login");
//     return await response.text()
// }

// async function showFile(url){
//     let text = await readFile(url)
//     console.log(text)
// }

// using try
// try{
//     let result = await fetch("http://localhost:3000/login");
//     if(!response.ok) throw response.statusText;
//         var json = await response.json();

//         catch (error){
//             json = {error: (error)};
//             console.log(`Fetch failed: ${error}`)
//         }

// }


//ADD A LIST OF ALL THE FILES ON SITE
//note: all the files needed to start the app
const cacheName = "cache-v1";
const resourceToPrecache = [
    "/",
    "./index.html",
    "./manifest.json",
    "../assets/img/3.jpg",
    "../assets/eksuthlogo2.png"
]

// from the example
// const resourceToPrecache = [
//     "/",
//     "/index.html",
//     "/main.css",
//     "/heid.jpg",
//     "/... blah blah blah"
// ]


self.addEventListener("install", event => {
    console.log("Install Event")
    // debugger;
    //NOW YOU CAN LOAD THE FILES INTO THE CACHE
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log("New to Cache Saved")
                return cache.addAll(resourceToPrecache)
            })
    )
})

//Activate can be used as a signal to update CACHED resources
self.addEventListener("activate", event => {
    console.log("Activate Event")
    event.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.filter(cacheName => {
                        //return true to remove current cache
                    }).map(cacheName => {
                        return caches.delete(cacheName)
                    })
                )
            }
        )
    )
})




//Sending push notification here
self.addEventListener("push", e => {
    const title = "Yay, a message";
    const body = "Yay, a message Body";
    const icon = "../assets/img/3.jpg";
    const tag = "Yay-a-message";
    e.waitUntil(
        self.registration.showNotification(title, {
            body, icon, tag
        })
    )
})

//Update cache before Sending push notification here
self.addEventListener("push", e => {
    if (e.data.text() == "new-mail") {
        e.waitUntil(
            caches.open("mysite-dynamic").then(cache => {
                return fetch("/inbox.json").then(res => {
                    cache.put("/inbox.json", res.clone())
                    return res.json()
                })
            }).then(showEmailNotification)
        )
    }
})

const showEmailNotification = emails => {
    registration.showNotification("New Mail ", {
        body: "From " + emails[0].from.name,
        tag: "new-email"
    })
}



self.addEventListener("notificationclick", e => {
    //assume all resources needed to render /inbox/
    // have previously been cached e.g. as part of the 
    //install handler
    if (event.notification.tag == "new-email") {
        new WindowClient("/inbox/")
    }
})


//Synchronization
self.addEventListener("sync", e => {
    if (e.id == "update-leaderboard") {
        event.waitUntil(
            caches.open("mygame-dynamic").then(cache => {
                return cache.add("/leaderboard.json")
            })
        )
    }
})




// To allow for efficient memory usage, you can
//only read the responses body outlineColor: 

self.addEventListener("fetch", event => {
    //YOU CAN EJECT CACHE FROM HERE
    //USING THE CACHE FIRST STRATEGY
    // console.log("Fetch Intercepted for: ", event.request.url)
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            console.log("New Cache fetched")
            return cachedResponse ||
                fetch(event.request)
            //CACHE retrieves caches, and on fail, it requests from the network
        }).catch(()=>{
            return caches.match("/login")
        })
    )
})

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open("mysite-dynamic").then(cache => {
            return cache.match(event.request).then(res => {
                return res || fetch(event.request)
                    .then(response => {
                        console.log("Put New to Cache Saved")

                        //clone is used to create 
                        //additional copies that can be read seperately
                        cache.put(event.request, response.clone());
                        return response
                    })
            })
        })
    )
})

// for cases where having the latest version is non-essential
//cache and saved for future visit
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.open("mysite-dynamic").then(cache => {
            return cache.match(event.request).then(res => {
                const fetchPromise = fetch(event.request)
                    .then(networkResponse => {
                        console.log("Clone New to Cache Saved")

                        cache.put(event.request, networkResponse.clone())
                        return networkResponse
                    })
                return res || fetchPromise
            })
        })
    )
})
















