export const metadata = {
  title: 'Контакты',
  description: 'Связаться с нами'
}

import "./contact.css"
import Form from "../../components/Form/Form"
export default function Contact() {
    return (
        <div className="form-wrapper">
            <h1>Contact</h1>
            <Form/>
        </div>
    )
} 
