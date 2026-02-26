/* 
  This script generates a JSON file containing the list of film image files in the
  public/docs/pics/film directory. Anytime new film photos are commited to the repository,
  this script will run to update the list.

  Notes:
  - This script places the files in the dist folder for deployment
*/

const fs = require('fs').promises;
const path = require('path');

async function generateFilmListForDist() {
  try {

    /* Create file paths */
    const filmDir = path.join(__dirname, '..', 'public', 'docs', 'pics', 'film');
    const outputFile = path.join(__dirname, '..', 'dist', 'abby-app', 'browser', 'film-list.json');
    
    /* Check if directory exists */
    try {
      await fs.access(filmDir);
    } catch (error) {
      console.log(`Film directory doesn't exist: ${filmDir}`);
      /* Create empty list if directory doesn't exist */
      await fs.writeFile(outputFile, JSON.stringify([], null, 2));
      return;
    }
    
    /* Read directory contents */
    const files = await fs.readdir(filmDir);
    
    /* Filter for image files only */
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    
    /* Sort alphabetically */
    imageFiles.sort();
    
    /* Write to JSON file */
    await fs.writeFile(outputFile, JSON.stringify(imageFiles, null, 2));
    console.log(`Generated film list in dist with ${imageFiles.length} files:`);
    imageFiles.forEach(file => console.log(`  - ${file}`));
    console.log(`Saved to: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating film list for dist:', error);
    process.exit(1);
  }
}

/* Runs the script */
generateFilmListForDist();