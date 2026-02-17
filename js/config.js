// Supabase Configuration
const SUPABASE_URL = 'https://nbfcxoiuoormrllqtytp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iZmN4b2l1b29ybXJsbHF0eXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTQ2NDAsImV4cCI6MjA4NjgzMDY0MH0.mkBsy8pP1G0JG9VI5Lz9tsErmVir4SragCbZuoncdqk';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

dayjs.locale('si');
