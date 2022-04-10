const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/fajtak', (req, res, next) => {

    const sqlAllatok = `
    SELECT * FROM allat
    JOIN fajta ON allat.allat_fajta = fajta.fajta_id`


    const sqlFajtak = `
    SELECT * FROM fajta`

    db.query(sqlFajtak, (error, fajtak, fields) => {
        if (error) throw error
        
        db.query(sqlAllatok, (error, allatok, fields) => {
            if (error) throw error
            res.render('fajtak', {
                title: 'Fajták szerint',
                allatok,
                fajtak
            })
        })
    })
    

})

router.post('/fajtak', (req, res, next) => {

    const { allat_fajta } = req.body

    const sqlFajtak = `
    SELECT * FROM fajta`

    const sqlAllatok = `
    SELECT * FROM allat
    JOIN fajta ON allat.allat_fajta = fajta.fajta_id
    WHERE fajta.fajta_id = ?`

    db.query(sqlFajtak, (error, fajtak, fields) => {
        if (error) throw error

        db.query(sqlAllatok, [allat_fajta], (error, allatok, fields) => {
            if (error) throw error
            res.render('fajtak', {
                title: allatok[0].fajta_nev,
                allatok,
                fajtak
            })
        })
    })


})

module.exports = router