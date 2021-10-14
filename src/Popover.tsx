import React from "react";
import {
  useOverlay,
  useModal,
  useDialog,
  FocusScope,
  mergeProps,
  DismissButton
} from "react-aria";
import { useObjectRef } from "./utils/useObjectRef";

type PopoverProps = {
  isOpen: Parameters<typeof useOverlay>[0]["isOpen"];
  onClose: Parameters<typeof useOverlay>[0]["onClose"];
  children: (injectedProps: {
    Header: (props: React.PropsWithChildren<{}>) => JSX.Element;
    Main: (props: React.PropsWithChildren<{}>) => JSX.Element;
    Footer: (props: React.PropsWithChildren<{}>) => JSX.Element;
  }) => JSX.Element;
};

export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (props, forwardedRef) => {
    const { children, isOpen, onClose, ...otherProps } = props;

    const ref = useObjectRef(forwardedRef);

    // Handle interacting outside the dialog and pressing
    // the Escape key to close the modal.
    let { overlayProps } = useOverlay(
      {
        onClose,
        isOpen,
        isDismissable: true
      },
      ref
    );

    // Hide content outside the modal from screen readers.
    let { modalProps } = useModal();

    // Get props for the dialog and its title
    let { dialogProps, titleProps } = useDialog({}, ref);

    return (
      <FocusScope restoreFocus>
        <div
          {...mergeProps(overlayProps, dialogProps, otherProps, modalProps)}
          ref={ref}
        >
          {children({
            Header: (props) =>
              React.cloneElement(
                <header></header>,
                mergeProps(props, titleProps)
              ),
            Main: (props) => <main {...props}></main>,
            Footer: (props) => <footer {...props}></footer>
          })}

          <DismissButton onDismiss={onClose} />
        </div>
      </FocusScope>
    );
  }
);
