import axios from 'axios';
import { Note, CreateNoteDto } from '@/types/note';

const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-public.goit.study/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const queryParams: Record<string, string | number> = {
    page: params.page || 1,
    perPage: params.perPage || 12,
  };

  if (params.search) {
    queryParams.search = params.search;
  }

  if (params.tag && params.tag !== 'all') {
    queryParams.tag = params.tag;
  }

  const response = await api.get<FetchNotesResponse>('/notes', { params: queryParams });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(newNote: CreateNoteDto): Promise<Note> {
  const response = await api.post<Note>('/notes', newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}