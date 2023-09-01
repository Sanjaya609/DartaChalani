import { ImgHTMLAttributes } from 'react';
import { Image } from '../core';
import profileImg from '../../assets/image/user.jpg'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width?: string;
  height?: string;
  className?: string;
  image?: string;
}
function ProfileImage(props: ImageProps) {
  // const baseHrUrl = process.env.REACT_APP_API_HR;
  // const currentUserImage = `${baseHrUrl}${props.image}`;
  // const defaultImage = 'https://hr.infodev.com.np/image/default-profile-picture.jpg';
  // const sanitizeImage = props.image ? currentUserImage : defaultImage;
  return (
    <>
      <Image src={profileImg} {...props}></Image>
    </>
  );
}

export default ProfileImage;
