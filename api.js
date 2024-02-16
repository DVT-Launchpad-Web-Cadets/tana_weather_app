export const getF1Data = fetch(
  "http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json"
).then((response) => response.json());
