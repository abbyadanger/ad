/* 
  This script pings my Supabase DB daily to keep the connection alive and to prevent pausing!
*/

const { createClient } = require('@supabase/supabase-js');

async function dailyDbPing() {
  try {
    /* Configure Supabase client */    
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_KEY
    );
    
    /* Simple query that gets email count and keeps connection alive */
    emailCount = await supabase.from('emails').select('count');
    console.log(`✅ Daily DB Ping successful! Email count: ${emailCount?.count || 0}`);
    
  } catch (error) {
    console.error('❌ Error Trying to Ping the DB', error);
  }
}

/*  
  Node.js pattern that checks to see if this script is being run directly.
    Allows the script to:
    1. Be run as a standalone script
    2. Be a reusable module that can be exported
*/
if (require.main === module) {
  dailyDbPing();
}