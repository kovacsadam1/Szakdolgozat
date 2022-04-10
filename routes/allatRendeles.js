const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/feltoltes', (req, res, next) => {

    const sql = `
    SELECT * FROM fajta`

    db.query(sql, (error, fajtak, fields) => {
        if (error) throw error
        res.render('feltoltes', {
            title: 'Állat feltöltés',
            fajtak
        })
    })

})


router.post('/rendeles', (req, res) => {

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