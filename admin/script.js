fetch("http://localhost:3000/felhasznalok")
    .then(x => x.json())
    .then(y => megjelenit(y))

function fetcheles() {
    fetch("http://localhost:3000/felhasznalok")
        .then(x => x.json())
        .then(y => megjelenit(y))
}
function fetcheles1() {
    fetch("http://localhost:3000/osszesfelhasznalo")
        .then(x => x.json())
        .then(y => listakmegjelenit(y))
}

fetch("http://localhost:3000/osszesfelhasznalo")
    .then(x => x.json())
    .then(y => listakmegjelenit(y))

felhasznalotörlese = (e, id) => {
    if (!confirm('Biztosan törölni akarod?')) {
        e.preventDefault();
    }
    else {
        var adatok = {
            bevitel5: id
        }
        try {
            fetch("http://localhost:3000/felhasznalotorles", {
                method: 'DELETE',
                body: JSON.stringify(adatok),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(fetcheles)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            alert("Sikeres törlés!")
        }
    }
}

function megjelenit(tomb) {
    let sz = ""
    console.log(tomb)
    tomb.map((item) => {
        sz += '<tr>'
        sz += '<td>'
        sz += item.felhasznalo_id
        sz += '</td>'
        sz += '<td>'
        sz += item.felhasznalo_nev
        sz += '</td>'
        sz += '<td>'
        sz += item.felhasznalo_regisztrdatum
        sz += '</td>'
        sz += '<td>'
        sz += '<input type="submit" value="Törlés" onclick="felhasznalotörlese(event,' + item.felhasznalo_id + ')"/>'
        sz += '</td>'
        sz += '</tr>'
    })

    var osszesfelhasznalo = tomb.length;
    document.getElementById("osszesfelhasznalo").innerHTML = osszesfelhasznalo
    document.getElementById("tablazat").innerHTML = sz

}
listaktörlese = (e, id) => {

    if (!confirm('Biztosan törölni akarod?')) {
        e.preventDefault();
    }
    else {

        var adatok = {
            bevitel5: id
        }
        try {
            fetch("http://localhost:3000/listatorles", {
                method: 'DELETE',
                body: JSON.stringify(adatok),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(fetcheles1)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            alert("Sikeres törlés!")
        }
    }
}


function listakmegjelenit(tomb) {
    let sz = ""
    console.log(tomb)
    tomb.map((item) => {
        sz += '<tr>'
        sz += '<td>'
        sz += item.felhasznalo_nev
        sz += '</td>'
        sz += '<td>'
        sz += item.listak_nev
        sz += '</td>'
        sz += '<td>'
        sz += '<input type="submit" value="Törlés" onclick="listaktörlese(event,' + item.listak_id + ')"/>'
        sz += '</td>'
        sz += '</tr>'
    })

    document.getElementById("osszeslista").innerHTML = tomb.length

    document.getElementById("tablazat2").innerHTML = sz

}
function kommenttorles(e,id){
    if (!confirm('Biztosan törölni akarod?')) {
        e.preventDefault();
    }
    else {
        var adatok = {
            bevitel1: id
        }
        try {
            fetch("http://localhost:3000/kommenttorlese", {
                method: 'DELETE',
                body: JSON.stringify(adatok),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(kommentfetch)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            alert("Sikeres törlés!")
        }
    }
}
function kommentfetch()
{

    fetch("http://localhost:3000/jelentettkomment")
    .then(x => x.json())
    .then(y => kommentek(y))
}


function kommentek(tomb) {
    let sz = "";
    console.log("a",tomb)
    if(tomb.length>0){
        tomb.map((item) => {
        
            sz += '<tr>'
            sz += '<td>'
            sz += item.felhasznalo_nev
            sz += '</td>'
            sz += '<td>'
            sz += item.wm_szoveg
            sz += '</td>'
            sz += '<td>'
            sz += '<button type="button "onclick="kommenttorles(event,' + item.id + ')" style="color:white"  class="btn bg-danger">Törlés</button>'
            sz += '</td>'
            sz += '</tr>'
        })
    }

    else{
        sz='<td colspan="4" style="text-align:center;font-weight:bold;font-size:22px" >Nincs jelentett komment</td>'
    }




  
    document.getElementById("tablazat3").innerHTML = sz
}


kommentfetch()