import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
//Importamos la funcion que usara nuesto From en el archivo NuevoCliente
import NuevoCliente, {action as nuevoClienteAction} from './components/pages/NuevoCliente'
//Nota al importar el loader, de preferencia siempre guardarlo con un nuevo nombre
import Index, {loader as clientesLoader} from './components/pages/Index'

const router = createBrowserRouter([ //createBrowserRouter toma un array de objetos donde pondremos nuestras rutas, este se lo pasamos al Provider
  {
    path:'/',
    element: <Layout />,//<h1>Inicio</h1> /* element es lo que se va a mostrar en pantalla, pueden ser etiquetas o componentes */
    children: [ /* todo lo que este dentro de children tendra aplicado el Layout (elemento) de arriba */
      {
        index: true, /* aqui no se le define un path porque este "children" se va a cargar cuando visitemos la pagina principal, es y no es un children a la vez */
        element: <Index />,
        loader: clientesLoader /* para el componente de Index su loader va a ser clientesLoader */
      },
      {
          path: '/clientes/nuevo',
          element: <NuevoCliente />,
          action: nuevoClienteAction //definiendole el action que tendra nuestro From al darle submit en el archivo NuevoCliente
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* RouterProvider va aqui */}
  </React.StrictMode>,
)

//Nota: componente es lo que es reutilizable y pages es las paginas que vamos utilizando en react router dom