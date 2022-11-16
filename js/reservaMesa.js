window.onload = loadData();


function saveTable(id) {
    try{
        idPrevious = sessionStorage.getItem("idTable");
        const BUTTON_ID_PREV = document.getElementById(idPrevious);
        BUTTON_ID_PREV.classList.remove("btn-danger")
        BUTTON_ID_PREV.removeAttribute("disabled");
        BUTTON_ID_PREV.classList.add("btn-success");
    }
    catch{
        // Do Nothing
    }
    idTable = id;
    sessionStorage.setItem("idTable", idTable);
    const BUTTON_ID = document.getElementById(idTable);
    BUTTON_ID.classList.remove("btn-success")
    BUTTON_ID.setAttribute("disabled","");
    BUTTON_ID.classList.add("btn-danger");
}

function loadData() {
    try{
        idTable = sessionStorage.getItem("idTable");
        const BUTTON_ID = document.getElementById(idTable);
        BUTTON_ID.classList.remove("btn-success")
        BUTTON_ID.setAttribute("disabled","");
        BUTTON_ID.classList.add("btn-danger");
    }
    catch{
        console.log("Do Nothing")
    }
}