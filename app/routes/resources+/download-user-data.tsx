import { type LoaderFunctionArgs } from 'react-router'
import { requireUserId } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { getDomainUrl } from '#app/utils/misc.tsx'

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUniqueOrThrow({
		where: { id: userId },
		include: {
			image: {
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					contentType: true,
				},
			},
			notes: {
				include: {
					images: {
						select: {
							id: true,
							createdAt: true,
							updatedAt: true,
							contentType: true,
						},
					},
				},
			},
			password: false,
			sessions: true,
			roles: true,
		},
	})

	const domain = getDomainUrl(request)

	return {
		user: {
			...user,
			image: user.image
				? {
						...user.image,
						url: `${domain}/resources/user-images/${user.image.id}`,
					}
				: null,
			notes: user.notes.map((note) => ({
				...note,
				images: note.images.map((image) => ({
					...image,
					url: `${domain}/resources/note-images/${image.id}`,
				})),
			})),
		},
	}
}
