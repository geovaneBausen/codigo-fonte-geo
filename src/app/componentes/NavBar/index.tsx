'use client';
import './index.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NavBar(){
    // Estados para controle de navegação
    const pathname = usePathname(); // Rota atual do Next.js
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado do menu mobile
    const [isMobile, setIsMobile] = useState(false); // Detecção de dispositivo mobile

    /**
     * Verifica se a rota atual está ativa
     * @param path - Caminho da rota a verificar
     * @returns boolean - true se a rota estiver ativa
     */
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/'; // Para home, verifica exatamente
        }
        return pathname.startsWith(path); // Para outras rotas, verifica se inicia com o path
    };

    // Effect para detecção responsiva e controle de redimensionamento
    useEffect(() => {
        const checkScreenSize = () => {
            const isMobileSize = window.innerWidth <= 768;
            setIsMobile(isMobileSize);
            
            // Auto-fecha menu mobile quando tela aumenta
            if (!isMobileSize && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        // Verifica tamanho inicial
        checkScreenSize();
        
        // Listener para mudanças de tamanho
        window.addEventListener('resize', checkScreenSize);
        
        // Cleanup do listener
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [isMobileMenuOpen]); // Dependência adicionada para melhor controle

    // Effect para controle de scroll do body (UX mobile)
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('no-scroll'); // Previne scroll quando menu aberto
        } else {
            document.body.classList.remove('no-scroll');
        }

        // Cleanup garantido na desmontagem
        return () => document.body.classList.remove('no-scroll');
    }, [isMobileMenuOpen]);

    // Effect para auto-fechar menu ao navegar (UX)
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Effect para controle de teclado (acessibilidade)
    useEffect(() => {
        if (!isMobileMenuOpen) return; // Early return se menu fechado

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileMenuOpen]);

    // Handler para toggle do menu mobile
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    return(
        <header className="NavBar">
            {/* Seção da marca/logo */}
            <div className="nav-brand">
                <Link href="/" className="brand-link">
                    <div className="brand-logo">
                        {/* SVG customizado com gradientes */}
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="14" fill="url(#gradient1)" stroke="url(#gradient2)" strokeWidth="2"/>
                            <circle cx="16" cy="16" r="8" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6"/>
                            <circle cx="16" cy="16" r="3" fill="white" opacity="0.8"/>
                            <defs>
                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff6b35"/>
                                    <stop offset="100%" stopColor="#f7931e"/>
                                </linearGradient>
                                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff8a50"/>
                                    <stop offset="100%" stopColor="#ff6b35"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="brand-text">
                        <span className="brand-name">Rick & Morty</span>
                        <span className="brand-subtitle">Universe Explorer</span>
                    </div>
                </Link>
            </div>

            {/* Menu de navegação principal */}
            <nav className={`main-navigation ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <ul className="nav-links">
                    <li>
                        <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                            <span className="nav-text">Discovery</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/localizacoes" className={`nav-link ${isActive('/localizacoes') ? 'active' : ''}`}>
                            <span className="nav-text">Locations</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sobre" className={`nav-link ${isActive('/sobre') ? 'active' : ''}`}>
                            <span className="nav-text">About</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Botões de ação (mobile toggle) */}
            <div className="nav-actions">
                <button 
                    className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Overlay para fechar menu mobile ao clicar fora */}
            {isMobileMenuOpen && (
                <div 
                    className="mobile-overlay" 
                    onClick={toggleMobileMenu}
                    aria-hidden="true"
                />
            )}
        </header>
    )
}









