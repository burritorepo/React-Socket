import React, { useContext, useState, useEffect } from 'react'
import { SocketContext } from '../socket_context/socket.context';

// MAP
import { MapDriver1Layout } from './map/map.component';

// MAP DEPENDENCIES REACT-LEAFLET
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

// LEAFLET DEPENDENCIES
import L from 'leaflet';

// ICONS
import { tinyIcon, redIcon, yellowIcon, faceIcon } from './icons';

function MapContainer(props) {

    let [msg, setMsg] = useState('');
    let [coords, setCoords] = useState([0, 0]);

    const socket = useContext(SocketContext);

    let username = {
        user: props.user,
        room: props.room
    };

    console.log('username', username);

    function initializeMapAndLocator() {

        /* -------------------------------------------------
              CREATING MAP AND INITIALIZING MARKERS OBJECT (EMPTY)
      --------------------------------------------------- */
        var markers = {};
        var mymarker;
        var map = L.map('map');
        let googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 18,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(map);

        /* -------------------------------------------------
                         FOR ZOOMING THE MAP VIEW TO THE DETECTED LOCATION
                 --------------------------------------------------- */

        map.locate({
            setView: true,
            maxZoom: 20,
            watch: true
        });

        /* -------------------------------------------------
                             SEND COORDS OF A SPECIFIC USER TO SERVER AND DISPLAY POPUP WITH USERNAME
                      --------------------------------------------------- */

        function onLocationFound(e) {

            var radius = e.accuracy / 2;

            map.locate({
                setView: false,
                timeout: 60000,
                enableHighAccuracy: true
            });

            var newlatlng = e.latlng;
            setCoords(coords = newlatlng);
            const new_lat = newlatlng.lat;
            const new_lng = newlatlng.lng;

            var Details = {
                username: username,
                active: true,
                new_lat: new_lat,
                new_lng: new_lng,
                update: true
            };

            // SEND USER COORDS TO SERVER
            socket.emit('new_coords', Details);

            if (map.hasLayer(mymarker)) {
                map.removeLayer(mymarker);
            }

            mymarker = new L.Marker(e.latlng, {
                icon: faceIcon,
                draggable: true
            });

            console.log('El usuario solo sonrie', Details.username);

            map.addLayer(mymarker);
            mymarker.bindPopup('<p>You are here ' + username + '</p>').openPopup();
        }

        map.on('locationfound', onLocationFound);

        /* -------------------------------------------------
                DISPLAY COORDINATES OF CURRENT USERS
        --------------------------------------------------- */

        // Get users ARRAY and show them in our MAP data = users ARRAY
        socket.on('load_init', function (data) {
            for (var i = 0; i < data.length; i++) {
                // Create markers for each current user
                if (data[i].lat != null) {
                    markers[data[i].username] = new L.marker([data[i].lat, data[i].lng], {
                        draggable: false,
                        icon: redIcon
                    });

                    // Add generated markers to map by USERNAME
                    map.addLayer(markers[data[i].username]);
                    markers[data[i].username].bindPopup('Online :' + data[i].username);
                }
            }
        });

        /* -------------------------------------------------
              EXISTING USERS UPDATING THEIR COORDS
      --------------------------------------------------- */

        socket.on('updatecoords', function (data) {
            console.log('Se actualizo amarillo', data.username);
            // DELETE CURRENT MARKER IF IT EXISTS
            if (map.hasLayer(markers[data.username])) {
                map.removeLayer(markers[data.username]);
            }
            // CREATE NEW MARKER WITH NEW COORDS; RED ICON IF USER UPDATES COORDS
            markers[data.username] = new L.marker([data.lat, data.lng], {
                draggable: false,
                icon: yellowIcon
            });

            map.addLayer(markers[data.username]);
            markers[data.username].bindPopup(data.username + ' is on the move').openPopup();
        });

        /* -------------------------------------------------
                          ON DISCONNECT REMOVE MARKER
                  --------------------------------------------------- */

        socket.on('remove_marker', function (data) {
            map.removeLayer(markers[data.username]);
        });

    };

    /* -------------------------------------------------
                  STARTS EXECUTING SOCKET EVENTS FROM CLIENT
          --------------------------------------------------- */

    initializeMapAndLocator();

    useEffect(() => {
        setMsg(msg = 'Creo nuevo Usuario');

        // emit username when user connects before the map loads
        socket.emit('joinRoom', props.room);
        socket.on('success', success => {
            console.log(success);
        });

        console.log('ejecuto', username);
        socket.emit('add user', username);

    }, [msg]);

    useEffect(() => {
        // When map is loaded this event is sent to the server and the server sends back the users ARRAY
        socket.emit('load_init');
    });

    return (
        <div>
            <h1>{msg}</h1>
            <MapDriver1Layout />
        </div>
    );
}

export {
    MapContainer
};