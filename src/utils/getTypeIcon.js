import { FaLaughBeam, BsLightbulbFill, AiFillLike, AiFillHeart } from "../assets/icon"

export const getTypeIcon = (type) => {

  if (type === "like") {
    return <AiFillLike />
  }
  else if (type === "awesome") {
    return <AiFillHeart />
  }
  else if (type === "informative") {
    return <BsLightbulbFill />
  }
  else {
    return <FaLaughBeam />
  }

}