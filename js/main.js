let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catogery = document.getElementById("catogery");
let submit = document.getElementById("submit");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let mood = "create";
let tmp;

//function get total ....

function Gettotle() {
    if (price.value != "") {
        let results = +price.value + +taxes.value + +ads.value + +ads.value - +discount.value;
        total.innerHTML = results;
        total.style.backgroundColor = "#040";
    } else {
        total.style.backgroundColor = "#dc143c";
    }
}

//function Create Product ....
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

submit.onclick = function() {
    let onePro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catogery: catogery.value.toLowerCase(),
    };
    //count ....
    if (title.value != '' && price.value != '' && catogery.value != '' && onePro.count <= 100) {
        if (mood === "create") {
            if (onePro.count > 1) {
                for (let i = 0; i < onePro.count; i++) {
                    dataPro.push(onePro);
                }
            } else {
                dataPro.push(onePro);
            }
        } else {
            dataPro[tmp] = onePro;
            submit.innerHTML = "Create";
            mood = "create";
            count.style.display = "block";
        }

        clearData();
    }


    localStorage.setItem("product", JSON.stringify(dataPro));

    showData();
};

//Clear Function ....
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    catogery.value = "";
}

//showData ....
function showData() {
    Gettotle();
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catogery}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;

    let deleteAll = document.getElementById("deleteAll");

    if (dataPro.length > 0) {
        deleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    } else {
        deleteAll.innerHTML = "";
    }
}
showData();

//deleteData ....
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

//deleteAll ....
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//updateData ....
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    Gettotle();
    count.style.display = "none";
    catogery.value = dataPro[i].catogery;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
}

//getSearchMood
let searchMood = "title";
let search = document.getElementById("search");

function getSearchMood(id) {
    if (id == "searchTitle") {
        searchMood = "title";
    } else {
        searchMood = "catogery";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catogery}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        } else {
            if (dataPro[i].catogery.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catogery}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}