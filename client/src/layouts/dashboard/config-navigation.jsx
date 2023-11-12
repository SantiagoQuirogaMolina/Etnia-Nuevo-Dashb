/* eslint-disable import/no-unresolved */
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'usuarios',
    path: '/users-admin',
    icon: icon('ic_user'),
  },
  {
    title: 'productos',
    path: '/products-admin',
    icon: icon('ic_cart'),
  },
  
  {
    title: 'pendientes',
    path: '/login-admin',
    icon: icon('ordenes'),
  },
  {
    title: 'ventas',
    path: '/404',
    icon: icon('ventas'),
  },
];

export default navConfig;
