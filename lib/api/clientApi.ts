import api from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

// --- Auth ---

export interface AuthCredentials {
  email: string;
  password: string;
}

export const register = async (credentials: AuthCredentials): Promise<User> => {
  const { data } = await api.post('/auth/register', credentials);
  return data;
};

export const login = async (credentials: AuthCredentials): Promise<User> => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get('/auth/session');
  return data;
};

// --- Users ---

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const { data } = await api.patch('/users/me', userData);
  return data;
};

// --- Notes ---

export interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
}

export const fetchNotes = async (params?: FetchNotesParams): Promise<Note[]> => {
  const { data } = await api.get('/notes', { params: { ...params, perPage: 12 } });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};