
import { Button, makeStyles, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

import { categories, severities } from '../../constants/data';

const useStyles = makeStyles({
    forButtonCreate: {
        margin: 20,
        background: '#6495ED',
        color: '#fff',
    },
    table: {
        border: '1px solid rgba(224, 224, 224, 1)'
    }
})

const LeftContainer = () => {
    const classes = useStyles();
    return (
        <>
            <Link to = {'/create'} style = {{textDecoration: 'none', color: 'inherit'}}>
                <Button variant = "contained" className = {classes.forButtonCreate}><CreateIcon></CreateIcon>Create Post</Button>
            </Link>

            {/* Categories */}

            <Table className = {classes.table}>
                <TableHead>
                    
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow>
                                <TableCell>
                                    <Link to={`/?categories=${category}`} style = {{textDecoration: 'none', color: 'inherit'}}>
                                        {category}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            {/* Severity */}

            <Table className = {classes.table}>
                <TableHead>
                    Severity
                </TableHead>
                <TableBody>
                    {
                        severities.map(severity => (
                            <TableRow>
                                <TableCell>
                                    <Link to={`/?severities=${severity}`} style = {{textDecoration: 'none', color: 'inherit'}}>
                                        {severity}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default LeftContainer;

