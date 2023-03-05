let felhasznalo="";
function belepes(){
    felhasznalo=document.getElementById("belepesfelhasznalonev").value;
    let jelsz=document.getElementById("belepesjelszo").value;
    
    if(felhasznalo || jelsz){
        let bemenet={
            "bevitel1":felhasznalo,
            "bevitel2":jelsz
        }
        fetch('http://localhost:3000/login', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                
                if (responseJson == false) {
                    alert("Nem megfelelő adatok.")
                }
                else {
                  sessionStorage.setItem("felhasznalo",felhasznalo)
                  window.location.href = "mainlog.html"
                }
            }).then(getProfil())
            .catch((error) => {
                console.error(error);
            })
    }
    else{
        alert("Üresen hagyott mező.")
       

    }
    
}
