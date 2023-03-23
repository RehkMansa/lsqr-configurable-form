import { SyntheticEvent } from 'react';

const App = () => {
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
	};

	return (
		<main>
			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto p-3 gap-2 grid"
			>
				<input
					type="text"
					placeholder="Enter url"
					className="px-8 py-2 w-full border rounded-md"
				/>
				<div>
					<button
						className="rounded-full px-10 py-2 border-2 border-spacing-2 border-double"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</main>
	);
};

export default App;
