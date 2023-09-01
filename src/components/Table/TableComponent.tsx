import { useState } from 'react';
import { BsBoxArrowInUpRight, BsBoxArrowUpRight } from 'react-icons/bs';
import { MoreIcon } from '.';
import { FlexBox } from '../core';
import DeleteModal from '../Modal/DeleteModal';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '../utils';

interface ActionProps {
  handleEditClick?: () => void;
  handleConfigurationClick?: () => void;
  handleDeleteClick?: () => void;
  handleViewClick?: () => void;
}
interface DropdownProps {
  handleViewClick?: () => void;
  handleAcquiredClick?: () => void;
  handleDisbursedClick?: () => void;
}
interface DropdownGeneralProps {
  handleDropdownFirst?: () => void;
  handleDropdownSecond?: () => void;
  handleDropdownThird?: () => void;
  titleFirst?: string;
  titleSecond?: string;
  titleThird?: string;
  iconFirst?: React.ReactElement;
}
export function TableAction(props: ActionProps) {
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDeleteModal = () => setModalDelete(!modalDelete);
  return (
    <ul className="list table-action">
      {props.handleConfigurationClick && (
        <li>
          <button
            title={'Settings'}
            className="btn btn-sm btn-icon"
            onClick={() => props.handleConfigurationClick && props.handleConfigurationClick()}>
            <i className="ic-settings"></i>
          </button>
        </li>
      )}
      {props.handleViewClick && (
        <li>
          <button
            title={'View'}
            className="btn btn-sm btn-icon"
            onClick={() => props.handleViewClick && props.handleViewClick()}>
            <i className="ic-view"></i>
          </button>
        </li>
      )}

      {props.handleEditClick && (
        <li>
          <button
            title={'Edit'}
            className="btn btn-sm btn-icon"
            onClick={() => {
              return props.handleEditClick && props.handleEditClick();
            }}>
            <i className="ic-edit"></i>
          </button>
        </li>
      )}

      {props.handleDeleteClick && (
        <>
          <li>
            <button
              title={'Delete'}
              className="btn btn-sm"
              type="button"
              onClick={toggleDeleteModal}>
              <i className="ic-delete"></i>
            </button>
          </li>

          <DeleteModal
            handleDeleteClick={props.handleDeleteClick}
            toggleDeleteModal={toggleDeleteModal}
            modalDelete={modalDelete}
          />
        </>
      )}
    </ul>
  );
}
export function TableDropdown(props: DropdownProps) {
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);

  const { handleViewClick, handleAcquiredClick, handleDisbursedClick } = props;
  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleDropdown(!dropdownOpen)}>
        <DropdownToggle color="default">
          <MoreIcon className="ic-more-vert"></MoreIcon>
        </DropdownToggle>
        <DropdownMenu>
          {handleViewClick && (
            <DropdownItem
              onClick={() => {
                return handleViewClick && handleViewClick();
              }}>
              <FlexBox align="center">
                <i className="ic-view mr-3" />
                View
              </FlexBox>
            </DropdownItem>
          )}
          {handleAcquiredClick && (
            <DropdownItem
              onClick={() => {
                return handleAcquiredClick && handleAcquiredClick();
              }}>
              <FlexBox align="center">
                <BsBoxArrowInUpRight className="mr-3" />
                Acquired
              </FlexBox>
            </DropdownItem>
          )}
          {handleDisbursedClick && (
            <DropdownItem
              onClick={() => {
                return handleDisbursedClick && handleDisbursedClick();
              }}>
              <FlexBox align="center">
                <BsBoxArrowUpRight className="mr-3" />
                Disbursed
              </FlexBox>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export function TableDropdownGeneral(props: DropdownGeneralProps) {
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);

  const {
    titleFirst,
    titleSecond,
    titleThird,
    handleDropdownFirst,
    handleDropdownSecond,
    handleDropdownThird,
    iconFirst
  } = props;
  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleDropdown(!dropdownOpen)}>
        <DropdownToggle color="default">
          <MoreIcon className="ic-more-vert"></MoreIcon>
        </DropdownToggle>
        <DropdownMenu>
          {handleDropdownFirst && (
            <DropdownItem
              onClick={() => {
                return handleDropdownFirst && handleDropdownFirst();
              }}>
              <FlexBox align="center">
                {iconFirst}
                {titleFirst}
              </FlexBox>
            </DropdownItem>
          )}

          <DropdownItem divider className="m-0" />
          {handleDropdownSecond && (
            <DropdownItem
              onClick={() => {
                return handleDropdownSecond && handleDropdownSecond();
              }}>
              {titleSecond}
            </DropdownItem>
          )}
          <DropdownItem divider className="m-0" />
          {handleDropdownThird && (
            <DropdownItem
              onClick={() => {
                return handleDropdownThird && handleDropdownThird();
              }}>
              {titleThird}
            </DropdownItem>
          )}
          <DropdownItem divider className="m-0" />
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
