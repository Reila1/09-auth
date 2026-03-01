import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import api from './api';
import { AxiosResponse } from 'axios';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore.toString();
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookie = await getCookieHeader();
  const response = await api.get('/auth/session', {
    headers: { Cookie: cookie },
  });
  return response;
};

export const getMe = async (): Promise<User> => {
  const cookie = await getCookieHeader();
  const { data } = await api.get('/users/me', {
    headers: { Cookie: cookie },
  });
  return data;
};

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  tag?: string;
}): Promise<Note[]> => {
  const cookie = await getCookieHeader();
  const { data } = await api.get('/notes', {
    headers: { Cookie: cookie },
    params: { ...params, perPage: 12 },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookie = await getCookieHeader();
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookie },
  });
  return data;
};