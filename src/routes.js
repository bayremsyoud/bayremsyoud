import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const addUser = React.lazy(()=> import('./views/gestionUser/addUser'))
const deleteUser = React.lazy(()=> import('./views/gestionUser/deleteUser'))
const viewUsers = React.lazy(()=> import('./views/gestionUser/viewUsers'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/gestion',exact : true, name: 'Gerer Utilisateur', element: addUser},
  { path: '/gestion/addUser', name: 'Ajouter Utilisateur', element: addUser},
  { path: '/gestion/deleteUser', name: 'Desactiver', element: deleteUser },
  { path: '/gestion/viewUsers', name: 'Consultation', element: viewUsers }, 
]

export default routes
