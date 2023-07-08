import React, { SyntheticEvent } from "react";

interface IFormProps {
  onSubmitHandle: CallableFunction;
  submitMethod: "POST" | "GET";
  requiredFields?: Array<string>;
  children?: JSX.Element | JSX.Element[];
  action?: string;
  fluid?: boolean;
}

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  return (
    <div className={`p-1 md:p-2${props.fluid && " w-full"}`}>
      <form
        action={props.action || ""}
        onSubmit={(ev: SyntheticEvent) =>
          props.onSubmitHandle(ev, {
            action: props.action,
            method: props.submitMethod || "POST",
          })
        }
        className="grid gap-1 grid-cols-1 p-2 bg-surface rounded-lg"
      >
        {props.children}
      </form>
    </div>
  );
};

export { Form };
