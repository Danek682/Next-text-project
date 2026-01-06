"use client"
import './form.css'
import {useState,useRef} from 'react'
import ReCAPTCHA from "react-google-recaptcha"
export default function Form () {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [subject,setSuject] = useState("");
    const [message, setMessage] = useState("")
    const [checkbox, setCheckbox] = useState(false)

    const [displayNone,setDisplayNone] = useState("none") //отображение уведомления
    const [successSend,setSuccessSend] = useState("") //сооббщение об успешной отправке данных
    const [loading, setLoading] = useState(false) //лоадер отправки данных
    const [captchaValue, setCaptchaValue] = useState(null) //Состояние капчи
    const [error, setError] = useState([])

    const captchaRef = useRef(null) //обновление состояния капчи

    async function onSubmit (e) {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("_wpcf7_unit_tag", "cdcae9e");
        formData.append('your-name', name);
        formData.append('your-email', email);
        formData.append('tel-809', phone);
        formData.append('your-subject', subject);
        formData.append('your-message', message);
        formData.append('checkbox-147', checkbox ? "Вариант 1" : "")
        formData.append("g-recaptcha-response", captchaValue);
        fetch("http://products-test.local/wp-json/contact-form-7/v1/contact-forms/59/feedback", {
            method: "POST",
            body: formData
        }).then((response)=> {
            if(!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        }).then((data)=> {
            if (data.status === "validation_failed" && data.invalid_fields) {
                console.log(data)
                const errors = data.invalid_fields.map(error => error)
                setError(errors) //перебор всех ошибок
                setLoading(false)
                return
            }
            console.log(data)
            setSuccessSend(data.message)
            setDisplayNone("") ;
            setName("");
            setEmail("");
            setPhone("");
            setSuject("");
            setMessage("");
            setCheckbox(false)
            setError([]) //очистка ошибок после успешной отправки
            setLoading(false) //отправка... => отправить (у кнопки)

            captchaRef.current.reset(); 
            setCaptchaValue(null) //Сброс капчи

            setTimeout(() => {
                setDisplayNone("none")
            }, 5000); //Убираем оповещение об успешеной отправке

        }
            ).catch(error => {
            setLoading(false)
            console.log(error)   
             })
        }

        function thisError (arg) {
            const findedError = error.find(err => err.field === arg)
            return findedError ? (
                <span>{findedError.message}</span>
            ) : "" //вывод нужной ошибки
        }

        const isDisabled = !captchaValue ? true : false //доступна или недоступна кнопка
        const classIsDisabled = isDisabled === true ? "send__button" : "send__buttonTrue" //если доступна меняем класс
        const loaderStatus = loading === true ? "Отправка..." : "отправка"

return (
    <form className="form" onSubmit={onSubmit}>
                <div className="form-input__name">
                    <label htmlFor="name" className="form-input__name-label">Name</label>
                    <input type="text" id="name" className="form-input__name-input" name="your-name" value={name} onChange={(e)=> {setName(e.target.value)}}/>
                    <p className="error">{thisError("your-name")}</p>
                </div>

                <div className="form-input__email">
                    <label htmlFor="email" className="form-input__email-label">Email</label>
                    <input type="email" id="email" className="form-input__email-input" name="your-email" value={email} onChange={(e)=> {setEmail(e.target.value)}}/>
                    <p className="error">{thisError("your-email")}</p>
                </div>
                <div className="form-input__phone">
                    <label htmlFor="tel" className="form-input__email-label">Phone number</label>
                    <input type="tel" id="tel" className="form-input__email-input" name="tel-809" value={phone} onChange={(e)=> {setPhone(e.target.value)}} />
                    <p className="error" >{thisError("tel-809")}</p>
                </div>
                <div className="form-input__subject">
                    <label htmlFor="subject" className="form-input__subject-label">Subject</label>
                    <input type="text" id="subject" className="form-input__subject-input" name="your-subject" value={subject} onChange={(e)=> {setSuject(e.target.value)}}/>
                    <p className="error">{thisError("your-subject")}</p>
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
                        <span className="error">{thisError("checkbox-147")}</span>
                    </div>
                <div className="captcha">
                    <ReCAPTCHA
                    sitekey='6Ld3AT4sAAAAAIxcEdOrrEfJFPN2sCozg893KMzW'
                    onChange={value=> setCaptchaValue(value)}
                    ref={captchaRef}
                    />
                </div>
                <div className={`success-message ${displayNone}`}>{successSend}</div>
                <div className="send__button-container">
                        <button type='submit' disabled={isDisabled} className={classIsDisabled}>{loaderStatus}</button>
                    </div>
            </form>
)
}
