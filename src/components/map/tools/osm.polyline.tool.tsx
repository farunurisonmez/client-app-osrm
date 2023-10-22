import React, { useEffect, useRef } from "react";
import { Map } from "leaflet"; // Import the Map type from "leaflet".
import L from "leaflet"
import ApiOSRMService from "../../../services/osrm/osrm.service";


interface IOSMPolylineToolComponent {
    mapRef: React.RefObject<Map | null>;
}

const OSMPolylineToolComponent = (params: IOSMPolylineToolComponent) => {
    type LatLngExpression = [number, number];

    useEffect(() => {
        ApiOSRMService.fetchRoute({
            startingCoordinate: [35.5546374, 38.6582232],
            endCoordinate: [37.1012388, 39.4191717]
        }).then((route) => {
            const intersectionCoordinates: LatLngExpression[] = route.data.routes[0].legs[0].steps.flatMap(
                (step: any) => {
                    return step.intersections.map((intersection: any) => {
                        console.log(intersection, "intersection");
                        const [lng, lat] = intersection.location;
                        return [lat, lng];
                    });
                }
            );
            if (params.mapRef.current) {
                L.polyline(intersectionCoordinates, { color: 'rgba(66,133,244,0.55)', weight:10 }).addTo(params.mapRef.current)
                params.mapRef.current.setView([38.6582232, 35.5546374], 8);
            }
        })
    }, [])

    return <></>
}

export default OSMPolylineToolComponent;