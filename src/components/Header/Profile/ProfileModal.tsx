import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "reactstrap";
// import HeaderImage from '../../assets/image/header.png';
import HeaderImage from "../../../assets/image/header.png";
import { Box, FlexBox, Image, Text } from "../../core";
import Button from "../../derived/Buttons/Buttons";
import { ModalBody } from "../../utils";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import ProfileImage from "../ProfileImage/ProfileImage";
import { useAuth } from "../../../providers/ApplicationProvider";

interface ProfileModalProps {
  toggle?: () => void;
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
function ProfileModal(props: ProfileModalProps) {
  const { toggle, isOpen, setIsOpen } = props;
  const { userData } = useAuth();
  // const { data: profileData } = useUserData();

  return (
    <>
      <Modal centered toggle={toggle} isOpen={isOpen} className="modal-profile">
        <div className="modal-header p-0">
          <Image src={HeaderImage}></Image>
          <Button className="btn" onClick={() => setIsOpen(!isOpen)}>
            <i className="ic-close text-white h6"></i>
          </Button>
        </div>
        <ModalBody className="p-0">
          <FlexBox align="center" justify="center" direction="column">
            <Box className="img-md">
              <ProfileImage image={""} />
            </Box>
            <Text typeface="bold" className="align-vertical mt-2">
              {userData?.user?.fullNameNepali}
              <Text typeface="medium" className="ml-2">
                ({userData?.user?.roleNameNepali})
              </Text>
            </Text>
          </FlexBox>
          <Box className="divider mt-4"></Box>
          <Box className="p-4">
            <Text
              typeface="regular"
              variant="display1"
              className="text-gray-65"
            >
              Contact Information
            </Text>
            <Box component="ul" className="list ">
              <Box component="li" className="mb-3">
                <FlexBox align="center" justify="space-between">
                  <Text className="text-gray-70 align-vertical">
                    <FiPhone className="mr-2 text-gray-65" />
                    {userData?.user?.contact}
                  </Text>
                  <a href="tel:" className="btn btn-outline-gray-16">
                    Call
                  </a>
                </FlexBox>
              </Box>
              <Box component="li">
                <FlexBox align="center" justify="space-between">
                  <Text className="text-gray-70 align-vertical">
                    <AiOutlineMail className="mr-2 text-gray-65" />
                    {userData?.user?.email}
                  </Text>
                  <Button className="btn btn-outline-gray-16">Email</Button>
                </FlexBox>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ProfileModal;
