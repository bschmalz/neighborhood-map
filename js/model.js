var map;
var markers = []; 

var model = [
  {
    name: "Echo Mountain", 
    Address: "E Loma Alta Dr At Lake Ave, Altadena, CA 91001", 
    latlng: {lat: 34.204037, lng: -118.130727}
  },
    {
    name: "Mount Baldy", 
    Address: "6700 Mount Baldy Rd, Mount Baldy, CA 91759", 
    latlng: {lat: 34.263857, lng: -117.633171}
  },
  {
    name: "IceHouse Canyon", 
    Address: "Mount Baldy, CA 91759", 
    latlng: {lat: 34.250548, lng: -117.635915}
  },
  {
    name: "Bridge to Nowhere", 
    Address: "Sheep Mountain at East Fork Rd, Azusa, CA 91702", 
    latlng: {lat: 34.237041, lng: -117.765125}
  },
  {
    name: "Mount Wilson", 
    Address: "189 E Mira Monte Ave, Sierra Madre, CA 91024", 
    latlng: {lat: 34.169445, lng: -118.048322}
  },
  {
    name: "Devil's Punchbowl", 
    Address: "Devil's Punchbowl, 28000 Devils Punchbowl Rd, Pearblossom, CA 93553, USA", 
    latlng: {lat: 34.414584, lng: -117.859712}
  },
  {
    name: "Switzer Falls", 
    Address: "34-14 Angeles Crest Hwy, La Canada Flintridge, CA 91011", 
    latlng: {lat: 34.266005, lng: -118.144769}
  },
  {
    name: "Gabrielino Trail", 
    Address: "Windsor St, Altadena, CA", 
    latlng: {lat: 34.193337, lng: -118.168434}
  },
  {
    name: "Monrovia Canyon", 
    Address: "1200 N Canyon Blvd, Monrovia, CA 91016", 
    latlng: {lat: 34.174983, lng: -117.987154}
  },
  {
    name: "Crystal Lake", 
    Address: "San Gabriel Canyon, Azusa, CA 91702", 
    latlng: {lat: 34.32416, lng: -117.835568}
  },
  {
    name: "North Etiwanda Preserve", 
    Address: "4800 Etiwanda Ave, Rancho Cucamonga, CA 91739", 
    latlng: {lat: 34.165617, lng: -117.523311}
  },
  {
    name: "Strawberry Peak", 
    Address: "Angeles Crest Hwy at Mile Marker 38.4, Los Angeles, CA", 
    latlng: {lat: 34.258502, lng: -118.104763}
  },
  {
    name: "Cooper Canyon Falls", 
    Address: "Angeles Crest Highway, Buckhorn Campground, Angeles National Forest, La Canada Flintridge, CA", 
    latlng: {lat: 34.346094, lng: -117.914629}
  }
];