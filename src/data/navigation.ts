export type NavigationItem = {
  name: string;
  href: string;
  isNew?: boolean;
  isUpdated?: boolean;
};

type NavigationGroup = {
  name: string;
  children: NavigationItem[];
};

export const NavigationLinks: NavigationGroup[] = [
  {
    name: "Getting Started",
    children: [
      {
        name: "Introduction",
        href: "/introduction",
      },
      {
        name: "Installation",
        href: "/installation",
      },
      {
        name: "Playground",
        href: "/playground",
        isNew: true,
      },
    ],
  },
  {
    name: "Components",
    children: [
      {
        name: "Button",
        href: "/components/button",
      },
      {
        name: "Accordion",
        href: "/components/accordion",
      },
      {
        name: "Card",
        href: "/components/card",
      },
      {
        name: "Marquee",
        href: "/components/marquee"
      },
      {
        name: "Dock",
        href: "/components/dock"
      }
    ],
  },
  // {
  //   name: "Animations",
  //   children: [
  //     {
  //       name: "Glass Icons",
  //       href: "/components/glass-icons",
  //     },
  //   ],
  // },
] as const;

export const useNavigationLinks = () =>
  NavigationLinks.flatMap((group) =>
    group.children.map((item) => ({
      ...item,
      name: item.name.toLowerCase().replaceAll(" ", "-"),
    }))
  );

// TODO: find a way to enforce string literal type in registery-examples
// const NavItems = NavigationLinks.flatMap((group) => group.children.map((item) => item.name));
// export type NavItemNames = (typeof NavItems)[number];