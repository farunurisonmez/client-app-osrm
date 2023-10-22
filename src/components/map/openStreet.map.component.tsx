import React, { useEffect, useRef } from "react"
import 'leaflet/dist/leaflet.css'
import L from "leaflet"

const OpenStreetMapComponent = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null); // Create a reference to the map instance.


    useEffect(()=>{
        if (mapContainer.current && !mapRef.current) {
            //Harita oluşturma
            const map = L.map(mapContainer.current).setView([38, 38], 13);


            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            
            // Save the map instance in the ref.
            mapRef.current = map; 
        }
    }, []);

    return(
        <div ref={mapContainer} style={{height:'100vh'}}></div>
    )
}

export default OpenStreetMapComponent;