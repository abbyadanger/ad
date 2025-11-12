I've been adding a lot of small, but mighty features to the blog. It feels good to put hard work into something I enjoy - Here's what's new!

### Read Time Calculator

### Subscribe Button
PIC
Inspired by a friend
I know not a lot of people are reading this, but didn't want people to forget
Weekly newsletter so nothing crazy

#### How it works
For my technically interested folks the way I built this feature is extremely straightforward, just how I approach all projects.
Created a free database using Supabase (freee) - The table is literally just called emails .… and it literally just stores emails.
PIC
Actually, it will store literally whatever you type into the input box, mostly for simplicity  and I didn't feel like bothering with validation.
I'll explain more* later on why this isn't a big deal when I go to actually send an email.

So that's it. You click subscribe, enter your email, the email gets added to a database, and then you see the success message - Life can be so simple.


### Weekly Newsletter
Yeah I'm very official and have a weekly newsletter for my blog that no one reads YAYYYYYYYY
Look how cute, very simple
PIC

This was a good challenge for me - Learned actually so much while doing this

#### How it works
Using EmailJS (freeeeeeeee) up to 200 emails a month which is so perfect for just a small little girl blog like this one.
Call the API
TEMPLATE PIC

CODE BLOCK

CRON JOB?


