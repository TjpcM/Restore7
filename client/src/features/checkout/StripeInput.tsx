import { InputBaseComponentProps } from "@mui/material";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";

interface Props extends InputBaseComponentProps{}
// This is used because of using stripe el-t alongside with react component: see PaymentForm.tsx
export const StripeInput = forwardRef(function StripeInput({component:Component, ...props}:Props,
     ref:Ref<unknown>){
        const elementRef = useRef<any>();

        useImperativeHandle(ref, () => ({
            focus: () => elementRef.current.focus
        }) );

        return (
            <Component 
              onReady = {(elememt :any) => elementRef.current = elememt}
              {...props}
            />
        )
     })