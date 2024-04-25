const Loading = () => {
	const handleImageError = (error) => {
		console.error("here", error);
	};

	return (
		<div className='loading'>
			<img src='../ricefrying.webp' alt='loading...' onError={(error) => handleImageError(error)} />
		</div>
	);
};
export default Loading;
