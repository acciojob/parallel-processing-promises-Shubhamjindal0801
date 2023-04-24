//your JS code here. If required.
const images = [
  {url: 'https://via.placeholder.com/150/FF0000/FFFFFF'},
  {url: 'https://via.placeholder.com/150/00FF00/FFFFFF'},
  {url: 'https://via.placeholder.com/150/0000FF/FFFFFF'},
  {url: 'https://via.placeholder.com/150/FFFF00/FFFFFF'},
  {url: 'https://via.placeholder.com/150/FF00FF/FFFFFF'},
];

const downloadImagesButton = document.getElementById('download-images-button');
const outputDiv = document.getElementById('output');

downloadImagesButton.addEventListener('click', () => {
  outputDiv.innerHTML = ''; // Clear the output div before showing new images

  // Map the array of image URLs to an array of promises that resolve to image elements
  const imagePromises = images.map((image) => {
    return new Promise((resolve, reject) => {
      const imgElement = new Image();
      imgElement.onload = () => {
        resolve(imgElement);
      };
      imgElement.onerror = () => {
        reject(new Error(`Failed to load image's URL: ${image.url}`));
      };
      imgElement.src = image.url;
    });
  });

  // Use Promise.all() to wait for all images to download
  Promise.all(imagePromises)
    .then((images) => {
      // Append the downloaded images to the output div
      images.forEach((imgElement) => {
        outputDiv.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});
