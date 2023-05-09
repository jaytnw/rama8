"use client"
// import './globals.css'
import "./styles.css";
import { createTheme, NextUIProvider, CssBaseline } from '@nextui-org/react';
import React from 'react';

import { Inter, Kanit } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const kanit = Kanit({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: 'Rama 8',
  description: 'Rama 8',
}

const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      backgroud: "red",
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  }
})

const myLightTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      background: '#171E31',
      text: 'white',
      bgColor: 'white',
      // bgColorGradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      white: 'white',
      blue: '#392D4E',
      orange: '#FBBF4A',
      orange2: '#FFCF52',
      gray: '#F1F3F5',
      gray2: '#8D8D8D',
      success: '#17C964'
    },
    space: {},
    fonts: {}
  }
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{CssBaseline.flush()}
      
      
      </head>
      <body className={kanit.className}>
        <NextUIProvider theme={myLightTheme}>
          {children}
        </NextUIProvider>
      </body>
    </html>
  )
}
