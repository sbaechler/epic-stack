import { invariant } from '@epic-web/invariant'
import { useEffect, useRef } from 'react'
import { redirect, useFetcher, useFetchers } from 'react-router'
import { useHints } from '#app/utils/client-hints.tsx'
import { useRequestInfo } from '#app/utils/request-info.ts'
import { setTheme } from '#app/utils/theme.server.ts'
import  { type Route } from './+types/theme-switch'

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const theme = formData.get('theme')
	invariant(
		theme === 'light' || theme === 'dark',
		'Theme must be "light" or "dark"',
	)

	const responseInit = {
		headers: { 'set-cookie': setTheme(theme) },
	}
	return redirect('/', responseInit)
}
