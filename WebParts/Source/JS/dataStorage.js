//#region The main entity for all objects (selectable objects).
class DataObject {
    id = -1;
    name = "";
    description = "";
    specialNote = "null";
    img = "null";
    constructor(id,specialNote, name, description) {
        this.id = id;
        this.specialNote = specialNote;
        this.name = name;
        this.description = description;
    }
}
//#endregion

var localData = [
    new DataObject(1,"Vacuum","Полиэфир АГРО","Высокая надежность -Отечественное производство -Невысокая стоимость"),
    new DataObject(2,"Vacuum","GEA","Немецкое качество -Долговечность"),
    new DataObject(3,"Vacuum","СТА","Высокая производительность за разумные деньги-"),
];

var IndexStack = [];

var Iteratot = [
    {Data: "Vacuum", Index: 1},
    {Data: "4", Index: 2},
    {Data: "5", Index: 3},
    {Data: "6", Index: 4},
];
