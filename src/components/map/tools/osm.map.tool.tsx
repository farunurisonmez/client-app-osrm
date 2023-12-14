import React, {useEffect, useState} from "react"
import L, {Map} from "leaflet";
import { Box, Typography } from "@mui/material";
import SearchComponent from "../../search/search.component";
import NominatimService from "../../../services/nominatim/nominatim.service";

interface IOSMMapTool {
    mapRef: React.RefObject<Map | null>
    drawerStatus:(open:boolean)=>void
}
const OSMMapTool = (params:IOSMMapTool) => {

    const [searchTxt, setSearchTxt] = useState("")

    useEffect(()=>{
        if (searchTxt != ""){
            NominatimService.fetchNominatim({search:searchTxt}).then((res)=>{
                console.log(res.data[0])
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
                params.drawerStatus(true)
            })
        }
        else{
            if (params.mapRef.current) {
                params.mapRef.current?.eachLayer((layer)=>{
                    if(layer instanceof L.Marker){
                        layer.remove();
                    }
                })
            }
        }
    },[searchTxt])

    return(
        <Box sx={{
            position: 'absolute',
            top: '10px', // Adjust the top position as needed
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '1000', // Ensure it's above the map
            textAlign: 'center',
            width: '430px',
            height: '60px',
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
            }}>
                <SearchComponent
                    debounce={text => setSearchTxt(text)}
                    placeHolder={"Search"}
                />
            </Box>
        </Box>
    )
}

export default OSMMapTool