let felhasznalo=""
let felhasznalolocal=""
let x=0;
let fhid=0
let toltes=true
function logincheck() {
    felhasznalo = sessionStorage.getItem("felhasznalo");
    felhasznalolocal=localStorage.getItem("felhasznalo");
    if(felhasznalo)
    {
        document.getElementById("fh").innerHTML=felhasznalo
        document.getElementById("fh").style.color="rgb(1,194,154)"
        document.getElementById("fh1").innerHTML='<button  data-bs-toggle="modal" data-bs-target="#exampleModal1" style="border:0"><span  class="position-absolute top-0 start-100 translate-middle  badge" ><i id="toll" class="bi bi-pen-fill" style="font-size:1rem;padding-bottom: 50px;color:rgb(1,194,154)"></i></span></button>'+felhasznalo
        document.getElementById("toll").style.color="rgb(1,194,154)"
        
        getRegisztracio()

        getProfilId()
    }
    else if(felhasznalolocal)
    {
        document.getElementById("fh").innerHTML=felhasznalolocal
        document.getElementById("fh").style.color="rgb(1,194,154)"
        document.getElementById("fh1").innerHTML='<button  data-bs-toggle="modal" data-bs-target="#exampleModal1" style="border:0"><span  class="position-absolute top-0 start-100 translate-middle  badge" ><i id="toll" class="bi bi-pen-fill" style="font-size:1rem;padding-bottom: 50px;color:rgb(1,194,154)"></i></span></button>'+felhasznalolocal
        document.getElementById("toll").style.color="rgb(1,194,154)"
        
        getRegisztracio()

        getProfilId()
    }
    else{
        window.location.href='../login.html'
    }
   
    fhid=sessionStorage.getItem('id')
    console.log(felhasznalo)
    console.log(fhid)
}
function getProfilId() {
    let fh=""
    if(felhasznalo)
    {
        fh=felhasznalo
    }
    else
    {
        fh=felhasznalolocal
    }
    let bemenet = {
        "bevitel1": fh
    }
    fetch('http://localhost:3000/getid', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            sessionStorage.setItem('id',responseJson)
            getProfilKep(responseJson)
        })
        .catch((error) => {
            console.error(error);
        })
}
function getProfilKep(id) {
    let valasz={}
    try{
        let bemenet = {
            "bevitel1": id
        }
        fetch('http://localhost:3000/getprofilkep', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                valasz=responseJson
    
            })
            .catch((error) => {
                console.error(error);
            })
    }
    catch(e){console.log(e)}
    finally{
        setTimeout(() => {
           megjelenit(valasz)
          }, "500");
    }
    let profkep='<div style="width:100px;height:100px;color:rgb(1,194,154)" class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>'
    document.getElementById("profilkep").innerHTML = profkep
}
function megjelenit(kep) {
    let profkep=""
    profkep = '<img  src="../Kepek/' + kep + '.png" style="width:100px;height:100px;border-radius:50px"><button onclick="getProfilkepek()" data-bs-toggle="modal" data-bs-target="#exampleModal" style="border:0"> <span  class="position-absolute bottom-0 end-0  badge" ><i class="bi bi-gear-fill" style="font-size:1.5rem;padding-bottom: 50px;color:rgb(1,194,154)"></i></span></button>'
    document.getElementById("profilkep").innerHTML = profkep
    x=kep
   
}
function getProfilkepek(){
    fetch('http://localhost:3000/felhasznalokepek')
    .then(x=>x.json())
    .then(y=>kepekmutat(y))
}
function kepekmutat(kepektomb)
{
    let sz=""
    kepektomb.map((item)=>{
        if(item.kepek_id==x)
        {   
            sz+='<div class="col-6 d-flex justify-content-center" style="color:black"><button id="kep'+item.kepek_id+'" onclick="profilkepValasztas('+item.kepek_id+')" style="border-width: 2px;border-color: rgb(1,194,154);border-style: solid;border-radius:15px;width:150px;height:150px;background-color:white;"><img  src="../Kepek/' + item.kepek_id + '.png" style="width:150px;height:150px;border-radius:50px"></button></div>'
        }
        else{
            sz+='<div class="col-6 d-flex justify-content-center" style="color:black"><button id="kep'+item.kepek_id+'" onclick="profilkepValasztas('+item.kepek_id+')" style="border:0;width:150px;height:150px;background-color:white;"><img  src="../Kepek/' + item.kepek_id + '.png" style="width:150px;height:150px;border-radius:50px"></button></div>'
        }
    })
    document.getElementById("modalbody").innerHTML=sz
    console.log(x)
    
}
function profilkepValasztas(kepid){
   
    x=kepid
    let bemenet = {
        "bevitel1": kepid,
        "bevitel2":fhid
    }
    fetch('http://localhost:3000/profkepfrissites', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    ).then(getProfilId).then(getProfilkepek)
    
}
function inputCheck(){
    let ujfelhasznalonev=document.getElementById("input").value;
   
    if(ujfelhasznalonev)
    {
        document.getElementById("ujfh").disabled=false
        document.getElementById("ujfh").classList.remove("btn-outline-dark")
        document.getElementById("ujfh").classList.add("btn-dark")
    }
    else{
        document.getElementById("ujfh").disabled=true
        document.getElementById("ujfh").classList.remove("btn-dark")
        document.getElementById("ujfh").classList.add("btn-outline-dark")

    }
}
function fhnevcsere(){
  
   let ujfelhasznalonev= document.getElementById("input").value;
   let bemenet = {
    "bevitel1": ujfelhasznalonev
}
fetch('http://localhost:3000/felhasznalonevek', {
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: { "Content-type": "application/json; charset=UTF-8" }
}
) .then((response) => response.json())
.then((responseJson) => {
 if(responseJson==true)
 {
    fetchujnev(ujfelhasznalonev)
    document.getElementById("exampleModal1").hidden="true"
    
 }
 else{
    alert("Egyező felhasználó nevek!")
 }

})
.catch((error) => {
    console.error(error);
}).then()
}

function fetchujnev(nev){
    console.log(nev)
    let bemenet = {
        "bevitel1": nev,
        "bevitel2":fhid
    }
    fetch('http://localhost:3000/felhasznalonevfrissites', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(
        document.getElementById("kozep").innerHTML='<div class="p-4">  <div class="alert alert-success d-flex justify-content-center align-items-center vw-100 " style="margin-bottom: 5rem;" role="alert"><i style="font-size: 35px; margin-right: 1rem;color:green" class="bi bi-check-lg"></i><div style="color:black;font-weight: bold;font-size: 20px;">Változatások sikeresen mentésre kerültek! <br> <span style="color:black;font-size: 15px;font-weight: 600;margin-left: 2rem;"> A mentéshez újra be kell jelentkezned!<span></div></div><div class="d-flex justify-content-center"><div class="spinner-grow" style="width: 6rem; height: 6rem;" role="status"><span class="visually-hidden">Loading...</span></div></div></div>'
    )   
    .then( 
        setTimeout(() => {
            window.location.href="../login.html"
           }, "2500"))
    .catch((error) => {
        console.error(error);
    })
}
function getRegisztracio(){
    let datum=""
    let ev=""
    let honap=""
    let nap=""
    let bemenet = {
        "bevitel1": sessionStorage.getItem('id')
    }
    fetch('http://localhost:3000/regisztraciodatum', {
    method: "POST",
    body: JSON.stringify(bemenet),
    headers: { "Content-type": "application/json; charset=UTF-8" }
}
) .then((response) => response.json())
.then((responseJson) => {
 responseJson.map((item)=>{
   
    ev=item.datum
    if(item.honap<10){
     honap+="0"+item.honap
    }
    if(item.nap<10){
        nap+="0"+item.nap
    }
    else{
        nap=item.nap
    }
    
    datum+=ev+"-"+honap+"-"+nap
    
 })
document.getElementById("regdatum").innerHTML=datum
})
.catch((error) => {
    console.error(error);
})
}










window.onscroll = function() {myFunction()};
var header = document.getElementById("proba");
var header2 =document.getElementById("proba1");
var sticky = header.offsetTop+100;
var sticky1=header2.offsetTop;


console.log("asd",sticky)
console.log("asd",sticky1)

function myFunction() {
    
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
      header.classList.remove("w-100")
      header.style.borderRadius="0px"
    } else {
      header.classList.remove("sticky");
      header.classList.add("w-100")
      header.style.borderRadius="15px"
    }
    if (window.pageYOffset > sticky1) {
        header2.classList.add("sticky");
        header2.classList.remove("w-100")
        header2.style.borderRadius="0px"
      } else {
        header2.classList.remove("sticky");
        header2.classList.add("w-100")
        header2.style.borderRadius="15px"
      }
    
    
  }


logincheck()