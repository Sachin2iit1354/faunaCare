
import { Button, makeStyles, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import CreateIcon from '@mui/icons-material/Create';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

import { categories } from '../../constants/data';

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

const Categories = () => {
    const classes = useStyles();
    return (
        <>
            <Link to = {'/create'} style = {{textDecoration: 'none', color: 'inherit'}}>
                <Button variant = "contained" className = {classes.forButtonCreate}><CreateIcon></CreateIcon>Create Post</Button>
            </Link>
            <Table className = {classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>All Categories</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow>
                                <TableCell>{category}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default Categories;