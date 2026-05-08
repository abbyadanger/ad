/* 
  This script pings my Supabase DB daily to keep the connection alive and to prevent pausing!
*/

const { createClient } = require('@supabase/supabase-js');

async function dailyDbPing() {
  try {
    /* Configure Supabase client - Hard code these values to test locally */    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
        
    /* Error handling for missing environment variables */    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
    }
    
    /* Connect to Supabase */
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    /* Simple query that gets email count and keeps connection alive.
        - count: 'exact' runs COUNT(*) internally
        - head: true only tells the DB to make an HTTP HEAD request instead of GET which
          prevents fetching all rows, only returns the count
    */
    const { count, error } = await supabase
      .from('emails')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    console.log(`✅ Daily DB Ping successful! Email count: ${count}`);
    
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