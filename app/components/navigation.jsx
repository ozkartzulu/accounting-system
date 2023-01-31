
import { Link, useLocation } from '@remix-run/react'

function Navigation(){
    const location = useLocation()
    return (
        <nav className="nav h-full">
            <ul className='menu flex gap-2 h-full items-center'>
                <li className='h-full'>
                    <Link to='/' className={ `${location.pathname === '/' ? 'active' : ''} h-full flex items-center`  } >Inicio</Link>
                </li>
                <li className='h-full'>
                    <Link to='/socios' className={ `${location.pathname === '/socios' ? 'active' : ''} h-full flex items-center` } >Socios</Link>
                    <ul className='submenu bg-gray-700 w-40 shadow-md'>
                        <li><Link to='/socio-new' className='block p-2 hover:bg-gray-900'>Nuevo Socio</Link></li>
                    </ul>
                </li>
                <li className='h-full'>
                    <Link to='/about' className={ `${location.pathname === '/about' ? 'active' : ''} h-full flex items-center` } >Asalariados</Link>
                </li>
                <li className='h-full'>
                    <Link to='/blog' className={ `${location.pathname === '/blog' ? 'active' : ''} h-full flex items-center` } >Trabajadores</Link>
                </li>
                <li className='h-full flex items-center'>Informes
                    <ul className='submenu bg-gray-700 w-40 shadow-md'>
                        <li><Link to={'/report-road-map'} className='block p-2 hover:bg-gray-900'>Hojas de Ruta</Link></li>
                        <li><Link to={'/report-gps'} className='block p-2 hover:bg-gray-900'>GPS</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation