import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query'
import routeTree from './routing/route.tree'
import store from './store/store'
import { Provider } from 'react-redux'

const queryClient = new QueryClient()
const router = createRouter({ 
  routeTree, 
  context:{
    queryClient,
    store
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>

)