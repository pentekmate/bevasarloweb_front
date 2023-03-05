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
    let profkep='<img src="./Kepek/'+kep+'.png" style="width:70px;height:70px">'
    document.getElementById("profilkep").innerHTML=profkep
   
}


logincheck()
getProfilId()


