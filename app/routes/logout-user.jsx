
import authenticator from "~/services/auth.server";

export async function action({request}){
    await authenticator.logout(request, { redirectTo: "/login" });
}

function LogoutUser(){
    return (
        <div>logout</div>
    )
}
export default LogoutUser