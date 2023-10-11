import { Tooltip } from 'antd';

export function TooltipProvider({ children, title }) {
  return (
    <>
      <div>
        <Tooltip title={title}>{children}</Tooltip>
      </div>
    </>
  );
}
