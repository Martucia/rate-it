import Overflow from '../../overflow/Overflow';

import { useAppDispatch, useAppSelector } from '../../../actions/redux';

import s from '../index.module.sass';
// import styles from './ParticipantsChange.module.sass';

import x from '@images/x.svg';
import { commonSlice } from '../../../store/reducers/commonSlice';
import TagInput from '../../tagInput/TagInput';
import { useEffect, useState } from 'react';
import { IParticipant } from '../../../types/user';
import { updateProject } from '../../../actions/projects';

const ParticipantsChange = () => {
    const [participants, setParticipants] = useState<IParticipant[]>([]);

    const dispatch = useAppDispatch();

    const projectId = useAppSelector(state => state.commonReducer.projectId)

    const project = useAppSelector(state => state.projectReducer.projects.find(project => project.id === projectId));

    const handleCloseModal = () => {
        dispatch(commonSlice.actions.toggleParam({
            param: "projectParticipantsOpen",
            value: false
        }))
    }

    useEffect(() => {
        if (project) {

            setParticipants(project.participants);
        }

    }, [project])

    const handleSave = () => {
        if (project) {
            // dispatch(updateProject(
            //     {
            //         participants,
            //         id: project.id
            //     }
            // ))
        }
    }

    if (project) return (
        <Overflow isCenter={true} close={handleCloseModal}>
            <div className={s.modal}>
                <button className={s.close} onClick={handleCloseModal}>
                    <img src={x} alt="close" />
                </button>
                <h3 className={s.title}>
                    Invite participants
                </h3>

                <TagInput
                    users={participants}
                    setUsers={setParticipants}
                />

                <button className={s.btn} onClick={handleSave}>
                    Save
                </button>
            </div>
        </Overflow>
    );
}

export default ParticipantsChange;