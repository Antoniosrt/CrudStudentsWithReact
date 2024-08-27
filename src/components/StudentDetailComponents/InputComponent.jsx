export const InputComponent = ({
	value,label,placeholder,disabled,type,onChange,name
															 }) => {
	return (
		<label className="form-control w-full max-w-xs">
			<div className="label">
				<span className="label-text">{label}</span>
			</div>
			<input type={type} placeholder={placeholder}
						 onChange={onChange}
						 name={name}
						 className="input  disabled:text-gray-200  input-bordered w-full max-w-xs" value={value}
						 disabled={disabled} />
		</label>
	)
}