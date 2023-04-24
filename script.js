//your JS code here. If required.
const images = [
{ url: "https://picsum.photos/id/237/200/300" },
{ url: "https://picsum.photos/id/238/200/300" },
{ url: "https://picsum.photos/id/239/200/300" },
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
