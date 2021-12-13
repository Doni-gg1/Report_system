let template = Handlebars.compile(`
<div style="color: #000080; font-weight: 550;" class="div">
<p>МИНИСТЕРСТВО ОБРАЗОВАНИЯ И НАУКИ КЫРГЫЗСКОЙ РЕСПУБЛИКИ</p>
<p>Кыргызский государственный технический университет им.И.Раззакова </p>
</div>
<div style="color: #000080; font-weight: 800; font-size: 18px" class="div1">
<p>Факультет информацинный технологий</p>
<p>Специальность:7104000 Программная инженерия</p>
</div>
<table align="right" cellpadding="5">
<tr bgcolor="#F5FFFA" style="color: #191970;">
  <th colspan="17">Учебный план 2020-21 года. Форма обучения -очная бакалавр</th>
  <th></th>
  <th></th>
  <th></th>
  <th></th>
</tr>
<tr bgcolor="#F5FFFA" style="color: #191970;">
  <th colspan="4">Дисциплина</th>
  <th>Тип предмета</th>
  <th>Экз/зач</th>
  <th>Кафедра</th>
  <th>Контр. работа</th>
  <th>Всегоауд.</th>
  <th>Лк.</th>
  <th>Лб.</th>
  <th>Пр.</th>
  <th>Сем.</th>
  <th>СРС</th>
  <th>СРСП</th>
  <th>Интер. часы</th>
  <th>РЗР</th>
  <th>нд/з</th>
  <th>Всего</th>
  <th>Кред</th>
  <th>Кол недель</th>
</tr>
{{#each this}}
  <tr style="color: #191970;">
    <th colspan="8">{{@key}}</th>
    <th>704</th>
    <th>80</th>
    <th>272</th>
    <th>352</th>
    <th>0</th>
    <th>446</th>
    <th>0</th>
    <th>0</th>
    <th>0</th>
    <th>0</th>
    <th>1150</th>
    <th>33</th>
    <th>0</th>
  </tr>
  {{#each this}}

    <tr>
      <td style="color: #5708A7;">{{descGroupNum}}</td>
      <td style="color: #2F4F4F;">{{s_component}}</td>
      <td style="color: #006400;">{{s_kind}}</td>
      <td style="color: #5708A7;">{{p34}}</td>
      <td style="color: #5708A7;">{{v2}}</td>
      <td class='exams_{{id_semester}}' style="color: #171769;">{{p30}}</td>
      <td>{{f1}}</td>
      <td>{{p45}}</td>
      <td>{{p54}}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{{seminar}}</td>
      <td>{{srs}}</td>
      <td></td>
      <td></td>
      <td>{{rzr}}</td>
      <td></td>
      <td>0</td>
      <td>0</td>
      <td>{{colnedel}}</td>
    </tr>
  {{/each}}
    {{log view}}
  <tr bgcolor="#F0F8FF">
      <td  colspan="3"></td>
      <td>Количество зачетов</td>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr> <tr bgcolor="#F0F8FF">
      <td  colspan="3"></td>
      <td>Количество экзамен</td>
      <th></th>
      <th class="total_exam"></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr> <tr bgcolor="#F8F8FF">
      <td  colspan="3"></td>
      <td>Недельная нагрузка</td>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
{{/each}}
</table>
`);
let root = document.querySelector('#root');
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
    
    compileToHbs(data_of_table)
    let elems = document.getElementsByClassName('total_exam');
    console.log(elems)
    for (let i in ready_array) {
            console.log(elems);
            elems[i].innerHTML = ready_array[i];
        }

    
    }


    function compileToHbs(data){
        console.log(data);
        let filled = template(data);
        console.log(filled);
        // return;
        root.innerHTML = filled;
    }
    getElems();