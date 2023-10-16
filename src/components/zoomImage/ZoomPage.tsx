import { FC } from "react";

import { BASE_URL } from "../../utils/constants";
import Overflow from "../overflow/Overflow";
import { useAppDispatch, useAppSelector } from "../../actions/redux";
import { commonSlice } from "../../store/reducers/commonSlice";

const ZoomPage: FC = () => {
    const image = useAppSelector(state => state.commonReducer.zoomImage.src);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        if (image) {
            dispatch(commonSlice.actions.toggleZoomPage({ src: image, isOpen: false }))
        }
    }

    return (
        <Overflow isCenter={true} close={handleClose}>
            <img style={{ maxHeight: "80vh" }} src={`${BASE_URL}/file/${image}`} alt="avatar" />
        </Overflow>
    );
};

export default ZoomPage;