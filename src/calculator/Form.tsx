import React from "react";
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

interface Props{
    all: number,
    passed: number,
    reverse: boolean,
    handleChange: {
        people_all: (event: React.ChangeEvent<HTMLInputElement>) => void,
        people_passed: (event: React.ChangeEvent<HTMLInputElement>) => void,
        reverse: (event: React.ChangeEvent<HTMLInputElement>) => void,
    }
}

interface State{
    all: number,
    passed: number,
    reverse: boolean
}

class Form extends React.Component<Props, State> {
    state:State = {
        all: 0,
        passed: 0,
        reverse: false
    };

    handleFocusInput(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>)  {
        event.target.select();
    }

    render() {
        return (
            <div className="Form">
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
                        <TextField
                            label="총원"
                            id="people_all"
                            value={this.props.all}
                            onChange={this.props.handleChange.people_all}
                            onFocus={this.handleFocusInput}
                            variant="outlined"
                            margin="dense"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={4} sm={3} md={2} lg={1} xl={1}>
                        <TextField
                            label="통과"
                            id="people_passed"
                            value={this.props.passed}
                            onChange={this.props.handleChange.people_passed}
                            onFocus={this.handleFocusInput}
                            variant="outlined"
                            margin="dense"
                            size="small"
                        />
                    </Grid>
                    <Grid container item xs={4} sm={6} md={8} lg={10} xl={10} alignItems="center">
                        <Grid item>정</Grid>
                        <Grid item>
                            <Switch
                                checked={this.props.reverse}
                                onChange={this.props.handleChange.reverse}
                                name="reverse"
                                inputProps={{'aria-label': 'secondary checkbox'}}
                            />
                        </Grid>
                        <Grid item>역</Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Form;