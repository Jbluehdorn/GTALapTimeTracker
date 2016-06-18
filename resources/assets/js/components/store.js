import linq from 'jslinq'

export default {
  loading: false,
  errors: [],
  vehiclesToRetrieve: 'all',
  vehicles: [],
  getVehicles: function() {
    var self = this;
    var data = fs.readFileSync('./data/vehicles.json', 'utf-8');

    if(!data.length) {
      this.errors.push('Vehicles could not be loaded!');
      return;
    }

    this.vehicles = JSON.parse(data);

    this.vehicles.forEach(function(vehicle) {
      vehicle.bestLap = self.bestLap(vehicle);
    });
  },
  bestLap(vehicle) {
    var bestLap = linq(vehicle.laps).min();
    return bestLap;
  },
  googleSearch: {
    key: 'AIzaSyBrlxgxkdO3vIinnnW-JJ6p8oWt0z3FAKk',
    cx: '004302888517018811823:feaew-bodyc'
  }
}
