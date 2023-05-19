import React from 'react';
import { FaLaughBeam, BsLightbulbFill, AiFillLike, AiFillHeart } from "../assets/icon";

const useTypeIcon = (type, size) => {
    let icon;
    if (type === "default") {
        icon = <AiFillLike color="black" size={16} />;
    }
    else if (type === "like") {
        icon = <AiFillLike color="#6FC276" size={`${size === 16 ? size : 25}`} />;
    } else if (type === "awesome") {
        icon = <AiFillHeart color="#C53F3F" size={`${size === 16 ? size : 25}`} />;
    } else if (type === "informative") {
        icon = <BsLightbulbFill color="orange" size={`${size === 16 ? size : 25}`} />;
    } else {
        icon = <FaLaughBeam color="#4282EE" size={`${size === 16 ? size : 25}`} />;
    }

    return icon;
};

export default useTypeIcon;