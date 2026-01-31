import React from 'react';

class ProfileStatus extends React.Component {
    
    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
        // this.forceUpdate();
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        });
    } 

    render() {
        /* 
        if (!props.profile) {
             return <Preloader />
         }
         */
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode} >{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status} />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;