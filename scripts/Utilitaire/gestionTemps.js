const jourSemaine = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
let aujd = new Date();
let options = { weekday: "long" };
let jourActuel = aujd.toLocaleDateString("fr-Fr", options);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);
let tableDaysInOrder = jourSemaine
  .slice(jourSemaine.indexOf(jourActuel))
  .concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));

export default tableDaysInOrder;
