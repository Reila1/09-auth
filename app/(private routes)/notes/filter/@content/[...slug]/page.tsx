import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
export default async function ContentPage({ params }: { params: Promise<{ tag: string[] }> }) {
  const { tag } = await params;
  const selectedTag = tag[0];
  
  let data;
  
  if (selectedTag === 'all') {
    data = await fetchNotes(1, 12, '');
  } else {
    data = await fetchNotes(1, 12, '', selectedTag);
  }
  return (
  <div>
      {data.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}