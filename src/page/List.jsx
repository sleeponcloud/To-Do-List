import React, { useState } from 'react';
import {
    TextField,
    Grid,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import moment from 'moment';

const deleteColor = '#e55454';
const checkColor = '#54e554';

const StyledTextField = styled(TextField)(() => ({
    'width': '65%',
    'outline': 'none',
    'color': '#000',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            'border': 'none',
        },
    },
}));

export default function List({ todoList, done, editText, clickDelete, clickCheck }) {
    const convertTimeFormat = (value) => {
        return moment(value).format('MM/DD HH:mm:ss');
    };

    return (
        <Grid container>
            {
                todoList.map((item, index) => {
                    if (item.done !== done) {
                        return null;
                    };
                    return (
                        <Grid container item key={item.id} sx={{padding: '8px'}}>
                            <StyledTextField
                                label={convertTimeFormat(item.updateTime)}
                                defaultValue={item.text}
                                size="small"
                                onBlur={(event) => {
                                    editText(event, item)
                                }}
                                InputProps={{
                                    style: {
                                        outline: 'none',
                                    },
                                }}
                            />
                            <IconButton onClick={() => {clickDelete(item)}}>
                                <AiFillDelete style={{color: deleteColor}}/>
                            </IconButton>
                            <IconButton onClick={()=> {clickCheck(item)}}>
                                <AiOutlineCheck style={{color: checkColor}}/>
                            </IconButton>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};
