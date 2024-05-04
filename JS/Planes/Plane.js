class Plane {
    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity) {
        this._model = model;
        this._maxSpeed = maxSpeed;
        this._maxFlightDistance = maxFlightDistance;
        this._maxLoadCapacity = maxLoadCapacity;
    }

    get model() {
        return this._model;
    }

    get maxSpeed() {
        return this._maxSpeed;
    }

    get maxFlightDistance() {
        return this._maxFlightDistance;
    }

    get maxLoadCapacity() {
        return this._maxLoadCapacity;
    }
}

module.exports = Plane;