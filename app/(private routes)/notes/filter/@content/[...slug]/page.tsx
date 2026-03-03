import { fetchNotes } from '@/lib/api/serverApi';
import NoteList from '@/components/NoteList/NoteList';

export default async function ContentPage({ params }: { params: Promise<{ tag: string[] }> }) {
  const { tag } = await params;
  const selectedTag = tag[0];

  const data = await fetchNotes(
    selectedTag === 'all' ? {} : { tag: selectedTag }
  );

  return (
    <div>
      {data && data.length > 0 ? (
        <NoteList notes={data} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}