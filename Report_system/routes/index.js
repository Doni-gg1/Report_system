var express = require('express');
var router = express.Router();
const { poolPromise } = require("./DB");
const handleBars = require('hbs')
var sql = require('mssql');
const helpers = require('handlebars-helpers');
const math = helpers.math();
console.log(handleBars.registerHelper)

handleBars.registerHelper('add', math.add);
handleBars.registerHelper('log', math.log);



router.get('/getData', async function (req, res) {
  const pool = await poolPromise;
  console.log(req.query)


  let faculties = await pool
    .query(`
  SELECT dbo.faculty.id_faculty, dbo.faculty.[p23-1]
  FROM dbo.com_sfe INNER JOIN
                        dbo.educ_sh ON dbo.com_sfe.id_speciality = dbo.educ_sh.id_speciality INNER JOIN
                        dbo.faculty ON dbo.com_sfe.id_faculty = dbo.faculty.id_faculty
  GROUP BY dbo.faculty.id_faculty, dbo.faculty.[p23-1], dbo.educ_sh.id_a_year
  HAVING (dbo.educ_sh.id_a_year = ${req.query.year})
  `)
  console.log(faculties.recordsets)
  res.render('index', { faculties, faculties_status: true })



  //   let r = await pool
  //     .query(
  //       `
  //       SELECT     a_year.id_a_year, com_sfe.id_speciality, educ_sh.id_semester, special.[p25-2], semester.p43, rate.p22, examination.p30, discipline.p34, a_year.p32, educ_sh.p51, 
  //       educ_sh.p52, educ_sh.p53, control.p45, educ_sh.p54, kafedra.f1, educ_sh.srs, educ_sh.rzr, educ_sh.ind_z, educ_sh.seminar, faculty.[p23-2], vuz.v2, ministerstvo.mo,
  //        f_educ.p108, component.s_component, kinds.s_kind, educ_sh.Krdt, educ_sh.descGroupNum, educ_sh.isSelect, 
  //       CASE WHEN educ_sh.isSelect = 1 THEN UPPER(educ_sh.descGroupNum) + '-' + UPPER(educ_sh.isSelect) ELSE UPPER(educ_sh.id_discipline) 
  //       + '-' + UPPER(educ_sh.id_examination) + '-' + UPPER(educ_sh.isSelect) END AS numDisc, 1 AS count_d, CASE WHEN delit IS NULL THEN 1 ELSE delit END AS delit, 
  //       examination.id_examination, educ_sh.colnedel, com_sfe.code_spec, educ_sh.interactive, educ_sh.srsp
  // FROM         faculty INNER JOIN
  //       special INNER JOIN
  //       com_sfe ON special.id_special = com_sfe.id_special INNER JOIN
  //       f_educ ON com_sfe.id_f_educ = f_educ.id_f_educ ON faculty.id_faculty = com_sfe.id_faculty INNER JOIN
  //       vuz ON faculty.id_vuz = vuz.id_vuz INNER JOIN
  //       ministerstvo ON vuz.id_ministerstvo = ministerstvo.id_ministerstvo INNER JOIN
  //       kafedra INNER JOIN
  //       educ_sh INNER JOIN
  //       examination ON educ_sh.id_examination = examination.id_examination INNER JOIN
  //       a_year ON educ_sh.id_a_year = a_year.id_a_year INNER JOIN
  //       semester ON educ_sh.id_semester = semester.id_semester INNER JOIN
  //       rate ON semester.id_rate = rate.id_rate INNER JOIN
  //       discipline ON educ_sh.id_discipline = discipline.id_discipline INNER JOIN
  //       control ON educ_sh.id_control = control.id_control ON kafedra.id_kafedra = educ_sh.id_kafedra ON com_sfe.id_speciality = educ_sh.id_speciality LEFT OUTER JOIN
  //           (SELECT     id_speciality, id_a_year, id_semester, id_examination, isSelect, descGroupNum, COUNT(id_discipline) AS delit
  //             FROM          educ_sh AS educ_sh_1
  //             GROUP BY id_speciality, id_a_year, id_semester, id_examination, descGroupNum, isSelect
  //             HAVING      (isSelect = 1)) AS t_a ON educ_sh.descGroupNum = t_a.descGroupNum AND educ_sh.isSelect = t_a.isSelect AND 
  //       educ_sh.id_examination = t_a.id_examination AND educ_sh.id_semester = t_a.id_semester AND educ_sh.id_a_year = t_a.id_a_year AND 
  //       educ_sh.id_speciality = t_a.id_speciality LEFT OUTER JOIN
  //       component ON educ_sh.id_component = component.id_component LEFT OUTER JOIN
  //       kinds ON educ_sh.id_kind = kinds.id_kind
  // WHERE     (a_year.id_a_year = ${req.query.year}) AND (com_sfe.id_speciality = ${req.query.faculty});
  //       `
  //     );
  //     let resultA = r.recordsets[0].reduce(function (rv, a) {
  //       rv[a.p43] = rv[a.p43] || []
  //       rv[a.p43].push(a)
  //       return rv
  //     }, Object.create(null));
  //     const OBJA = JSON.parse(JSON.stringify(resultA))

  //     let total = [];
  //     if(Object.keys(OBJA).length){
  //       for(let i in OBJA){
  //         for(let k in OBJA[i]){
  //           total.push(OBJA[i].length)
  //         }
  //         console.log(total);
  //       }
  //       res.render('data_Page', {data: OBJA, found: true, total: total});
  //       // res.send(OBJA)
  //     }else{
  //       console.log("Error 404");
  //       res.render('data_Page', {found: false})
  //     }
});

let years;
router.get('/select_years', async function (req, res, next) {
  const pool = await poolPromise;
  years = await pool
    .query(`
    SELECT id_a_year, p32
    FROM dbo.a_year
    WHERE (id_a_year > 19 AND id_a_year < 24)
  `)
  res.render('index', { years })
});

router.get('/select_faculty', async function (req, res, next) {
  const pool = await poolPromise;
  let faculties = await pool
    .query(`
  SELECT dbo.faculty.id_faculty, dbo.faculty.[p23-1]
  FROM dbo.com_sfe INNER JOIN
                        dbo.educ_sh ON dbo.com_sfe.id_speciality = dbo.educ_sh.id_speciality INNER JOIN
                        dbo.faculty ON dbo.com_sfe.id_faculty = dbo.faculty.id_faculty
  GROUP BY dbo.faculty.id_faculty, dbo.faculty.[p23-1], dbo.educ_sh.id_a_year
  HAVING (dbo.educ_sh.id_a_year = ${req.query.year})
  `)
  res.render('select_faculty', { faculties, year: req.query.year, years })
});


module.exports = router;


