import React, { useEffect } from "react";
import AOS from "aos";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import Layout from "@/common/components/layouts";
import { firaCode, jakartaSans } from "@/common/styles/fonts";

import type { AppProps } from "next/app";

import "tailwindcss/tailwind.css";
import "aos/dist/aos.css";
import "@/common/styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		AOS.init({
			duration: 800,
			delay: 50,
		});
	}, []);

	return (
		<>
			<style jsx global>
				{`
					html {
						--jakartaSans-font: ${jakartaSans.style.fontFamily};
						--firaCode-font: ${firaCode.style.fontFamily};
					}
				`}
			</style>
			<DefaultSeo
				title="Ryan Aulia - Personal Website"
				description="Experienced Software Engineer, specializing in frontend development. aulianza."
				openGraph={{
					type: "website",
					locale: "en_EN",
					url: "https://aulianza.id",
					siteName: "Ryan Aulia",
				}}
				twitter={{
					handle: "@handle",
					site: "@aulianzaa",
					cardType: "summary_large_image",
				}}
			/>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</>
	);
};

export default App;
