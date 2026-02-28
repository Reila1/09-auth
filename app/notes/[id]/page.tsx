import type { Metadata } from "next";
import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  
  return {
    title: `${note.title} | NoteHub`,
    description: note.content.substring(0, 160), 
    openGraph: {
      title: note.title,
      description: note.content.substring(0, 160),
      url: `/notes/${id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NoteDetailsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const queryClient = new QueryClient();
  const { id } = await params;
  
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}