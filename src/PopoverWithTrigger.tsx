import React, { ComponentProps } from "react";
import { EnhanceWithAriaButton } from "./EnhanceWithAriaButton";
import {
  mergeProps,
  OverlayContainer,
  useButton,
  useOverlayPosition,
  useOverlayTrigger
} from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Popover } from "./Popover";

type PopoverWithTriggerProps = {
  children: (injectedProps: {
    // We don't want consumers to be able to supply a ref to these individual elements;
    // refs must be provided to the top-level `PopoverWithTrigger` component so that it
    // can distribute/coodinate them between react-aria hooks.
    Trigger: (props: Parameters<typeof useButton>[0]) => JSX.Element;
    Popover: (
      props: Pick<ComponentProps<typeof Popover>, "children">
    ) => JSX.Element;
  }) => JSX.Element;
};

export const PopoverWithTrigger = (props: PopoverWithTriggerProps) => {
  let state = useOverlayTriggerState({});
  let triggerRef = React.useRef<HTMLButtonElement>(null);
  let overlayRef = React.useRef<HTMLDivElement>(null);

  // Get props for the trigger and overlay. This also handles
  // hiding the overlay when a parent element of the trigger scrolls
  // (which invalidates the popover positioning).
  let { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  // Get popover positioning props relative to the trigger
  let { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement: "top",
    offset: 5,
    isOpen: state.isOpen
  });

  return props.children({
    Trigger: (props) => (
      <EnhanceWithAriaButton
        {...mergeProps(props, triggerProps)}
        onPress={() => state.toggle()}
        ref={triggerRef}
      />
    ),

    Popover: ({ children }) =>
      state.isOpen ? (
        <OverlayContainer>
          <Popover
            ref={overlayRef}
            isOpen={state.isOpen}
            onClose={() => state.close()}
            {...overlayProps}
            {...positionProps}
          >
            {children}
          </Popover>
        </OverlayContainer>
      ) : (
        <></>
      )
  });
};
