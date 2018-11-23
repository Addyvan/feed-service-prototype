import React from "react";

class Post extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(event) {
        console.log(event);
        
    }
    
    render() {
        return(
            <div onClick={() => this.handleEvent("expand")}>
                click for "Expand"
            </div>
        );
    }
}

export default Post;