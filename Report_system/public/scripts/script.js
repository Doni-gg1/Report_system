// let root = document.querySelector('#root');
// let year = document.querySelector(".year");
// let faculty = document.querySelector(".faculty");
// let educForm = document.querySelector(".educForm");
// let speciality = document.querySelector(".speciality");
let arr;
let btn = document.querySelector(".btn");
let url = "http://localhost:3000";
let obj = {
    year: null,
    faculty: null,
    educForm: null
}

async function getElems() {
    await fetch(`${url}/getData`)
        .then((response) => response.json())
        .then((data) => (arr = data));
        
        let r = ``;
        console.log();
        arr.forEach((element) => {
        r += `
        <option value="${element.id_a_year}" class="options">${element.p32}</option>
        `;
    });
    
    document.querySelector('.year').innerHTML = `<option class selected value="false">0 ---</option> ${r}`;
    showItem();
}

function showItem() {
    // let options = document.querySelectorAll(".options");
    document.querySelector('.year').onchange = function () {
        if (this.value === 'false') {
            document.querySelector('#root').innerHTML = ''
            let a = document.querySelectorAll('.ar')
            a.forEach(item => {
                item.selected = false
            })
            return
            
        } else {
            document.querySelector('.faculty').hidden = true;
            document.querySelector('.educForm').hidden = true;
            document.querySelector('.speciality').hidden = true;
            document.querySelector('#root').innerHTML = "";
            obj.year = this.value
            fetch(`${url}/getfaculty?year=${this.value}`)
            .then((response) => response.json())
            .then((data) => {
                    document.querySelector('.faculty').hidden = false;
                    getFaculty(data);
                });

        }
    };
}

function getFaculty(data) {
    let r = ``;
    data.forEach((element) => {
        r += `
        <option value="${element.id_faculty}" class="ar options_faculty">${element.p23_1}</option>
        `;

    });

    document.querySelector('.faculty').innerHTML = `<option selected value="false">---</option> ${r}`;
    showEducForm()
}

function showEducForm() {
    // let options = document.querySelectorAll('.options_faculty');
    
    document.querySelector('.faculty').onchange = async function () {
        if (this.value === 'false') {
            document.querySelector('#root').innerHTML = ''
            let a = document.querySelectorAll('.b')
            a.forEach(item => {
                item.selected = false
            })
            return
        } else {
            document.querySelector('.educForm').hidden = true;
            document.querySelector('.speciality').hidden = true;
            document.querySelector('#root').innerHTML = "";
            obj.faculty = this.value
            await fetch(`${url}/getEducForm?year=${obj.year}&faculty=${this.value}`)
                .then((response) => response.json())
                .then((data) => {
                    document.querySelector('.educForm').hidden = false;
                    getEducForm(data)
                });
            }
    }
    
}

function getEducForm(data) {
    let r = ``;
    data.forEach((element) => {
        r += `
                <option value="${element.id_f_educ}" class=" ar b options_educForms">${element.p108}</option>
                `;
                
    });
    document.querySelector('.educForm').innerHTML = `<option selected value="false">---</option> ${r}`
    showSpecialities()
}

function showSpecialities() {
    // let options = document.querySelectorAll('.options_educForms');
    document.querySelector('.educForm').onchange = async function () {
        
        if (this.value === 'false') {
            document.querySelector('#root').innerHTML = ''
            let a = document.querySelectorAll('.c')
            a.forEach(item => {
                item.selected = false
            })
            return
        } else {
            document.querySelector('.speciality').hidden = true;
            document.querySelector('#root').innerHTML = "";
            await fetch(
                `${url}/getSpeciality?year=${obj.year}&faculty=${obj.faculty}&educForm=${this.value}`)
                .then(response => response.json())
                .then(data => {
                    getSpeciality(data);
                    document.querySelector('.speciality').hidden = false;
                });
            }
        }
}

function getSpeciality(data) {
    let r = ``;
    data.forEach((element) => {
        r += `
        <option value="${element.id_speciality}" class="ar b c options_special">${element.p25_2_fe_kaf}</option>
        `;

    });
    document.querySelector('.speciality').innerHTML = `<option selected value="false">---</option> ${r}`
    getTable()
}

function getTable() {
    document.querySelector('.speciality').onchange = async function () {
        if (this.value === 'false') {
            document.querySelector('#root').innerHTML = ''
            return
        } else {
            await fetch(`${url}/getTable?year=${obj.year}&speciality=${this.value}`)
            .then(response => response.json())
            .then(data => showTables(data));
        }
    }
}


function showTables(data_of_table) {
    let total = [],
        total_zachet = [],
        arr = [],
        arr2 = [],
        ready_array = [],
        ready_zachet = [];
    for (let i in data_of_table) {
        for (let k of data_of_table[i]) {
            if (k.id_examination === 1) {
                arr.push(k)
            } else if (k.id_examination === 2) {
                arr2.push(k)
            }
        }
    }
    
    total_zachet = arr2.reduce((acc, el) => {
        acc[el.id_semester] = (acc[el.id_semester] || 0) + 1;
        return acc;
    }, {})

    for (let i = 0; i < 10; i++) {
        ready_zachet[i] = total_zachet[i] || null;
    }

    total = arr.reduce((acc, el) => {
        acc[el.id_semester] = (acc[el.id_semester] || 0) + 1;
        return acc;
    }, {})


    for (let i in total) {
        ready_array.push(total[i])
    }
    
    let template = Handlebars.compile(document.querySelector('#template').innerHTML);

    let filled = template(data_of_table);
    document.querySelector('#root').innerHTML = filled;

    // console.log(data_of_table);
    // let elems = document.getElementsByClassName('total_exam');
    // console.log(elems)
    // for (let i in ready_array) {
        //     console.log(elems);
        //     elems[i].innerHTML = ready_array[i];
        // }
    
    }
    getElems();