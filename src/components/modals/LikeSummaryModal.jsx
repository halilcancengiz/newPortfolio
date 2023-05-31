import React, { useState, memo, useMemo } from 'react';
import { Modal } from 'antd';
import { FaLaughBeam, BsLightbulbFill, AiFillLike, AiFillHeart, MdFilterAltOff } from "../../assets/icon"
import useTypeIcon from '../../hooks/useTypeIcon';
import { checkIfTypeExists } from '../../utils/checkIfTypeExists';

const LikeSummaryModal = ({ postComments, count, commentId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentType, setCurrentType] = useState("");

    const filteredComments = useMemo(() => {
        if (!currentType) {
            return postComments.filter(x => x.commentId === commentId);
        } else {
            return postComments.filter(x => x.commentId === commentId)
                .map(comment => ({
                    ...comment,
                    likes: comment.likes.filter(like => like.type === currentType)
                }));
        }
    }, [postComments, commentId, currentType]);

    const originalList = postComments.filter(x => x.commentId === commentId);

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    return (
        <>
            <span className='font-semibold cursor-pointer' type="primary" onClick={showModal}>
                {count} beğeni
            </span>
            <Modal className='px-0' title="Reaksiyonlar" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='flex gap-2 px-12 mb-5 '>
                    <div onClick={() => setCurrentType("")} className={`border-b-4 ${currentType === "" ? "border-b-green-400" : "border-b-[#355B89]"} pb-2  w-1/4 flex items-center justify-center`}>
                        <MdFilterAltOff color='#6FC276' size={25} />
                    </div>
                    {["like", "awesome", "informative", "funny"].map((type, index) => (
                        checkIfTypeExists(originalList, type) && (
                            <React.Fragment key={index}>
                                <div
                                    onClick={() => setCurrentType(type)}
                                    className={`border-b-4 pb-2 ${currentType === type ? "border-b-green-400" : "border-b-[#355B89]"} w-1/4 flex items-center justify-center`}
                                >

                                    {type === "like" && <AiFillLike color='#6FC276' size={25} />}
                                    {type === "awesome" && <AiFillHeart color='#C53F3F' size={25} />}
                                    {type === "informative" && <BsLightbulbFill color='orange' size={25} />}
                                    {type === "funny" && <FaLaughBeam color='#4282EE' size={25} />}
                                </div>
                            </React.Fragment>

                        )
                    ))}
                </div>
                <div className='mx-12'>
                    <ul>
                        {filteredComments.length > 0 && filteredComments[0].likes.map((like, index) => (
                            <li key={index} className='flex my-2 items-center text-[#355B89] border-2 border-[rgba(53,91,137,0.6)] h-10 px-5 rounded-lg'>
                                <span className='h-full flex items-center px-3'>{useTypeIcon(like.type)}</span>
                                <span className='w-full h-full flex items-center pl-5'>{like.id}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </>
    );
};

export default memo(LikeSummaryModal);