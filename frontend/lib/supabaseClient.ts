import { createClient } from "@supabase/supabase-js";

const supabaseUrl: any = 'https://bguqowdrtmqmpxuxekwt.supabase.co';
const supabaseAnonKey: any = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJndXFvd2RydG1xbXB4dXhla3d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MDcwMDgsImV4cCI6MjAyOTI4MzAwOH0.UnRKSXkwbXbPJ9j1zanfip9RoUnx4qJPJyCI1CYbB80';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
