import Link from 'next/link'
import './header.css'
export default function Header () {
    return (
      <nav className="nav">
        <Link className="link" href='/'>Продукты</Link>
        <Link className="link" href='/blog'>Блог</Link>
        <Link className="link" href='/about'>О нас</Link>
        <Link className="link" href='/contact'>Контакты</Link>
      </nav>
    )
}