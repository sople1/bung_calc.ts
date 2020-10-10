import React from 'react';
import Form from './Form';
import PreviewPoint from './PreviewPoint';
import PointParser from "./PointParser";
import ResultView from "./ResultView";


interface Props{

}

interface State{
    all: number,
    passed: number,
    reverse: boolean
}

class Calculator extends React.Component<Props, State> {
    state: State = {
        all: 0,
        passed: 0,
        reverse: false
    };

    handleChange = {
        people_all: (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = parseInt(event.target.value);
            let key_name = "all";
            if (isNaN(value)) {
                event.target.value = `0`;
                event.target.select();
            }
            else {
                if (value >= 100)
                    event.target.value = '99';
            }
            this.setState({...this.state, [key_name]: parseInt(event.target.value), passed: 0, reverse: false});
        },
        people_passed: (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = parseInt(event.target.value);
            let key_name = "passed";
            if (isNaN(value)) {
                event.target.value = `0`;
                event.target.select();
            }
            else {
                if (value >= 100)
                    event.target.value = '99';
                if (value >= this.state.all)
                    event.target.value = `${this.state.all}`;
            }
            this.setState({...this.state, [key_name]: parseInt(event.target.value)});
        },
        reverse: (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({...this.state, [event.target.name]: event.target.checked});
        }
    }

    init_point() {
        let point = new PointParser(this.state.all);
        if (this.state.reverse)
            point = point.reverse();

        return point;
    }

        render() {
        let point = this.init_point();

        return (
            <div className="Calculator">
                <h1>hello</h1>
                <Form all={this.state.all}
                      passed={this.state.passed}
                      reverse={this.state.reverse}
                      handleChange={this.handleChange} />
                <PreviewPoint point={point}
                              reverse={this.state.reverse} />
                <ResultView all={this.state.all}
                            passed={this.state.passed}
                            point={point}
                            reverse={this.state.reverse} />
            </div>
        );
    }
}

export default Calculator;