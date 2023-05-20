import React, { useState, memo } from 'react';
import { Modal } from 'antd';
import { FaLaughBeam, BsLightbulbFill, AiFillLike, AiFillHeart } from "../../assets/icon"
import useTypeIcon from '../../hooks/useTypeIcon';


const LikeSummaryModal = ({ postComments, count, commentId }) => {
    console.count('LikeSummaryModal')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredComments = postComments.filter(x => x.commentId === commentId)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <span className='font-semibold cursor-pointer' type="primary" onClick={showModal}>
                {count} beğeni
            </span>
            <Modal className='px-0' title="Reaksiyonlar" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='w-full h-10 flex items-center justify-around border-b-4 mt-5 pb-4'>
                    <div className={`border-b-4 pb-1 border-b-[#355B89]`}>
                        <AiFillLike color='#6FC276' size={25} />
                    </div>
                    <div className={`border-b-4 pb-1 border-b-[#355B89]`}>
                        <AiFillHeart color='#C53F3F' size={25} />
                    </div>
                    <div className={`border-b-4 pb-1 border-b-[#355B89]`}>
                        <BsLightbulbFill color='orange' size={25} />
                    </div>
                    <div className={`border-b-4 pb-1 border-b-[#355B89]`}>
                        <FaLaughBeam color='#4282EE' size={25} />
                    </div>
                </div>
                <div className='mx-12'>
                    <ul >
                        {filteredComments && filteredComments[0].likes.map(like => (
                            <li key={like.id} className='flex my-2 items-center text-[#355B89] border-2 border-[rgba(53,91,137,0.6)] h-10 px-5 rounded-lg'>
                                <span className='h-full flex items-center px-3 '>{useTypeIcon(like.type)}</span>
                                <span className='w-full h-full flex items-center pl-5'>{like.id}</span>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </Modal>
        </>
    )
}
export default memo(LikeSummaryModal);