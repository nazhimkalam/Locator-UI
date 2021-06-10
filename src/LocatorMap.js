import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const AnyReactComponent = ({ Icon }) => <div>{Icon}</div>;

const LocatorMap = ({ latitude, longitude }) => {
	const center = {
		lat: latitude,
		lng: longitude,
	};
	const zoom = 4;
	const googleMapsAPIKey = 'AIzaSyBnyhRVuQP8dGRwYgVMYQqY-ZP0-bWUiV0';

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact bootstrapURLKeys={{ key: googleMapsAPIKey }} defaultCenter={center} defaultZoom={zoom}>
				<AnyReactComponent
					lat={latitude}
					lng={longitude}
					Icon={<LocationOnIcon fontSize="large" style={{ color: 'red' }} />}
				/>
			</GoogleMapReact>
		</div>
	);
};

export default LocatorMap;
