const { DateTime } = require("luxon");

exports.secondsToNextUpdate = function secondsToNextUpdate() {
  return (DateTime
    .local()
    .setZone("Europe/Riga")
    .endOf("day")
    .diffNow()
    .as("seconds") << 0) + 5;
}