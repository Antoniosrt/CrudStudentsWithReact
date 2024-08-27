

export const HeaderAuthComponent = (
    {title}
) =>{
    return (
        <>
        <div className="flex justify-center">
            <div className="header mb-10">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-white-300">{title}</h1>
            </div>
        </div>
        </>
    )
}