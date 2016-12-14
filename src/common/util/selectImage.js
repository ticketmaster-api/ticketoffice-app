import _ from 'lodash';

const selectWidestNonFallback = (imageArray) => {
  // Filter out fallback images
  const nonFallbackImages = imageArray.filter(element => !element.fallback);

  // Find the widest nonfallback image, but if all images are fallback, then just find the widest regardless
  const imageCandidates = nonFallbackImages.length ? nonFallbackImages : imageArray;
  const widestImage = _.maxBy(imageCandidates, 'width');
  return widestImage || null;
};

export default selectWidestNonFallback;
