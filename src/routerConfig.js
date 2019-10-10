import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';
import BlankLayout from '@/layouts/BlankLayout';
import NotFound from '@/pages/NotFound';

import Index from '@/pages/Index';
import Clazz from '@/pages/Clazz';
import All from '@/pages/All';

const routerConfig = [
  {
    path: '/admin',
    component: BasicLayout,
    children: [
      {
        path: '/clazz',
        component: Clazz,
      },
      {
        path: '/all',
        component: All,
      },
      {
        path: '/',
        redirect: '/admin/clazz',
      },
      {
        component: NotFound,
      },
    ],
  },
  {
    path: '/',
    component: BlankLayout,
    children: [
      {
        path: '/index',
        component: Index,
      },
      {
        path: '/',
        redirect: '/index',
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
