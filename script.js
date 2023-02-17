fetch("http://localhost:3000/felhasznalok")
    .then(x => x.json())
    .then(y => megjelenit(y))

function fetcheles() {
    fetch("http://localhost:3000/felhasznalok")
        .then(x => x.json())
        .then(y => megjelenit(y))
}

clicked = (e, id) => {


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
        sz += '<input type="submit" value="Törlés" onclick="clicked(event,' + item.felhasznalo_id + ')"/>'
        sz += '</td>'
        sz += '</tr>'
    })




    document.getElementById("tablazat").innerHTML = sz
}