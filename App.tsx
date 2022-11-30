import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Register } from './src/screens/Register';
import theme from './src/global/styles/theme'
import { NavigationContainer} from '@react-navigation/native'
import { AppRoutes } from './src/Routes/app.routes';


export default function App() {
  return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
        <AppRoutes/>

        </NavigationContainer>
      </ThemeProvider>
  )
}



