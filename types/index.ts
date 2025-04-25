export interface JumpBackItem {
    id: string;
    title: string;
    description: string;
    logo: string;
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