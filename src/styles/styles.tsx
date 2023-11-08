import { Poppins } from 'next/font/google';
// import localFont from 'next/font/local';

import './dx-next.css';
import './themes/dark.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import './overrides.css';
import './colors.css';
import './_icons.css';

// const fontAwesome = localFont({ src: '../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf' });
// TODO: investigate how to load font
export const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700', '900'],
    subsets: ['latin'],
    display: 'swap'
  });
