import config from "../config/config";

class PointParser {
    upper: number[];
    lower: number[];

    constructor(count: number) {
        this.upper = this.get_list(count);
        this.lower = this.get_list_minus(count);
    }

    reverse() {
        let temp = this.upper.reverse();
        this.upper = this.lower.reverse();
        this.lower = temp;

        return this;
    }

    get(name: string) {
        switch (name) {
            case "upper":
                return this.upper;
            case "lower":
                return this.lower;
        }

        return [];
    }

    get_list(count: number) {
        if (count < 1) {
            return [];
        }

        let _points = config.point.list;
        let _slice = 0;

        switch(true) {
            case count < 10:
                _slice = 2;
                break;
            case count < 15:
                _slice = 3;
                break;
            case count < 20:
                _slice = 4;
                break;
            case count < 25:
                _slice = 5;
                break;
            case count < 30:
                _slice = 6;
                break;
            default:
                _slice = _points.length - 1;
                break;
        }

        _points = _points.slice(0, _slice);

        if (count < 20) {
            _points = _points.slice(1);
        }

        return _points.sort((a: number, b: number) => b - a).map((x: number) =>  x * config.point.pad);
    }

    get_list_minus(count: number) {
        let _points = this.get_list(count);

        return _points.sort((a: number, b: number) => a - b).map((x: number) => x * -1);
    }
}


export default PointParser