
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
        sz += ' <div class="row justify-content-center" style="padding-top: 5rem;">'
        sz += '<div class="col-2 bg-dark  position-relative" >'
        sz += '<div style="background-color:red;width:80px;height:80px;border-radius:50px" class="bg-secondary"> <img src="Kepek/' + item.felhasznalo_kep_id + '.png"  style="width:80px;height:80px;border-radius: 50px;" alt=""> <span  class="position-absolute bottom-80 start-50" style="color:rgb(1,194,154);font-weight:600;">' + item.felhasznalo_nev + '</span> </div>'
        sz += ''
        sz += '</div>'
        sz += '<div class="col-4 bg-secondary min-vh-20 position-relative" style="border-radius: 5px;">'
        sz += '<p  style="font-weight:400;font-size:16px">' + item.wm_szoveg + ' </p>'
        sz += '<span  class="position-absolute bottom-0 end-0"  style="color:rgb(1,194,154)">' + item.wm_datum + '</span>'
        sz += '</div>'
        sz += '<div class="col-2 bg-dark "><div class="d-flex flex-row bd-highlight mb-3"> <div class="p-2 bd-highlight" ><i style="color: green;"  class="bi bi-hand-thumbs-up-fill"><br>' + item.wm_egyetertett + '</i></div ><div class="p-2 bd-highlight"><i style="color:red" class="bi bi-hand-thumbs-down-fill"><br>' + item.wm_nemertett_egyett + '</i></div><div class="p-2 bd-highlight"><i style="color:yellow" class="bi bi-exclamation-square-fill"><br>' + item.wm_jelentett + '</i></div></div ></div>'
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