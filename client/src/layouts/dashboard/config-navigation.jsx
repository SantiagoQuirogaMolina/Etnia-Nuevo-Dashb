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
    title: 'user',
    path: '/users-admin',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/products-admin',
    icon: icon('ic_cart'),
  },
  
  {
    title: 'login',
    path: '/login-admin',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
