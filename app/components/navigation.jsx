
import { Link, useLocation, Form } from '@remix-run/react'



function Navigation({user}){
    const location = useLocation()

    return (
        <>
        {user !== '' ? (
        <nav className="nav h-full">
            <ul className='menu flex gap-4 h-full items-center'>
                <li className='h-full'>
                    <Link to='/' className={ `${location.pathname === '/' ? 'active' : ''} h-full flex items-center hover:text-black`  } >Inicio</Link>
                </li>
                <li className='h-full'>
                    <Link to='/socios' className={ `${location.pathname === '/socios' ? 'active' : ''} h-full flex items-center hover:text-black` } >Socios</Link>
                    <ul className='submenu bg-gray-700 w-48 shadow-md'>
                        <li><Link to='/socio-new' className='block p-2 hover:bg-gray-900'>Nuevo Socio</Link></li>
                    </ul>
                </li>
                <li className='h-full'>
                    <Link to='/employees' className={ `${location.pathname === '/employees' ? 'active' : ''} h-full flex items-center hover:text-black` } >Asalariados</Link>
                    <ul className='submenu bg-gray-700 w-48 shadow-md'>
                        <li><Link to='/employee-new' className='block p-2 hover:bg-gray-900'>Nuevo Asalariado</Link></li>
                    </ul>
                </li>
                
                <li className='h-full'>
                    <Link className='h-full flex items-center hover:text-black'>Ingresos</Link>
                    <ul className='submenu bg-gray-700 w-48 shadow-md'>
                        <li><Link to={'/report-pro-deport'} className='block p-2 hover:bg-gray-900'>Pro-Deporte</Link></li>
                        <li><Link to={'/report-hanging'} className='block p-2 hover:bg-gray-900'>Colgadas Min Norte</Link></li>
                        <li><Link to={'/report-hanging-south'} className='block p-2 hover:bg-gray-900'>Colgadas Min Sud</Link></li>
                        <li><Link to={'/report-gps'} className='block p-2 hover:bg-gray-900'>GPS</Link></li>
                        <li><Link to={'/report-air'} className='block p-2 hover:bg-gray-900'>Aire</Link></li>
                        <li><Link to={'/report-rent'} className='block p-2 hover:bg-gray-900'>Alquiler Linea</Link></li>
                    </ul>
                </li>
                <li className='h-full'>
                    <Link className='h-full flex items-center hover:text-black'>Egresos</Link>
                    <ul className='submenu bg-gray-700 w-48 shadow-md'>
                        <li><Link to={'/expense-create'} className='block p-2 hover:bg-gray-900'>Nuevo Egreso</Link></li>
                        <li><Link to={'/report-expenses'} className='block p-2 hover:bg-gray-900'>Reporte Mensual</Link></li>
                        <li><Link to={'/report-expenses-total'} className='block p-2 hover:bg-gray-900'>Reporte Total</Link></li>
                    </ul>
                </li>
                <li className='h-full'>
                    <Link className='h-full flex items-center hover:text-black'>Informes</Link>
                    <ul className='submenu bg-gray-700 w-48 shadow-md'>
                        <li><Link to={'/report-income'} className='block p-2 hover:bg-gray-900'>Reporte Ingresos</Link></li>
                        <li><Link to={'/report-road-map'} className='block p-2 hover:bg-gray-900'>Hojas de Ruta</Link></li>
                        <li><Link to={'/report-change-name'} className='block p-2 hover:bg-gray-900'>Cambio de Nombre</Link></li>
                        <li><Link to={'/report-pro-accident'} className='block p-2 hover:bg-gray-900'>Pro Accidente</Link></li>
                        <li><Link to={'/report-pro-furniture'} className='block p-2 hover:bg-gray-900'>Pro Mobiliario</Link></li>
                    </ul>
                </li> 
                <li className='h-full'>
                    <Link to='/backup' className={ `${location.pathname === '/backup' ? 'active' : ''} h-full flex items-center hover:text-black`  } >Back Up</Link>
                </li>
                <li className='h-full'>
                    <Link className='h-full flex items-center hover:text-black capitalize' >{user}</Link> 
                    <ul className='submenu bg-gray-700 w-48 shadow-md'>
                        <li className='block p-2 hover:bg-gray-900 cursor-pointer'>
                            <Form method='post' action='/logout-user'><input type='submit' className='cursor-pointer' value='Log Out'/></Form>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        ) : (
        <nav className="nav h-full">
            <ul className='menu flex gap-4 h-full items-center'>
                <li className='h-full'>
                    <Link to='/user-new' className={ `h-full flex items-center hover:text-black` } >Crear Usuario</Link>
                </li>
                <li className='h-full'>
                    <Link to='/login' className={ `h-full flex items-center hover:text-black`  } >Login</Link>
                </li>
            </ul>
        </nav>
        )}
        </>
    )
}

export default Navigation