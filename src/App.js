import { useState } from 'react';
import { getSuggestions } from './api/getSuggestionsApi';

const App = () => {
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [selectedValue, setSelectedValue] = useState('');

	const onChangeHandler = (e) => {
		setSearchQuery(e.target.value);

		if (e.target.value !== '') {
			getSuggestions(searchQuery)
				.then((res) => {
					setLoading(true);
					setSearchResults(res);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setLoading(true);
			setSearchResults([]);
			setLoading(false);
		}
	};

	const selectItemHandler = (item) => {
		setSelectedValue(item);
	};

	return (
		<div className="relative">
			<div className="flex text-center flex-col min-h-screen w-64 m-auto">
				<h1 className="mb-2 font-bold text-xl mt-5 text-blue-400">Search</h1>
				<input
					className="border-2 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					placeholder="Search..."
					value={searchQuery}
					onChange={onChangeHandler}
				/>
				{loading ? (
					<div>Loading</div>
				) : (
					<ul className="mt-1">
						{searchResults.length > 0 &&
							searchResults.map((item, idx) => (
								<li
									className="border-2 py-2 px-3 cursor-pointer hover:bg-gray-100"
									key={idx}
									onClick={() => selectItemHandler(item)}
								>
									{item}
								</li>
							))}
					</ul>
				)}
				<div className="pt-10">
					<h2 className="font-bold text-red-300 text-xl	">Selected Value</h2>
					<p>{selectedValue}</p>
				</div>
			</div>
		</div>
	);
};

export default App;
