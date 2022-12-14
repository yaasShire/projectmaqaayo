const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(cors())
const multer= require('multer')
const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '../FRONTEND/src/IMAGES')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage:fileStorage})


const {createConnection} = require('mysql') 
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json())

app.use(bodyparser.json())
const Pool = require('pg').Pool
const conn  = new Pool({
    user:'postgres',
    password:'123',
    database:'maqaaxi',
    host:'localhost',
    port:5432

})

// const conn = createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'maqaaxi'
// })
// conn.connect(err=>{
//     if(err) throw err
//     console.log('database connected.')
// })

app.post('/api/v1/dir/product', upload.single('sawir'), (req, res)=>{
    const data = req.body
    console.log(req.file)
    const sql = `INSERT INTO products(magac, price, quantity, description, image) VALUES('${data.magac}', '${data.qiimahaSheygiiba}', '${data.tirada}', '${data.faahfaahin}', '${req.file.filename}');`
    conn.query(sql, (err)=>{
        if(err) throw err
        
        res.send('<h1>XOGTA WAA LA KEYDIYAY</h1>')
     })
})
app.get('/api/v1/get/products', (req, res)=>{
    const sql = 'SELECT * FROM products;'
    conn.query(sql, (err, result)=>{
        if(err) throw err
         res.json(result.rows)
    })
})
app.post('/api/v1/customer/registration', (req, res)=>{
    const data = req.body
    console.log(data)
    const sql = `INSERT INTO customers(magac, ciwaan, telephone, email, password) VALUES('${data.magac}', '${data.ciwaan}', '${data.telephone}', '${data.email}', '${data.password}');`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.json({status:true})
    })
})
app.get('/api/v1/get/users', (req, res)=>{
    const sql = 'SELECT * FROM customers;'
    conn.query(sql, (err, result, field)=>{
        if(err) throw err
        res.json(result.rows)
    })
})
app.post('/api/v1/add/to/cart', (req, res)=>{
    const data = req.body
    const sql = `INSERT INTO cart(magaca, price, image, email) VALUES('${data.magac}', ${data.price}, '${data.sawir}', '${data.email}');`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.send('waa la keydiyay')
    })
})
app.get('/api/v1/get/cart/items', (req, res)=>{
    const sql = 'SELECT * FROM cart ;'
    conn.query(sql, (err, result, field)=>{
        if(err) throw err
        res.json(result.rows)
    })
})
app.put('/api/v1/update/cart/quantity', (req, res)=>{
    const data = req.body
    const sql = `UPDATE cart set quantity = ${data.quantity} WHERE magaca = '${data.magaca}';`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})
app.patch('/api/v1/remove/cart/item', (req, res)=>{
    const data = req.body
    const sql = `DELETE FROM cart WHERE id = ${data.id};`
    conn.query(sql, (err)=>{
        if(err) throw err
    })
})
app.get('/api/v1/get/total', (req, res)=>{
    const sql = 'SELECT *   FROM cart;'
    conn.query(sql, (err, result, field)=>{
        if(err) throw err 
        res.json(result.rows)
    })
})
app.post('/api/v1/xogta/dalbadaha/rasmiga', (req, res)=>{
    const data = req.body
    const sql = `INSERT INTO cusOrdered(magac, ciwaan, telephone) VALUES('${data.magac}', '${data.ciwaan}', '${data.telephone}')`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.json({status:true})
    })
})
app.post('/api/v1/dir/dalabyada', (req, res)=>{
    const data = req.body
    console.log(data)
    const sql = `INSERT INTO orders(magac, quantity, price, email, cusName, image) VALUES('${data.magaca}', ${data.quantity}, ${data.price}, '${data.email}', '${data.cusName}', '${data.image}');`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.json({status:true})
    })
    
})
app.get('/api/v1/get/cus/orders', (req, res)=>{
    const sql = 'SELECT * FROM cusOrdered;'
    conn.query(sql, (err, result, field)=>{
        if(err) throw err
        res.json(result.rows)
    })
})
app.get('/api/v1/get/received/orders', (req, res)=>{
    const sql = 'SELECT * FROM orders;'
    conn.query(sql, (err, result, field)=>{
        if(err) throw err
        console.log(result)
        res.json(result.rows)
    })
})
app.patch('/api/v1/delete/cus/order', (req, res)=>{
    const data = req.body
    const sql = `DELETE FROM cusOrdered WHERE id = ${data.id};`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.json({status:true})
    })
})
app.post('/api/v1/dir/fuliyay/customers', (req, res)=>{
    const data = req.body
    const sql = `INSERT INTO fulfilledcus(magac, telepphone) VALUES('${data.magac}', '${data.telephone}');`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.json({status:true})
    })
})
app.get('/api/v1/get/cus/fulfilled', (req, res)=>{
    const sql = 'SELECT * FROM fulfilledcus;'
    conn.query(sql, (err, result, field)=>{
        if(err) throw err
        res.json(result.rows)
    })
})
app.patch('/api/v1/delete/cus/fulfilled/order', (req, res)=>{
    const data = req.body
    const sql = `DELETE FROM fulfilledcus WHERE id = ${data.id};`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.json({status:true})
    })
})
app.patch('/api/v1/delete/fulfilled/orders', (req, res)=>{
    const data = req.body
    const sql = `DELETE FROM cusOrdered WHERE id = ${data.id};`
    conn.query(sql, (err)=>{
        if(err) throw err
        res.json({status:"waa la tirtiray"})
    })
})
const port  = process.env.PORT || 2000
app.listen(port, ()=>console.log(`connected to the port ${port}`))