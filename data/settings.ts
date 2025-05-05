export interface SettingItem {
    icon: string;
    iconDark: string;
    title: string;
    subTitle: string;
    iconOnly: boolean;
    alignment: 'horizontal' | 'vertical';
    layoutId: string;
    actionKey?: string;
  }
  
  export const settings: SettingItem[] = [
    {
      icon: "/icons/light/power.svg",
      iconDark: "/icons/dark/power.svg",
      title: "Power Off",
      subTitle: "",
      iconOnly: false,
      alignment: "vertical",
      layoutId: "power-off",
      actionKey: "handlePowerOff",
    },
    {
      icon: "/icons/wifi.svg",
      iconDark: "/icons/wifi.svg",
      title: "Wi-Fi Starlink",
      subTitle: "StarLink",
      iconOnly: false,
      alignment: "horizontal",
      layoutId: "wifi-starlink",
      actionKey: "gotoSettings",
    },
    {
      icon: "/icons/light/dnd.svg",
      iconDark: "/icons/dark/dnd.svg",
      title: "Do Not Disturb",
      subTitle: "",
      iconOnly: false,
      alignment: "horizontal",
      layoutId: "do-not-disturb",
      // no actionKey for now
    },
    {
      icon: "/icons/light/audio-cast.svg",
      iconDark: "/icons/dark/audio-cast.svg",
      title: "Audio",
      subTitle: "",
      iconOnly: false,
      alignment: "horizontal",
      layoutId: "audio-cast",
      actionKey: "setAudioCast",
    },
    {
      icon: "/icons/light/timer.svg",
      iconDark: "/icons/dark/timer.svg",
      title: "Sleep Timer",
      subTitle: "",
      iconOnly: false,
      alignment: "horizontal",
      layoutId: "sleep-timer",
      actionKey: "setSleepTimer",
    },
    {
      icon: "/icons/light/game.svg",
      iconDark: "/icons/dark/game.svg",
      title: "Game",
      subTitle: "",
      iconOnly: true,
      alignment: "vertical",
      layoutId: "game",
      actionKey: "setGame",
    },
    {
      icon: "/icons/light/accessibility.svg",
      iconDark: "/icons/dark/accessibility.svg",
      title: "Accessibility",
      subTitle: "",
      iconOnly: true,
      alignment: "vertical",
      layoutId: "accessibility",
      actionKey: "setAccessibility",
    },
    {
      icon: "/icons/light/child-lock.svg",
      iconDark: "/icons/dark/child-lock.svg",
      title: "Lock",
      subTitle: "",
      iconOnly: true,
      alignment: "vertical",
      layoutId: "restrictions",
      actionKey: "setRestrictions",
    },
    {
      icon: "/icons/light/search.svg",
      iconDark: "/icons/dark/search.svg",
      title: "Search",
      subTitle: "",
      iconOnly: true,
      alignment: "vertical",
      layoutId: "search",
      actionKey: "gotoSettings",
    },
  ];
  