const hasSubClasses = (obj) => {
  const embedded = obj._embedded;

  if (!embedded) {
    return false;
  }

  const { genres, subgenres } = embedded;
  return genres || subgenres || false;
};

const searchForName = (classificationId, classificationsArray) => {
  let found = null;
  if (classificationsArray && classificationsArray.length > 0) {
    classificationsArray.forEach((classification) => {
      if (classification.id === classificationId) {
        found = classification;
      } else {
        const subClasses = hasSubClasses(classification);
        if (subClasses) {
          const recursiveFound = searchForName(classificationId, subClasses);
          if (recursiveFound) {
            found = recursiveFound;
          }
        }
      }
    });
  }

  return found;
};

export function parseClassificationDetails(rawData, classificationId) {
  if (!classificationId) {
    return rawData;
  }

  const { segment } = rawData;
  let parsed = Object.assign({}, rawData);

  const found = searchForName(classificationId, [segment]);

  if (found && found.name) {
    parsed.classificationName = found.name;
  }

  return parsed;
}
