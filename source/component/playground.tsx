import clsx from "clsx";
import type { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isAdding?: boolean;
}

export function Playground({ isAdding, children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx("playground", { "-is-adding": isAdding })}
    >
      {children}
    </div>
  );
}
