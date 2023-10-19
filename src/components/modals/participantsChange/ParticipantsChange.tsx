import Overflow from '../../overflow/Overflow';

import { useAppDispatch, useAppSelector } from '../../../actions/redux';

import s from '../index.module.sass';
// import styles from './ParticipantsChange.module.sass';

import x from '@images/x.svg';
import { commonSlice } from '../../../store/reducers/commonSlice';
import TagInput from '../../../ui/inputs/tagInput/TagInput';
import { useEffect, useState } from 'react';
import { IParticipant } from '../../../types/user';
import { inviteParticipants } from '../../../actions/projects';

const ParticipantsChange = () => {
    // const [participants, setParticipants] = useState<IParticipant[]>([]);
    const [participants, setParticipants] = useState<{ email: string }[]>([]);
    

    const dispatch = useAppDispatch();

    const projectId = useAppSelector(state => state.commonReducer.projectId)

    const project = useAppSelector(state => state.projectReducer.projects.find(project => project.id === projectId));

    const handleCloseModal = () => {
        dispatch(commonSlice.actions.toggleParam({
            param: "projectParticipantsOpen",
            value: false
        }))
    }

    // useEffect(() => {
    //     if (project) {

    //         setParticipants(project.participants);
    //     }

    // }, [project])

    const handleSave = () => {
        // if (project) {
        // dispatch(updateProject(
        //     {
        //         participants,
        //         id: project.id
        //     }
        // ))
        // }
        if (project) {
            dispatch(inviteParticipants(project.id, participants))
        }
    }

    const checkExistingUser = (email: string): boolean => {
        const isExist = project?.participants.find(user => user.user.email === email);

        return isExist ? true : false;
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
                    check={checkExistingUser}
                />

                <button className={s.btn} onClick={handleSave}>
                    Send invite
                </button>
            </div>
        </Overflow>
    );
}

export default ParticipantsChange;