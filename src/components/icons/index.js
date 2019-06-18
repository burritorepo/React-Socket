import L from 'leaflet';

const tinyIcon = L.Icon.extend({
    options: {
        shadowUrl: './assets/marker-shadow.png',
        iconSize: [25, 39],
        iconAnchor: [12, 36],
        shadowSize: [41, 41],
        shadowAnchor: [12, 38],
        popupAnchor: [0, -30]
    }
});

let redIcon = new tinyIcon({
    iconUrl: '../../../public/assets/marker-red.png'
});

let yellowIcon = new tinyIcon({
    iconUrl: '../../../public/assets/marker-red.png'
});

let faceIcon = new tinyIcon({
    iconUrl: '../../../public/assets/marker-red.png'
});

export {
    tinyIcon,
    redIcon,
    yellowIcon,
    faceIcon
};