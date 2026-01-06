import Link from "next/link"
export default function notFound () {
    return (
        <div>
            Такой страницы не существует <br />
            <Link href='/'> Вернуться на главную</Link>
        </div>
    )
}