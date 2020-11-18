export default function MySw(){
    let swDev = `${process.env.PUBLIC_URL}/Sw.js`
    navigator.serviceWorker.register(swDev).then((result) => {
       console.log("Result",result);
        
    })
}