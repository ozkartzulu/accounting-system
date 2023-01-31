import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useCatch,
  Link,
  ScrollRestoration,
} from "@remix-run/react"
import styles from '~/styles/app.css'
import stylesIndex from '~/styles/index.css'
import Header from '~/components/header'

export function meta(){
  return {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'Sistema - Contable'
  }
}

export function links(){
  return [
      {
        rel: 'stylesheet preload prefetch',
        href: styles,
        as: 'style'
      },
      {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
      },
      {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossOrigin: 'true'
      },
      {
          rel: 'stylesheet preload prefetch',
          href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@300;400;600;700;900&display=swap',
          as: 'style'
      },
      {
        rel: 'stylesheet preload prefetch',
        href: stylesIndex,
        as: 'style'
      }
  ]
}

export default function App() {
  return (
    <Document>
        <Outlet />
    </Document>  
  );
}

function Document({children}){
  return (
      <html>
          <head>
              <Meta/>
              <Links />
          </head>
          <body className="bg-gray-100">
              <Header/>
              {children}
              {/* <Footer /> */}
              <Scripts />
              <LiveReload />
          </body>
      </html>
  )
}

// Errors

export function CatchBoundary(){
  const error = useCatch()
  return (
      <Document>
          <p className="error">{error.status} {error.statusText}</p>
          <Link className='error-link' to='/' >Maybe you want return to home page</Link>
      </Document>
  )
}

export function ErrorBoundary({error}){
  return (
      <Document>
          <p className="error">{error.status} {error.statusText}</p>
          <Link className='error-link' to='/' >Maybe you want return to home page</Link>
      </Document>
  )
}
