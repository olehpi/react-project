import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import App from './App'
import appReducer from './store/app-reducer'
import authReducer from './store/auth-reducer'

vi.mock('./api/auth-api', () => {
  const original = vi.importActual('./api/auth-api')
  return {
    ...original,
    authAPI: {
      me: vi.fn(() =>
        Promise.resolve({
          data: { resultCode: 0, data: { id: 1, login: 'Oleh' } }
        })
      )
    }
  }
})

type RootState = {
  app: ReturnType<typeof appReducer>
  auth: ReturnType<typeof authReducer>
}

type RenderWithProvidersOptions = {
  preloadedState?: Partial<RootState>
  store?: EnhancedStore<RootState>
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { app: appReducer, auth: authReducer },
      preloadedState,
    }),
  }: RenderWithProvidersOptions = {}
) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        {ui}
      </MemoryRouter>
    </Provider>
  )
}

const TypedApp = App as React.FC

test('renders header', async () => {
  renderWithProviders(<TypedApp />)

  const header = await screen.findByRole('banner')
  expect(header).toBeInTheDocument()
})