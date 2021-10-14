import React from "react";
import { useButton } from "react-aria";
import { useObjectRef } from "./utils/useObjectRef";

export const EnhanceWithAriaButton = React.forwardRef<
  HTMLButtonElement,
  Parameters<typeof useButton>[0]
>(({ children, ...props }, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);

  const { buttonProps } = useButton(props, ref);

  if (React.isValidElement(children)) {
    return React.cloneElement(children, { ...buttonProps, ref });
  } else {
    return <>error</>;
  }
});
