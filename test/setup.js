import jsdom from 'jsdom-no-contextify';
import { DEFAULT_LAT, DEFAULT_LONG } from "../src/common/actions/search";

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
global.window.navigator = {
  geolocation: {
    getCurrentPosition: (success, error, options) => {
      const pos = {
        coords: {
          latitude: DEFAULT_LAT,
          longitude: DEFAULT_LONG
        }
      };

      success(pos);
    }
  }
};

global.window.io = {};
