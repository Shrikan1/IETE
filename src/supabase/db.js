import { supabase } from './client';

/**
 * Generic Fetcher
 */
export async function getTable(table, options = {}) {
  let query = supabase.from(table).select('*');
  
  if (options.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? false });
  }
  
  const { data, error } = await query;
  if (error) {
    console.error(`[db.js] Error fetching table "${table}":`, error);
    throw error;
  }
  return data;
}

export async function getSingle(table, id) {
  // .maybeSingle() returns null instead of throwing an error (406) if no records are found
  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle();
  
  if (error) {
    console.error(`[db.js] Error fetching single from "${table}":`, error);
    throw error;
  }
  return data;
}

export const getDocument = (table, id) => getSingle(table, id);

// ──── Events ────────────────────────────────────────────────────────────────
export const getEvents = () => getTable('events', { orderBy: { column: 'created_at' } });

export const addEvent = async (data) => {
  // Defensive: remove fields that might cause PGRST204 in 'events'
  const { gallery, dept, registered, seats, ...insertData } = data;
  const { data: res, error } = await supabase.from('events').insert([insertData]).select();
  if (error) throw error;
  return res[0];
};

export const updateEvent = async (id, data) => {
  // Defensive: remove fields that might cause PGRST204 in 'events'
  const { gallery, dept, registered, seats, ...updateData } = data; 
  const { data: res, error } = await supabase.from('events').update(updateData).eq('id', id).select();
  if (error) throw error;
  return res[0];
};

export const deleteEvent = async (id) => {
  const { error } = await supabase.from('events').delete().eq('id', id);
  if (error) throw error;
};

// ──── Sub-Events ────────────────────────────────────────────────────────────
export const getSubEventsByParent = async (parentId) => {
  const { data, error } = await supabase
    .from('sub_events')
    .select('*')
    .eq('event_id', parentId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const addSubEvent = async (data) => {
  // Defensive: remove any fields that might not exist in the DB schema
  const { gallery, ...insertData } = data;
  const { data: res, error } = await supabase.from('sub_events').insert([insertData]).select();
  if (error) throw error;
  return res[0];
};

export const updateSubEvent = async (id, data) => {
  // Defensive: remove any fields that might not exist in the DB schema
  const { gallery, ...updateData } = data;
  const { data: res, error } = await supabase.from('sub_events').update(updateData).eq('id', id).select();
  if (error) throw error;
  return res[0];
};

export const deleteSubEvent = async (id) => {
  const { error } = await supabase.from('sub_events').delete().eq('id', id);
  if (error) throw error;
};

// ──── Departments ───────────────────────────────────────────────────────────
export const getDepartments = () => getTable('departments');
export const addDepartment = async (data) => {
  const { data: res, error } = await supabase.from('departments').insert([data]).select();
  if (error) throw error;
  return res[0];
};
export const updateDepartment = async (id, data) => {
  const { data: res, error } = await supabase.from('departments').update(data).eq('id', id).select();
  if (error) throw error;
  return res[0];
};
export const deleteDepartment = async (id) => {
  const { error } = await supabase.from('departments').delete().eq('id', id);
  if (error) throw error;
};

// ──── Achievements ──────────────────────────────────────────────────────────
export const getAchievements = () => getTable('department_achievements');
export const addAchievement = async (data) => {
  // Defensive: explicitly remove dept and deptId to prevent PGRST204 errors
  const { dept_id, dept, deptId, ...rest } = data;
  const insertData = { 
    ...rest, 
    dept_id: (dept_id || null) === '' ? null : dept_id 
  };
  const { data: res, error } = await supabase.from('department_achievements').insert([insertData]).select();
  if (error) throw error;
  return res[0];
};

export const updateAchievement = async (id, data) => {
  // Defensive: explicitly remove dept and deptId to prevent PGRST204 errors
  const { dept_id, dept, deptId, ...rest } = data;
  const updateData = { 
    ...rest, 
    dept_id: (dept_id || null) === '' ? null : dept_id 
  };
  const { data: res, error } = await supabase.from('department_achievements').update(updateData).eq('id', id).select();
  if (error) throw error;
  return res[0];
};
export const deleteAchievement = async (id) => {
  const { error } = await supabase.from('department_achievements').delete().eq('id', id);
  if (error) throw error;
};

// ──── Team ──────────────────────────────────────────────────────────────────
export const getTeam = () => getTable('team');
export const addTeamMember = async (data) => {
  const { gender, department, ...insertData } = data;
  const { data: res, error } = await supabase.from('team').insert([insertData]).select();
  if (error) throw error;
  return res[0];
};
export const updateTeamMember = async (id, data) => {
  const { gender, department, ...updateData } = data;
  const { data: res, error } = await supabase.from('team').update(updateData).eq('id', id).select();
  if (error) throw error;
  return res[0];
};
export const deleteTeamMember = async (id) => {
  const { error } = await supabase.from('team').delete().eq('id', id);
  if (error) throw error;
};

// ──── Gallery ───────────────────────────────────────────────────────────────
export const getGallery = () => getTable('gallery');
export const addGalleryEntry = async (data) => {
  const { data: res, error } = await supabase.from('gallery').insert([data]).select();
  if (error) throw error;
  return res[0];
};
export const deleteGalleryEntry = async (id) => {
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  if (error) throw error;
};
export const updateGalleryEntry = async (id, data) => {
  const { data: res, error } = await supabase.from('gallery').update(data).eq('id', id).select();
  if (error) throw error;
  return res[0];
};

// ──── Settings ──────────────────────────────────────────────────────────────
export const getSettings = () => getSingle('settings', 'general');
export const updateSettings = async (data) => {
  const { data: res, error } = await supabase.from('settings').upsert({ id: 'general', ...data }).select();
  if (error) throw error;
  return res[0];
};
