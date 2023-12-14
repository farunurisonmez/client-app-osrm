import React, {useEffect, useState} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import {useAppDispatch, useAppSelector} from "../../store";
import {open, close} from "../../reducers/drawer.slice";
import SearchComponent from "../search/search.component";
import {createStartingPoint, createEndPoint} from "../../reducers/osrm.slice";
import NominatimService from "../../services/nominatim/nominatim.service";
import L, {Map} from "leaflet";
import {Button} from "@mui/material";

interface IMapLeftDrawer {
    mapRef: React.RefObject<Map | null>
}

const MapLeftDrawer = (params:IMapLeftDrawer) => {
    const dispatch = useAppDispatch();

    const drawerStatus = useAppSelector((state) => state.drawerStatus)

    const osrmStatus = useAppSelector((state)=>state.osrm)

    const [ startingLocation, setStartingLocation ] = useState("")

    const [ endLocation, setEndLocation ] = useState("")

    useEffect(() => {
        //Create Starting Point
        //TODO: Burada osrmStatus durumunda olan veri ile startingLocation verisi aynı mı diye kontrol yapılacak.
        if(startingLocation != "" ){
            NominatimService.fetchNominatim({search:startingLocation}).then((res)=>{
                dispatch(createStartingPoint([res.data[0].lat, res.data[0].lon]))
                const svgIcon = L.divIcon({
                    html: `<img width="48" height="48" src="https://img.icons8.com/color/48/marker--v1.png" alt="marker--v1"/>`,
                    className: "",
                    iconSize: [24, 40],
                    iconAnchor: [12, 40],
                });
                //@ts-ignore
                L.marker([res.data[0].lat,res.data[0].lon], {icon: svgIcon}).addTo(params.mapRef.current)
                //@ts-ignore
                params.mapRef.current.setView([res.data[0].lat,res.data[0].lon], 10);
            })
        }
        if (endLocation != ""){
            NominatimService.fetchNominatim({search:endLocation}).then((res)=>{
                dispatch(createEndPoint([res.data[0].lat, res.data[0].lon]))
            })
        }
    }, [startingLocation, endLocation]);

    return(
        <div>
            <Drawer
                anchor="left"
                open={drawerStatus.drawerStatus}
                onClose={() => dispatch(close())}
            >
                <List sx={{
                    width:"400px",
                    alignItems:"center",
                    justifyContent:"center",
                    display:"flex",
                    flexDirection:"column"
                }}>
                    <SearchComponent
                        debounce={text => setStartingLocation(text)}
                        placeHolder={"Başlangıç Noktası Seçin"}
                    />
                    <SearchComponent
                        debounce={text => setEndLocation(text)}
                        placeHolder={"Varış Noktası Seçin"}
                    />
                    <Button variant="contained" onClick={()=>console.log(osrmStatus)}/>
                </List>
            </Drawer>
        </div>
    )
}

export default MapLeftDrawer