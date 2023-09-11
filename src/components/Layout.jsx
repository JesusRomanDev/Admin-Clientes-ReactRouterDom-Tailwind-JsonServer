import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <div>
        <h1 className="text-6xl">CRM React</h1>

        <Outlet /> {/* Outlet actua como un contenedor DINAMICO, lo que esta por fuera del OUTLET se renderiza en todos los demas componentes, outlet es lo que vendria siendo el CHILDREN, EN RESUMEN: LAYOUT SE VA A REFLEJAR EN TODOS LOS CHILDREN QUE TENGAMOS POR NUESTRO OUTLET*/}
    </div>
  )
}

export default Layout