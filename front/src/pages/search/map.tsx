/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMapGL from 'react-map-gl';

type MapProps = {
	latitude?: number;
	longitude?: number;
};

const Map = ({ latitude, longitude }: MapProps) => {
	const lat = latitude || 48.864716;
	const long = longitude || 2.349014;

	return (
		<ReactMapGL
		style={{width:'100%',height:'100%'}}
			latitude={lat}
			longitude={long}
			zoom={8}
			mapboxAccessToken='pk.eyJ1IjoibW9zdGFwaGFib3Vkb3VjaCIsImEiOiJjbHNuN3IzODYwMTF6MmlxeXRuM2swZ3JnIn0.vjs0609beRqQhTsJRvsz1A'
			mapStyle={'mapbox://styles/mapbox/streets-v11'}
		>
			Map
		</ReactMapGL>
	);
};

export { Map };
