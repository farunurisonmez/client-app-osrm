import React, {useEffect, useState} from "react"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import useDebounce from "../../utils/search/debounce";

interface ISearch {
    debounce: (text: string) => void
}

const SearchComponent = (params:ISearch) => {

    const [searchTxt, setSearchTxt] = useState("")
    params.debounce(useDebounce(searchTxt,1000))

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={e => setSearchTxt(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon/>
            </IconButton>
        </Paper>
    );
}

export default SearchComponent