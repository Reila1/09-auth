'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  
  const [debouncedSearch] = useDebounce(search, 500);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, 12, debouncedSearch, tag),
    placeholderData: keepPreviousData
  });
  
  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading notes...</p>;
  }
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      
      {data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
}