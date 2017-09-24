import React, {Component} from 'react';
import ReactLoading from 'react-loading';

class Loader extends Component {

state = {
    width : '0px',
    height : '10px',
    delay : 0
}

render() {
    let loadingElement;
    const {show} = this.props;
    show === false ? loadingElement = null 
                    :loadingElement = <ReactLoading type="bars" color="grey" delay={this.state.delay} />; 
    return (
        loadingElement
    );
}

}

export default Loader;