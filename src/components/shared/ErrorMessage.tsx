import { ErrorIcon } from "../../weather/ErrorIcon";

type Props = {
  msg: string;
}

export const ErrorMessage = ({ msg }: Props) => {
  return (
    <div className="error">
      <ErrorIcon msg={msg} />
      <p>{msg}</p>
    </div>
  )
}