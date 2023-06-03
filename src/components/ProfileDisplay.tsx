import ProfilePic from "./ProfilePic";
import Paragraph from "./ui/Paragraph";
import { UserProfile } from "@prisma/client";

interface ProfileDisplayProps {
    userProfile: UserProfile | null; // Allow null values
  }

export default function ProfileDisplay({ userProfile }: ProfileDisplayProps): JSX.Element {
  const content = userProfile?.profileBio ?? "";
  const source =
    userProfile?.profileImage ??
    "https://api.dicebear.com/6.x/fun-emoji/png?seed=Lily";

  return (
    <div className="profileDisplay">
      <ProfilePic source={source}/>
      <Paragraph placeholder="Edit your opening message">{content}</Paragraph>
    </div>
  );
}