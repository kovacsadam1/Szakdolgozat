const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/', (req, res, next) => {

    const sql = `
    SELECT * FROM allat
    JOIN fajta ON allat.allat_fajta = fajta.fajta_id`

    db.query(sql, (error, allatok, fields) => {
        if (error) throw error
        res.render('home', {
            title: 'Főoldal',
            allatok
        })
    })

})

router.get('/rendeles/:id', (req, res) => {

    const { id } = req.params

    const sql = `
    SELECT * FROM allat
    JOIN fajta ON allat.allat_fajta = fajta.fajta_id
    WHERE allat_id = ?`

    db.query(sql, [id], (error, allatok, fields) => {
        if (error) throw error
        res.render('allatRendeles', {
            title: 'Rendelés',
            id,
            allatok
        })
    })
})

router.post('/rendeles/:id', (req, res) => {

    const { id } = req.params
    const { email, telefonszam, zip, telepules, utca, hazszam } = req.body

    const sql = `
    INSERT INTO rendeles 
       (allat_id, 
        email, 
        telefonszam, 
        zip, 
        telepules, 
        utca, 
        hazszam)
    VALUES (?, ?, ?, ?, ?, ?, ?)`

    db.query(sql, [id, email, telefonszam, zip, telepules, utca, hazszam], (error, allatok, fields) => {
        if (error) throw error
        res.redirect('/')
    })
})


module.exports = router