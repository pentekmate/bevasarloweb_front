let tovabb = false
function Bejelentkezes() {

    let felh = document.getElementById("felh").value
    let jelsz = document.getElementById("jelsz").value
    console.log(jelsz)
    if (felh != "webAdmin") {
        alert("Nem megfelelő felhasználónév.")
    }
    else {

        var adatok = {
            bevitel1: felh,
            bevitel2: jelsz
        }


        fetch('http://localhost:3000/adminlogin', {
            method: "POST",
            body: JSON.stringify(adatok),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("asdssss", responseJson)
                if (responseJson == false) {
                    alert("Nem megfelelő adatok.")
                }
                else {
                    window.location.href = "index.html"
                }
            })
            .catch((error) => {
                console.error(error);
            })

    }
}
