const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/feltoltes', (req, res, next) => {

    const sql = `
    SELECT * FROM fajta`

    db.query(sql, (error, fajtak, fields) => {
        if (error) throw error
        res.render('feltoltes', {
            title: 'Feltöltés',
            fajtak
        })
    })

})


router.post('/feltoltes', async (req, res) => {

    const { 
        allat_fajta, 
        allat_nev, 
        ar, 
        suly, 
        eletkor, 
        neme, 
        oltottsag, 
        torzskonyv, 
        ivartalanitott, 
        fajtatiszta } = req.body

    const kep = req.files.kep
    const uploadPath = `./public/img/${Date.now()}-${kep.name}`

    await kep.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err)
    })

    const sql = `
    INSERT INTO allat
       (allat_fajta, 
        allat_nev, 
        ar, 
        suly, 
        eletkor, 
        neme, 
        oltottsag, 
        torzskonyv, 
        ivartalanitott, 
        fajtatiszta,
        kep)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    db.query(sql, 
       [allat_fajta, 
        allat_nev, 
        ar, 
        suly, 
        eletkor, 
        neme == 'on' ? 1 : 0, 
        oltottsag == 'on' ? 1 : 0, 
        torzskonyv == 'on' ? 1 : 0, 
        ivartalanitott == 'on' ? 1 : 0, 
        fajtatiszta == 'on' ? 1 : 0,
        uploadPath.split('/')[3]],
        (error, allatok, fields) => {
        if (error) throw error
        res.redirect('/')
    })
})


module.exports = router