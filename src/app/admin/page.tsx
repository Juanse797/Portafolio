import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';
import AdminDashboard from '@/components/admin/admin-dashboard';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  return <AdminDashboard initialProjects={(projects as Project[]) || []} />;
}
