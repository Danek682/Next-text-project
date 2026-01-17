import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const {name, email, phone, subject, message} = await req.json()

        if (!name || !email || !phone || !subject) {
            return NextResponse.json({error: "Заполните обязательные поля"}, {status: 400})
        }

        await resend.emails.send({
            from: "Production <onboarding@resend.dev>",
            to: "danil.lapshin228@gmail.com",
            subject: subject,
            html: `
        <p><b>Имя:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Телефон:</b> ${phone}</p>
        <p><b>Сообщение:</b>${message}</p>
      `,});
            return NextResponse.json({success: true});
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Ошибка отправки"}, {status: 500});
    }
}