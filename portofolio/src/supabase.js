import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oymwneipayqbystelefv.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95bXduZWlwYXlxYnlzdGVsZWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NzY4ODAsImV4cCI6MjA4NzQ1Mjg4MH0.BHn1givU-OpDc2fFQuvQjFadOjRH66lTf9P3HUb9JnY';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth
export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

export const signOut = () => supabase.auth.signOut();

export const getSession = () => supabase.auth.getSession();

// Projects (carousel)
export const getProjects = () =>
  supabase.from('projects').select('*').eq('is_visible', true).order('sort_order');

export const getAllProjects = () =>
  supabase.from('projects').select('*').order('sort_order');

export const upsertProject = (project) =>
  supabase.from('projects').upsert(project).select();

export const deleteProject = (id) =>
  supabase.from('projects').delete().eq('id', id);

// Project Categories (modal detail)
export const getProjectCategories = () =>
  supabase.from('project_categories').select('*').order('sort_order');

export const upsertProjectCategory = (category) =>
  supabase.from('project_categories').upsert(category).select();

// Skills
export const getSkills = () =>
  supabase.from('skills').select('*').order('sort_order');

export const upsertSkill = (skill) =>
  supabase.from('skills').upsert(skill).select();

export const deleteSkill = (id) =>
  supabase.from('skills').delete().eq('id', id);

// Settings
export const getSetting = (key) =>
  supabase.from('settings').select('value').eq('key', key).single();

export const updateSetting = (key, value) =>
  supabase.from('settings').upsert({ key, value });

export const getAllSettings = () =>
  supabase.from('settings').select('*');

// Experiences
export const getExperiences = () =>
  supabase.from('experiences').select('*').order('sort_order');

export const upsertExperience = (exp) =>
  supabase.from('experiences').upsert(exp).select();

export const deleteExperience = (id) =>
  supabase.from('experiences').delete().eq('id', id);

// Org Activities
export const getOrgActivities = () =>
  supabase.from('org_activities').select('*').order('sort_order');

export const upsertOrgActivity = (org) =>
  supabase.from('org_activities').upsert(org).select();

export const deleteOrgActivity = (id) =>
  supabase.from('org_activities').delete().eq('id', id);

// Image upload
export const uploadProjectImage = async (file) => {
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: urlData } = supabase.storage
    .from('project-images')
    .getPublicUrl(fileName);
  return urlData.publicUrl;
};

export const deleteProjectImage = async (url) => {
  const fileName = url.split('/').pop();
  return supabase.storage.from('project-images').remove([fileName]);
};