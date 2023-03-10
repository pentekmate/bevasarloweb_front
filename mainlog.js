let id = "";
let felhasznalo = "";

function logincheck() {
    felhasznalo = sessionStorage.getItem("felhasznalo");
    document.getElementById("belepettfh").innerHTML = felhasznalo
    document.getElementById("belepettfh").style.color = "rgb(1,194,154)";
    document.getElementById("fhnev").innerHTML=felhasznalo
    console.log(felhasznalo)
    
}
function kilepes() {
    sessionStorage.clear()
    window.location.href = "main.html"
}

function getProfilId() {
    let bemenet = {
        "bevitel1": felhasznalo
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
            megjelenit(responseJson)
        })
        .catch((error) => {
            console.error(error);
        })
}
function megjelenit(kep) {
    let profkep = '<img  src="./Kepek/' + kep + '.png" style="width:80px;height:80px">'
    document.getElementById("profilkep").innerHTML = profkep
    document.getElementById("profilkep1").innerHTML = profkep


}
function kommentlekeres(){
fetch("http://localhost:3000/getkomment")
    .then(x => x.json())
    .then(y => kommentek(y))
}
function kommentek(tomb) {
    let fhid=sessionStorage.getItem('id')
    let sz = "";
    console.log(tomb)
    tomb.map((item) => {
        sz += '<div class="row justify-content-center" style="padding-top: 5rem;">'
        sz+='  <div class="col-2"></div>    '
        sz += '<div class="col-2 bg-dark  position-relative" >'
        sz += '<div style="background-color:red;width:80px;height:80px;border-radius:50px" class="bg-secondary"> <img src="Kepek/' + item.felhasznalo_kep_id + '.png"  style="width:80px;height:80px;border-radius: 50px;" alt=""> <span  class="position-absolute bottom-80 start-50" style="color:rgb(1,194,154);font-weight:600;">' + item.felhasznalo_nev + '</span> </div>'
        sz += '</div>'
        sz += '<div class="col-4 bg-secondary min-vh-20 position-relative" style="border-radius: 5px;">'
        sz += '<p  style="font-weight:400;font-size:16px">' + item.wm_szoveg + ' </p>'
        if(item.felhasznalo_id==fhid){
            sz+='<span  class="position-absolute top-0 start-100"  style="color:rgb(1,194,154)"><button title="Törlés" onclick="kommenttorles('+item.id+')" class="bg-dark" style="border:0"><i style="color:red;" class="bi bi-trash3-fill"></i></button></span>'
            }
        sz += '<span  class="position-absolute bottom-0 end-0"  style="color:rgb(1,194,154)">' + item.wm_datum + '</span>'
        sz += '</div>'
        sz += '<div class="col-2 bg-dark "><div class="d-flex flex-row bd-highlight mb-3"> <div class="p-2 bd-highlight" > <button onclick="egyetert('+item.wm_egyetertett+','+item.id+')" id="egyet'+item.id+'" class="bg-dark" style="border:0" title="Egyetértek"> <i id="like'+item.id+'" style="color: green;"  class="bi bi-hand-thumbs-up"></i></div > </button><div class="p-2 bd-highlight"><button onclick="nemertegyet('+item.wm_nemertett_egyett+','+item.id+')" id="nemegyet'+item.id+'" title="Nem értek egyet" class="bg-dark" style="border:0"> <i id="nemtetszik'+item.id+'" style="color:red" class="bi bi-hand-thumbs-down"></i> </button></div><div class="p-2 bd-highlight"><button onclick="jelent('+item.wm_jelentett+','+item.id+')" id="jelentett" class="bg-dark" title="Jelentem" style="border:0"><i id="jel'+item.id+'" style="color:yellow" class="bi bi-exclamation-square"></i></button></div></div ></div>'
        sz += '</div>'
    })
    document.getElementById("megjelenit").innerHTML = sz
}

function egyetert(egyetertett,id){

    let className = document.getElementById("like"+id).className;
  
    if(className=="bi bi-hand-thumbs-up")
    {
        egyetertFetchTrue(egyetertett,id)
      
        document.getElementById("like"+id).classList.remove("bi-hand-thumbs-up"),
        document.getElementById("like"+id).classList.add("bi-hand-thumbs-up-fill"),
        document.getElementById("nemtetszik"+id).classList.remove("bi-hand-thumbs-down-fill"),
        document.getElementById("nemtetszik"+id).classList.add("bi-hand-thumbs-down"),
        document.getElementById("jel"+id).classList.remove("bi-exclamation-square-fill"),
        document.getElementById("jel"+id).classList.add("bi-exclamation-square")
        
    } 
    else{
       
        egyetertFetchFalse(egyetertett,id) 
        document.getElementById("like"+id).classList.remove("bi-hand-thumbs-up-fill"),
        document.getElementById("like"+id).classList.add("bi-hand-thumbs-up")
        
       
    }
    

}

function egyetertFetchTrue(egyetertett,id){
    let bemenet = {
        "bevitel1": egyetertett+=1,
        "bevitel2":id
    }
    fetch('http://localhost:3000/egyetert', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}
function egyetertFetchFalse(egyetertett,id){
    let bemenet = {
        "bevitel1": egyetertett,
        "bevitel2":id
    }
    fetch('http://localhost:3000/egyetert', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}



function nemertegyet(nemegyet,id){
    
    className=document.getElementById("nemtetszik"+id).className;
    
    if(className=="bi bi-hand-thumbs-down")
    {
       
        nemertegyetFetchTrue(nemegyet,id)
        document.getElementById("nemtetszik"+id).classList.remove("bi-hand-thumbs-down"),
        document.getElementById("nemtetszik"+id).classList.add("bi-hand-thumbs-down-fill"),
        document.getElementById("like"+id).classList.remove("bi-hand-thumbs-up-fill"),
        document.getElementById("like"+id).classList.add("bi-hand-thumbs-up"),
        document.getElementById("jel"+id).classList.remove("bi-exclamation-square-fill"),
        document.getElementById("jel"+id).classList.add("bi-exclamation-square")
        
    }
    else{
        nemertegyetFetchFalse(nemegyet,id)
        document.getElementById("nemtetszik"+id).classList.remove("bi-hand-thumbs-down-fill"),
        document.getElementById("nemtetszik"+id).classList.add("bi-hand-thumbs-down")
            
        
    }
      
}

function nemertegyetFetchTrue(nemegyet,id)
{
    let bemenet = {
        "bevitel1": nemegyet+1,
        "bevitel2":id
    }
    fetch('http://localhost:3000/nemegyetert', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}
function nemertegyetFetchFalse(nemegyet,id)
{
    let bemenet = {
        "bevitel1": nemegyet,
        "bevitel2":id
    }
    fetch('http://localhost:3000/nemegyetert', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
}

function jelent(jelentes,id)
{
let className=document.getElementById("jel"+id).className

if(className=="bi bi-exclamation-square")
{
    jelentFetchTrue(jelentes,id)
    document.getElementById("jel"+id).classList.remove("bi-exclamation-square"),
    document.getElementById("jel"+id).classList.add("bi-exclamation-square-fill"),
    document.getElementById("nemtetszik"+id).classList.remove("bi-hand-thumbs-down-fill"),
    document.getElementById("nemtetszik"+id).classList.add("bi-hand-thumbs-down"),
    document.getElementById("like"+id).classList.remove("bi-hand-thumbs-up-fill"),
    document.getElementById("like"+id).classList.add("bi-hand-thumbs-up")
    
    
}
else{
    jelentFetchFalse(jelentes,id)
    document.getElementById("jel"+id).classList.remove("bi-exclamation-square-fill"),
    document.getElementById("jel"+id).classList.add("bi-exclamation-square")
    
}
}
function jelentFetchTrue(jelentes,id)
{
    let bemenet = {
        "bevitel1": jelentes+1,
        "bevitel2":id
    }
    fetch('http://localhost:3000/jelentes', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    
}
function jelentFetchFalse(jelentes,id)
{
    let bemenet = {
        "bevitel1": jelentes,
        "bevitel2":id
    }
    fetch('http://localhost:3000/jelentes', {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    
}

function kommenteles(){
    let id=sessionStorage.getItem('id')
    let komment=document.getElementById("hozzaszolas").value;
    if(komment){
        let bemenet = {
            "bevitel1": komment,
            "bevitel2":id
        }
        try{
            fetch('http://localhost:3000/kommentfel', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        )
        }
        catch(e){console.log(e)}
        finally{
            kommentlekeres()
            
        }
    }
    else{
   
        alert("Tul rovid a komment!")
    }
   
    
}
function kommenttorles(kommentid)
{
    let bemenet = {
        "bevitel1": kommentid
    }
    fetch('http://localhost:3000/kommenttorlese', {
        method: "DELETE",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    ).then(kommentlekeres())
    
}



const square = document.querySelector('.baloldalkep');
square.classList.remove('balkepanimacio');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            square.classList.add('balkepanimacio');
            return;
        }

        square.classList.remove('balkepanimacio');
    });
});
observer.observe(document.querySelector('.elso'));
//-----------------------------MÁSODIK----------------------------------
const square1 = document.querySelector('.jobboldalkep');
square.classList.remove('jobbkepanimacio');

const observer1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            square1.classList.add('jobbkepanimacio');
            return;
        }

        square1.classList.remove('jobbkepanimacio');
    });
});
observer1.observe(document.querySelector('.masodik'));
//---------------------------HARMADIK-------------------------------------
const square2 = document.querySelector('.baloldalkep1');
square.classList.remove('balkepanimacio');

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            square2.classList.add('balkepanimacio');
            return;
        }

        square2.classList.remove('balkepanimacio');
    });
});
observer2.observe(document.querySelector('.harmadik'));
//-----------------------------NEGYEDIK-----------------------------------
const square3 = document.querySelector('.jobboldalkep1');
square.classList.remove('jobbkepanimacio');

const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            square3.classList.add('jobbkepanimacio');
            return;
        }

        square3.classList.remove('jobbkepanimacio');
    });
});
observer3.observe(document.querySelector('.negyedik'));
//----------------------------ÖTÖDIK-------------------------------------
const square4 = document.querySelector('.baloldalkep2');
square.classList.remove('balkepanimacio');

const observer4 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            square4.classList.add('balkepanimacio');
            return;
        }

        square4.classList.remove('balkepanimacio');
    });
});
observer4.observe(document.querySelector('.otodik'));
//--------------------------------PROGRESSBAR---------------------------------------
window.onscroll = function () { myFunction() };

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}



logincheck()
getProfilId()
kommentlekeres()

