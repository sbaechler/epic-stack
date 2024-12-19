import { redirect } from 'react-router'
import { logout } from '#app/utils/auth.server.ts'
import  { type Route } from './+types/logout'

export async function loader() {
	return redirect('/')
}

export async function action({ request }: Route.LoaderArgs) {
	return logout({ request })
}
