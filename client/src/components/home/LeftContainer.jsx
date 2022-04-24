import { Button, makeStyles, Table, TableRow, TableCell, TableHead, TableBody, Box } from '@material-ui/core';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { React, useState } from "react";
 
 
 
import { categories, severities } from '../../constants/data';
import { textAlign } from '@mui/system';
 
const useStyles = makeStyles({
    forButtonCreate: {
        margin: 20,
        // width:'500',
       // alignItems:'center',
        background: '#1A374D',
        color: '#fff',
        fontSize:19
    },
    table: {
       
        border: '1px solid rgba(224, 224, 224, 1)'
    }
})
 
 
 
 
 
 
const LeftContainer = () => {
    const classes = useStyles();
    const navigate = useNavigate();
 
    const initialValues = {
        categories: "All Categories",
        severities: "All",
    }
 
    const [queries, setQueries] = useState(initialValues);
 
    const handleClick = (e) => {
        setQueries({ ...queries, [e.target.getAttribute('name')]: e.target.getAttribute('value') });
        console.log(queries.categories);
        console.log(queries.severities);
        const URL = `/?categories=${queries.categories}&severities=${queries.severities}`;
        console.log(URL);
        navigate(URL);
    }
 
    return (
        <>
            <Link to={'/create'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="contained" className={classes.forButtonCreate}><CreateIcon></CreateIcon>Create Post</Button>
            </Link>
            <Box style={
                {
                    // backgroundColor:'blue',
                    margin:'20px',
                    fontSize:18
 
                }
            }>
            <FilterAltIcon></FilterAltIcon>
           <b>FILTERS</b>
            </Box>
 
            {/* Categories */}
 
            <Table className={classes.table}>
                <TableHead
                style={{
                    textAlign: 'center',
                    border: '2px solid white',
                    fontWeight: 'bold',
                    backgroundColor : '#F6F2D4'
                }}
                >
                    CATEGORIES
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow hover={true}
                                style={{
                                    textAlign: 'center',
                                    border: '1px solid white'
                                }}
                            >
                                <TableCell name='categories' value={category} onClick={(e) => handleClick(e)}
                                    style={{
                                        color: "#161E54",
                                        textAlign: 'center'
                                    }}>
                                    {category}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
 
            {/* Severity */}
 
            <Table className={classes.table}>
                <TableHead
                 style={{
                    textAlign: 'center',
                    border: '2px solid white',
                    fontWeight: 'bold',
                    backgroundColor : '#F6F2D4'
                }}
                >
                    SEVERITY
                </TableHead>
                <TableBody>
                    {
                        severities.map(severity => (
                            <TableRow hover={true}
                             style={{
                                    textAlign: 'center',
                                    border: '1px solid white',
                                    borderRadius: '100px'
                                }}
                            >
                                <TableCell name="severities" value={severity} onClick={(e) => handleClick((e))}
                                 style={{
                                       color: "#161E54",
                                       textAlign: 'center',
                                       borderRadius: '100px'
                                   }}
                                >
                                    {severity}
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
 
