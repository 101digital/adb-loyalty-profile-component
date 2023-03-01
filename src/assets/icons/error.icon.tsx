import * as React from 'react';
import { SvgCss } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.38487 0.942629C6.10507 -0.314881 7.91822 -0.31386 8.63742 0.943595L13.4281 9.32023C13.4281 9.32024 13.4281 9.32021 13.4281 9.32023C14.1428 10.5698 13.2398 12.1245 11.8014 12.1245H2.21273C0.773228 12.1245 -0.128553 10.5688 0.586055 9.31956L5.38487 0.942629C5.38489 0.942608 5.38486 0.94265 5.38487 0.942629ZM7.76936 1.44006C7.4339 0.853548 6.58844 0.853219 6.25262 1.43964L1.45406 9.81611C1.12067 10.3989 1.54156 11.1245 2.21273 11.1245H11.8014C12.4723 11.1245 12.8932 10.3992 12.5601 9.81677L7.76936 1.44006C7.76936 1.44005 7.76936 1.44006 7.76936 1.44006Z" fill="#8E8E93"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.00781 4.375C7.28396 4.375 7.50781 4.59886 7.50781 4.875V6.94167C7.50781 7.21781 7.28396 7.44167 7.00781 7.44167C6.73167 7.44167 6.50781 7.21781 6.50781 6.94167V4.875C6.50781 4.59886 6.73167 4.375 7.00781 4.375Z" fill="#8E8E93"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.33594 9.0026C6.33594 8.63441 6.63441 8.33594 7.0026 8.33594H7.00927C7.37746 8.33594 7.67594 8.63441 7.67594 9.0026C7.67594 9.37079 7.37746 9.66927 7.00927 9.66927H7.0026C6.63441 9.66927 6.33594 9.37079 6.33594 9.0026Z" fill="#8E8E93"/>
</svg>

`;

const ErrorIcon: React.FC<Props> = ({ size, color }) => {
  return <SvgCss xml={xml} width={size} height={size} fill={color} />;
};
export { ErrorIcon };
