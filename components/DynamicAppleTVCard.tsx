// components/DynamicAppleTVCard.js
import dynamic from 'next/dynamic';

const DynamicAppleTVCard = dynamic(
    () => import('./AppleTVCard'),
    { ssr: false }
);

export default DynamicAppleTVCard;