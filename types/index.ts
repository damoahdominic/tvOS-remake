export interface JumpBackItem {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    logo: string; // Used for JumpBackInSection navigation items
    contentLogo: string; // Used for ContentArea large logo above "Documentary"
    backgroundImage: string;
    linkText: string;
    linkUrl: string;
    iconName?: string;
    iconColor?: string;
}

export type Direction = 'left' | 'right' | 'static';

export interface NavigationContextProps {
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    items: JumpBackItem[];
    direction: Direction;
}