let id="";
let felhasznalo="";
function logincheck()
{   
    felhasznalo = sessionStorage.getItem("felhasznalo");
    document.getElementById("belepettfh").innerHTML=felhasznalo
    document.getElementById("belepettfh").style.color="rgb(1,194,154)"; 
    console.log(felhasznalo)
}
function kilepes()
{
    sessionStorage.clear()
    window.location.href = "main.html"
}

function getProfilId(){
    let bemenet={
        "bevitel1":felhasznalo
    }
    fetch('http://localhost:3000/getid', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    )
    .then((response) => response.json())
    .then((responseJson) => {
    getProfilKep(responseJson)
    })
    .catch((error) => {
        console.error(error);
    })
}
function getProfilKep(id){
    let bemenet={
        "bevitel1":id
    }
    fetch('http://localhost:3000/getprofilkep', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    )
    .then((response) => response.json())
    .then((responseJson) => {
     megjelenit(responseJson)
    })
    .catch((error) => {
        console.error(error);
    })
}
function megjelenit(kep)
{
    let profkep='<img  src="./Kepek/'+kep+'.png" style="width:70px;height:70px">'
    document.getElementById("profilkep").innerHTML=profkep
   
}
fetch("http://localhost:3000/getkomment")
    .then(x => x.json())
    .then(y => kommentek(y))

function kommentek(tomb){
    let sz="";
    console.log(tomb)
    tomb.map((item)=>{
    sz+=' <div class="row justify-content-center" style="padding-top: 5rem;">'
    sz+='<div class="col-2 bg-dark position-relative">'
    sz+=' <img src="Kepek/'+item.felhasznalo_kep_id+'.png"  style="width:80px;height:80px;border-radius: 50px;" alt="">'
    sz+='<span  class="position-absolute top-0 start-1" style="color:rgb(1,194,154)">'+item.felhasznalo_nev+'</span>'
    sz+='</div>'
    sz+='<div class="col-4 bg-secondary min-vh-20 position-relative" style="border-radius: 5px;">'
    sz+='<p  style="font-weight:600;font-size:16px">'+item.wm_szoveg+' </p>'
    sz+= '<span  class="position-absolute bottom-0 end-0"  style="color:rgb(1,194,154)">'+item.wm_datum+'</span>'
    sz+='</div>'
    sz+='</div>'
   

    
    
    
})
    document.getElementById("megjelenit").innerHTML=sz
}

logincheck()
getProfilId()


