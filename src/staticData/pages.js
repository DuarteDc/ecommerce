import { ClassNames } from '@emotion/react';
import { Home, Store, Sell, ShoppingBag, School, ContactPage } from '@mui/icons-material';

export const pages = [
  {
    path: '/',
    name: 'Inicio',
    icon: <Home className='mr-4'/>,
  },
  {
    path: '/productos',
    name: 'Productos',
    icon: <Store className='mr-4'/>,
  },
  // {
  //   path: '/canvas',
  //   name: 'Canvas',
  // },
  {
    path: '/categorias',
    name: 'Categorías',
    icon: <ShoppingBag className='mr-4'/>,
  },
  {
    path: '/marcas',
    name: 'Marcas',
    icon: <Sell className='mr-4'/>,
  },
  {
    path: 'https://wapizima.com.mx',
    name: 'Escuela',
    icon:  <School className='mr-4'/>,


  },
  {
    path: '/contacto',
    name: 'Contácto',
    icon: <ContactPage className='mr-4' />,

  },
]