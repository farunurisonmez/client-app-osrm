import React, {useEffect, useRef, useState} from "react"
import 'leaflet/dist/leaflet.css'
import L from "leaflet"
import OSMPolylineToolComponent from "./tools/osm.polyline.tool";
import OSMMapTool from "./tools/osm.map.tool";
import MapLeftDrawer from "../drawer/map.left.drawer";
import {useAppSelector} from "../../store";


const OpenStreetMapComponent = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null); // Create a reference to the map instance.

    useEffect(()=>{
        if (mapContainer.current && !mapRef.current) {
            //Harita oluşturma
            const map = L.map(mapContainer.current)

            map.zoomControl.setPosition('bottomright')

            map.on("click", (event)=>{
                console.log(event.latlng,"Tıklanan Konum")
            })

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Save the map instance in the ref.
            mapRef.current = map; 
        }
    }, []);

    const [drawerStatus, setDrawerStatus] = useState(false)

    return(
        <div ref={mapContainer} style={{height:'100vh'}}>
            <OSMPolylineToolComponent mapRef={mapRef}/>
            {/*<OSMMapTool mapRef={mapRef} drawerStatus={open => setDrawerStatus(open)}/>*/}
            <MapLeftDrawer mapRef={mapRef}/>
        </div>
    )
}

export default OpenStreetMapComponent;