/*
  Generates a runtime config file with public client-side values.
  This keeps values out of committed source while still allowing a static build.
*/

const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'public', 'app-config.json');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Warning: SUPABASE_URL or SUPABASE_ANON_KEY is missing. Writing empty public config.');
}

const config = {
  supabaseUrl,
  supabaseAnonKey,
};

fs.writeFileSync(outputPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
console.log(`Generated ${outputPath}`);
