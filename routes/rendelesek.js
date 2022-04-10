const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/rendelesek', (req, res, next) => {

    const sql = `
    SELECT * FROM rendeles
    JOIN allat ON rendeles.allat_id = allat.allat_id
    JOIN fajta ON allat.allat_fajta = fajta.fajta_id
    ORDER BY rendeles_id`

    db.query(sql, (error, rendelesek, fields) => {
        if (error) throw error
        res.render('rendelesek', {
            title: 'Rendelések',
            rendelesek
        })
    })

})

router.post('/rendelesek/:id', async (req, res) => {

    const { id } = req.params

    const sql = `
    DELETE FROM rendeles
    WHERE rendeles_id = ?`

    db.query(sql, [id], (error, results, fields) => {
        if (error) throw error
        res.redirect('/rendelesek')
    })
})


module.exports = router