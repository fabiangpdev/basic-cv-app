import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.woff', fontWeight: 400 },
    { src: '/fonts/Roboto-Bold.woff',    fontWeight: 700 },
  ],
});
