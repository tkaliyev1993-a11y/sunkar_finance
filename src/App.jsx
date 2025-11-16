import React, { useState } from 'react'

export default function App(){ 
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [city,setCity] = useState('Астана')
  const [service,setService] = useState('Кредиты без залога')
  const [sending,setSending] = useState(false)
  const [msg,setMsg] = useState(null)

  const services = [ 'Кредиты без залога', 'Кредиты под залог', 'Ипотечное сопровождение', 'Кредиты для ИП и ТОО', 'Автокредитование' ]

  function validate(){ 
    if(!name.trim()) return 'Введите имя'
    if(!phone.trim()) return 'Введите телефон'
    const digits = phone.replace(/\D/g,'')
    if(digits.length < 9) return 'Проверьте номер телефона'
    return null
  }

  async function handleSubmit(e){ 
    e.preventDefault()
    const err = validate()
    if(err){ setMsg({type:'error', text:err}); return }
    setSending(true); setMsg(null)

    // Use the user's WhatsApp number provided: +7 705 260 6667 -> 77052606667
    const waNumber = '77052606667'
    const waText = encodeURIComponent(`Здравствуйте! Меня зовут ${name}. Я из города ${city}. Интересует: ${service}. Телефон: ${phone}`)
    const waUrl = `https://wa.me/${waNumber}?text=${waText}`
    window.open(waUrl, '_blank')

    try{
      const resp = await fetch((import.meta.env.VITE_API_URL || '') + '/api/leads',{
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ name, phone, city, service, source: 'landing' })
      })
      if(!resp.ok) throw new Error('server error')
      setMsg({type:'success', text:'Заявка отправлена! Менеджер свяжется с вами.'})
      setName(''); setPhone(''); setService(services[0]); setCity('Астана')
    }catch(err){
      console.error(err)
      setMsg({type:'warning', text:'Заявка открыта в WhatsApp. Сервер временно недоступен.'})
    }finally{ setSending(false) }

  }

  return (
    <div className="page">
      <header className="hero">
        <img src="/assets/logo-dark.png" alt="Sunkar Finance logo" className="logo-hero" />
        <h1>Помогаем получить кредит — быстро и честно</h1>
        <p className="lead">Астана, Абая 18 • WhatsApp: +7 705 260 6667</p>
      </header>

      <main className="container">
        <div className="card">
          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="row two">
              <label>
                Имя
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ваше имя" />
              </label>
              <label>
                Телефон
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="7 707 123 45 67" />
              </label>
            </div>

            <div className="row two">
              <label>
                Город
                <input value={city} onChange={e=>setCity(e.target.value)} />
              </label>
              <label>
                Услуга
                <select value={service} onChange={e=>setService(e.target.value)}>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
            </div>

            <button className="btn" type="submit" disabled={sending}>{sending ? 'Отправка...' : 'Отправить заявку'}</button>

            {msg && <div className={`msg ${msg.type}`}>{msg.text}</div>}
          </form>

          <div style={{marginTop:16}}>
            <h3>Наши услуги</h3>
            <div className="services">
              {services.map(s => <div className="service-item" key={s}>{s}</div>)}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <img src="/assets/logo-light.png" alt="Sunkar Finance logo" className="logo-footer" />
        <div className="footer-info">Астана, Абая 18 • WhatsApp: +7 705 260 6667</div>
      </footer>
    </div>
  )
}
