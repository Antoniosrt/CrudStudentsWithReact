import { FormAuthComponent } from "../components/Auth/FormAuthComponent";
import { HeaderAuthComponent } from "../components/Auth/HeaderComponent";

function SignInPage(){
    return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <HeaderAuthComponent title={"Login"} />
            <div>
                <FormAuthComponent />
            </div>
        </div> 
    </div>
    )
}
export default SignInPage;