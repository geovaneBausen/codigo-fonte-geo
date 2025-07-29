import './index.scss'
import Link from 'next/link'

export default function NavBar(){
    return(
        <nav className="NavBar">
            {/* Logo e título com tema Rick and Morty */}
            <div className="nav-brand">
                <div className="portal-logo">🌀</div>
                <h1 className="page-title">
                    <span className="rick-text">Rick</span>
                    <span className="and-text">&</span>
                    <span className="morty-text">Morty</span>
                    <span className="subtitle">Universe Explorer</span>
                </h1>
            </div>

            {/* Links de navegação */}
            <ul className="nav-links">
                <li>
                    <Link href="/" className="nav-link" title="Home">
                        <span className="nav-icon">🏠</span>
                        <span className="nav-text">Home</span>
                    </Link>
                </li>
                <li>
                    <Link href="/PGpersonagens" className="nav-link" title="Personagens">
                        <span className="nav-icon">👽</span>
                        <span className="nav-text">Personagens</span>
                    </Link>
                </li>
                <li>
                    <Link href="/PGplanetas" className="nav-link" title="Planetas">
                        <span className="nav-icon">🪐</span>
                        <span className="nav-text">Planetas</span>
                    </Link>
                </li>
                <li>
                    <Link href="/PGepisodios" className="nav-link" title="Episódios">
                        <span className="nav-icon">📺</span>
                        <span className="nav-text">Episódios</span>
                    </Link>
                </li>
                <li>
                    <Link href="/PGsobre" className="nav-link" title="Sobre">
                        <span className="nav-icon">ℹ️</span>
                        <span className="nav-text">Sobre</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}









