const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/admin', (req, res, next) => {

    const sql = `
    SELECT * FROM allat
    JOIN fajta ON allat.allat_fajta = fajta.fajta_id
    ORDER BY allat_id`

    db.query(sql, (error, allatok, fields) => {
        if (error) throw error
        res.render('admin', {
            title: 'Admin',
            allatok
        })
    })

})

router.post('/admin/fajta', async (req, res) => {

    const { fajta_nev } = req.body

    const sql = `
    INSERT INTO fajta (fajta_nev)
    VALUES (?)`

    db.query(sql, [fajta_nev], (error, results, fields) => {
        if (error) throw error
        res.redirect('/admin')
    })
})

router.post('/admin/torles/:id', async (req, res) => {

    const { id } = req.params

    const sql = `
    DELETE FROM allat
    WHERE allat_id = ?`

    db.query(sql, [id], (error, results, fields) => {
        if (error) throw error
        res.redirect('/admin')
    })
})


module.exports = router