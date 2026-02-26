/* 
  This script generates a JSON file containing the list of film image files in the
  public/docs/pics/film directory. Anytime new film photos are commited to the repository,
  this script will run to update the list.

  Notes:
  - This script is essentially a duplicate of the generate-film-list-dist.js script
  - EXCEPT this script places the files in the public folder for local testing purposes
  - This script must be run manually after adding new film image files, to update the list locally
  - This script does NOT get run automatically anywhere
*/

const fs = require('fs').promises;
const path = require('path');

async function generateFilmList() {
  try {
    const filmDir = path.join(__dirname, '..', 'public', 'docs', 'pics', 'film');
    const outputFile = path.join(__dirname, '..', 'public', 'film-list.json');
    
    try {
      await fs.access(filmDir);
    } catch (error) {
      console.log(`Film directory doesn't exist: ${filmDir}`);
      await fs.writeFile(outputFile, JSON.stringify([], null, 2));
      return;
    }
    
    const files = await fs.readdir(filmDir);
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    imageFiles.sort();
    
    await fs.writeFile(outputFile, JSON.stringify(imageFiles, null, 2));
    
    console.log(`Generated film list with ${imageFiles.length} files:`);
    imageFiles.forEach(file => console.log(`  - ${file}`));
    console.log(`Saved to: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating film list:', error);
    process.exit(1);
  }
}

generateFilmList();