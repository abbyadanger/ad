# Abby Danger Blog

My personal blog & photography portfolio.

## 🌟 Features

- **Blog System**: Markdown-based blog posts with dynamic routing
- **Photography Gallery**: Film photography showcase with image management
- **Newsletter Subscription**: Email collection with automated weekly updates
- **Server-Side Rendering**: Fast loading and SEO optimization via Angular SSR
- **Static Hosting**: Deployed on GitHub Pages with pre-rendered content

## 🛠️ Tech Stack

### Frontend
- **Angular 18+**: Modern framework with standalone components and signals
- **TypeScript**: Type-safe development
- **Angular SSR**: Server-side rendering for performance and SEO
- **Responsive Design**: Mobile-first CSS with custom styling

### Backend Services
- **Supabase**: Database for storing email subscribers
- **EmailJS**: Automated newsletter sending service
- **GitHub Pages**: Static site hosting

### Content Management
- **Markdown**: Blog posts written in `.md` files
- **JSON Metadata**: Post information stored in `blog-posts.json`
- **Dynamic Image Loading**: Automated film photo list generation

## 🔄 How It Works

### Content Flow
1. **Write**: Blog posts created as markdown files in `public/docs/published/`
2. **Index**: `blog-posts.json` contains metadata (titles, slugs, tags, dates)
3. **Route**: Angular routes like `/blog/post-name` load corresponding markdown
4. **Render**: Markdown parsed to HTML and displayed with syntax highlighting

### Email System
1. **Collection**: Visitors subscribe via email input component
2. **Storage**: Emails saved to Supabase database
3. **Newsletter**: Weekly script checks for new blog posts
4. **Delivery**: EmailJS sends formatted newsletters to all subscribers

### Photo Gallery
1. **Upload**: Images added to `public/docs/pics/film/` directory
2. **Index**: `generate-film-list.js` scans folder and creates JSON index
3. **Display**: Angular component dynamically loads and displays images

## 📝 Adding Content

### New Blog Post
1. Create markdown file in `public/docs/published/`
2. Add entry to `blog-posts.json` with metadata
3. Commit to the repository
4. Build and deploy

### New Photos
1. Add images to `public/docs/pics/film/`
3. Commit to the repository
4. Rebuild application

## 🌐 Live Site

Visit the blog at [abbydanger.com](https://abbydanger.com) to see the live version.
