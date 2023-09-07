import React, { createContext, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
interface Theme {
	name: string
	primary: string
	border: string
	borderHover: string
	white: string
	gray: string
	cream: string
	black: string
	red: string
}

const darkTheme = {
	name: 'dark',
	primary: '#3B97D9',
	border: '#3d3d3d',
	borderHover: 'rgba(255, 255, 255, 0.2)',
	white: '#242424',
	gray: '#828282',
	cream: '#171717',
	black: '#FAFAFA',
	red: '#C43F3F'
}
const lightTheme = {
	name: 'light',
	primary: '#3B97D9',
	borderHover: 'rgba(0, 0, 0, 0.15)',
	border: '#E8E8E8',
	white: '#FAFAFA',
	gray: '#808080',
	cream: '#f8f8f5',
	black: '#313131',
	red: '#C43F3F'
}

const ThemeContextState = createContext(lightTheme)
const ThemeContextSetter = createContext<(options: 'dark' | 'light') => void>(() => {/* eslint-moment */ })

export const useThemeContextState = () => {
	return useContext(ThemeContextState)
}

export const useThemeContextSetter = () => {
	return useContext(ThemeContextSetter)
}

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
	const [theme, setThemeInternal] = useState<Theme>(lightTheme)
	const [lcstgTheme, setLcstrTheme] = useLocalStorage('theme', 'light')

	const setTheme = (option: 'dark' | 'light') => {

		setLcstrTheme(option)

		switch (option) {
		case 'dark': setThemeInternal(darkTheme)
			break
		case 'light': setThemeInternal(lightTheme)
			break
		}
	}

	useEffect(() => { setTheme(lcstgTheme) }, [])

	useEffect(() => {
		for (const [key, value] of Object.entries(theme)) {
			document.documentElement.style.setProperty('--' + key, value)
		}
	}, [theme])

	return <ThemeContextState.Provider value={theme}>
		<ThemeContextSetter.Provider value={setTheme}>
			{children}
		</ThemeContextSetter.Provider>
	</ThemeContextState.Provider>
}