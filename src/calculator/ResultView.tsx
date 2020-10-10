import React from "react";
import PointParser from "./PointParser";
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
    all: number,
    passed: number,
    point: PointParser,
    reverse: boolean
}

interface State{
}

const styles = (theme: Theme) => createStyles({
    root: {
        margin: "5px 0"
    },
    point_positive: {
        color: "blue"
    },
    point_negative: {
        color: "red"
    },

});

class ResultView extends React.Component<Props, State> {
    calc_point(index: number, type: string) {
        let earn_point = 0;
        let p = this.props;
        let rank_limit = p.point.upper.length;

        if (index >= p.passed)
            return 0;

        if (type == "full" || type == "plus") {
            if (index < rank_limit) {
                earn_point += p.point.upper[index];
            }
        }

        if (type == "full" || type == "minus") {
            let rev_rank_limit = p.passed - rank_limit;
            if (index >= rev_rank_limit) {
                earn_point += p.point.lower[index - rev_rank_limit];
            }
        }

        return earn_point;
    }

    render_list() {
        if (isNaN(this.props.all))
            return null;

        const { classes } = this.props;
        let list = Array.from(Array(this.props.all).keys());
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
            <TableContainer component={Paper}>
                <Table aria-label="result" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" align="center">순위</TableCell>
                            <TableCell component="th" align="center">획득 포인트</TableCell>
                            <TableCell component="th" align="center">증가</TableCell>
                            <TableCell component="th" align="center">감소</TableCell>
                            <TableCell component="th" align="center">-</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((num: number) => (
                            <TableRow key={num}>
                                <TableCell component="th" scope="row" align="center">
                                    {num + 1}
                                </TableCell>
                                <TableCell align="right">
                                    {print_number(this.calc_point(num, 'full'))}
                                </TableCell>
                                <TableCell align="right">
                                    {print_number(this.calc_point(num, 'plus'))}
                                </TableCell>
                                <TableCell align="right">
                                    {print_number(this.calc_point(num, 'minus'))}
                                </TableCell>
                                <TableCell align="right">
                                    -
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={["ResultView", classes.root].join(" ")}>
                <Typography variant="h6">
                    산출결과
                </Typography>
                {(this.props.point.upper.length > 0) ?
                    this.render_list() :
                    (
                        <Typography variant="subtitle1">
                            인원수와 정/역 방향을 선택하세요.
                        </Typography>
                    )
                }
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ResultView);

