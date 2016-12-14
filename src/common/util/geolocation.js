const GEOLOCATION_OPTION = {
  enableHighAccuracy: false,
  timeout: 2000,
  maximumAge: Infinity
};

function geolocation(success, error, fallback) {
  if (window.navigator && 'geolocation' in window.navigator) {
    window.navigator.geolocation.getCurrentPosition(
      success,
      error,
      GEOLOCATION_OPTION
    );
  } else {
    fallback();
  }
}

export default geolocation;
