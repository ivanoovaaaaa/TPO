const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/MilitaryType');
const experimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {
    constructor(planes) {
        this.planes = planes;
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        const passengerPlanes = this.getPassengerPlanes();
        return passengerPlanes.reduce((maxCapacityPlane, plane) => {
            if (plane.passengersCapacity > maxCapacityPlane.passengersCapacity) {
                return plane;
            } else {
                return maxCapacityPlane;
            }
        }, passengerPlanes[0]);
    }

    getTransportMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.militaryType === MilitaryType.TYPE_TRANSPORT);
    }

    getBomberMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.militaryType === MilitaryType.BOMBER);
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof experimentalPlane);
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => (a.maxFlightDistance > b.maxFlightDistance) ? 1 : -1);
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => (a.maxSpeed > b.maxSpeed) ? 1 : -1);
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => (a.MinLoadCapacity > b.MinLoadCapacity) ? 1 : -1);
        return this;
    }

    getPlanes() {
        return this.planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;