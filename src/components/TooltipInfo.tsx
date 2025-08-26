import CIcon from "@coreui/icons-react";
import {cilInfo} from "@coreui/icons";
import {CTooltip} from "@coreui/react-pro";
import {FC} from "react";

const TooltipInfo: FC<{
  content: string
}> = ({content}) => {
  return (
    <div style={{fontSize: '1rem'}}>
      <CTooltip content={content}>
        <CIcon icon={cilInfo} />
      </CTooltip>
    </div>
  )
}

export default TooltipInfo
