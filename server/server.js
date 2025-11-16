const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000
const DATA_FILE = path.join(__dirname, 'leads.json')

app.post('/api/leads', (req, res) => {
  const lead = {
    id: Date.now(),
    name: req.body.name || '',
    phone: req.body.phone || '',
    city: req.body.city || '',
    service: req.body.service || '',
    source: req.body.source || 'landing',
    ts: new Date().toISOString()
  }
  // append to local JSON file (simple persistence)
  let arr = []
  try {
    if (fs.existsSync(DATA_FILE)) {
      arr = JSON.parse(fs.readFileSync(DATA_FILE))
    }
  } catch(e){
    console.error('read leads error', e)
  }
  arr.push(lead)
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2))
  } catch(e){
    console.error('write leads error', e)
  }
  console.log('New lead:', lead)
  res.status(200).json({ ok: true, lead })
})

app.use('/', express.static(path.join(__dirname, '..', 'dist')))
app.listen(PORT, ()=> console.log('Server running on port', PORT))
