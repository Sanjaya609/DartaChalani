import React from 'react';
import {
  Modal as RNModal,
  ModalHeader as RNModalHeader,
  ModalBody as RNModalBody,
  ModalFooter as RNModalFooter,
  ModalProps,
  ModalHeaderProps,
  ModalFooterProps,
  ModalBodyProps
} from 'reactstrap';

interface ModalProperties extends ModalProps {
  children?: React.ReactNode;
}
interface ModalHeaderProperties extends ModalHeaderProps {
  children?: React.ReactNode;
}
interface ModalBodyProperties extends ModalBodyProps {
  children?: React.ReactNode;
}
interface ModalFooterProperties extends ModalFooterProps {
  children?: React.ReactNode;
}

export default function Modal({ children, ...args }: ModalProperties) {
  return <RNModal {...args}>{children}</RNModal>;
}

export function ModalHeader(props: ModalHeaderProperties) {
  return <RNModalHeader {...props} />;
}
export function ModalBody(props: ModalBodyProperties) {
  return <RNModalBody {...props} />;
}
export function ModalFooter(props: ModalFooterProperties) {
  return <RNModalFooter {...props} />;
}
