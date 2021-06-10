import styled from 'styled-components';
import React, { useState } from 'react';
import LocatorMap from './LocatorMap';

function App() {
	const [number, setNumber] = useState(null);
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const onHandleSubmit = async () => {
		if (number === '' || number === null) {
			alert('Please enter a number to locate');
			setLoading(false);
		} else {
			setLoading(true);

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ number: number }),
			};

			await fetch('https://my-locator-backend.herokuapp.com/locate', requestOptions)
				.then((response) => response.json())
				.then((result) => {
					setResult(result);
					console.log(result);
				});

			setLoading(false);
		}
	};

	return (
		<Container className="container mt-4">
			<h1>Locator</h1>
			<p className="mt-4 ">
				The main purpose of this application is to find the location of the mobile number and other details via
				the longitude and latitude coordinates and by using these coordinates we are able to plot it in the
				world map to find the country location where the number is from.
			</p>
			<p className="mt-4 ">
				The reason for this application build is to locate from which country and service providers are calls
				from unknown numbers come from, moreover this can be enhanced in the future to make use of GPS from the
				mobile to track the exact location of the device so this can be used for tracking lost family members or
				locating lost devices.
			</p>

			<div class="d-flex flex-column">
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text">Enter Mobile Number</span>
					</div>
					<input
						type="text"
						class="form-control"
						id="validationTooltipUsername"
						placeholder="+94761234567"
						required
						onChange={(e) => setNumber(e.target.value)}
					/>
					<button className="btn btn-success" onClick={onHandleSubmit}>
						Locate
					</button>
				</div>
				<p className="text-muted mt-2">
					NOTE: If the Map doesn't load, it indicates the Google Map API request Quote has been over, since
					this is just for development purpose billing payments aren't made for the Google Maps API
				</p>

				{result !== null && loading === false ? (
					<div className="mt-5 mb-5">
						{result?.lat == null || result.lng == null ? (
							<>
								<p className="mt-4">API request Quote had exceeded</p>
							</>
						) : (
							<>
								<p className="text-muted">Google Maps are used in developer mode</p>
								<p className="text-muted">Please select 'OK' for the Google maps alert</p>
								<h4 className="mt-5">Details</h4>
								<p className="text-muted">Service Provider: {result?.service_provider}</p>
								<p className="text-muted">Country: {result?.country}</p>
								<p className="text-muted">{result?.more_info}</p>
								<LocatorMap latitude={parseFloat(result?.lat)} longitude={parseFloat(result?.lng)} />
							</>
						)}
					</div>
				) : number === null || number === '' || loading === false ? (
					<p className="mt-4">Enter a mobile number and click locate...</p>
				) : (
					<p className="mt-4">Loading..</p>
				)}
			</div>
		</Container>
	);
}

export default App;

const Container = styled.div`
	font-family: 'Poppins', sans-serif;
`;
