function checklogin(){
    let felhasznalo=localStorage.getItem('felhasznalo')
    if(felhasznalo){
        window.location.href='../mainlog.html'
    }
}
function bejelentkezes() {

    window.location.href = 'login.html'
}
fetch("http://localhost:3000/getkomment")
    .then(x => x.json())
    .then(y => kommentek(y))

function kommentek(tomb) {
    let sz = "";
    console.log(tomb)
    tomb.map((item) => {
        sz += '<div class="row justify-content-center w-50" style="padding-top: 5rem;margin-left:auto;margin-right:auto;border-radius:15px">'
        sz +='  <div class="col-1"></div>    '
        sz += '<div class="col-2 d-flex justify-content-end  position-relative" >'
        sz += '<div style="background-color:red;width:80px;height:80px;border-radius:50px" class="bg-secondary"> <img src="Kepek/' + item.felhasznalo_kep_id + '.png"  style="width:80px;height:80px;border-radius: 50px;" alt="">  </div>'
        sz += '</div>'
        sz += '<div class="col-7 bg-secondary position-relative" style="border-radius: 5px;" >'
        sz+='<span  class="position-absolute bottom-100 " style="color:rgb(1,194,154);font-weight:600;">' + item.felhasznalo_nev + '</span>'
        sz += '<span  style="font-weight:400;font-size:16px;margin-top:10px">' + item.wm_szoveg + ' </span>'
        sz += '<span  class="position-absolute bottom-0 end-0"  style="color:rgb(1,194,154)">' + item.wm_datum + '</span>'
        sz += '</div>'
        sz += '<div class="col-1  "><div class="d-flex flex-row bd-highlight mb-3"> <div class="p-2 bd-highlight" ><i style="color: green;"  class="bi bi-hand-thumbs-up-fill"><br>' + item.wm_egyetertett + '</i></div ><div class="p-2 bd-highlight"><i style="color:red" class="bi bi-hand-thumbs-down-fill"><br>' + item.wm_nemertett_egyett + '</i></div><div class="p-2 bd-highlight"><i style="color:yellow" class="bi bi-exclamation-square-fill"><br>' + item.wm_jelentett + '</i></div></div ></div>'
        sz +='<div class="col-1"></div>'
        sz += '</div>'
    })
    document.getElementById("megjelenit").innerHTML = sz
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


//---------------------------Kommentek--------------------------

const square5 = document.querySelector('.kommentek');
square.classList.remove('kommentanim');

const observer5 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            square5.classList.add('kommentanim');
            return;
        }

        square5.classList.remove('kommentanim');
    });
});
observer5.observe(document.querySelector('.kommentek'));
//---------------------------KARTYAK-----------------
const square6 = document.querySelector('.kartyak');
square.classList.remove('kartyakanim');

const observer6 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            square6.classList.add('kartyakanim');
            return;
        }

        square6.classList.remove('kartyakanim');
    });
});
observer6.observe(document.querySelector('.kartyak'));

//---------------------------------------------------------
window.onscroll = function() {navbarbg()};
function navbarbg(){

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    let navbar=document.getElementById("nav")
    if(scrolled>0)
    {
        navbar.classList.remove("navvissza")
        navbar.classList.add("nav")
        
       
    }
    else{
        navbar.classList.remove("nav")
        navbar.classList.add("navvissza")
    }

}


checklogin()