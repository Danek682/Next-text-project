"use client"
import './form.css'
import {useState,useRef} from 'react'
import Turnstile from "react-turnstile";
export default function Form () {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [subject,setSuject] = useState("");
    const [message, setMessage] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const [token, setToken] = useState("") //токен капчи
    const [displayNone,setDisplayNone] = useState("none") //отображение уведомления
    const [loading, setLoading] = useState(false) //лоадер отправки данных

    async function onSubmit (e) {
        e.preventDefault();
        if (!checkbox) {
            alert ("Необходимо согласие на обработку персональных данных")
            setLoading(false)
            return
        }
        if (token.length === 0) {
            alert ("Пройдите капчу!")
            setLoading(false)
            return
        }
        setLoading(true)
        fetch("/api/contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name,email,phone,subject,message})
        }).then((response)=> {
            if(!response.ok) {
                throw new Error(response.status || "Ошибка отправи")
            }
            return response.json()
        }).then((data)=> {
            console.log(data)
            setDisplayNone("") ;
            setName("");
            setEmail("");
            setPhone("");
            setSuject("");
            setMessage("");
            setCheckbox(false)
            setLoading(false) //отправка... => отправить (у кнопки)
            setTimeout(() => {
                setDisplayNone("none")
            }, 5000); //Убираем оповещение об успешеной отправке

        }
            ).catch(error => {
            setLoading(false)
            console.log(error)   
             })
        }
        const loaderStatus = loading === true ? "Отправка..." : "отправка"

return (
    <form className="form" onSubmit={onSubmit}>
                <div className="form-input__name">
                    <label htmlFor="name" className="form-input__name-label">Name</label>
                    <input type="text" id="name" className="form-input__name-input" name="your-name" value={name} onChange={(e)=> {setName(e.target.value)}}/>
                </div>

                <div className="form-input__email">
                    <label htmlFor="email" className="form-input__email-label">Email</label>
                    <input type="email" id="email" className="form-input__email-input" name="your-email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                </div>
                <div className="form-input__phone">
                    <label htmlFor="tel" className="form-input__email-label">Phone number</label>
                    <input type="tel" id="tel" className="form-input__email-input" name="tel-809" value={phone} onChange={(e)=> {setPhone(e.target.value)}} />
                </div>
                <div className="form-input__subject">
                    <label htmlFor="subject" className="form-input__subject-label">Subject</label>
                    <input type="text" id="subject" className="form-input__subject-input" name="your-subject" value={subject} onChange={(e)=> {setSuject(e.target.value)}}/>
                </div>
                <div className="form-input__message">
                    <label htmlFor="message" className="form-input__message-label">Message</label>
                    <textarea name="your-message" id="message" type="text" className="form-input__message-input" value={message} onChange={(e)=> {setMessage(e.target.value)}}></textarea>
                </div>
                <div className="form-input__checkbox">
                    <input type="checkbox" name="checkbox-147" checked={checkbox} onChange={()=> setCheckbox(!checkbox)}/> 
                    <p> &nbsp; Согласен на обработку <a href="/privacyPolicy">персональных данных</a></p>
                </div>
                    <div className="form-input__checkbox-state">
                    </div>
                    <div className='turnstile'>
                        <Turnstile
                        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                        onVerify={(tokenValue) => setToken(tokenValue)} 
                        />
                    </div>
                <div className={`success-message ${displayNone}`}>Сообщение успешнно отправлено!</div>
                <div className="send__button-container">
                        <button type='submit' className='send__buttonTrue'>{loaderStatus}</button>
                    </div>
            </form>
)
}
