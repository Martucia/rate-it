import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../actions/redux';
import { createProject } from '../../../actions/projects';
import { commonSlice } from '../../../store/reducers/commonSlice';

import Input from '../../input/Input';
import Overflow from '../../overflow/Overflow';


import s from '../index.module.sass';
// import styles from './CreateProject.module.sass';

import x from '@images/x.svg';
import { useNavigate } from 'react-router-dom';
// import ParticipantsInput from '../../participantsInput/ParticipantsInput';

const CreateProject = () => {
    const { error, isLoading } = useAppSelector(state => state.projectReducer);

    const [name, setName] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCloseModal = () => {
        dispatch(commonSlice.actions.toggleModal({ modalName: "projectCreateOpen", isOpen: false }))
    }

    const handleCreateProject = async () => {
        let id = await dispatch(createProject({ name }));

        navigate('/tasks/?project=' + id);
    }

    return (
        <Overflow isCenter={true} close={handleCloseModal}>
            <div className={s.modal}>
                <button className={s.close} onClick={handleCloseModal}>
                    <img src={x} alt="close" />
                </button>
                <h3 className={s.title}>
                    Create Project
                </h3>

                <Input
                    label='Project Name'
                    value={name}
                    placeholder='Name of new project'
                    setValue={setName}
                    style={{ borderBottom: "1px solid #aaa" }}
                    onEnterDown={handleCreateProject}
                />

                {/* <ParticipantsInput /> */}

                {error && (
                    <div className={s.error}>
                        {error}
                    </div>
                )}

                <button disabled={isLoading} onClick={handleCreateProject} className={s.btn}>
                    Save
                </button>
            </div>
        </Overflow>
    );
}

export default CreateProject;
