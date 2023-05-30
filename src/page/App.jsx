
import React, { useState } from 'react';
import {
    TextField,
    Grid,
    IconButton,
    Card,
    InputAdornment,
    Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GrFormAdd } from "react-icons/gr";
import { BiSortUp, BiSortDown } from "react-icons/bi";
import moment from 'moment';
import List from './List.jsx';

const mainTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 860,
            md: 1280,
            lg: 1536,
        },
    },
});

const StyledGrid = styled(Grid)(() => ({
    'marginBottom': '16px',
    'padding': '8px',
    'margin': '8px',
    'backgroundColor': '#fff',
    'borderRadius': '5px',
}));

const StyledCard = styled(Card)(() => ({
    'width': '100%',
    'minHeight': '300px',
    'backgroundColor': '#fff289',
}));

const sortColor = '#8a8a8a';

function App () {
    const [newThing, setNewThing] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [isSortDown, setIsSortDown] = useState('sortDown');

    const handleSubmit = (event) => {
        if (newThing !== '') {
            const item = {
                id: Date.now(),
                updateTime: Date.now(),
                text: newThing,
                done: false,
            };
            setTodoList([...todoList, item]);
            setNewThing('');
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setNewThing(value);
    };

    const clickCheck = (item) => {
        const filterList = todoList.map((el) => {
            if (el.id === item.id) {
                el.done = !item.done;
                return el;
            };
            return el;
        });
        setTodoList(filterList);
    };

    const removeObject = (id) => {
        const arrCopy = Array.from(todoList);
        const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === id);
        arrCopy.splice(objWithIdIndex, 1);
        return arrCopy;
    };

    const clickDelete = (item) => {
        const filterList = removeObject(item.id);
        setTodoList(filterList);
    };

    const editText = (event, item) => {
        const value = event.target.value;
        const filterList = todoList.map((el) => {
            if (el.id === item.id){
                el.updateTime = Date.now();
                el.text = value;
                return el;
            };
            return el;
        })
        setTodoList(filterList);
    };
    
    const convertTimeFormat = (value) =>{
        return moment(value).format('MM/DD HH:mm:ss')
    };

    const sortUp = () => {
        const sortedList = [...todoList].sort((a, b) => a.updateTime - b.updateTime);
        setIsSortDown(false);
        setTodoList(sortedList);
    };

    const sortDown = () => {
        const sortedList = [...todoList].sort((a, b) => b.updateTime - a.updateTime);
        setIsSortDown(true);
        setTodoList(sortedList);
    };

    return(<>
    <ThemeProvider theme={mainTheme}>
        <div style={{justifyContent: 'center', display:'flex'}}>
            <h3>To Do List</h3>
        </div>
        <Grid container>
            <StyledGrid container item>
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder='I plan to do...'
                    value={newThing}
                    onChange={handleChange}
                    InputProps={{
                        style: {
                            backgroundColor: '#fff',
                            outline: 'none',
                        },
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={handleSubmit} style={{color: '#545454'}}>
                                <GrFormAdd />
                            </IconButton>
                            {
                                isSortDown ?
                                <IconButton onClick={sortUp}>
                                    <BiSortUp style={{color: sortColor}}/>
                                </IconButton> :
                                <IconButton onClick={sortDown}>
                                    <BiSortDown style={{color: sortColor}}/>
                                </IconButton>
                            }
                        </InputAdornment>,
                    }}
                />
            </StyledGrid>
            <Grid container item justifyContent={'space-between'}>
                <Grid item xs={12} sm={6} sx={{padding: '8px'}}>
                    <StyledCard>
                        <Typography variant="h5" sx={{margin: '8px'}}>
                            To Do
                        </Typography>
                        <Grid container>
                            <List
                                todoList={todoList}
                                done={false}
                                editText={editText}
                                clickDelete={clickDelete}
                                clickCheck={clickCheck}
                            />
                        </Grid>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} sx={{padding: '8px'}}>
                    <StyledCard>
                        <Typography variant="h5" sx={{margin: '8px'}}>
                            Done
                        </Typography>
                        <Grid container>
                            <List
                                todoList={todoList}
                                done={true}
                                editText={editText}
                                clickDelete={clickDelete}
                                clickCheck={clickCheck}
                            />
                        </Grid>
                    </StyledCard>
                </Grid>
            </Grid>
        </Grid>
    </ThemeProvider>
    </>);
}
  
export default App