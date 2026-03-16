import { useEffect, useState } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        if (!editMode) {
            setStatus(props.status);
        }
    }, [props.status, editMode]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div> {!editMode &&
            <div>
                <b>Status:</b><span onDoubleClick={activateEditMode} >{props.status || '-----'}</span>
            </div>
        }
            {editMode &&
                <div>
                    <input autoFocus={true}
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        value={status}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;
