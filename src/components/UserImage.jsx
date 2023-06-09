import React, { useCallback, useEffect, useState } from 'react'
import { getUserImage } from '../services/firebase/firebase';
import defaultUserImage from "../assets/images/default.avif"

const UserImage = ({ userId }) => {
    const [image, setImage] = useState(null)

    const fetchImageURL = useCallback(async (userId) => {
        try {
            const url = await getUserImage(userId);
            if (url) {
                setImage(url);
            } else {
                setImage(defaultUserImage);
            }
        } catch (error) {
            // Hata durumunda yapılması gerekenler
        }
    }, [userId]);

    useEffect(() => {
        fetchImageURL(userId);
    }, [userId]);

    return (
        <img className='h-8 w-8 rounded-full object-cover' src={image} alt="" />
    )
}

export default UserImage