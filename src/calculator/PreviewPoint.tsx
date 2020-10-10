import React from "react";
import PointParser from "./PointParser";
import Grid from "@material-ui/core/Grid";
import {Theme, Typography} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";

interface Props extends WithStyles<typeof styles>{
    point: PointParser,
    reverse: boolean
}

interface State{
}

const styles = (theme: Theme) => createStyles({
    root: {
        margin: "5px 0"
    },
    typo_point_title: {
        margin: 1
    },
    point_positive: {
        color: "blue"
    },
    point_negative: {
        color: "red"
    },
});

class PreviewPoint extends React.Component<Props, State> {

    render_list(name: string) {
        const { classes } = this.props;
        let list = this.props.point.get(name);
        let text: {[k: string]: any} = {
            "upper": "상위권 포인트",
            "lower": "하위권 포인트",
        };
        let print_number = (num: number) => {
            if (num < 0)
                return (
                    <Typography variant="body1" className={classes.point_negative}>
                        {num}
                    </Typography>
                );

            if (num > 0)
                return (
                    <Typography variant="body1" className={classes.point_positive}>
                        {num}
                    </Typography>
                );

            return (
                <Typography variant="body1">
                    -
                </Typography>
            );
        }
        return (
            <Grid item id={`gain-points-${name}`} xs={6}>
                <Typography variant="subtitle2">
                    {text[name]}
                </Typography>
                <TableContainer component={Paper}>
                    <Table aria-label={text[name]} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">순위</TableCell>
                                <TableCell align="center">포인트</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((point: number, index:number) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" align="center">
                                        {((name == "lower") ? list.length - index : index + 1)}
                                    </TableCell>
                                    <TableCell align="right">
                                        {print_number(point)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        );
    }

    render_grid() {
        if (this.props.point.upper.length > 0) {
            return (
                <Grid container alignItems="center" spacing={1} id="gain-points">
                    {["upper", "lower"].map((name: string) => (
                        this.render_list(name)
                    ))}
                </Grid>
            );
        }

        return (
            <Typography variant="subtitle1">
                인원수와 정/역 방향을 선택하세요.
            </Typography>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={["PreviewPoint", classes.root].join(" ")}>
                <Typography variant="h6">
                    예상 포인트
                </Typography>
                {(this.props.reverse) ? (
                    <Typography variant="subtitle1">
                        역방향
                    </Typography>
                ) : null}
                {this.render_grid()}
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(PreviewPoint);

