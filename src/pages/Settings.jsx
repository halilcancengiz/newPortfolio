import React, { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { FaUserAlt, FaBirthdayCake, FaUserFriends, BsCloudUploadFill, BsImage, TiTick, AiFillEdit } from "../assets/icon"
import { DatePicker, Input, Select, Upload } from "antd";
import SlideAnimation from "../components/motion/SlideAnimation";
import { addAndUpdateUserInfo, addUserImage, getUserById, getUserImage } from "../services/firebase/firebase";
import defaultUserImage from "../assets/images/default.avif"

const { Option } = Select;

export const Settings = () => {
  const user = useSelector(state => state.user.value, shallowEqual);
  const info = useSelector(state => state.user.info, shallowEqual);

  const [isUpdating, setIsUpdating] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const [image, setImage] = useState("")
  const fullNameRef = useRef()

  const [userInfo, setUserInfo] = useState({
    fullName: info && info.fullName ? info.fullName : "",
    birthday: info && info.birthday ? info.birthday : "",
    gender: info && info.gender ? info.gender : ""
  });

  const onChangeBirthDay = (date, dateString) => setUserInfo({ ...userInfo, birthday: dateString });


  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        setUserInfo({ ...userInfo, gender: "male" })
        break;
      case 'female':
        setUserInfo({ ...userInfo, gender: "female" })
        break;
      default:
        break;
    }
  };
  const handleUserImage = async (e) => {
    const image = e.target.files[0];
    setUserImage(image);
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user && user.uid) {
      await addAndUpdateUserInfo(userInfo.fullName, userInfo.birthday, userInfo.gender, user.uid)
      await addUserImage(user.uid, userImage)
      setIsUpdating(false)
    }
  }

  const fetchImageURL = useCallback(async () => {
    try {
      if (user && user.uid) {
        const url = await getUserImage(user.uid);
        if (url) {
          setImage(url);
        } else {
          setImage(defaultUserImage);
        }
      }

    } catch (error) {
      // Hata durumunda yapılması gerekenler
    }
  }, []);

  useEffect(() => {
    if (user && user.uid) {
      getUserById(user.uid);
      fetchImageURL();
    }
    if (isUpdating) {
      fullNameRef.current.focus();
    }

  }, [user, fetchImageURL, isUpdating]);

  return (
    <SlideAnimation>
      <div className="w-full h-full flex items-center justify-center flex-col">
        <div className="w-full flex items-center justify-center py-5 text-center mb-10 drop-shadow-dark-btn ">
          <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
            Profili Düzenle
          </h6>
        </div>
        <div className="text-white mb-5">
          {user ? user.email : "bilinmeyen email"}
        </div>
        <div className="group rounded-full mb-10 relative">
          <label onClick={() => setIsUpdating(true)} htmlFor="userImage" className="w-full h-full cursor-pointer absolute hidden group-hover:flex group-hover:items-center group-hover:justify-center group-hover:bg-black-500 rounded-full">
            <BsCloudUploadFill size={30} color="white" />
          </label>
          <img className="w-[250px] h-[250px] object-cover rounded-full object-center" src={image} alt="" />
        </div>
        <form onSubmit={(e) => handleSubmit(e)} id="settings-form" className="flex max-w-[500px] px-5 w-full flex-col gap-2 font-montserrat">
          <div className="bg-white w-full flex items-center justify-center h-12 rounded-md">
            <FaUserAlt className="mx-5 text-dark" size={20} />
            {
              isUpdating ?
                <Input ref={fullNameRef} id="fullName" onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })} value={userInfo.fullName} className="w-full placeholder:text-[#808080] bg-transparent outline-none p-[11px]" type="text" placeholder="Ad Soyad" /> :
                <div className="flex w-full items-center">
                  <label htmlFor="fullName" onClick={() => setIsUpdating(true)} className="w-full text-gray-600 italic">{info.fullName ? info.fullName : "Tam ad belirtilmedi"}</label>
                </div>
            }

          </div>
          <div className="bg-white w-full flex items-center justify-center h-12 rounded-md">
            <FaBirthdayCake className="mx-5 text-dark" size={20} />
            {
              isUpdating ?
                <DatePicker id="birthday" placement="left" placeholder="Doğum Tarihi" className="w-full border-0 focus:border-0" onChange={onChangeBirthDay} /> :
                <p onClick={() => setIsUpdating(true)} className="w-full text-gray-600 italic">{info.birthday ? info.birthday : "Doğum tarihi belirtilmedi"}</p>
            }

          </div>
          <div className="bg-white w-full flex items-center justify-center h-12 rounded-md">
            <FaUserFriends className="mx-5 text-dark" size={20} />
            {
              isUpdating ?
                (
                  <div className="w-full" >
                    <Select
                      id="gender"
                      style={{ border: "none" }}
                      className="w-full border-0 focus:border-0"
                      placeholder="Cinsiyet"
                      onChange={onGenderChange}
                      allowClear
                    >
                      <Option className="capitalize" value="male">Erkek</Option>
                      <Option className="capitalize" value="female">Kadın</Option>
                    </Select>
                  </div>
                ) :
                <p onClick={() => setIsUpdating(true)} className="w-full text-gray-600 italic">{info.gender === "male" ? "Erkek" : info.gender === "female" ? "Kadın" : "Cinsiyet tarihi belirtilmedi"}</p>
            }

          </div>
          <div className={`bg-white w-full items-center justify-center h-12 rounded-md ${isUpdating ? "flex" : "hidden"}`}>
            <BsImage className="mx-5 text-dark" size={20} />
            <input className="w-full" id="userImage" onChange={(e) => handleUserImage(e)} type="file" />
          </div>
          <div className="w-full flex gap-2">
            {
              isUpdating && (
                <button disabled={!isUpdating} type="submit" className={`w-full glassmorphism text-white sm:h-12 xs:h-10  bg-gray-btn rounded-lg `}>
                  Kaydet
                </button>
              )
            }
          </div>
        </form>
      </div >
    </SlideAnimation >
  );
};



// {
//   isUpdating ?
//     <Input onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })} value={userInfo.fullName} className="w-full placeholder:text-[#808080] bg-transparent outline-none p-[11px]" type="text" placeholder="Ad Soyad" /> :
//     <div className="flex w-full items-center">
//       <p className="w-full text-gray-600 italic">{info.fullName ? info.fullName : "Tam ad belirtilmedi"}</p>
//       {
//         isUpdating ? <TiTick size={25} /> : <AiFillEdit size={25} />
//       }

//     </div>

// }
