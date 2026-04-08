'use client';

import Image from 'next/image';
import styles from './Header.module.css';

/* Links de navegação com seus IDs alvo */
const navLinks = [
  { label: 'Localização e Horário', href: '#localizacao' },
  { label: 'Lista de Presentes', href: '#presentes' },
  { label: 'Confirmação de Presença', href: '#confirmacao' },
  { label: 'Manual\u00A0do Convidado', href: '#manual' },
];

export default function Header() {
  /* Faz scroll suave até a seção ao clicar no link */
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Navegação principal">
        {/* Links do lado esquerdo */}
        <ul className={styles.navGroup}>
          {navLinks.slice(0, 2).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Monograma central */}
        <a
          href="#hero"
          className={styles.monogram}
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Voltar ao topo"
        >
          <Image
            src="/images/monograma-logo.png"
            alt="Monograma Cecília & Ivo"
            width={120}
            height={120}
            priority
          />
        </a>

        {/* Links do lado direito */}
        <ul className={styles.navGroup}>
          {navLinks.slice(2).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menu mobile — hambúrguer */}
      <MobileMenu links={navLinks} onNavClick={handleNavClick} />
    </header>
  );
}

/* Componente de menu mobile com estado de abrir/fechar */
function MobileMenu({
  links,
  onNavClick,
}: {
  links: typeof navLinks;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <div className={styles.mobileNav}>
      <a href="#hero" className={styles.monogramMobile}>
        <Image
          src="/images/monograma-logo.png"
          alt="Monograma Cecília & Ivo"
          width={96}
          height={96}
          priority
        />
      </a>
      <ul className={styles.mobileLinks}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={styles.navLink}
              onClick={(e) => onNavClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
