const { createClient } = require('@supabase/supabase-js');

async function dailyDbPing() {
  try {    
    // Configure Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_KEY
    );
    
    // Simple query to keep connection alive
    await supabase.from('emails').select('count').limit(1);
    
  } catch (error) {
    console.error('❌ Error Trying to Ping the DB', error);
  }
}

// If this script is run directly, execute the ping
if (require.main === module) {
  dailyDbPing();
}