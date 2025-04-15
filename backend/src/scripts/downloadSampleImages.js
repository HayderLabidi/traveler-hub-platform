
const fs = require('fs');
const path = require('path');
const https = require('https');

// Create the sample-data directory if it doesn't exist
const sampleDataDir = path.join(__dirname, '../sample-data');
if (!fs.existsSync(sampleDataDir)) {
  fs.mkdirSync(sampleDataDir, { recursive: true });
}

// Sample image URLs
const sampleImages = {
  'admin-profile.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
  'driver-profile.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  'passenger-profile.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'car-image.jpg': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a'
};

// Function to download an image
const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(sampleDataDir, filename);
    const file = fs.createWriteStream(filePath);
    
    console.log(`Downloading ${filename} from ${url}`);
    
    https.get(`${url}?w=500&h=500&fit=crop`, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
};

// Download all sample images
const downloadAllImages = async () => {
  try {
    console.log('Starting download of sample images...');
    
    const downloadPromises = Object.entries(sampleImages).map(([filename, url]) => 
      downloadImage(url, filename)
    );
    
    await Promise.all(downloadPromises);
    
    console.log('All sample images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading sample images:', error);
  }
};

// Run the download function
downloadAllImages();
