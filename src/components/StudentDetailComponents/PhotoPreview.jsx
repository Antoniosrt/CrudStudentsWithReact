export const PhotoPreview = ({ img }) => {
	return (
		<div className="mt-4 ">
			<p>Preview Foto do Estudante:</p>
			<img src={img} className="max-w-64 max-h-64" />
		</div>
	)
}