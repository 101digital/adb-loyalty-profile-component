import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.57448 15.8453L2.55781 15.862C2.33281 15.3703 2.19115 14.812 2.13281 14.1953C2.19115 14.8036 2.34948 15.3536 2.57448 15.8453Z" fill="#1B1B1B"/>
<path d="M7.92083 8.64635C9.0162 8.64635 9.90417 7.75839 9.90417 6.66302C9.90417 5.56766 9.0162 4.67969 7.92083 4.67969C6.82547 4.67969 5.9375 5.56766 5.9375 6.66302C5.9375 7.75839 6.82547 8.64635 7.92083 8.64635Z" fill="#1B1B1B"/>
<path d="M13.9109 1.66406H6.9276C3.89427 1.66406 2.08594 3.4724 2.08594 6.50573V13.4891C2.08594 14.3974 2.24427 15.1891 2.5526 15.8557C3.26927 17.4391 4.8026 18.3307 6.9276 18.3307H13.9109C16.9443 18.3307 18.7526 16.5224 18.7526 13.4891V11.5807V6.50573C18.7526 3.4724 16.9443 1.66406 13.9109 1.66406ZM17.3943 10.4141C16.7443 9.85573 15.6943 9.85573 15.0443 10.4141L11.5776 13.3891C10.9276 13.9474 9.8776 13.9474 9.2276 13.3891L8.94427 13.1557C8.3526 12.6391 7.41094 12.5891 6.74427 13.0391L3.6276 15.1307C3.44427 14.6641 3.33594 14.1224 3.33594 13.4891V6.50573C3.33594 4.15573 4.5776 2.91406 6.9276 2.91406H13.9109C16.2609 2.91406 17.5026 4.15573 17.5026 6.50573V10.5057L17.3943 10.4141Z" fill="#1B1B1B"/>
</svg>
`;

const ImagePlaceHolderIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { ImagePlaceHolderIcon };
