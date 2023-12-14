import React, { useEffect, useRef } from "react";
import L, { Map } from "leaflet"
import ApiOSRMService from "../../../services/osrm/osrm.service";
import {useAppSelector} from "../../../store";


interface IOSMPolylineToolComponent {
    mapRef: React.RefObject<Map | null>;
}

const OSMPolylineToolComponent = (params: IOSMPolylineToolComponent) => {
    type LatLngExpression = [number, number];

    const osrmStatus = useAppSelector((state)=>state.osrm)


    useEffect(() => {
        if (params.mapRef.current) {
            //L.polyline(intersectionCoordinates, { color: 'rgba(66,133,244,0.55)', weight:10 }).addTo(params.mapRef.current)
            params.mapRef.current.setView([38, 38], 8);
        }
        if (osrmStatus.startingPoint[0] && osrmStatus.endPoint[0] && osrmStatus.endPoint[1] != null){
            const [startingLng, startingLat] = osrmStatus.startingPoint;
            const [endLng, endLat] = osrmStatus.endPoint;

            ApiOSRMService.fetchRoute({
                //@ts-ignore
                startingCoordinate:[startingLat, startingLng],
                //@ts-ignore
                endCoordinate:[endLat, endLng]
            }).then((route) => {
                const intersectionCoordinates: LatLngExpression[] = route.data.routes[0].legs[0].steps.flatMap(
                    (step: any) => {
                        return step.intersections.map((intersection: any) => {
                            const [lng, lat] = intersection.location;
                            return [lat, lng];
                        });
                    }
                );
                if (params.mapRef.current) {
                    L.polyline(intersectionCoordinates, { color: 'rgba(66,133,244,0.55)', weight:10 }).addTo(params.mapRef.current)
                    //params.mapRef.current.setView([38, 38], 8);
                }
            })
        }
    }, [osrmStatus.endPoint])

    return <></>
}

export default OSMPolylineToolComponent;