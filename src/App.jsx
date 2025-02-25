import React,{useEffect,useState} from "react";

import PageCalendar from "./containers/PageCalendar/PageCalendar.jsx";
import "./App.scss";


function App() {
	// const [currentToken, setCurrentToken] = useState({});
	//
	// const getToken = (step) => {
	// 	console.log("step", step)
	// 	setCurrentToken({
	// 		"token_type": "Bearer",
	// 		"expires_in": 300,
	// 		"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA1YjRhM2I2NjYxN2NjNmY2OGE0NGRlODNmODZjMzcyNDk0MmY0MzViNzhhOTg1ZGIxZTRiMTczMTk1YTRkN2E1MmYzOWVmNGRjOWVjOGJhIn0.eyJhdWQiOiJJWDlXOVZHdkhLMFFjTVlwcUJieTNVQWUtY19rQWc0ZW5JTnVEbHdNb19FIiwianRpIjoiMDViNGEzYjY2NjE3Y2M2ZjY4YTQ0ZGU4M2Y4NmMzNzI0OTQyZjQzNWI3OGE5ODVkYjFlNGIxNzMxOTVhNGQ3YTUyZjM5ZWY0ZGM5ZWM4YmEiLCJpYXQiOjE3MzkyOTkxNDUsIm5iZiI6MTczOTI5OTE0NSwiZXhwIjoxNzM5Mjk5NDQ1LjA5NzE0MTk4MTEyNDg3NzkyOTY4NzUsInN1YiI6IjMiLCJzY29wZSI6WyJhdXRoZW50aWNhdGVkIl19.bf_vjbPqiktRiL2HGJpMh4593jx55Fvv_-xK-HZ8n066VhOrrlIazSeHlCvUlmJHqiOGTsfgT-AGekEJjt0icurjzYwHHb8tBLtclMxlLOh9V4kd4CLOreLgjqV2HsyTc4gggh1YfzN8RfK2WH177i0sk7oasAucq34mQMGiCGR8cEEb80CAIOhFNrDK7uOH2qYfxk6LfIugpgzPvGwmWbRKh7NjvI868G6a8a9grN-31bbFXy8EDTlybo-mqrKxuWTp_m5Tc9rP4Bp1HDqNyzV_I3-fz5kEh791P0ARHrdIJTsYvH2_7rItZSQEthIbx4L5gY1pYV43kGWJM2PwRg",
	// 		"refresh_token": "def50200b3bf4036a33b83d36c3334b52da33117c8a0b78e30cb36747da66fc893ea83e37a9b2f47ec596ef8a19b1020c641a56de6f4c712c5b8b65b388f65a0398e307909d7b07e2ecee18de0d58f7898d8d202ebc1fd308ecae2a0af60637d2194868503da21c9c88250d6a8e8db34eba717515cd873c450d407db1e944121ee83bbda9775d8af4634d2fdd2329ece7561cefeba27892212c9d85be49cace9fb3611ebba0b1d9e5d7bec329da3302a87db10f7289f993334cc333b5024e2f8d0b15cbe4523ccb4ca30447714e8a33c1d7363e4b28244d398c30d079edb403c09c74cc0e0c7762b77378d41eebc5dd48880633fd8b4ea0601efbd2afb049a07dc9fe22b2902856215efdc48489c757bb927b2b0605da8c7acac32568f28a6585dd046520aad8f72dea2ce49a730462e3f406020826c990556d258704316f5f8636136755023b296c01595b723539dab65654d7d8186b3eaad2a10c6e4d0a17d1f1939d03fef08138ea44dd2e0867555656167b6745691a3944eaa60fc50c6692ead08acd6eb0a860ab79fde688be4e65f9e232ec6ddd97bc3141919"
	// 	})
	// 	return {
	// 		"token_type": "Bearer",
	// 		"expires_in": 300,
	// 		"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA1YjRhM2I2NjYxN2NjNmY2OGE0NGRlODNmODZjMzcyNDk0MmY0MzViNzhhOTg1ZGIxZTRiMTczMTk1YTRkN2E1MmYzOWVmNGRjOWVjOGJhIn0.eyJhdWQiOiJJWDlXOVZHdkhLMFFjTVlwcUJieTNVQWUtY19rQWc0ZW5JTnVEbHdNb19FIiwianRpIjoiMDViNGEzYjY2NjE3Y2M2ZjY4YTQ0ZGU4M2Y4NmMzNzI0OTQyZjQzNWI3OGE5ODVkYjFlNGIxNzMxOTVhNGQ3YTUyZjM5ZWY0ZGM5ZWM4YmEiLCJpYXQiOjE3MzkyOTkxNDUsIm5iZiI6MTczOTI5OTE0NSwiZXhwIjoxNzM5Mjk5NDQ1LjA5NzE0MTk4MTEyNDg3NzkyOTY4NzUsInN1YiI6IjMiLCJzY29wZSI6WyJhdXRoZW50aWNhdGVkIl19.bf_vjbPqiktRiL2HGJpMh4593jx55Fvv_-xK-HZ8n066VhOrrlIazSeHlCvUlmJHqiOGTsfgT-AGekEJjt0icurjzYwHHb8tBLtclMxlLOh9V4kd4CLOreLgjqV2HsyTc4gggh1YfzN8RfK2WH177i0sk7oasAucq34mQMGiCGR8cEEb80CAIOhFNrDK7uOH2qYfxk6LfIugpgzPvGwmWbRKh7NjvI868G6a8a9grN-31bbFXy8EDTlybo-mqrKxuWTp_m5Tc9rP4Bp1HDqNyzV_I3-fz5kEh791P0ARHrdIJTsYvH2_7rItZSQEthIbx4L5gY1pYV43kGWJM2PwRg",
	// 		"refresh_token": "def50200b3bf4036a33b83d36c3334b52da33117c8a0b78e30cb36747da66fc893ea83e37a9b2f47ec596ef8a19b1020c641a56de6f4c712c5b8b65b388f65a0398e307909d7b07e2ecee18de0d58f7898d8d202ebc1fd308ecae2a0af60637d2194868503da21c9c88250d6a8e8db34eba717515cd873c450d407db1e944121ee83bbda9775d8af4634d2fdd2329ece7561cefeba27892212c9d85be49cace9fb3611ebba0b1d9e5d7bec329da3302a87db10f7289f993334cc333b5024e2f8d0b15cbe4523ccb4ca30447714e8a33c1d7363e4b28244d398c30d079edb403c09c74cc0e0c7762b77378d41eebc5dd48880633fd8b4ea0601efbd2afb049a07dc9fe22b2902856215efdc48489c757bb927b2b0605da8c7acac32568f28a6585dd046520aad8f72dea2ce49a730462e3f406020826c990556d258704316f5f8636136755023b296c01595b723539dab65654d7d8186b3eaad2a10c6e4d0a17d1f1939d03fef08138ea44dd2e0867555656167b6745691a3944eaa60fc50c6692ead08acd6eb0a860ab79fde688be4e65f9e232ec6ddd97bc3141919"
	// 	}
	// }
	//
	// const updatedToken = (token, step) => {
	// 	console.log("step", step)
	// 	setCurrentToken({
	// 		"token_type": "Bearer",
	// 		"expires_in": 300,
	// 		"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA1YjRhM2I2NjYxN2NjNmY2OGE0NGRlODNmODZjMzcyNDk0MmY0MzViNzhhOTg1ZGIxZTRiMTczMTk1YTRkN2E1MmYzOWVmNGRjOWVjOGJhIn0.eyJhdWQiOiJJWDlXOVZHdkhLMFFjTVlwcUJieTNVQWUtY19rQWc0ZW5JTnVEbHdNb19FIiwianRpIjoiMDViNGEzYjY2NjE3Y2M2ZjY4YTQ0ZGU4M2Y4NmMzNzI0OTQyZjQzNWI3OGE5ODVkYjFlNGIxNzMxOTVhNGQ3YTUyZjM5ZWY0ZGM5ZWM4YmEiLCJpYXQiOjE3MzkyOTkxNDUsIm5iZiI6MTczOTI5OTE0NSwiZXhwIjoxNzM5Mjk5NDQ1LjA5NzE0MTk4MTEyNDg3NzkyOTY4NzUsInN1YiI6IjMiLCJzY29wZSI6WyJhdXRoZW50aWNhdGVkIl19.bf_vjbPqiktRiL2HGJpMh4593jx55Fvv_-xK-HZ8n066VhOrrlIazSeHlCvUlmJHqiOGTsfgT-AGekEJjt0icurjzYwHHb8tBLtclMxlLOh9V4kd4CLOreLgjqV2HsyTc4gggh1YfzN8RfK2WH177i0sk7oasAucq34mQMGiCGR8cEEb80CAIOhFNrDK7uOH2qYfxk6LfIugpgzPvGwmWbRKh7NjvI868G6a8a9grN-31bbFXy8EDTlybo-mqrKxuWTp_m5Tc9rP4Bp1HDqNyzV_I3-fz5kEh791P0ARHrdIJTsYvH2_7rItZSQEthIbx4L5gY1pYV43kGWJM2PwRg",
	// 		"refresh_token": "def50200b3bf4036a33b83d36c3334b52da33117c8a0b78e30cb36747da66fc893ea83e37a9b2f47ec596ef8a19b1020c641a56de6f4c712c5b8b65b388f65a0398e307909d7b07e2ecee18de0d58f7898d8d202ebc1fd308ecae2a0af60637d2194868503da21c9c88250d6a8e8db34eba717515cd873c450d407db1e944121ee83bbda9775d8af4634d2fdd2329ece7561cefeba27892212c9d85be49cace9fb3611ebba0b1d9e5d7bec329da3302a87db10f7289f993334cc333b5024e2f8d0b15cbe4523ccb4ca30447714e8a33c1d7363e4b28244d398c30d079edb403c09c74cc0e0c7762b77378d41eebc5dd48880633fd8b4ea0601efbd2afb049a07dc9fe22b2902856215efdc48489c757bb927b2b0605da8c7acac32568f28a6585dd046520aad8f72dea2ce49a730462e3f406020826c990556d258704316f5f8636136755023b296c01595b723539dab65654d7d8186b3eaad2a10c6e4d0a17d1f1939d03fef08138ea44dd2e0867555656167b6745691a3944eaa60fc50c6692ead08acd6eb0a860ab79fde688be4e65f9e232ec6ddd97bc3141919"
	// 	})
	// 	return {
	// 		"token_type": "Bearer",
	// 		"expires_in": 300,
	// 		"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA1YjRhM2I2NjYxN2NjNmY2OGE0NGRlODNmODZjMzcyNDk0MmY0MzViNzhhOTg1ZGIxZTRiMTczMTk1YTRkN2E1MmYzOWVmNGRjOWVjOGJhIn0.eyJhdWQiOiJJWDlXOVZHdkhLMFFjTVlwcUJieTNVQWUtY19rQWc0ZW5JTnVEbHdNb19FIiwianRpIjoiMDViNGEzYjY2NjE3Y2M2ZjY4YTQ0ZGU4M2Y4NmMzNzI0OTQyZjQzNWI3OGE5ODVkYjFlNGIxNzMxOTVhNGQ3YTUyZjM5ZWY0ZGM5ZWM4YmEiLCJpYXQiOjE3MzkyOTkxNDUsIm5iZiI6MTczOTI5OTE0NSwiZXhwIjoxNzM5Mjk5NDQ1LjA5NzE0MTk4MTEyNDg3NzkyOTY4NzUsInN1YiI6IjMiLCJzY29wZSI6WyJhdXRoZW50aWNhdGVkIl19.bf_vjbPqiktRiL2HGJpMh4593jx55Fvv_-xK-HZ8n066VhOrrlIazSeHlCvUlmJHqiOGTsfgT-AGekEJjt0icurjzYwHHb8tBLtclMxlLOh9V4kd4CLOreLgjqV2HsyTc4gggh1YfzN8RfK2WH177i0sk7oasAucq34mQMGiCGR8cEEb80CAIOhFNrDK7uOH2qYfxk6LfIugpgzPvGwmWbRKh7NjvI868G6a8a9grN-31bbFXy8EDTlybo-mqrKxuWTp_m5Tc9rP4Bp1HDqNyzV_I3-fz5kEh791P0ARHrdIJTsYvH2_7rItZSQEthIbx4L5gY1pYV43kGWJM2PwRg",
	// 		"refresh_token": "def50200b3bf4036a33b83d36c3334b52da33117c8a0b78e30cb36747da66fc893ea83e37a9b2f47ec596ef8a19b1020c641a56de6f4c712c5b8b65b388f65a0398e307909d7b07e2ecee18de0d58f7898d8d202ebc1fd308ecae2a0af60637d2194868503da21c9c88250d6a8e8db34eba717515cd873c450d407db1e944121ee83bbda9775d8af4634d2fdd2329ece7561cefeba27892212c9d85be49cace9fb3611ebba0b1d9e5d7bec329da3302a87db10f7289f993334cc333b5024e2f8d0b15cbe4523ccb4ca30447714e8a33c1d7363e4b28244d398c30d079edb403c09c74cc0e0c7762b77378d41eebc5dd48880633fd8b4ea0601efbd2afb049a07dc9fe22b2902856215efdc48489c757bb927b2b0605da8c7acac32568f28a6585dd046520aad8f72dea2ce49a730462e3f406020826c990556d258704316f5f8636136755023b296c01595b723539dab65654d7d8186b3eaad2a10c6e4d0a17d1f1939d03fef08138ea44dd2e0867555656167b6745691a3944eaa60fc50c6692ead08acd6eb0a860ab79fde688be4e65f9e232ec6ddd97bc3141919"
	// 	}
	// }
	//
	// const getData = (token,step) => {
	// 	console.log("step", step)
	// 	return "getData"
	// }
	//
	// const delToken = (step) => {
	// 	console.log("step", step)
	// 	setCurrentToken((prevState) => ({...prevState, access_token: null}) )
	// }
	//
	// const step = (access_token, refresh_token, time = 300000) => {
	// 	let interval;
	//
	// 	if (!access_token) {
	// 		if (refresh_token) {
	// 			updatedToken("refresh_token","step4")/*step4*/
	// 			getData("access_token", "step5 - data") /*step5*/
	//
	// 			interval = setInterval(() => {
	// 				delToken("step6 - interval") /*step6*/
	// 			},time + 1000)
	//
	// 			return () => clearInterval(interval)
	// 		}
	// 		getToken("step1")/*step1*/
	// 		getData("access_token","step2 - getData") /*step2*/
	//
	// 		interval = setTimeout(() => {
	// 			delToken("step3 - delToken") /*step3*/
	// 		},time)
	//
	// 		return () => clearTimeout(interval)
	// 	} else {
	// 		return () => step(currentToken.access_token, currentToken.refresh_token);
	// 	}
	// }
	//
	// useEffect(() => {
	// 	step(currentToken.access_token, currentToken.refresh_token)
	// }, [currentToken]);

	// useEffect(() => {
	// 	let interval;
	//
	// 	if (!currentToken.access_token) {
	// 		getToken("step1")/*step1*/
	// 		getData("access_token","step2 - getData") /*step2*/
	//
	// 		interval = setTimeout(() => {
	// 			delToken("step3 - delToken") /*step3*/
	// 		},3000)
	//
	// 	}
	// 	return () => clearTimeout(interval)
	// }, []);
	//
	// useEffect(() => {
	// 	let interval;
	//
	// 	if (!currentToken.access_token && currentToken.refresh_token) {
	// 		updatedToken("refresh_token","step4")/*step4*/
	// 		getData("access_token", "step5 - data") /*step5*/
	//
	// 		interval = setInterval(() => {
	// 			delToken("step6 - interval") /*step6*/
	// 		},6000)
	// 	}
	//
	// 	return () => clearInterval(interval)
	// }, [currentToken]);

	return (<PageCalendar />);
}

export default App;