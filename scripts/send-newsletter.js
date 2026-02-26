/* 
  This script sends a newsletter email to all subscribers in the Supabase DB.
*/

const { createClient } = require('@supabase/supabase-js');
const emailjs = require('@emailjs/nodejs');
const fs = require('fs'); 

async function sendWeeklyNewsletter() {
  try {
    /* Check if environment is set up correctly */
    console.log('🚀 Starting newsletter process...');
    console.log('Environment check:');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
    console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Set' : 'Missing');
    console.log('EMAILJS_SERVICE_ID:', process.env.EMAILJS_SERVICE_ID ? 'Set' : 'Missing');
    console.log('EMAILJS_TEMPLATE_ID:', process.env.EMAILJS_TEMPLATE_ID ? 'Set' : 'Missing');
    console.log('EMAILJS_PUBLIC_KEY:', process.env.EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing');
    console.log('EMAILJS_PRIVATE_KEY:', process.env.EMAILJS_PRIVATE_KEY ? 'Set' : 'Missing');
    
    /* Load and filter blog posts from the past week */
    console.log('📚 Loading blog posts...');
    const blogPostsData = JSON.parse(fs.readFileSync('public/blog-posts.json', 'utf8'));
    
    /* Get current date and one week ago */
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    /* Filter published posts from the past week */
    const recentPosts = blogPostsData.posts.filter(post => {
      if (!post.published || !post.dateFormatted) return false;
      
      /* Parse the date format (MM.DD.YYYY) to year, month, day variables */
      const [month, day, year] = post.dateFormatted.split('.');
      const postDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      
      /* Returns true when the post date is within the past week */
      return postDate >= oneWeekAgo && postDate <= now;
    });
    
    console.log(`Found ${recentPosts.length} posts from the past week`);
    
    /* HTML for email content */
    let message = '';
    if (recentPosts.length > 0) {
      const postLinks = recentPosts.map(post => 
        `📝 <a href="https://abbydanger.com/blog/${post.slug}" style="color: #2c5f73; text-decoration: underline;">${post.title}</a>`
      ).join('<br>');
      
      message = `
        <div style="font-family: 'Quicksand', sans-serif; background-color: white; color: #2c5f73; padding: 16px; line-height: 1.4; border-radius: 8px;">
          <div style="text-align: left; margin-bottom: 16px;">
            <img src="https://abbydanger.com/ad.png" alt="Abby Danger Logo" style="width: 60px; height: 60px;">
          </div>
          <p>Hi there 👋</p>
          <p>Here's what I wrote about on the blog this week:</p>
          <p>${postLinks}</p>
          <p>Read more at <a href="https://abbydanger.com/blog" target="_blank" rel="noopener" style="color: #2c5f73; text-decoration: underline;">abbydanger.com/blog</a></p>
          <p>Talk Soon,<br>A</p>
        </div>
      `;
    } else {
      message = `
        <div style="font-family: 'Quicksand', sans-serif; background-color: white; color: #2c5f73; padding: 16px; line-height: 1.4; border-radius: 8px;">
          <div style="text-align: left; margin-bottom: 16px;">
            <img src="https://abbydanger.com/ad.png" alt="Abby Danger Logo" style="width: 60px; height: 60px;">
          </div>
          <p>Hi there 👋</p>
          <p>No new posts this week - Maybe next week 😉</p>
          <p>Read more at <a href="https://abbydanger.com/blog" target="_blank" rel="noopener" style="color: #2c5f73; text-decoration: underline;">abbydanger.com/blog</a></p>
          <p>Talk Soon,<br>A</p>
        </div>
      `;
    }
    
    /* Configure Supabase client */    
    const supabase = createClient(
      process.env.SUPABASE_URL, 
      process.env.SUPABASE_KEY
    );

    /* Get all subscribers from DB */
    const { data: subscribers, error } = await supabase.from('emails').select('email');
    if (error) {
      console.error('❌ Supabase Error:', error);
      throw error;
    }
    console.log(`📧 Found ${subscribers?.length || 0} subscribers`);
    
    /* Send emails to 5 subscribers at a time */
    let sent = 0;
    let failed = 0;
    const batchSize = 5;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      const batchPromises = batch.map(async (subscriber) => {
        try {
          console.log(`Sending to: ${subscriber.email}`);
          console.log(`Using Service ID: ${process.env.EMAILJS_SERVICE_ID}`);
          console.log(`Using Template ID: ${process.env.EMAILJS_TEMPLATE_ID}`);
          
          /* Call EmailJS API to send email */
          const result = await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            {
              to_email: subscriber.email,
              subject: 'Weekly Blog Update from Abby Danger',
              message: message,
              from_name: 'Abby Danger'
            },
            {
              publicKey: process.env.EMAILJS_PUBLIC_KEY,
              privateKey: process.env.EMAILJS_PRIVATE_KEY,
            }
          );
          
          console.log(`✅ ${subscriber.email} - Result:`, result);
          sent++;
        } catch (emailError) {
          console.error(`❌ ${subscriber.email}: ${emailError.message || '❌ Unknown error'}`);
          console.error('Full error object:', JSON.stringify(emailError, null, 2));
          console.error('Error name:', emailError.name);
          console.error('Error status:', emailError.status);
          console.error('Error text:', emailError.text);
          failed++;
        }
      });
      
      /* Wait for all emails in current batch to finish sending */
      await Promise.all(batchPromises);
      
      /* Add delay between batches */
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log(`📊 Newsletter complete! Sent: ${sent}, Failed: ${failed}`);
    
  } catch (error) {
    console.error('❌ Error sending weekly newsletter:', error);
    process.exit(1);
  }
}

/* Runs the script */
sendWeeklyNewsletter();