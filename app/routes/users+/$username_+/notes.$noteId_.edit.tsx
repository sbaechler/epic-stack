import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs, useLoaderData } from 'react-router'
import { prisma } from '#app/utils/db.server.ts'
import { NoteEditor, action } from './__note-editor.server.tsx'

export { action }

export async function loader({ params }: LoaderFunctionArgs) {
	const note = await prisma.note.findUnique({
		where: { id: params.noteId },
		select: {
			id: true,
			title: true,
			content: true,
			images: {
				select: {
					id: true,
					altText: true,
				},
			},
		},
	})
	invariantResponse(note, 'Note not found', { status: 404 })
	return { note }
}

export default function NoteEdit() {
	const data = useLoaderData<typeof loader>()
	return <NoteEditor note={data.note} />
}
