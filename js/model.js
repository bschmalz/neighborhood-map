// Global variables. 
var map;
var largeInfowindow;

// This is a template that we use to populate infoWindows. The matching part of the template is on the HTML file so that it loads properly for knockout. 
var infoWindowTemplate = '<div id="info-window"' + 'data-bind="template: { name: \'info-window-template\', data: viewModel.placeData}">' + '</div>';


// Model info representing the locations and coordinates of our places of interest. 
var model = [
  {
    name: "Echo Mountain", 
    latlng: [34.204037, -118.130727] 
  },
    {
    name: "Mount Baldy", 
    latlng: [34.263857, -117.633171]
  },
  {
    name: "IceHouse Canyon", 
    latlng: [34.250548, -117.635915]
  },
  {
    name: "Bridge to Nowhere", 
    latlng: [34.237041, -117.765125]
  },
  {
    name: "Mount Wilson", 
    latlng: [34.169445, -118.048322]
  },
  {
    name: "Devil's Punchbowl", 
    latlng: [34.414584, -117.859712]
  },
  {
    name: "Switzer Falls", 
    latlng: [34.266005, -118.144769]
  },
  {
    name: "Gabrielino Trail", 
    latlng: [34.193337, -118.168434]
  },
  {
    name: "Monrovia Canyon", 
    latlng: [34.174983, -117.987154]
  },
  {
    name: "Crystal Lake", 
    latlng: [34.32416, -117.835568]
  },
  {
    name: "North Etiwanda Preserve", 
    latlng: [34.165617, -117.523311]
  },
  {
    name: "Strawberry Peak", 
    latlng: [34.258502, -118.104763]
  },
  {
    name: "Cooper Canyon Falls", 
    latlng: [34.346094, -117.914629]
  }
];