// TODO: IMPORT DATA FROM DATA.JS.
// I am importing data from data.js, and naming it 'data'.
import express from "express";
import { promises as fs } from "fs";
import data from "./data.js";

// TODO: WHICH VEHICLE HAS THE HIGHEST MILEAGE?

const highMileageVehicle = data

  // Map over array and grab 'vehicles' to destructure. Then use sort to get 'each' persons highest milage, then using sort again to get highest milage in 'all' persons (in whole array).
  .map(({ vehicles }) => vehicles.sort((a, b) => b.mileage - a.mileage)[0])
  .sort((a, b) => b.mileage - a.mileage)[0];

fs.writeFile("./high-mileage-vehicle.json", JSON.stringify(highMileageVehicle));

// TODO: WHAT IS TOTAL MILEAGE OF ALL VEHICLES?

// Use reduce to get each mileage and add to current total of mileage of each persons vehicle (total/sum, iterator), then we reduce again to get each persons total mileage to add together to get the total mileage of all the vehicles in the array.
const totalMileage = data.reduce((total, currentPerson) => {
  total += currentPerson.vehicles.reduce((personTotal, currentVehicle) => {
    personTotal += currentVehicle.mileage;

    // We have to return a value to finish out 'personTotal'.
    return personTotal;

    // Initialize to '0'.
  }, 0);

  // We have to return a value to finish out 'totalMileage'.
  return total;

  // Initialize to '0'.
}, 0);

fs.writeFile("./total-milage.json", JSON.stringify(totalMileage));

// TODO: FILTER YAHOO.COM EMAILS (return just the emails).

const yahooEmails = data

  // I first filter out email to deconstruct, then used 'endsWith' to grab only those emails ending with "yahoo.com".
  .filter(({ email }) => email.endsWith("yahoo.com"))

  // I then used map to pull out email to destructure so only 'email' would be returned.
  .map(({ email }) => email);

fs.writeFile("./yahoo-emails.json", JSON.stringify(yahooEmails));

// TODO: FILTER VEHICLES WITH MORE THAN 36000 MILES (no personal info).

const highMileageVehicles = data

  // Map over objects and just destructure vehicles. From there I can filter mileage out for destructure. I then checked if each mileage was equal to or greater than 36000 miles.
  .map(({ vehicles }) => vehicles.filter(({ mileage }) => mileage >= 36000))

  // I used 'flat' to get rid of all sub and empty arrays to just get the vehicles with said mileage.
  .flat();

fs.writeFile(
  "./high-mileage-vehicles.json",
  JSON.stringify(highMileageVehicles)
);

// TODO: FILTER OUT ALL ILLINOIS VEHICLES AND SUM TOTAL MILEAGE.

const totalMileageIL = data

  // Map over objects and just destructure vehicles. From there I can filter "st" out for destructure. I check to see if "st === Illinois".
  .map(({ vehicles }) => vehicles.filter(({ st }) => st === "Illinois"))

  // I use 'flat' to get only results with "st === Illinois"
  .flat()

  // I then reduce to add each vehicle to the running sum of Illinois vehicles using (sum, iterator).
  .reduce((total, currentVehicle) => {
    total += currentVehicle.mileage;

    // Have to make sure to return value.
    return total;
  }, 0);

fs.writeFile("./total-mileage-illinois.json", JSON.stringify(totalMileageIL));

// Express
const app = express();
app.get("/:page", (req, res) => {
  fs.readFile(`${req.params.page}.json`, "utf-8")
    .then((contents) => {
      res.json(contents);
    })
    .catch(() => {
      res.statusCode = 404;
      res.end("404!");
    });
});
app.listen(3000, () => {
  console.info("Server running");
});
