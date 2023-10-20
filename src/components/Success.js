import React from "react";

//display what ever want success message
function Success({message}) {
    return (
        <div>
            <div class="alert alert-success" role="alert">
                {message}
            </div>
        </div>
    );
}

export default Success;
