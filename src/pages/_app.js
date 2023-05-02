import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "aos/dist/aos.css";
import "swiper/css/bundle";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import AOS from "aos";
import { useEffect } from "react";
import Script from "next/script";

export default function App({ Component, pageProps }) {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	return (
		<>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
				crossOrigin="anonymous"
			/>
		</>
	);
}
