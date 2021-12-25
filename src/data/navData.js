import { FaHome, FaBasketballBall, FaMusic, FaSuitcase } from 'react-icons/fa';

const navData = [
  {
    title: 'Home',
    link: '/',
    Icon: <FaHome size={18} />,
  },
  {
    title: 'Sports',
    link: '/sports',
    Icon: <FaBasketballBall size={16} />,
  },
  {
    title: 'Music',
    link: '/music',
    Icon: <FaMusic size={16} />,
  },
  {
    title: 'Business',
    link: '/business',
    Icon: <FaSuitcase size={16} />,
  },
];

export default navData;
