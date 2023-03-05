
import { Link } from '@remix-run/react'
import Navigation from './navigation'
import logo from '../../public/img/logo.svg'

function Header({user}){
    return (
        <header className="header bg-indigo-600 text-white font-bold h-16">
            <div className="container mx-auto flex items-center gap-3 h-full">
                <Link to='/'>
                    <img className='logo w-6 m-2' src={logo} alt="Logo de Factory" />
                </Link>
                <Navigation user={user}/>
            </div>
        </header>
    )
}

export default Header