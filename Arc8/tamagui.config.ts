import { createTamagui } from 'tamagui'

const config = createTamagui({
  defaultTheme: 'light',
  themes: {
    light: {
      background: '#fff',
      color: '#000'
    },
    dark: {
      background: '#000',
      color: '#fff'
    }
  }
})

type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config 