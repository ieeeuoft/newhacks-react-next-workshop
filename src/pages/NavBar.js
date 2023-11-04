import React from 'react'
import Link from 'next/link'

const NavBar = (props) => {
  const { dark } = props;
  return (
    <div className={`header ${dark ? 'dark' : ''}`}>
      <Link href={"https:/ieee.utoronto.ca"}>
        <img className='logo' src="/logo.png"/>
      </Link>
      <div>
        <Link href={"/"}>
          <button className="promo">Home</button>
        </Link>
        <Link href={"/promo"}>
          <button className="promo">Promo</button>
        </Link>
      </div>
    </div>
  )
}


export default NavBar