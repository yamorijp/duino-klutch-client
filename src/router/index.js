import Vue from 'vue'
import Router from 'vue-router'
import DashboardView from '../views/DashboardView'
import MatrixView from '../views/MatrixView'
import RgbView from '../views/RgbView'
import FourdigitView from '../views/FourdigitView'
import IrView from '../views/IrView'
import IrxView from '../views/IrxView'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'root',
      component: DashboardView
    },
    {
      path: '/matrix',
      name: 'matrix',
      component: MatrixView,
      props: (route) => ({resource: route.query.resource, name: route.query.name})
    },
    {
      path: '/rgb',
      name: 'rgb',
      component: RgbView,
      props: (route) => ({resource: route.query.resource, name: route.query.name})
    },
    {
      path: '/4digit',
      name: 'fourdigit',
      component: FourdigitView,
      props: (route) => ({resource: route.query.resource, name: route.query.name})
    },
    {
      path: '/ir',
      name: 'ir',
      component: IrView,
      props: (route) => ({resource: route.query.resource, name: route.query.name})
    },
    {
      path: '/irx',
      name: 'irx',
      component: IrxView,
      props: (route) => ({resource: route.query.resource, name: route.query.name})
    }
  ]
})
