import { AvatarCircles } from "@/components/ui/avatar-circles";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
  },
];

export function AvatarCirclesDemo() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />;
}
