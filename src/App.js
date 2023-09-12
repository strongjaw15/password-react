import { React } from "react";
import { Header, Main, Password, Footer } from './components';

function App() {
	return (
		<div>
			<Header />
			<Main>
				<Password />
			</Main>
			<Footer />
		</div>
	);
}

export default App;