export const ButtonPrimary = ({
    isLoading,text
})=>{
    return(
    <button className=" btn  btn-active btn-primary btn-wide" type="submit" disabled={isLoading?true:false} >
        {
            isLoading ? (<span className="loading loading-spinner loading-xs"></span>) : text
        }
    </button>
    )
}