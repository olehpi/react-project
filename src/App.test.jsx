import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
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


const renderWithProviders = (ui, { preloadedState, store = configureStore({
  reducer: { app: appReducer, auth: authReducer },
  preloadedState
}) } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        {ui}
      </MemoryRouter>
    </Provider>
  )
}

test('renders header', async () => {
  renderWithProviders(<App />)

  const header = await screen.findByRole('banner')
  expect(header).toBeInTheDocument()
})

